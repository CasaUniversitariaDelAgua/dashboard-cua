import { defineMiddleware } from 'astro:middleware';
import { getSession } from './lib/auth';

const protectedPaths = ['/', '/cortes-caja', '/transacciones', '/souvenirs', '/visitantes'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, redirect } = context;

  if (protectedPaths.includes(url.pathname)) {
    const user = getSession(request);
    if (!user) {
      const dest = encodeURIComponent(url.pathname + url.search);
      return redirect(`/login?redirect=${dest}`);
    }
    context.locals.user = user;
  }

  if (url.pathname === '/login' && getSession(request)) {
    return redirect('/');
  }

  return next();
});
