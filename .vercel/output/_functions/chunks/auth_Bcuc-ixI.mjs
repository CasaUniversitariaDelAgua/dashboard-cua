import { s as supabase } from './supabase_Du3HrT-j.mjs';

const SESSION_KEY = "dashboard-session";
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
  if (!raw) return null;
  try {
    const user = JSON.parse(raw);
    if (user.rol !== "admin") return null;
    return user;
  } catch {
    return null;
  }
}
function setSessionCookie(user) {
  const value = encodeURIComponent(JSON.stringify(user));
  return `${SESSION_KEY}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`;
}
function clearSessionCookie() {
  return `${SESSION_KEY}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
async function loginWithPin(pin) {
  const { data, error } = await supabase.from("usuarios").select("id, nombre, rol").eq("pin", pin).single();
  if (error || !data) {
    return { user: null, error: "PIN inválido" };
  }
  if (data.rol !== "admin") {
    return { user: null, error: "No tienes permisos de administrador" };
  }
  return { user: { id: data.id, nombre: data.nombre, rol: data.rol }, error: null };
}

export { clearSessionCookie as c, getSession as g, loginWithPin as l, setSessionCookie as s };
