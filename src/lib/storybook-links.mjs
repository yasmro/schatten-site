// Single source of truth for every site → Storybook link. Base.astro's header
// and the /components index both go through here; when the Storybook URL
// moves, this is the one file to change.
//
// Plain .mjs on purpose: the drift gate (scripts/check-storybook-links.mjs)
// runs under bare Node and must use the SAME derivation the pages use.

export const STORYBOOK_ORIGIN = 'https://yasmro.github.io/schatten/storybook/'

/**
 * Storybook story id of a component's autodocs page. Storybook derives it
 * from the title `Components/{level}/{Name}` via sanitize() — lowercase,
 * non-alphanumerics to `-`. Every component name is plain alphanumeric, so the
 * slug is just the lowercased name.
 *
 * @param {string} name - component name, e.g. "Button", "DatePicker"
 * @param {'lv1' | 'lv2'} level
 * @returns {string}
 */
export function storybookDocsId(name, level) {
  return `components-${level}-${name.toLowerCase()}--docs`
}

/**
 * Autodocs URL for a component.
 * @param {string} name
 * @param {'lv1' | 'lv2'} level
 * @returns {string}
 */
export function storybookDocsUrl(name, level) {
  return `${STORYBOOK_ORIGIN}?path=/docs/${storybookDocsId(name, level)}`
}
