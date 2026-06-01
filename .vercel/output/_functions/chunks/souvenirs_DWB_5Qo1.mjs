import { c as createComponent } from './astro-component_Dpczm9S0.mjs';
import { bb as renderTemplate, aX as maybeRenderHead } from './params-and-props_BMjh1TyE.mjs';
import { r as renderComponent } from './entrypoint_DiP58Xrh.mjs';
import { c as getFilters, e as getSouvenirsMasVendidos, b as $$Layout, $ as $$FilterBar } from './filters_pp6TZWQd.mjs';

const $$Souvenirs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Souvenirs;
  const filters = getFilters(Astro2.url);
  const souvenirs = await getSouvenirsMasVendidos({ desde: filters.desde, hasta: filters.hasta, limite: 20 });
  const totalCantidad = souvenirs.reduce((s, p) => s + p.cantidad, 0);
  const totalVentas = souvenirs.reduce((s, p) => s + p.total, 0);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Souvenirs", "currentPath": "/souvenirs", "user": Astro2.locals.user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div> <h1 class="text-2xl font-bold text-on-surface">Souvenirs Más Vendidos</h1> <p class="text-sm text-on-surface-muted">Productos con mayor demanda</p> </div> <form method="GET" action="/souvenirs"> ${renderComponent($$result2, "FilterBar", $$FilterBar, { "basePath": "/souvenirs", "filters": [
    { label: "Desde", name: "desde", type: "date", value: filters.desde },
    { label: "Hasta", name: "hasta", type: "date", value: filters.hasta }
  ] })} </form> <div class="grid grid-cols-1 gap-4 sm:grid-cols-3"> <div class="rounded-xl border border-outline bg-surface-elevated p-6 shadow-sm"> <p class="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">Total Vendidos</p> <p class="mt-2 text-3xl font-bold text-on-surface">${totalCantidad}</p> </div> <div class="rounded-xl border border-outline bg-surface-elevated p-6 shadow-sm"> <p class="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">Ingresos Totales</p> <p class="mt-2 text-3xl font-bold text-on-surface">$${totalVentas.toFixed(2)}</p> </div> <div class="rounded-xl border border-outline bg-surface-elevated p-6 shadow-sm"> <p class="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">Productos Distintos</p> <p class="mt-2 text-3xl font-bold text-on-surface">${souvenirs.length}</p> </div> </div> <div class="overflow-x-auto rounded-xl border border-outline bg-surface-elevated shadow-sm"> <table class="w-full text-sm"> <thead> <tr class="h-12 border-b border-outline bg-primary/5"> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">#</th> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">Producto</th> <th class="px-4 text-right text-xs font-semibold uppercase tracking-wider text-primary-strong">Cantidad Vendida</th> <th class="px-4 text-right text-xs font-semibold uppercase tracking-wider text-primary-strong">Ingreso Total</th> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">% del Total</th> </tr> </thead> <tbody> ${souvenirs.length === 0 && renderTemplate`<tr><td colspan="5" class="px-4 py-8 text-center text-on-surface-muted">No hay ventas de souvenirs registradas</td></tr>`} ${souvenirs.map((item, i) => renderTemplate`<tr class="border-b border-outline transition-colors hover:bg-surface-soft/50"> <td class="px-4 py-3 text-on-surface-muted">${i + 1}</td> <td class="px-4 py-3 font-medium text-on-surface">${item.nombre}</td> <td class="px-4 py-3 text-right font-bold text-on-surface">${item.cantidad}</td> <td class="px-4 py-3 text-right font-medium text-on-surface">$${item.total.toFixed(2)}</td> <td class="px-4 py-3"> <div class="flex items-center gap-2"> <div class="h-2 w-24 rounded-full bg-surface-soft overflow-hidden"> <div class="h-full rounded-full bg-primary" style="width: \${totalCantidad > 0 ? (item.cantidad / totalCantidad * 100) : 0}%"></div> </div> <span class="text-xs text-on-surface-muted">${totalCantidad > 0 ? (item.cantidad / totalCantidad * 100).toFixed(1) : 0}%</span> </div> </td> </tr>`)} </tbody> </table> </div> </div> ` })}`;
}, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/souvenirs.astro", void 0);

const $$file = "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/souvenirs.astro";
const $$url = "/souvenirs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Souvenirs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
