import { c as createComponent } from './astro-component_Dpczm9S0.mjs';
import { aX as maybeRenderHead, bb as renderTemplate, a5 as addAttribute } from './params-and-props_BMjh1TyE.mjs';
import { r as renderComponent } from './entrypoint_DgJ-wcCe.mjs';
import { a as $$Icon } from './filters_Tdkp-wPv.mjs';

const $$MetricCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$MetricCard;
  const { title, value, subtitle, icon, trend, trendValue } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="rounded-xl border border-outline bg-surface-elevated p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"> <div class="flex items-start justify-between"> <div class="flex-1"> <p class="text-sm font-semibold uppercase tracking-wider text-on-surface-muted">${title}</p> <p class="mt-2 text-3xl font-bold tracking-tight text-on-surface">${value}</p> ${subtitle && renderTemplate`<p class="mt-1 text-sm text-on-surface-muted">${subtitle}</p>`} ${trend && trendValue && renderTemplate`<p${addAttribute(["mt-2 flex items-center gap-1 text-sm font-medium", [trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-on-surface-muted"]], "class:list")}> <span>${trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}</span> <span>${trendValue}</span> </p>`} </div> ${icon && renderTemplate`<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "size": 20 })} </div>`} </div> </div>`;
}, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/components/MetricCard.astro", void 0);

export { $$MetricCard as $ };
