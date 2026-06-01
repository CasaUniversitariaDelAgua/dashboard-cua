export interface Usuario {
  id: string;
  nombre: string;
  rol: string;
  pin: string;
}

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  tipo: string;
  stock: number;
  activo: boolean;
}

export interface CorteCaja {
  id: string;
  usuario_id: string | null;
  fecha_inicio: string;
  fecha_fin: string;
  total_efectivo: number;
  total_tarjeta: number;
  observaciones: string | null;
  usuario?: Usuario | null;
}

export interface Transaccion {
  id: string;
  fecha_hora: string;
  total: number;
  metodo_pago: string;
  monto_recibido: number | null;
  cambio: number | null;
  usuario_id: string | null;
  usuario?: Usuario | null;
  detalles?: TransaccionDetalle[];
}

export interface TransaccionDetalle {
  id: number;
  transaccion_id: string | null;
  producto_id: string | null;
  cantidad: number;
  precio_unitario: number;
  producto?: Producto | null;
}

export interface ResumenGeneral {
  ventas_hoy: number;
  ventas_semana: number;
  ventas_mes: number;
  ticket_promedio: number;
  total_efectivo: number;
  total_tarjeta: number;
  transacciones_hoy: number;
  productos_vendidos_hoy: number;
}

export interface SouvenirVendido {
  nombre: string;
  cantidad: number;
  total: number;
}

export interface VentaPorDia {
  fecha: string;
  total: number;
  transacciones: number;
}
