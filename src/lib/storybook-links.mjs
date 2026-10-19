// Single source of truth for every site → Storybook link. Base.astro's header
// and the /components index both go through here; when the Storybook URL
// moves, this is the one file to change.
//
// Plain .mjs on purpose: the drift gate (scripts/check-storybook-links.mjs)
// runs under bare Node and must use the SAME derivation the pages use.

export const STORYBOOK_ORIGIN = 'https://yasmro.github.io/schatten/storybook/'

/**
 * Storybook story id of an lv1 component's autodocs page. Storybook derives
 * it from the title `Components/lv1/{Name}` via sanitize() — lowercase,
 * non-alphanumerics to `-`. Every lv1 name is plain alphanumeric, so the slug
 * is just the lowercased name.
 *
 * @param {string} name - lv1 component name, e.g. "Button", "DropdownMenu"
 * @returns {string}
 */
export function storybookDocsId(name) {
  return `components-lv1-${name.toLowerCase()}--docs`
}

/**
 * Autodocs URL for an lv1 component.
 * @param {string} name
 * @returns {string}
 */
export function storybookDocsUrl(name) {
  return `${STORYBOOK_ORIGIN}?path=/docs/${storybookDocsId(name)}`
}
