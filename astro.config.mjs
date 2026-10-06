// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';

// Make .env values available to server code through process.env during dev and build.
// Variables already set in the environment (e.g. on Vercel) take precedence.
const fileEnv = loadEnv(process.env.NODE_ENV === 'production' ? 'production' : 'development', process.cwd(), '');
for (const [key, value] of Object.entries(fileEnv)) process.env[key] ??= value;

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || undefined,
  output: 'static',
  adapter: vercel(),
  security: {
    // Replaced by src/middleware.ts, which applies the same same-origin check to form
    // posts but exempts PayFast's server-to-server notification (ITN) endpoint.
    checkOrigin: false,
  },
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
