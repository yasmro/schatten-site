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
 * Every component the installed package ships, lv1 and lv2, from two
 * published surfaces that have to agree:
 *
 * - `dist/css/<slug>.css` — one per-component CSS subpath per component. The
 *   slug is the component name lowercased (`dropdownmenu`, `datepicker`), which
 *   is also the slug Storybook derives for `Components/{level}/{Name}`. A
 *   subpath can cover a family (`datecalendar` also styles
 *   `DateRangeCalendar`); the page is named after the family's first member.
 * - the `@yasmro/schatten/components/lv1` and `/lv2` namespaces — give the slug
 *   back its display name (`DropdownMenu`) and its level. `Toast` is imperative
 *   and exports `toast`, so a lowercase-only match is capitalised.
 *
 * @returns {Promise<Array<{ slug: string, name: string, level: 'lv1' | 'lv2' }>>}
 */
export async function listComponents() {
  const slugs = readdirSync(join(distDir(), 'css'))
    .filter((f) => f.endsWith('.css'))
    .map((f) => f.slice(0, -'.css'.length))
    .sort()

  const levels = /** @type {const} */ ({
    lv1: Object.keys(await import('@yasmro/schatten/components/lv1')),
    lv2: Object.keys(await import('@yasmro/schatten/components/lv2')),
  })

  return slugs.map((slug) => {
    for (const level of /** @type {const} */ (['lv1', 'lv2'])) {
      const matches = levels[level].filter((k) => k.toLowerCase() === slug)
      const name =
        matches.find((k) => /^[A-Z]/.test(k)) ??
        (matches[0] ? matches[0][0].toUpperCase() + matches[0].slice(1) : null)
      if (name) return { slug, name, level }
    }
    throw new Error(
      `@yasmro/schatten ships css/${slug}.css but exports no matching lv1 / lv2 component — the package layout changed; update src/lib/library.mjs`,
    )
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

/**
 * Raw value of every primitive color and `--color-theme-*` rung, with aliases
 * followed (`--ink-black` → the value of `--sumi-900`). Read from
 * `core/tokens/primitives.css` and the `:root` block of `semantic.css`, where
 * the default Theme ramp points at a scale.
 *
 * @returns {Map<string, string>} e.g. `--sumi-500` → `oklch(0.58 0.01 250)`
 */
export function listColorValues() {
  const dir = join(distDir(), 'core', 'tokens')
  const strip = (/** @type {string} */ css) => css.replace(/\/\*[\s\S]*?\*\//g, '')
  const primitives = strip(readFileSync(join(dir, 'primitives.css'), 'utf8'))
  const semantic = strip(readFileSync(join(dir, 'semantic.css'), 'utf8'))
  const root = semantic.slice(semantic.indexOf(':root {'))
  const declared = new Map()
  for (const css of [primitives, root.slice(0, root.indexOf('}'))]) {
    for (const [, name, value] of css.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
      if (!declared.has(name)) declared.set(name, value.trim())
    }
  }
  /** @param {string} value @returns {string} */
  const resolve = (value) => {
    const alias = value.match(/^var\((--[\w-]+)\)$/)
    return alias && declared.has(alias[1]) ? resolve(declared.get(alias[1])) : value
  }
  return new Map([...declared].map(([name, value]) => [name, resolve(value)]))
}

/**
 * sRGB hex of an `oklch(L C H)` or `#rrggbb` value, for the labels under the
 * swatches. The swatches themselves paint through `var()`. An OKLCH value
 * outside sRGB is clipped per channel, so `inGamut` says whether the hex is
 * exact; the browser's own gamut mapping can land a little differently.
 *
 * @param {string} value
 * @returns {{ hex: string, inGamut: boolean } | null}
 */
export function colorHex(value) {
  if (/^#[0-9a-f]{6}$/i.test(value)) return { hex: value.toUpperCase(), inGamut: true }
  const m = value.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)$/)
  if (!m) return null
  const L = m[2] ? Number(m[1]) / 100 : Number(m[1])
  const C = Number(m[3])
  const h = (Number(m[4]) * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  const linear = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
  ]
  const inGamut = linear.every((v) => v >= -1e-4 && v <= 1 + 1e-4)
  const hex = linear
    .map((v) => {
      const c = Math.min(1, Math.max(0, v))
      const srgb = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055
      return Math.round(srgb * 255)
        .toString(16)
        .padStart(2, '0')
    })
    .join('')
  return { hex: `#${hex.toUpperCase()}`, inGamut }
}

/**
 * Primitive colors the per-component CSS references directly. The Color page
 * says components use Semantic and Theme only; this keeps that true.
 *
 * @param {Iterable<string>} primitives - names such as `--sumi-500`
 * @returns {string[]} `file: --name` for each direct reference
 */
export function componentPrimitiveRefs(primitives) {
  const names = new Set(primitives)
  const dir = join(distDir(), 'css')
  return readdirSync(dir)
    .filter((f) => f.endsWith('.css'))
    .flatMap((f) =>
      [...readFileSync(join(dir, f), 'utf8').matchAll(/var\((--[\w-]+)/g)]
        .map(([, name]) => name)
        .filter((name) => names.has(name))
        .map((name) => `${f}: ${name}`),
    )
}
