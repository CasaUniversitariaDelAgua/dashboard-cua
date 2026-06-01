import { supabase } from './supabase';
import type { CorteCaja, Transaccion, SouvenirVendido, VentaPorDia } from './types';

async function getResumenPorRango(desde?: string, hasta?: string) {
  const inicio = desde ? new Date(`${desde}T00:00:00Z`) : new Date(0);
  const fin = hasta ? new Date(`${hasta}T23:59:59Z`) : new Date();

  const toISO = (d: Date) => d.toISOString();

  const [{ count: transacciones }, { data: ventas }, { data: detalles }] = await Promise.all([
    supabase.from('transacciones').select('*', { count: 'exact', head: true })
      .gte('fecha_hora', toISO(inicio)).lte('fecha_hora', toISO(fin)),
    supabase.from('transacciones').select('total, metodo_pago')
      .gte('fecha_hora', toISO(inicio)).lte('fecha_hora', toISO(fin)),
    supabase.from('transaccion_detalles').select('cantidad')
      .gte('transaccion_id', toISO(inicio)),
  ]);

  const total = ventas?.reduce((s, t) => s + t.total, 0) ?? 0;
  const count = transacciones ?? 0;
  const totalEfectivo = ventas?.filter(t => t.metodo_pago === 'efectivo').reduce((s, t) => s + t.total, 0) ?? 0;
  const totalTarjeta = ventas?.filter(t => t.metodo_pago === 'tarjeta').reduce((s, t) => s + t.total, 0) ?? 0;
  const productosVendidos = detalles?.reduce((s, d) => s + d.cantidad, 0) ?? 0;

  return {
    ventasHoy: total, ventasSemana: total, ventasMes: total,
    ticketPromedio: count > 0 ? total / count : 0,
    totalEfectivo, totalTarjeta, transaccionesHoy: count, productosVendidosHoy: productosVendidos,
  };
}

export async function getResumenGeneral(opts?: { desde?: string; hasta?: string }) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const inicioSemana = new Date(hoy);
  inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

  if (opts?.desde || opts?.hasta) {
    return getResumenPorRango(opts.desde, opts.hasta);
  }

  const toISO = (d: Date) => d.toISOString();

  const [
    { count: transaccionesHoy },
    ventasHoyData,
    ventasSemanaData,
    ventasMesData,
    detallesHoy,
  ] = await Promise.all([
    supabase.from('transacciones').select('*', { count: 'exact', head: true }).gte('fecha_hora', toISO(hoy)),
    supabase.from('transacciones').select('total').gte('fecha_hora', toISO(hoy)),
    supabase.from('transacciones').select('total').gte('fecha_hora', toISO(inicioSemana)),
    supabase.from('transacciones').select('total').gte('fecha_hora', toISO(inicioMes)),
    supabase.from('transaccion_detalles').select('cantidad')
      .gte('transaccion_id', toISO(hoy)),
  ]);

  const ventasHoy = ventasHoyData.data?.reduce((s, t) => s + t.total, 0) ?? 0;
  const ventasSemana = ventasSemanaData.data?.reduce((s, t) => s + t.total, 0) ?? 0;
  const ventasMes = ventasMesData.data?.reduce((s, t) => s + t.total, 0) ?? 0;
  const countHoy = transaccionesHoy ?? 0;
  const ticketPromedio = countHoy > 0 ? ventasHoy / countHoy : 0;
  const productosVendidosHoy = detallesHoy.data?.reduce((s, d) => s + d.cantidad, 0) ?? 0;

  const { data: ventas } = await supabase.from('transacciones').select('total, metodo_pago').gte('fecha_hora', toISO(hoy));
  const totalEfectivo = ventas?.filter(t => t.metodo_pago === 'efectivo').reduce((s, t) => s + t.total, 0) ?? 0;
  const totalTarjeta = ventas?.filter(t => t.metodo_pago === 'tarjeta').reduce((s, t) => s + t.total, 0) ?? 0;

  return { ventasHoy, ventasSemana, ventasMes, ticketPromedio, totalEfectivo, totalTarjeta, transaccionesHoy: countHoy, productosVendidosHoy };
}

export async function getCortesCaja(opts?: { desde?: string; hasta?: string; usuario?: string }): Promise<CorteCaja[]> {
  let query = supabase
    .from('cortes_caja')
    .select('*, usuario:usuarios(*)');

  if (opts?.desde) query = query.gte('fecha_inicio', `${opts.desde}T00:00:00Z`);
  if (opts?.hasta) query = query.lte('fecha_fin', `${opts.hasta}T23:59:59Z`);
  if (opts?.usuario) query = query.eq('usuario_id', opts.usuario);

  const { data, error } = await query.order('fecha_inicio', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getTransacciones(opts?: { desde?: string; hasta?: string; metodo?: string; busqueda?: string }): Promise<Transaccion[]> {
  let query = supabase
    .from('transacciones')
    .select('*, usuario:usuarios(*), detalles:transaccion_detalles(*, producto:productos(*))');

  if (opts?.desde) query = query.gte('fecha_hora', `${opts.desde}T00:00:00Z`);
  if (opts?.hasta) query = query.lte('fecha_hora', `${opts.hasta}T23:59:59Z`);
  if (opts?.metodo) query = query.eq('metodo_pago', opts.metodo);

  const { data, error } = await query.order('fecha_hora', { ascending: false });
  if (error) throw error;

  let result = data ?? [];

  if (opts?.busqueda) {
    const q = opts.busqueda.toLowerCase();
    result = result.filter(t =>
      t.id.toLowerCase().includes(q) ||
      t.usuario?.nombre?.toLowerCase().includes(q) ||
      t.detalles?.some(d => d.producto?.nombre?.toLowerCase().includes(q))
    );
  }

  return result;
}

export async function getVentasPorDia(opts?: { desde?: string; hasta?: string; mes?: number; año?: number }): Promise<VentaPorDia[]> {
  const ahora = new Date();
  const m = opts?.mes ?? ahora.getMonth() + 1;
  const a = opts?.año ?? ahora.getFullYear();
  const inicio = opts?.desde ? new Date(opts.desde) : new Date(a, m - 1, 1);
  const fin = opts?.hasta ? new Date(opts.hasta + 'T23:59:59Z') : new Date(a, m, 0, 23, 59, 59);

  const { data, error } = await supabase
    .from('transacciones')
    .select('fecha_hora, total')
    .gte('fecha_hora', inicio.toISOString())
    .lte('fecha_hora', fin.toISOString())
    .order('fecha_hora', { ascending: true });

  if (error) throw error;

  const mapa = new Map<string, { total: number; transacciones: number }>();
  for (const t of data ?? []) {
    const dia = t.fecha_hora.split('T')[0];
    const actual = mapa.get(dia) ?? { total: 0, transacciones: 0 };
    actual.total += t.total;
    actual.transacciones += 1;
    mapa.set(dia, actual);
  }

  return Array.from(mapa.entries()).map(([fecha, vals]) => ({ fecha, ...vals }));
}

export async function getSouvenirsMasVendidos(opts?: { desde?: string; hasta?: string; limite?: number }) {
  let query = supabase
    .from('transaccion_detalles')
    .select('cantidad, precio_unitario, producto:productos(nombre), transaccion_id');

  if (opts?.desde || opts?.hasta) {
    let txQuery = supabase.from('transacciones').select('id');
    if (opts?.desde) txQuery = txQuery.gte('fecha_hora', `${opts.desde}T00:00:00Z`);
    if (opts?.hasta) txQuery = txQuery.lte('fecha_hora', `${opts.hasta}T23:59:59Z`);
    const { data: txIds } = await txQuery;
    if (txIds && txIds.length > 0) {
      query = query.in('transaccion_id', txIds.map(t => t.id));
    }
  }

  const { data, error } = await query;
  if (error) throw error;

  const mapa = new Map<string, { cantidad: number; total: number }>();
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

  const limite = opts?.limite ?? 20;
  return Array.from(mapa.entries())
    .map(([nombre, vals]) => ({ nombre, ...vals }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, limite);
}

export async function getTotalVisitantes(opts?: { mes?: string; año?: string }) {
  const ahora = new Date();
  const mesActual = opts?.mes ? parseInt(opts.mes) : ahora.getMonth() + 1;
  const añoActual = opts?.año ? parseInt(opts.año) : ahora.getFullYear();

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const { count: hoyCount } = await supabase
    .from('transacciones')
    .select('*', { count: 'exact', head: true })
    .gte('fecha_hora', hoy.toISOString());

  const inicioMes = new Date(añoActual, mesActual - 1, 1);
  const finMes = new Date(añoActual, mesActual, 0, 23, 59, 59);

  const { count: mesCount } = await supabase
    .from('transacciones')
    .select('*', { count: 'exact', head: true })
    .gte('fecha_hora', inicioMes.toISOString())
    .lte('fecha_hora', finMes.toISOString());

  const { data: uniqueDays } = await supabase
    .from('transacciones')
    .select('fecha_hora')
    .gte('fecha_hora', inicioMes.toISOString())
    .lte('fecha_hora', finMes.toISOString());

  const diasUnicos = new Set(
    (uniqueDays ?? []).map(t => t.fecha_hora.split('T')[0])
  );

  return {
    visitantes_hoy: hoyCount ?? 0,
    visitantes_mes: mesCount ?? 0,
    dias_con_ventas: diasUnicos.size,
    promedio_por_dia: diasUnicos.size > 0 ? Math.round((mesCount ?? 0) / diasUnicos.size) : 0,
  };
}
