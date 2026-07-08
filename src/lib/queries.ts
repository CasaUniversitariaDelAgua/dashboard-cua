import { supabase } from './supabase';
import type { CorteCaja, Transaccion, SouvenirVendido, VentaPorDia } from './types';

// Obtiene los componentes de la fecha ajustados a la zona horaria de America/Mexico_City
export function getMexicoCityDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find(p => p.type === type)!.value;
  
  return {
    year: parseInt(getPart('year')),
    month: parseInt(getPart('month')),
    day: parseInt(getPart('day')),
    hour: parseInt(getPart('hour')),
    minute: parseInt(getPart('minute')),
    second: parseInt(getPart('second'))
  };
}

// Retorna el rango de inicio y fin en UTC correspondiente al día actual en Mexico City
// Mexico City está en UTC-6 de forma permanente
function getMexicoCityTodayRange() {
  const { year, month, day } = getMexicoCityDateParts();
  const start = new Date(Date.UTC(year, month - 1, day, 6, 0, 0)).toISOString();
  const end = new Date(Date.UTC(year, month - 1, day + 1, 5, 59, 59, 999)).toISOString();
  return { start, end };
}

async function getResumenPorRango(desde?: string, hasta?: string) {
  let inicio: string;
  let fin: string;

  if (desde) {
    const [y, m, d] = desde.split('-').map(Number);
    inicio = new Date(Date.UTC(y, m - 1, d, 6, 0, 0)).toISOString();
  } else {
    inicio = new Date(0).toISOString();
  }

  if (hasta) {
    const [y, m, d] = hasta.split('-').map(Number);
    fin = new Date(Date.UTC(y, m - 1, d + 1, 5, 59, 59, 999)).toISOString();
  } else {
    const { end } = getMexicoCityTodayRange();
    fin = end;
  }

  const [{ data: ventas }, { data: detalles }] = await Promise.all([
    supabase.from('transacciones').select('total, metodo_pago')
      .gte('fecha_hora', inicio).lte('fecha_hora', fin),
    supabase.from('transaccion_detalles').select('cantidad, transaccion:transacciones!inner(fecha_hora)')
      .gte('transaccion.fecha_hora', inicio).lte('transaccion.fecha_hora', fin),
  ]);

  const total = ventas?.reduce((s, t) => s + t.total, 0) ?? 0;
  const count = ventas?.length ?? 0;
  const totalEfectivo = ventas?.filter(t => t.metodo_pago === 'efectivo' || t.metodo_pago === '0').reduce((s, t) => s + t.total, 0) ?? 0;
  const totalTarjeta = ventas?.filter(t => t.metodo_pago === 'tarjeta' || t.metodo_pago === '1').reduce((s, t) => s + t.total, 0) ?? 0;
  const productosVendidos = detalles?.reduce((s, d) => s + d.cantidad, 0) ?? 0;

  return {
    ventasHoy: total, ventasSemana: total, ventasMes: total,
    ticketPromedio: count > 0 ? total / count : 0,
    totalEfectivo, totalTarjeta, transaccionesHoy: count, productosVendidosHoy: productosVendidos,
  };
}

export async function getResumenGeneral(opts?: { desde?: string; hasta?: string }) {
  if (opts?.desde || opts?.hasta) {
    return getResumenPorRango(opts.desde, opts.hasta);
  }

  const { start: hoyInicio, end: hoyFin } = getMexicoCityTodayRange();

  const mxParts = getMexicoCityDateParts();
  
  // Calcular inicioSemana en zona horaria local y convertir a UTC
  const todayDate = new Date(Date.UTC(mxParts.year, mxParts.month - 1, mxParts.day, 6, 0, 0));
  const dayOfWeek = todayDate.getUTCDay();
  const inicioSemanaDate = new Date(todayDate);
  inicioSemanaDate.setUTCDate(inicioSemanaDate.getUTCDate() - dayOfWeek);
  const inicioSemana = inicioSemanaDate.toISOString();

  // Calcular inicioMes en zona horaria local y convertir a UTC
  const inicioMes = new Date(Date.UTC(mxParts.year, mxParts.month - 1, 1, 6, 0, 0)).toISOString();

  const [
    ventasHoyData,
    ventasSemanaData,
    ventasMesData,
    detallesHoy,
  ] = await Promise.all([
    supabase.from('transacciones').select('total, metodo_pago').gte('fecha_hora', hoyInicio).lte('fecha_hora', hoyFin),
    supabase.from('transacciones').select('total').gte('fecha_hora', inicioSemana).lte('fecha_hora', hoyFin),
    supabase.from('transacciones').select('total').gte('fecha_hora', inicioMes).lte('fecha_hora', hoyFin),
    supabase.from('transaccion_detalles').select('cantidad, transaccion:transacciones!inner(fecha_hora)')
      .gte('transaccion.fecha_hora', hoyInicio).lte('transaccion.fecha_hora', hoyFin),
  ]);

  const ventasHoyList = ventasHoyData.data ?? [];
  const ventasHoy = ventasHoyList.reduce((s, t) => s + t.total, 0);
  const ventasSemana = ventasSemanaData.data?.reduce((s, t) => s + t.total, 0) ?? 0;
  const ventasMes = ventasMesData.data?.reduce((s, t) => s + t.total, 0) ?? 0;
  const countHoy = ventasHoyList.length;
  const ticketPromedio = countHoy > 0 ? ventasHoy / countHoy : 0;
  const productosVendidosHoy = detallesHoy.data?.reduce((s, d) => s + d.cantidad, 0) ?? 0;

  const totalEfectivo = ventasHoyList.filter(t => t.metodo_pago === 'efectivo' || t.metodo_pago === '0').reduce((s, t) => s + t.total, 0);
  const totalTarjeta = ventasHoyList.filter(t => t.metodo_pago === 'tarjeta' || t.metodo_pago === '1').reduce((s, t) => s + t.total, 0);

  return { ventasHoy, ventasSemana, ventasMes, ticketPromedio, totalEfectivo, totalTarjeta, transaccionesHoy: countHoy, productosVendidosHoy };
}

export async function getCortesCaja(opts?: { desde?: string; hasta?: string; usuario?: string }): Promise<CorteCaja[]> {
  let query = supabase
    .from('cortes_caja')
    .select('*, usuario:usuarios(*)');

  if (opts?.desde) {
    const [y, m, d] = opts.desde.split('-').map(Number);
    const inicio = new Date(Date.UTC(y, m - 1, d, 6, 0, 0)).toISOString();
    query = query.gte('fecha_inicio', inicio);
  }
  if (opts?.hasta) {
    const [y, m, d] = opts.hasta.split('-').map(Number);
    const fin = new Date(Date.UTC(y, m - 1, d + 1, 5, 59, 59, 999)).toISOString();
    query = query.lte('fecha_fin', fin);
  }
  if (opts?.usuario) query = query.eq('usuario_id', opts.usuario);

  const { data, error } = await query.order('fecha_inicio', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getTransacciones(opts?: { desde?: string; hasta?: string; metodo?: string; busqueda?: string }): Promise<Transaccion[]> {
  let query = supabase
    .from('transacciones')
    .select('*, usuario:usuarios(*), detalles:transaccion_detalles(*, producto:productos(*))');

  if (opts?.desde) {
    const [y, m, d] = opts.desde.split('-').map(Number);
    const inicio = new Date(Date.UTC(y, m - 1, d, 6, 0, 0)).toISOString();
    query = query.gte('fecha_hora', inicio);
  }
  if (opts?.hasta) {
    const [y, m, d] = opts.hasta.split('-').map(Number);
    const fin = new Date(Date.UTC(y, m - 1, d + 1, 5, 59, 59, 999)).toISOString();
    query = query.lte('fecha_hora', fin);
  }
  if (opts?.metodo) {
    if (opts.metodo === 'efectivo') {
      query = query.or('metodo_pago.eq.efectivo,metodo_pago.eq.0');
    } else if (opts.metodo === 'tarjeta') {
      query = query.or('metodo_pago.eq.tarjeta,metodo_pago.eq.1');
    }
  }

  const { data, error } = await query.order('fecha_hora', { ascending: false });
  if (error) throw error;

  let result = data ?? [];

  if (opts?.busqueda) {
    const q = opts.busqueda.toLowerCase();
    result = result.filter(t =>
      t.id.toLowerCase().includes(q) ||
      t.usuario?.nombre?.toLowerCase().includes(q) ||
      t.detalles?.some((d: { producto: { nombre: string; }; }) => d.producto?.nombre?.toLowerCase().includes(q))
    );
  }

  return result;
}

export async function getVentasPorDia(opts?: { desde?: string; hasta?: string; mes?: number | string; año?: number | string }): Promise<VentaPorDia[]> {
  let query = supabase
    .from('transacciones')
    .select('fecha_hora, total, detalles:transaccion_detalles(cantidad, producto:productos(tipo))');

  const mesVal = (opts?.mes && opts.mes !== 'todos') ? parseInt(String(opts.mes)) : undefined;
  const añoVal = (opts?.año && opts.año !== 'todos') ? parseInt(String(opts.año)) : undefined;

  if (opts?.desde) {
    const [y, m, d] = opts.desde.split('-').map(Number);
    const inicio = new Date(Date.UTC(y, m - 1, d, 6, 0, 0)).toISOString();
    query = query.gte('fecha_hora', inicio);
  }
  if (opts?.hasta) {
    const [y, m, d] = opts.hasta.split('-').map(Number);
    const fin = new Date(Date.UTC(y, m - 1, d + 1, 5, 59, 59, 999)).toISOString();
    query = query.lte('fecha_hora', fin);
  }

  if (!opts?.desde && !opts?.hasta) {
    if (añoVal !== undefined) {
      if (mesVal !== undefined) {
        const ultimoDia = new Date(Date.UTC(añoVal, mesVal, 0)).getUTCDate();
        const inicioStr = new Date(Date.UTC(añoVal, mesVal - 1, 1, 6, 0, 0)).toISOString();
        const finStr = new Date(Date.UTC(añoVal, mesVal - 1, ultimoDia + 1, 5, 59, 59, 999)).toISOString();
        query = query.gte('fecha_hora', inicioStr).lte('fecha_hora', finStr);
      } else {
        const inicioStr = new Date(Date.UTC(añoVal, 0, 1, 6, 0, 0)).toISOString();
        const finStr = new Date(Date.UTC(añoVal, 11, 31 + 1, 5, 59, 59, 999)).toISOString();
        query = query.gte('fecha_hora', inicioStr).lte('fecha_hora', finStr);
      }
    } else if (mesVal !== undefined) {
      const mxParts = getMexicoCityDateParts();
      const añoUso = mxParts.year;
      const ultimoDia = new Date(Date.UTC(añoUso, mesVal, 0)).getUTCDate();
      const inicioStr = new Date(Date.UTC(añoUso, mesVal - 1, 1, 6, 0, 0)).toISOString();
      const finStr = new Date(Date.UTC(añoUso, mesVal - 1, ultimoDia + 1, 5, 59, 59, 999)).toISOString();
      query = query.gte('fecha_hora', inicioStr).lte('fecha_hora', finStr);
    }
  }

  const { data, error } = await query.order('fecha_hora', { ascending: true });
  if (error) throw error;

  const mapa = new Map<string, { total: number; transacciones: number; visitantes: number }>();
  for (const t of data ?? []) {
    const txDate = new Date(t.fecha_hora);
    const parts = getMexicoCityDateParts(txDate);
    const dia = `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`;
    
    const actual = mapa.get(dia) ?? { total: 0, transacciones: 0, visitantes: 0 };
    actual.total += t.total;
    actual.transacciones += 1;

    let visitantesEnTx = 0;
    if (t.detalles) {
      const detallesList = Array.isArray(t.detalles) ? t.detalles : [t.detalles];
      for (const d of detallesList) {
        const prod = Array.isArray(d.producto) ? d.producto[0] : d.producto;
        if (prod && prod.tipo === 'entrada') {
          visitantesEnTx += d.cantidad;
        }
      }
    }
    actual.visitantes += visitantesEnTx;
    mapa.set(dia, actual);
  }

  return Array.from(mapa.entries()).map(([fecha, vals]) => ({ fecha, ...vals }));
}

export async function getSouvenirsMasVendidos(opts?: { desde?: string; hasta?: string; limite?: number }) {
  let query = supabase
    .from('transaccion_detalles')
    .select('cantidad, precio_unitario, producto:productos!inner(nombre, tipo), transaccion:transacciones!inner(fecha_hora)')
    .eq('producto.tipo', 'souvenir');

  if (opts?.desde) {
    const [y, m, d] = opts.desde.split('-').map(Number);
    const inicio = new Date(Date.UTC(y, m - 1, d, 6, 0, 0)).toISOString();
    query = query.gte('transaccion.fecha_hora', inicio);
  }
  if (opts?.hasta) {
    const [y, m, d] = opts.hasta.split('-').map(Number);
    const fin = new Date(Date.UTC(y, m - 1, d + 1, 5, 59, 59, 999)).toISOString();
    query = query.lte('transaccion.fecha_hora', fin);
  }

  const { data, error } = await query;
  if (error) throw error;

  const mapa = new Map<string, { cantidad: number; total: number }>();
  for (const d of data ?? []) {
    const p = Array.isArray(d.producto) ? d.producto[0] : d.producto;
    if (p?.nombre) {
      const actual = mapa.get(p.nombre) ?? { cantidad: 0, total: 0 };
      actual.cantidad += d.cantidad;
      actual.total += d.cantidad * d.precio_unitario;
      mapa.set(p.nombre, actual);
    }
  }

  const limite = opts?.limite ?? 20;
  return Array.from(mapa.entries())
    .map(([nombre, vals]) => ({ nombre, ...vals }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, limite);
}

export async function getTotalVisitantes(opts?: { mes?: string; año?: string }) {
  const { start: hoyInicio, end: hoyFin } = getMexicoCityTodayRange();

  // 1. Visitantes Hoy
  const { data: hoyData } = await supabase
    .from('transaccion_detalles')
    .select('cantidad, transaccion:transacciones!inner(fecha_hora), producto:productos!inner(tipo)')
    .eq('producto.tipo', 'entrada')
    .gte('transaccion.fecha_hora', hoyInicio)
    .lte('transaccion.fecha_hora', hoyFin);

  const visitantesHoy = (hoyData ?? []).reduce((sum, item) => sum + item.cantidad, 0);

  // 2. Visitantes Acumulado Histórico (Todo el tiempo)
  const { data: acumuladoData } = await supabase
    .from('transaccion_detalles')
    .select('cantidad, producto:productos!inner(tipo)')
    .eq('producto.tipo', 'entrada');

  const visitantesAcumulado = (acumuladoData ?? []).reduce((sum, item) => sum + item.cantidad, 0);

  // 3. Visitantes Período
  let periodQuery = supabase
    .from('transaccion_detalles')
    .select('cantidad, transaccion:transacciones!inner(fecha_hora), producto:productos!inner(nombre, tipo)')
    .eq('producto.tipo', 'entrada');

  const mesActual = (opts?.mes && opts.mes !== 'todos') ? parseInt(opts.mes) : undefined;
  const añoActual = (opts?.año && opts.año !== 'todos') ? parseInt(opts.año) : undefined;

  if (añoActual !== undefined) {
    if (mesActual !== undefined) {
      const ultimoDia = new Date(Date.UTC(añoActual, mesActual, 0)).getUTCDate();
      const inicioMes = new Date(Date.UTC(añoActual, mesActual - 1, 1, 6, 0, 0)).toISOString();
      const finMes = new Date(Date.UTC(añoActual, mesActual - 1, ultimoDia + 1, 5, 59, 59, 999)).toISOString();
      periodQuery = periodQuery.gte('transaccion.fecha_hora', inicioMes).lte('transaccion.fecha_hora', finMes);
    } else {
      const inicioAño = new Date(Date.UTC(añoActual, 0, 1, 6, 0, 0)).toISOString();
      const finAño = new Date(Date.UTC(añoActual, 11, 31 + 1, 5, 59, 59, 999)).toISOString();
      periodQuery = periodQuery.gte('transaccion.fecha_hora', inicioAño).lte('transaccion.fecha_hora', finAño);
    }
  } else if (mesActual !== undefined) {
    const mxParts = getMexicoCityDateParts();
    const añoUso = mxParts.year;
    const ultimoDia = new Date(Date.UTC(añoUso, mesActual, 0)).getUTCDate();
    const inicioMes = new Date(Date.UTC(añoUso, mesActual - 1, 1, 6, 0, 0)).toISOString();
    const finMes = new Date(Date.UTC(añoUso, mesActual - 1, ultimoDia + 1, 5, 59, 59, 999)).toISOString();
    periodQuery = periodQuery.gte('transaccion.fecha_hora', inicioMes).lte('transaccion.fecha_hora', finMes);
  }

  const { data: mesData } = await periodQuery;

  let visitantesPeriodo = 0;
  const diasUnicos = new Set<string>();
  const tiposEntrada: Record<string, number> = {};

  for (const item of mesData ?? []) {
    visitantesPeriodo += item.cantidad;
    const trans = item.transaccion as any;
    if (trans && !Array.isArray(trans) && trans.fecha_hora) {
      const txDate = new Date(trans.fecha_hora);
      const parts = getMexicoCityDateParts(txDate);
      const dia = `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`;
      diasUnicos.add(dia);
    }

    const prod = item.producto as any;
    if (prod && !Array.isArray(prod) && prod.nombre) {
      const nombre = prod.nombre;
      tiposEntrada[nombre] = (tiposEntrada[nombre] || 0) + item.cantidad;
    }
  }

  return {
    visitantes_hoy: visitantesHoy,
    visitantes_mes: visitantesPeriodo,
    visitantes_acumulado: visitantesAcumulado,
    dias_con_ventas: diasUnicos.size,
    promedio_por_dia: diasUnicos.size > 0 ? Math.round(visitantesPeriodo / diasUnicos.size) : 0,
    desglose: Object.entries(tiposEntrada)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad),
  };
}
