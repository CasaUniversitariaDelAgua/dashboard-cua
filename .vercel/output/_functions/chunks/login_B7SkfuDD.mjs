import { c as createComponent } from './astro-component_Dpczm9S0.mjs';
import { b7 as renderHead, bb as renderTemplate } from './params-and-props_BMjh1TyE.mjs';
/* empty css                 */
import { l as loginWithPin, s as setSessionCookie } from './auth_Bcuc-ixI.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const error = Astro2.url.searchParams.get("error");
  const redirectTo = Astro2.url.searchParams.get("redirect") ?? "/";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const pin = formData.get("pin") ?? "";
    const { user, error: loginError } = await loginWithPin(pin);
    if (user) {
      const cookie = setSessionCookie(user);
      Astro2.response.headers.append("Set-Cookie", cookie);
      return Astro2.redirect(redirectTo);
    }
    return Astro2.redirect(`/login?error=${encodeURIComponent(loginError ?? "Error desconocido")}&redirect=${encodeURIComponent(redirectTo)}`);
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Iniciar Sesión | Dashboard CUA</title>${renderHead()}</head> <body class="min-h-screen bg-background font-sans text-on-background"> <div class="flex min-h-screen"> <!-- Left panel: branded orange --> <div class="hidden md:flex md:w-1/2 flex-col items-center justify-center p-12" style="background-color: #fe6e00;"> <div class="max-w-md text-center"> <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20"> <span class="text-3xl font-bold text-white">C</span> </div> <h1 class="text-4xl font-bold text-white mb-2">Dashboard CUA</h1> <p class="text-lg text-white/80">Panel de administración</p> </div> </div> <!-- Right panel: login form --> <div class="flex w-full md:w-1/2 items-center justify-center p-6"> <div class="w-full max-w-sm"> <div class="mb-8 text-center md:hidden"> <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary"> <span class="text-xl font-bold text-on-primary">C</span> </div> <h1 class="text-2xl font-bold text-on-surface">Dashboard CUA</h1> <p class="text-sm text-on-surface-muted">Ingresa tu PIN de administrador</p> </div> <div class="hidden md:block mb-8"> <h1 class="text-2xl font-bold text-on-surface">Iniciar Sesión</h1> <p class="text-sm text-on-surface-muted">Ingresa tu PIN de administrador</p> </div> ${error && renderTemplate`<div class="mb-4 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger"> ${error} </div>`} <form method="POST" class="space-y-4"> <div class="flex flex-col gap-1.5"> <label for="pin" class="text-sm font-semibold text-on-surface">PIN</label> <input type="password" id="pin" name="pin" placeholder="Ingresa tu PIN" autocomplete="off" required class="h-11 rounded-lg border border-outline bg-surface px-4 text-base text-on-surface placeholder:text-on-surface-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/20"> </div> <button type="submit" class="h-11 w-full rounded-lg bg-primary font-semibold text-on-primary transition-colors hover:bg-primary-strong">
Ingresar
</button> </form> </div> </div> </div> </body></html>`;
}, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/login.astro", void 0);

const $$file = "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
