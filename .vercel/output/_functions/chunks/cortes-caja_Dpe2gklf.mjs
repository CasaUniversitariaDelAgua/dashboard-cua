import { c as createComponent } from './astro-component_Dpczm9S0.mjs';
import { bb as renderTemplate, aX as maybeRenderHead } from './params-and-props_BMjh1TyE.mjs';
import { r as renderComponent } from './entrypoint_DgJ-wcCe.mjs';
import { c as getFilters, g as getCortesCaja, b as $$Layout, $ as $$FilterBar } from './filters_Tdkp-wPv.mjs';
import { $ as $$MetricCard } from './MetricCard_D6HXnTUb.mjs';

const $$CortesCaja = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CortesCaja;
  const filters = getFilters(Astro2.url);
  const cortes = await getCortesCaja({ desde: filters.desde, hasta: filters.hasta, usuario: filters.usuario });
  const totalEfectivo = cortes.reduce((s, c) => s + c.total_efectivo, 0);
  const totalTarjeta = cortes.reduce((s, c) => s + c.total_tarjeta, 0);
  const totalGeneral = totalEfectivo + totalTarjeta;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cortes de Caja", "currentPath": "/cortes-caja", "user": Astro2.locals.user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div> <h1 class="text-2xl font-bold text-on-surface">Historial de Cortes de Caja</h1> <p class="text-sm text-on-surface-muted">Todos los cortes registrados en el sistema</p> </div> <form method="GET" action="/cortes-caja"> ${renderComponent($$result2, "FilterBar", $$FilterBar, { "basePath": "/cortes-caja", "filters": [
    { label: "Desde", name: "desde", type: "date", value: filters.desde },
    { label: "Hasta", name: "hasta", type: "date", value: filters.hasta },
    { label: "Usuario ID", name: "usuario", type: "text", value: filters.usuario, placeholder: "ID del usuario" }
  ] })} </form> <div class="grid grid-cols-1 gap-4 sm:grid-cols-3"> ${renderComponent($$result2, "MetricCard", $$MetricCard, { "title": "Total Efectivo", "value": `$${totalEfectivo.toFixed(2)}`, "icon": "cash" })} ${renderComponent($$result2, "MetricCard", $$MetricCard, { "title": "Total Tarjeta", "value": `$${totalTarjeta.toFixed(2)}`, "icon": "credit-card" })} ${renderComponent($$result2, "MetricCard", $$MetricCard, { "title": "Total General", "value": `$${totalGeneral.toFixed(2)}`, "icon": "cash" })} </div> <div class="overflow-x-auto rounded-xl border border-outline bg-surface-elevated shadow-sm"> <table class="w-full text-sm"> <thead> <tr class="h-12 border-b border-outline bg-primary/5"> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">Fecha Inicio</th> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">Fecha Fin</th> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">Usuario</th> <th class="px-4 text-right text-xs font-semibold uppercase tracking-wider text-primary-strong">Efectivo</th> <th class="px-4 text-right text-xs font-semibold uppercase tracking-wider text-primary-strong">Tarjeta</th> <th class="px-4 text-right text-xs font-semibold uppercase tracking-wider text-primary-strong">Total</th> <th class="px-4 text-left text-xs font-semibold uppercase tracking-wider text-primary-strong">Observaciones</th> </tr> </thead> <tbody> ${cortes.length === 0 && renderTemplate`<tr><td colspan="7" class="px-4 py-8 text-center text-on-surface-muted">No hay cortes de caja registrados</td></tr>`} ${cortes.map((corte) => renderTemplate`<tr class="border-b border-outline transition-colors hover:bg-surface-soft/50"> <td class="px-4 py-3 font-medium text-on-surface">${new Date(corte.fecha_inicio).toLocaleString("es-MX")}</td> <td class="px-4 py-3 text-on-surface-muted">${new Date(corte.fecha_fin).toLocaleString("es-MX")}</td> <td class="px-4 py-3 text-on-surface">${corte.usuario?.nombre ?? "—"}</td> <td class="px-4 py-3 text-right font-medium text-success">$${corte.total_efectivo.toFixed(2)}</td> <td class="px-4 py-3 text-right font-medium text-info">$${corte.total_tarjeta.toFixed(2)}</td> <td class="px-4 py-3 text-right font-bold text-on-surface">$${(corte.total_efectivo + corte.total_tarjeta).toFixed(2)}</td> <td class="px-4 py-3 text-on-surface-muted max-w-48 truncate">${corte.observaciones ?? "—"}</td> </tr>`)} </tbody> </table> </div> </div> ` })}`;
}, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/cortes-caja.astro", void 0);

const $$file = "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/cortes-caja.astro";
const $$url = "/cortes-caja";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CortesCaja,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
