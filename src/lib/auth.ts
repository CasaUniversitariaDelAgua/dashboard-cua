import { supabase } from './supabase';
import crypto from 'crypto';

const SESSION_KEY = 'dashboard-session';

export interface SessionUser {
  id: string;
  nombre: string;
  rol: string;
}

function verifyPin(pinPlano: string, pinAlmacenado: string): boolean {
  const partes = pinAlmacenado.split('$');
  if (partes.length !== 3 || partes[0] !== 'v1') {
    return pinAlmacenado === pinPlano;
  }

  const salt = partes[1];
  const hashAlmacenado = partes[2];

  const input = `${salt}|${pinPlano}`;
  const hashCalculado = crypto.createHash('sha256').update(input).digest('hex');

  return hashCalculado === hashAlmacenado;
}

function parseCookies(cookieString: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieString) return cookies;
  for (const pair of cookieString.split(';')) {
    const [key, ...val] = pair.trim().split('=');
    if (key) cookies[key] = decodeURIComponent(val.join('='));
  }
  return cookies;
}

export function getSession(request: Request): SessionUser | null {
  const cookies = parseCookies(request.headers.get('cookie'));
  const raw = cookies[SESSION_KEY];
  console.log('getSession raw cookie:', raw);
  if (!raw) return null;
  try {
    const user = JSON.parse(raw) as SessionUser;
    console.log('getSession parsed user:', user);
    if (user.rol !== 'admin' && user.rol !== 'administrador') {
      console.log('getSession user.rol invalid:', user.rol);
      return null;
    }
    return user;
  } catch (e) {
    console.error('getSession JSON parse error:', e);
    return null;
  }
}

export function setSessionCookie(user: SessionUser): string {
  const value = encodeURIComponent(JSON.stringify(user));
  return `${SESSION_KEY}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`;
}

export function clearSessionCookie(): string {
  return `${SESSION_KEY}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export async function loginWithPin(pin: string): Promise<{ user: SessionUser | null; error: string | null }> {
  const { data: users, error } = await supabase
    .from('usuarios')
    .select('id, nombre, rol, pin');

  if (error || !users) {
    console.error('loginWithPin DB error:', error);
    return { user: null, error: 'Error al conectar con la base de datos' };
  }

  const matchingUser = users.find(u => verifyPin(pin, u.pin));

  if (!matchingUser) {
    return { user: null, error: 'PIN inválido' };
  }

  if (matchingUser.rol !== 'admin' && matchingUser.rol !== 'administrador') {
    return { user: null, error: 'No tienes permisos de administrador' };
  }

  return {
    user: {
      id: matchingUser.id,
      nombre: matchingUser.nombre,
      rol: matchingUser.rol === 'administrador' ? 'admin' : matchingUser.rol
    },
    error: null
  };
}
