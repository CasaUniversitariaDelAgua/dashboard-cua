import { c as createComponent } from './astro-component_Dpczm9S0.mjs';
import { bb as renderTemplate, aX as maybeRenderHead, a5 as addAttribute } from './params-and-props_BMjh1TyE.mjs';
import { r as renderComponent } from './entrypoint_DiP58Xrh.mjs';
import { c as getFilters, h as getTransacciones, b as $$Layout, $ as $$FilterBar } from './filters_pp6TZWQd.mjs';

const $$Transacciones = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Transacciones;
  const filters = getFilters(Astro2.url);
  const transacciones = await getTransacciones({
    desde: filters.desde,
    hasta: filters.hasta,
    metodo: filters.metodo,
    busqueda: filters.busqueda
  });
  const totalVentas = transacciones.reduce((s, t) => s + t.total, 0);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Transacciones", "currentPath": "/transacciones", "user": Astro2.locals.user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div> <h1 class="text-2xl font-bold text-on-surface">Detalle de Transacciones</h1> <p class="text-sm text-on-surface-muted">${transacciones.length} transacciones encontradas</p> </div> <form method="GET" action="/transacciones"> ${renderComponent($$result2, "FilterBar", $$FilterBar, { "basePath": "/transacciones", "filters": [
    { label: "Desde", name: "desde", type: "date", value: filters.desde },
    { label: "Hasta", name: "hasta", type: "date", value: filters.hasta },
    {
      label: "Método",
      name: "metodo",
      type: "select",
      value: filters.metodo,
      options: [
        { value: "", label: "Todos" },
        { value: "efectivo", label: "Efectivo" },
        { value: "tarjeta", label: "Tarjeta" }
      ]
    },
    { label: "Buscar", name: "busqueda", type: "text", value: filters.busqueda, placeholder: "ID, usuario o producto" }
  ] })} </form> <div class="grid grid-cols-1 gap-4 sm:grid-cols-3"> <div class="rounded-xl border border-outline bg-surface-elevated p-6 shadow-sm"> <p class="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">Transacciones Hoy</p> <p class="mt-2 text-3xl font-bold text-on-surface">${transacciones.length}</p> </div> <div class="rounded-xl border border-outline bg-surface-elevated p-6 shadow-sm"> <p class="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">Total Ventas</p> <p class="mt-2 text-3xl font-bold text-on-surface">$${totalVentas.toFixed(2)}</p> </div> <div class="rounded-xl border border-outline bg-surface-elevated p-6 shadow-sm"> <p class="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">Ticket Promedio</p> <p class="mt-2 text-3xl font-bold text-on-surface">$${transacciones.length > 0 ? (totalVentas / transacciones.length).toFixed(2) : "0.00"}</p> </div> </div> <div class="overflow-x-auto rounded-xl border border-outline bg-surface-elevated shadow-sm"> <table class="w-full text-sm"> <thead> <tr class="h-12 border-b border-outline bg-primary/5"> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">Hora</th> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">Usuario</th> <th class="px-4 text-right text-xs font-semibold uppercase tracking-wider text-primary-strong">Total</th> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">Método</th> <th class="px-4 text-right text-xs font-semibold uppercase tracking-wider text-primary-strong">Recibido</th> <th class="px-4 text-right text-xs font-semibold uppercase tracking-wider text-primary-strong">Cambio</th> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">Productos</th> </tr> </thead> <tbody> ${transacciones.length === 0 && renderTemplate`<tr><td colspan="7" class="px-4 py-8 text-center text-on-surface-muted">No hay transacciones este día</td></tr>`} ${transacciones.map((tx) => renderTemplate`<tr class="border-b border-outline transition-colors hover:bg-surface-soft/50"> <td class="px-4 py-3 font-medium text-on-surface">${new Date(tx.fecha_hora).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}</td> <td class="px-4 py-3 text-on-surface">${tx.usuario?.nombre ?? "—"}</td> <td class="px-4 py-3 text-right font-bold text-on-surface">$${tx.total.toFixed(2)}</td> <td class="px-4 py-3"> <span${addAttribute(["inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold", [
    tx.metodo_pago === "efectivo" ? "bg-success/10 text-success" : "bg-info/10 text-info"
  ]], "class:list")}>${tx.metodo_pago}</span> </td> <td class="px-4 py-3 text-right text-on-surface-muted">${tx.monto_recibido ? `$${tx.monto_recibido.toFixed(2)}` : "—"}</td> <td class="px-4 py-3 text-right text-on-surface-muted">${tx.cambio ? `$${tx.cambio.toFixed(2)}` : "—"}</td> <td class="px-4 py-3 text-on-surface-muted max-w-40 truncate"> ${tx.detalles?.map((d) => `${d.cantidad}x ${d.producto?.nombre ?? ""}`).join(", ") ?? "—"} </td> </tr>`)} </tbody> </table> </div> </div> ` })}`;
}, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/transacciones.astro", void 0);

const $$file = "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/transacciones.astro";
const $$url = "/transacciones";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Transacciones,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
