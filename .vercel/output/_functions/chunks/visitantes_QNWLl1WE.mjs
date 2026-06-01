import { c as createComponent } from './astro-component_Dpczm9S0.mjs';
import { bb as renderTemplate, aX as maybeRenderHead } from './params-and-props_BMjh1TyE.mjs';
import { r as renderComponent } from './entrypoint_DiP58Xrh.mjs';
import { c as getFilters, f as getTotalVisitantes, i as getVentasPorDia, b as $$Layout, $ as $$FilterBar } from './filters_pp6TZWQd.mjs';
import { $ as $$MetricCard } from './MetricCard_CL07l78T.mjs';

const $$Visitantes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Visitantes;
  const filters = getFilters(Astro2.url);
  const hoy = /* @__PURE__ */ new Date();
  const mes = filters.mes ? parseInt(filters.mes) : hoy.getMonth() + 1;
  const año = filters.año ? parseInt(filters.año) : hoy.getFullYear();
  const visitantes = await getTotalVisitantes({ mes: String(mes), año: String(año) });
  const ventasPorDia = await getVentasPorDia({ mes, año });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Visitantes", "currentPath": "/visitantes", "user": Astro2.locals.user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div> <h1 class="text-2xl font-bold text-on-surface">Total de Visitantes</h1> <p class="text-sm text-on-surface-muted">Métrica de afluencia basada en transacciones</p> </div> <form method="GET" action="/visitantes"> ${renderComponent($$result2, "FilterBar", $$FilterBar, { "basePath": "/visitantes", "filters": [
    {
      label: "Mes",
      name: "mes",
      type: "select",
      value: filters.mes ?? String(mes),
      options: Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: new Date(2024, i).toLocaleString("es-MX", { month: "long" }) }))
    },
    {
      label: "Año",
      name: "año",
      type: "select",
      value: filters.año ?? String(año),
      options: [año - 1, año, año + 1].map((a) => ({ value: String(a), label: String(a) }))
    }
  ] })} </form> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"> ${renderComponent($$result2, "MetricCard", $$MetricCard, { "title": "Visitantes Hoy", "value": visitantes.visitantes_hoy, "icon": "users", "subtitle": "Transacciones del día" })} ${renderComponent($$result2, "MetricCard", $$MetricCard, { "title": "Visitantes del Mes", "value": visitantes.visitantes_mes, "icon": "calendar", "subtitle": "Transacciones del mes" })} ${renderComponent($$result2, "MetricCard", $$MetricCard, { "title": "Días con Ventas", "value": visitantes.dias_con_ventas, "icon": "calendar", "subtitle": "Días únicos con actividad" })} ${renderComponent($$result2, "MetricCard", $$MetricCard, { "title": "Promedio por Día", "value": visitantes.promedio_por_dia, "icon": "chart", "subtitle": "Visitantes / día activo" })} </div> <div class="rounded-xl border border-outline bg-surface-elevated p-6 shadow-sm"> <h3 class="mb-4 text-lg font-bold text-on-surface">Actividad Diaria (${new Date(año, mes - 1).toLocaleString("es-MX", { month: "long", year: "numeric" })})</h3> ${ventasPorDia.length > 0 ? renderTemplate`<div class="space-y-2"> ${ventasPorDia.map((dia) => {
    const maxTransacciones = Math.max(...ventasPorDia.map((d) => d.transacciones));
    const porcentaje = maxTransacciones > 0 ? dia.transacciones / maxTransacciones * 100 : 0;
    return renderTemplate`<div class="flex items-center gap-3"> <span class="w-24 text-xs font-medium text-on-surface-muted shrink-0">${dia.fecha.split("-").slice(1).join("/")}</span> <div class="flex-1 h-6 rounded-md overflow-hidden" style="background-color: rgba(254, 110, 0, 0.08);"> <div class="h-full rounded-md flex items-center justify-end px-2 text-xs font-semibold text-white transition-all duration-300" style="background-color: #fe6e00; width: \${porcentaje}%; opacity: \${0.3 + (porcentaje / 100) * 0.7}"> ${porcentaje > 15 && renderTemplate`<span>${dia.transacciones}</span>`} </div> </div> <span class="w-16 text-right text-xs font-semibold text-on-surface shrink-0">${dia.transacciones}</span> </div>`;
  })} </div>` : renderTemplate`<p class="text-center text-on-surface-muted py-8">No hay datos de actividad para este mes</p>`} </div> <div class="rounded-xl border border-outline bg-surface-elevated p-6 shadow-sm"> <h3 class="mb-4 text-lg font-bold text-on-surface">Acerca de esta métrica</h3> <p class="text-sm text-on-surface-muted leading-relaxed">
El total de visitantes se calcula basándose en el número de transacciones registradas.
        Cada transacción representa un cliente atendido. Esta métrica asume que una transacción
        equivale a un visitante. Para una medición más precisa, se recomienda integrar un
        contador de visitantes o sistema de entrada adicional.
</p> </div> </div> ` })}`;
}, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/visitantes.astro", void 0);

const $$file = "C:/Users/Manue/Documents/Developer/dashboard-cua/src/pages/visitantes.astro";
const $$url = "/visitantes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Visitantes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
