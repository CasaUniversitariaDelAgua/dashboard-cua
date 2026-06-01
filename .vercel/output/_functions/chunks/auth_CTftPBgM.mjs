import { s as supabase } from './supabase_Du3HrT-j.mjs';
import crypto from 'crypto';

const SESSION_KEY = "dashboard-session";
function verifyPin(pinPlano, pinAlmacenado) {
  const partes = pinAlmacenado.split("$");
  if (partes.length !== 3 || partes[0] !== "v1") {
    return pinAlmacenado === pinPlano;
  }
  const salt = partes[1];
  const hashAlmacenado = partes[2];
  const input = `${salt}|${pinPlano}`;
  const hashCalculado = crypto.createHash("sha256").update(input).digest("hex");
  return hashCalculado === hashAlmacenado;
}
function parseCookies(cookieString) {
  const cookies = {};
  if (!cookieString) return cookies;
  for (const pair of cookieString.split(";")) {
    const [key, ...val] = pair.trim().split("=");
    if (key) cookies[key] = decodeURIComponent(val.join("="));
  }
  return cookies;
}
function getSession(request) {
  const cookies = parseCookies(request.headers.get("cookie"));
  const raw = cookies[SESSION_KEY];
  console.log("getSession raw cookie:", raw);
  if (!raw) return null;
  try {
    const user = JSON.parse(raw);
    console.log("getSession parsed user:", user);
    if (user.rol !== "admin" && user.rol !== "administrador") {
      console.log("getSession user.rol invalid:", user.rol);
      return null;
    }
    return user;
  } catch (e) {
    console.error("getSession JSON parse error:", e);
    return null;
  }
}
async function loginWithPin(pin) {
  const { data: users, error } = await supabase.from("usuarios").select("id, nombre, rol, pin");
  if (error || !users) {
    console.error("loginWithPin DB error:", error);
    return { user: null, error: "Error al conectar con la base de datos" };
  }
  const matchingUser = users.find((u) => verifyPin(pin, u.pin));
  if (!matchingUser) {
    return { user: null, error: "PIN inválido" };
  }
  if (matchingUser.rol !== "admin" && matchingUser.rol !== "administrador") {
    return { user: null, error: "No tienes permisos de administrador" };
  }
  return {
    user: {
      id: matchingUser.id,
      nombre: matchingUser.nombre,
      rol: matchingUser.rol === "administrador" ? "admin" : matchingUser.rol
    },
    error: null
  };
}

export { getSession as g, loginWithPin as l };
