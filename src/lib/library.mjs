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

/**
 * Public design tokens of the installed package, grouped by prefix. Names come
 * from `schatten.manifest.json`, the published contract; `value` is read from
 * `dist/core/tokens/*.css` and is only for display, so it is missing for tokens
 * those files do not declare (`--font-sans`). Order follows the token files,
 * which run from small to large. `--st-*` is component-internal and left out,
 * except the `--st-duration-*` scale the Motion page shows.
 *
 * @returns {Record<string, Array<{ name: string, value?: string }>>}
 */
export function listTokens() {
  const dir = join(distDir(), 'core', 'tokens')
  const declared = new Map()
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.css'))) {
    const css = readFileSync(join(dir, file), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
    for (const [, name, value] of css.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
      // base.css mirrors tokens as `--x: var(--x)` for @theme; that says nothing.
      if (!declared.has(name) && value.trim() !== `var(${name})`) declared.set(name, value.trim())
    }
  }

  const order = [...declared.keys()]
  const rank = (/** @type {string} */ name) => {
    const i = order.indexOf(name)
    return i === -1 ? order.length : i
  }
  /** Follows `var(--x)` aliases, so `--motion-quick` reads `100ms`. */
  const resolve = (/** @type {string | undefined} */ value) => {
    const alias = value?.match(/^var\((--[\w-]+)\)$/)
    return alias && declared.has(alias[1]) ? resolve(declared.get(alias[1])) : value
  }

  const manifest = JSON.parse(readFileSync(join(distDir(), 'schatten.manifest.json'), 'utf8'))
  /** @type {Record<string, Array<{ name: string, value?: string }>>} */
  const groups = {}
  for (const name of manifest.cssVariables.toSorted(
    (/** @type {string} */ a, /** @type {string} */ b) => rank(a) - rank(b),
  )) {
    const group = name.slice(2).split('-')[0]
    if (group === 'st' && !name.startsWith('--st-duration-')) continue
    groups[group] ??= []
    groups[group].push({ name, value: resolve(declared.get(name)) })
  }
  return groups
}

/**
 * Primitive colour scales, from `core/tokens/primitives.css`. These are not in
 * the manifest, but they ship in `schatten.css`, so `var(--sumi-500)` resolves.
 *
 * @returns {Record<string, string[]>} scale name → steps, e.g. `sumi` → `['50', …]`
 */
export function listColorScales() {
  const css = readFileSync(join(distDir(), 'core', 'tokens', 'primitives.css'), 'utf8')
  /** @type {Record<string, string[]>} */
  const scales = {}
  for (const [, name, step] of css.matchAll(/^\s*--([a-z]+)-(\d+):/gm)) {
    scales[name] ??= []
    if (!scales[name].includes(step)) scales[name].push(step)
  }
  return scales
}

/**
 * Primitive aliases, such as `--ink-black` → `--sumi-900`, from
 * `core/tokens/primitives.css`. Tokens with a value of their own are absent.
 *
 * @returns {Record<string, string>}
 */
export function listPrimitiveAliases() {
  const css = readFileSync(join(distDir(), 'core', 'tokens', 'primitives.css'), 'utf8')
  return Object.fromEntries(
    [...css.matchAll(/^\s*(--[\w-]+):\s*var\((--[\w-]+)\);/gm)].map(([, name, target]) => [
      name,
      target,
    ]),
  )
}

/**
 * Seasonal theme ramps, read from `themes/seasonal/themes.css` in file order.
 * The selectors are `:root`-only, so a theme cannot be previewed by setting
 * `data-theme` on an element; the page paints the values themselves.
 *
 * @returns {Array<{ id: string, steps: Array<{ step: string, value: string }> }>}
 */
export function listSeasons() {
  const css = readFileSync(join(distDir(), 'themes', 'seasonal', 'themes.css'), 'utf8')
  return [...css.matchAll(/data-theme="([^"]+)"\]\s*\{([^}]*)\}/g)].map(([, id, body]) => ({
    id,
    steps: [...body.matchAll(/--color-theme-(\d+):\s*([^;]+);/g)].map(([, step, value]) => ({
      step,
      value: value.trim(),
    })),
  }))
}

/**
 * What each semantic colour points at, per mode, from `core/tokens/semantic.css`:
 * `:root` is light, and `.dark` overrides it. Aliases of other semantic colours
 * are followed within the mode, so `value` is a primitive or a `--color-theme-*`
 * rung. Both are fixed across modes, so painting `var(light)` next to
 * `var(dark)` shows the two modes side by side whichever is active.
 *
 * @returns {Record<string, { light: string, dark: string }>} keyed by `--color-*`
 */
export function listColorReferences() {
  const css = readFileSync(join(distDir(), 'core', 'tokens', 'semantic.css'), 'utf8').replace(
    /\/\*[\s\S]*?\*\//g,
    '',
  )
  /** @param {string} selector */
  const block = (selector) => {
    const body = css.slice(css.indexOf(`${selector} {`))
    return new Map(
      [...body.slice(0, body.indexOf('}')).matchAll(/(--[\w-]+):\s*var\((--[\w-]+)\);/g)].map(
        ([, name, target]) => [name, target],
      ),
    )
  }
  const light = block(':root')
  const dark = new Map([...light, ...block('.dark')])
  /**
   * @param {Map<string, string>} mode
   * @param {string} name
   * @returns {string}
   */
  const follow = (mode, name) => {
    const target = mode.get(name) ?? name
    return target.startsWith('--color-') && !target.startsWith('--color-theme-')
      ? follow(mode, target)
      : target
  }
  return Object.fromEntries(
    [...light.keys()].map((name) => [
      name,
      { light: follow(light, name), dark: follow(dark, name) },
    ]),
  )
}
