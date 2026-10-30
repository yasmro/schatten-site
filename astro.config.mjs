import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

// Two delivery layers, dogfooded on one site: every page is static `.st-*`
// markup + the published `schatten.css` by default, and React mounts ONLY as
// islands where a live component demo needs it (the /components page). Both
// layers consume `@yasmro/schatten` from npm through its exports map — the
// same path a real consumer takes. There is no workspace link to the library
// source: the site can only describe what is published, by construction.
//
// SITE_BASE: subpath the site is served under. Unset locally (= '/'); the
// Pages deploy sets `/schatten-site/`, a PR preview its own subpath. Internal
// links resolve through localePath() (src/i18n/ui.ts), which reads
// import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://yasmro.github.io',
  base: process.env.SITE_BASE || '/',
  integrations: [react()],
})
