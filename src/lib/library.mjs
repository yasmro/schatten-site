// The site's only view of the library: the installed `@yasmro/schatten`
// package. No source checkout, no workspace link — if it is not published, the
// site cannot see it.
//
// Plain .mjs on purpose: scripts/check-storybook-links.mjs runs under bare
// Node and must derive the SAME component list the pages render.
import { readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)

/** Absolute path of the installed package's `dist/`. */
function distDir() {
  // `./schatten.css` is an unconditional export, so require.resolve sees it
  // even though the JS entries are `import`-only.
  return dirname(require.resolve('@yasmro/schatten/schatten.css'))
}

/** Version of the installed library — what the site describes. */
export function libraryVersion() {
  const pkg = JSON.parse(readFileSync(join(distDir(), '..', 'package.json'), 'utf8'))
  return /** @type {string} */ (pkg.version)
}

/**
 * Every lv1 component the installed package ships, from two published
 * surfaces that have to agree:
 *
 * - `dist/css/<slug>.css` — one per-component CSS subpath per lv1. The slug is
 *   the component name lowercased (`dropdownmenu`, `fieldset`), which is also
 *   the slug Storybook derives for `Components/lv1/{Name}`.
 * - the `@yasmro/schatten/components/lv1` namespace — gives the slug back its
 *   display name (`DropdownMenu`). `Toast` is imperative and exports `toast`,
 *   so a lowercase-only match is capitalised.
 *
 * @returns {Promise<Array<{ slug: string, name: string }>>}
 */
export async function listComponents() {
  const slugs = readdirSync(join(distDir(), 'css'))
    .filter((f) => f.endsWith('.css'))
    .map((f) => f.slice(0, -'.css'.length))
    .sort()

  const lv1 = await import('@yasmro/schatten/components/lv1')
  const exportNames = Object.keys(lv1)

  return slugs.map((slug) => {
    const matches = exportNames.filter((k) => k.toLowerCase() === slug)
    const name =
      matches.find((k) => /^[A-Z]/.test(k)) ??
      (matches[0] ? matches[0][0].toUpperCase() + matches[0].slice(1) : null)
    if (!name) {
      throw new Error(
        `@yasmro/schatten ships css/${slug}.css but exports no matching lv1 component — the package layout changed; update src/lib/library.mjs`,
      )
    }
    return { slug, name }
  })
}
