import { c as createComponent } from './astro-component_Dpczm9S0.mjs';
import { ak as createRenderInstruction, aX as maybeRenderHead, bm as unescapeHTML, bb as renderTemplate, a5 as addAttribute, b7 as renderHead, b8 as renderSlot } from './params-and-props_BMjh1TyE.mjs';
import { r as renderComponent } from './entrypoint_DgJ-wcCe.mjs';
/* empty css                 */
import { $ as $$Image } from './_astro_assets_M_CJPWPp.mjs';
import { s as supabase } from './supabase_Du3HrT-j.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Icon;
  const { name, size = 20 } = Astro2.props;
  const cls = Astro2.props.class ?? "";
  const svg = (paths) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}">${paths}</svg>`;
  const icons = {
    chart: svg('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'),
    cash: svg('<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>'),
    receipt: svg('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>'),
    gift: svg('<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>'),
    users: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    "trending-up": svg('<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>'),
    calendar: svg('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    ticket: svg('<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>'),
    "credit-card": svg('<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>'),
    package: svg('<path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>'),
    menu: svg('<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>'),
    "chevron-left": svg('<polyline points="15 18 9 12 15 6"/>')
  };
  return renderTemplate`${icons[name] && renderTemplate`${maybeRenderHead()}<span>${unescapeHTML(icons[name])}</span>`}`;
}, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/components/Icon.astro", void 0);

const favicon16 = new Proxy({"src":"/_astro/favicon-16x16.BtWr-9Dk.png","width":16,"height":16,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Manue/Documents/Developer/dashboard-cua/src/assets/favicon/favicon-16x16.png";
							}
							
							return target[name];
						}
					});

const favicon32 = new Proxy({"src":"/_astro/favicon-32x32.FaRLe1r1.png","width":32,"height":32,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Manue/Documents/Developer/dashboard-cua/src/assets/favicon/favicon-32x32.png";
							}
							
							return target[name];
						}
					});

const appleTouchIcon = new Proxy({"src":"/_astro/apple-touch-icon.Bj5LfBWk.png","width":180,"height":180,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Manue/Documents/Developer/dashboard-cua/src/assets/favicon/apple-touch-icon.png";
							}
							
							return target[name];
						}
					});

const android192 = new Proxy({"src":"/_astro/android-chrome-192x192.Ch8HpB7P.png","width":192,"height":192,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Manue/Documents/Developer/dashboard-cua/src/assets/favicon/android-chrome-192x192.png";
							}
							
							return target[name];
						}
					});

const android512 = new Proxy({"src":"/_astro/android-chrome-512x512.DXL1h9rT.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Manue/Documents/Developer/dashboard-cua/src/assets/favicon/android-chrome-512x512.png";
							}
							
							return target[name];
						}
					});

const logo = new Proxy({"src":"/_astro/icono-favicon.CnNnuV27.webp","width":4779,"height":4479,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Manue/Documents/Developer/dashboard-cua/src/assets/icono-favicon.webp";
							}
							
							return target[name];
						}
					});

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, currentPath, user } = Astro2.props;
  const navItems = [
    { href: "/", label: "Resumen General", icon: "chart" },
    { href: "/cortes-caja", label: "Cortes de Caja", icon: "cash" },
    { href: "/transacciones", label: "Transacciones", icon: "receipt" },
    { href: "/souvenirs", label: "Souvenirs", icon: "gift" },
    { href: "/visitantes", label: "Visitantes", icon: "users" }
  ];
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | Dashboard CUA</title><link rel="icon" type="image/png" sizes="16x16"${addAttribute(favicon16.src, "href")}><link rel="icon" type="image/png" sizes="32x32"${addAttribute(favicon32.src, "href")}><link rel="apple-touch-icon" sizes="180x180"${addAttribute(appleTouchIcon.src, "href")}><link rel="icon" type="image/png" sizes="192x192"${addAttribute(android192.src, "href")}><link rel="icon" type="image/png" sizes="512x512"${addAttribute(android512.src, "href")}>${renderHead()}</head> <body class="min-h-screen bg-background font-sans text-on-background"> <div class="flex min-h-screen"> <!-- Sidebar desktop (static) --> <aside class="hidden md:flex md:w-64 md:flex-col md:shrink-0" style="background: rgba(0,0,0,0.70); backdrop-filter: blur(12px); border-right: 1px solid rgba(255,255,255,0.10);"> <div class="flex h-16 items-center gap-3 px-4 border-b border-white/10"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "Logo CUA", "width": 32, "height": 32 })} <span class="text-sm font-semibold text-on-shell">Dashboard CUA</span> </div> <nav class="flex flex-col gap-1 p-3"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(["flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-150", [
    currentPath === item.href ? "bg-primary text-on-primary" : "text-white/70 hover:bg-white/10 hover:text-white"
  ]], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": item.icon, "size": 18 })} <span>${item.label}</span> </a>`)} </nav> </aside> <!-- Sidebar mobile (fixed overlay) --> <aside id="sidebar-mobile" class="fixed left-0 top-0 z-40 h-full w-64 -translate-x-full transition-transform duration-300 md:hidden" style="background: rgba(0,0,0,0.70); backdrop-filter: blur(12px); border-right: 1px solid rgba(255,255,255,0.10);"> <div class="flex h-16 items-center gap-3 px-4 border-b border-white/10"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "Logo CUA", "width": 28, "height": 28 })} <span class="text-sm font-semibold text-on-shell">Dashboard CUA</span> </div> <nav class="flex flex-col gap-1 p-3"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(["flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-150", [
    currentPath === item.href ? "bg-primary text-on-primary" : "text-white/70 hover:bg-white/10 hover:text-white"
  ]], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": item.icon, "size": 18 })} <span>${item.label}</span> </a>`)} </nav> </aside> <!-- Overlay for mobile --> <div id="sidebar-overlay" class="fixed inset-0 z-30 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden"></div> <!-- Main content --> <div class="flex flex-1 flex-col min-w-0"> <header class="sticky top-0 z-20 flex h-16 items-center gap-4 px-6" style="background: rgba(0,0,0,0.70); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.10);"> <button id="menu-toggle" class="flex h-10 w-10 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white md:hidden"> ${renderComponent($$result, "Icon", $$Icon, { "name": "menu", "size": 20 })} </button> <div class="flex items-center gap-2"> <span class="text-sm font-semibold text-white/70">CUA Dashboard</span> <span class="text-xs text-white/40">/</span> <span class="text-sm font-semibold text-white">${title}</span> </div> <div class="ml-auto flex items-center gap-3"> ${user && renderTemplate`<span class="text-xs font-medium text-white/60">${user.nombre}</span>`} <a href="/logout" class="rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:bg-white/20 hover:text-white">Salir</a> </div> </header> <main class="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden"> ${renderSlot($$result, $$slots["default"])} </main> </div> </div> ${renderScript($$result, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/layouts/Layout.astro", void 0);

const $$FilterBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FilterBar;
  const { filters, basePath = "/" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-wrap items-end gap-3 rounded-xl border border-outline bg-surface-elevated p-4 shadow-sm"> ${filters.map((filter) => renderTemplate`<div class="flex flex-col gap-1"> <label${addAttribute(`filter-${filter.name}`, "for")} class="text-xs font-semibold uppercase tracking-wider text-on-surface-muted">${filter.label}</label> ${filter.type === "select" ? renderTemplate`<select${addAttribute(`filter-${filter.name}`, "id")}${addAttribute(filter.name, "name")} class="h-9 rounded-md border border-outline bg-surface px-3 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20"> ${filter.options?.map((opt) => renderTemplate`<option${addAttribute(opt.value, "value")}${addAttribute(opt.value === filter.value, "selected")}>${opt.label}</option>`)} </select>` : filter.type === "date" ? renderTemplate`<input type="date"${addAttribute(`filter-${filter.name}`, "id")}${addAttribute(filter.name, "name")}${addAttribute(filter.value ?? "", "value")} class="h-9 rounded-md border border-outline bg-surface px-3 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20">` : renderTemplate`<input type="text"${addAttribute(`filter-${filter.name}`, "id")}${addAttribute(filter.name, "name")}${addAttribute(filter.value ?? "", "value")}${addAttribute(filter.placeholder ?? "", "placeholder")} class="h-9 rounded-md border border-outline bg-surface px-3 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20">`} </div>`)} <button type="submit" class="h-9 rounded-md bg-primary px-4 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-strong">Filtrar</button> <a${addAttribute(basePath, "href")} class="flex h-9 items-center rounded-md border border-outline px-4 text-sm font-semibold text-on-surface-muted transition-colors hover:bg-surface">Limpiar</a> </div>`;
}, "C:/Users/Manue/Documents/Developer/dashboard-cua/src/components/FilterBar.astro", void 0);

async function getResumenPorRango(desde, hasta) {
  const inicio = desde ? /* @__PURE__ */ new Date(`${desde}T00:00:00Z`) : /* @__PURE__ */ new Date(0);
  const fin = hasta ? /* @__PURE__ */ new Date(`${hasta}T23:59:59Z`) : /* @__PURE__ */ new Date();
  const toISO = (d) => d.toISOString();
  const [{ count: transacciones }, { data: ventas }, { data: detalles }] = await Promise.all([
    supabase.from("transacciones").select("*", { count: "exact", head: true }).gte("fecha_hora", toISO(inicio)).lte("fecha_hora", toISO(fin)),
    supabase.from("transacciones").select("total, metodo_pago").gte("fecha_hora", toISO(inicio)).lte("fecha_hora", toISO(fin)),
    supabase.from("transaccion_detalles").select("cantidad").gte("transaccion_id", toISO(inicio))
  ]);
  const total = ventas?.reduce((s, t) => s + t.total, 0) ?? 0;
  const count = transacciones ?? 0;
  const totalEfectivo = ventas?.filter((t) => t.metodo_pago === "efectivo").reduce((s, t) => s + t.total, 0) ?? 0;
  const totalTarjeta = ventas?.filter((t) => t.metodo_pago === "tarjeta").reduce((s, t) => s + t.total, 0) ?? 0;
  const productosVendidos = detalles?.reduce((s, d) => s + d.cantidad, 0) ?? 0;
  return {
    ventasHoy: total,
    ventasSemana: total,
    ventasMes: total,
    ticketPromedio: count > 0 ? total / count : 0,
    totalEfectivo,
    totalTarjeta,
    transaccionesHoy: count,
    productosVendidosHoy: productosVendidos
  };
}
async function getResumenGeneral(opts) {
  const hoy = /* @__PURE__ */ new Date();
  hoy.setHours(0, 0, 0, 0);
  const inicioSemana = new Date(hoy);
  inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  if (opts?.desde || opts?.hasta) {
    return getResumenPorRango(opts.desde, opts.hasta);
  }
  const toISO = (d) => d.toISOString();
  const [
    { count: transaccionesHoy },
    ventasHoyData,
    ventasSemanaData,
    ventasMesData,
    detallesHoy
  ] = await Promise.all([
    supabase.from("transacciones").select("*", { count: "exact", head: true }).gte("fecha_hora", toISO(hoy)),
    supabase.from("transacciones").select("total").gte("fecha_hora", toISO(hoy)),
    supabase.from("transacciones").select("total").gte("fecha_hora", toISO(inicioSemana)),
    supabase.from("transacciones").select("total").gte("fecha_hora", toISO(inicioMes)),
    supabase.from("transaccion_detalles").select("cantidad").gte("transaccion_id", toISO(hoy))
  ]);
  const ventasHoy = ventasHoyData.data?.reduce((s, t) => s + t.total, 0) ?? 0;
  const ventasSemana = ventasSemanaData.data?.reduce((s, t) => s + t.total, 0) ?? 0;
  const ventasMes = ventasMesData.data?.reduce((s, t) => s + t.total, 0) ?? 0;
  const countHoy = transaccionesHoy ?? 0;
  const ticketPromedio = countHoy > 0 ? ventasHoy / countHoy : 0;
  const productosVendidosHoy = detallesHoy.data?.reduce((s, d) => s + d.cantidad, 0) ?? 0;
  const { data: ventas } = await supabase.from("transacciones").select("total, metodo_pago").gte("fecha_hora", toISO(hoy));
  const totalEfectivo = ventas?.filter((t) => t.metodo_pago === "efectivo").reduce((s, t) => s + t.total, 0) ?? 0;
  const totalTarjeta = ventas?.filter((t) => t.metodo_pago === "tarjeta").reduce((s, t) => s + t.total, 0) ?? 0;
  return { ventasHoy, ventasSemana, ventasMes, ticketPromedio, totalEfectivo, totalTarjeta, transaccionesHoy: countHoy, productosVendidosHoy };
}
async function getCortesCaja(opts) {
  let query = supabase.from("cortes_caja").select("*, usuario:usuarios(*)");
  if (opts?.desde) query = query.gte("fecha_inicio", `${opts.desde}T00:00:00Z`);
  if (opts?.hasta) query = query.lte("fecha_fin", `${opts.hasta}T23:59:59Z`);
  if (opts?.usuario) query = query.eq("usuario_id", opts.usuario);
  const { data, error } = await query.order("fecha_inicio", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
async function getTransacciones(opts) {
  let query = supabase.from("transacciones").select("*, usuario:usuarios(*), detalles:transaccion_detalles(*, producto:productos(*))");
  if (opts?.desde) query = query.gte("fecha_hora", `${opts.desde}T00:00:00Z`);
  if (opts?.hasta) query = query.lte("fecha_hora", `${opts.hasta}T23:59:59Z`);
  if (opts?.metodo) query = query.eq("metodo_pago", opts.metodo);
  const { data, error } = await query.order("fecha_hora", { ascending: false });
  if (error) throw error;
  let result = data ?? [];
  if (opts?.busqueda) {
    const q = opts.busqueda.toLowerCase();
    result = result.filter(
      (t) => t.id.toLowerCase().includes(q) || t.usuario?.nombre?.toLowerCase().includes(q) || t.detalles?.some((d) => d.producto?.nombre?.toLowerCase().includes(q))
    );
  }
  return result;
}
async function getVentasPorDia(opts) {
  const ahora = /* @__PURE__ */ new Date();
  const m = opts?.mes ?? ahora.getMonth() + 1;
  const a = opts?.año ?? ahora.getFullYear();
  const inicio = opts?.desde ? new Date(opts.desde) : new Date(a, m - 1, 1);
  const fin = opts?.hasta ? /* @__PURE__ */ new Date(opts.hasta + "T23:59:59Z") : new Date(a, m, 0, 23, 59, 59);
  const { data, error } = await supabase.from("transacciones").select("fecha_hora, total").gte("fecha_hora", inicio.toISOString()).lte("fecha_hora", fin.toISOString()).order("fecha_hora", { ascending: true });
  if (error) throw error;
  const mapa = /* @__PURE__ */ new Map();
  for (const t of data ?? []) {
    const dia = t.fecha_hora.split("T")[0];
    const actual = mapa.get(dia) ?? { total: 0, transacciones: 0 };
    actual.total += t.total;
    actual.transacciones += 1;
    mapa.set(dia, actual);
  }
  return Array.from(mapa.entries()).map(([fecha, vals]) => ({ fecha, ...vals }));
}
async function getSouvenirsMasVendidos(opts) {
  let query = supabase.from("transaccion_detalles").select("cantidad, precio_unitario, producto:productos(nombre), transaccion_id");
  if (opts?.desde || opts?.hasta) {
    let txQuery = supabase.from("transacciones").select("id");
    if (opts?.desde) txQuery = txQuery.gte("fecha_hora", `${opts.desde}T00:00:00Z`);
    if (opts?.hasta) txQuery = txQuery.lte("fecha_hora", `${opts.hasta}T23:59:59Z`);
    const { data: txIds } = await txQuery;
    if (txIds && txIds.length > 0) {
      query = query.in("transaccion_id", txIds.map((t) => t.id));
    }
  }
  const { data, error } = await query;
  if (error) throw error;
  const mapa = /* @__PURE__ */ new Map();
  for (const d of data ?? []) {
    if (d.producto && Array.isArray(d.producto)) {
      const p = d.producto[0];
      if (p?.nombre) {
        const actual = mapa.get(p.nombre) ?? { cantidad: 0, total: 0 };
        actual.cantidad += d.cantidad;
        actual.total += d.cantidad * d.precio_unitario;
        mapa.set(p.nombre, actual);
      }
    }
  }
  const limite = opts?.limite;
  return Array.from(mapa.entries()).map(([nombre, vals]) => ({ nombre, ...vals })).sort((a, b) => b.cantidad - a.cantidad).slice(0, limite);
}
async function getTotalVisitantes(opts) {
  const ahora = /* @__PURE__ */ new Date();
  const mesActual = opts?.mes ? parseInt(opts.mes) : ahora.getMonth() + 1;
  const añoActual = opts?.año ? parseInt(opts.año) : ahora.getFullYear();
  const hoy = /* @__PURE__ */ new Date();
  hoy.setHours(0, 0, 0, 0);
  const { count: hoyCount } = await supabase.from("transacciones").select("*", { count: "exact", head: true }).gte("fecha_hora", hoy.toISOString());
  const inicioMes = new Date(añoActual, mesActual - 1, 1);
  const finMes = new Date(añoActual, mesActual, 0, 23, 59, 59);
  const { count: mesCount } = await supabase.from("transacciones").select("*", { count: "exact", head: true }).gte("fecha_hora", inicioMes.toISOString()).lte("fecha_hora", finMes.toISOString());
  const { data: uniqueDays } = await supabase.from("transacciones").select("fecha_hora").gte("fecha_hora", inicioMes.toISOString()).lte("fecha_hora", finMes.toISOString());
  const diasUnicos = new Set(
    (uniqueDays ?? []).map((t) => t.fecha_hora.split("T")[0])
  );
  return {
    visitantes_hoy: hoyCount ?? 0,
    visitantes_mes: mesCount ?? 0,
    dias_con_ventas: diasUnicos.size,
    promedio_por_dia: diasUnicos.size > 0 ? Math.round((mesCount ?? 0) / diasUnicos.size) : 0
  };
}

function getFilters(url) {
  const desde = url.searchParams.get("desde") ?? void 0;
  const hasta = url.searchParams.get("hasta") ?? void 0;
  const metodo = url.searchParams.get("metodo") ?? void 0;
  const usuario = url.searchParams.get("usuario") ?? void 0;
  const busqueda = url.searchParams.get("busqueda") ?? void 0;
  const mes = url.searchParams.get("mes") ?? void 0;
  const año = url.searchParams.get("año") ?? void 0;
  return { desde, hasta, metodo, usuario, busqueda, mes, año };
}

export { $$FilterBar as $, $$Icon as a, $$Layout as b, getFilters as c, getResumenGeneral as d, getSouvenirsMasVendidos as e, getTotalVisitantes as f, getCortesCaja as g, getTransacciones as h, getVentasPorDia as i, renderScript as r };
