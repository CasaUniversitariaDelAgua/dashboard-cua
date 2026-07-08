import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { satisfaccion, comentarios, recomendacion } = body;

    if (!satisfaccion || recomendacion === undefined) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos obligatorios: satisfaccion y recomendacion' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { error } = await supabase.from('encuestas').insert({
      satisfaccion,
      comentarios: comentarios || null,
      recomendacion: parseInt(recomendacion)
    });

    if (error) {
      console.error('Error al insertar encuesta:', error);
      return new Response(
        JSON.stringify({ error: 'Error interno de la base de datos' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Error en API encuestas:', err);
    return new Response(
      JSON.stringify({ error: 'Formato de solicitud no válido o error de servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
