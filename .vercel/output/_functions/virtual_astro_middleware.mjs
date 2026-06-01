import { ap as defineMiddleware, bh as sequence } from './chunks/params-and-props_BMjh1TyE.mjs';
import { g as getSession } from './chunks/auth_Bcuc-ixI.mjs';

const protectedPaths = ["/", "/cortes-caja", "/transacciones", "/souvenirs", "/visitantes"];
const onRequest$1 = defineMiddleware(async (context, next) => {
  const { url, request, redirect } = context;
  if (protectedPaths.includes(url.pathname)) {
    const user = getSession(request);
    if (!user) {
      const dest = encodeURIComponent(url.pathname + url.search);
      return redirect(`/login?redirect=${dest}`);
    }
    context.locals.user = user;
  }
  if (url.pathname === "/login" && getSession(request)) {
    return redirect("/");
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
