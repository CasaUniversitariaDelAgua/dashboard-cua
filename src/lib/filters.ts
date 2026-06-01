export function getFilters(url: URL) {
  const desde = url.searchParams.get('desde') ?? undefined;
  const hasta = url.searchParams.get('hasta') ?? undefined;
  const metodo = url.searchParams.get('metodo') ?? undefined;
  const usuario = url.searchParams.get('usuario') ?? undefined;
  const busqueda = url.searchParams.get('busqueda') ?? undefined;
  const mes = url.searchParams.get('mes') ?? undefined;
  const año = url.searchParams.get('año') ?? undefined;

  return { desde, hasta, metodo, usuario, busqueda, mes, año };
}

export function buildQueryParams(params: Record<string, string | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const s = search.toString();
  return s ? `?${s}` : '';
}
