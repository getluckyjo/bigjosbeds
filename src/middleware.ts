import { defineMiddleware } from 'astro:middleware';

/**
 * Same-origin check for form posts (CSRF protection), replacing Astro's built-in
 * security.checkOrigin so that PayFast's server-to-server ITN can reach its endpoint.
 * The ITN route authenticates requests itself (signature, source IP, server confirmation).
 */
const EXEMPT_PATHS = new Set(['/api/payfast/itn']);
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, isPrerendered } = context;
  if (!isPrerendered && !SAFE_METHODS.has(request.method) && !EXEMPT_PATHS.has(url.pathname)) {
    const origin = request.headers.get('origin');
    const allowed = new Set([url.origin]);
    if (process.env.PUBLIC_SITE_URL) allowed.add(new URL(process.env.PUBLIC_SITE_URL).origin);
    if (!origin || !allowed.has(origin)) {
      return new Response('Cross-site form submissions are forbidden', { status: 403 });
    }
  }
  return next();
});
