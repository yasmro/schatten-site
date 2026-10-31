# CLAUDE.md — schatten-site

Public site for [Schatten](https://github.com/yasmro/schatten). Astro, deployed to
GitHub Pages. The library is a normal npm dependency (`@yasmro/schatten`); there is no
link to its source — see [README](README.md) for how a release reaches the site.

## Authoring rule: build the site from Schatten's components

The site is a consumer of Schatten and is built the way a consumer would build.
In order of preference:

1. **Schatten React components, rendered statically.** `Text` / `Button` / `Badge` /
   `Card*` / `Callout` / `Separator` / `Icon` / … imported from `@yasmro/schatten` and
   used directly in `.astro` templates. Astro renders them to HTML at build time; add
   a `client:` directive **only** where the component must be interactive in the
   browser (today: `LiveDemo`, `ComponentDemo`, `MotionDemo`). Typography goes through `<Text as=… variant=… size=…>`
   rather than a styled `<h2>` / `<p>`.
2. **Raw `.st-*` markup only where the markup itself is the subject** — the
   "Vanilla HTML" pane of the landing's proof block. Nowhere else.
3. **Bespoke CSS only for what no component covers**: page layout (grid / flex / gaps /
   measure) and the brand page's palette visuals (ramps, swatches, gradation, type
   specimen). Spacing / borders / radii come from Schatten's public tokens
   (`--spacing-*`, `--color-border`, `--radius-control`, …); never write a literal
   colour — except the brand page's OKLCH values, which are the data being shown.
   Do not re-declare font-size / weight / colour on an element a `<Text>` renders.

Two mechanics that follow from "React components inside Astro":

- **`asChild` does not cross the Astro boundary.** Astro hands a React component its
  children as one static-HTML node, so Radix Slot cannot merge Button's props onto an
  `<a>` written in the template (the class chain is silently lost). Link-shaped
  buttons go through [`src/components/LinkButton.tsx`](src/components/LinkButton.tsx),
  where the anchor is a real React child. Plain text / HTML children, named slots
  (`<Fragment slot="description">`), and `class` → `className` all work from `.astro`.
- **Page styles are `<style is:global>`.** Astro's scoped styles only tag elements
  written in the template; the elements a React component renders carry no scope
  attribute. Keep selectors page-prefixed (`.hero__…`, `.brand__…`).

## Page structure

| Route | Content | Source |
|---|---|---|
| `/foundations/` | index of the foundation pages | `src/i18n/foundations.ts` |
| `/foundations/[slug]/` | color, typography, spacing, radius, elevation, motion, z-index | `foundations.ts` + the package (`src/lib/library.mjs`); content in `src/components/foundations/` |
| `/components/` | index by category | installed package + `src/i18n/guides.ts` |
| `/components/[slug]/` | side menu, demo, usage, guide, Storybook icon link | `guides.ts`, `ComponentDemo.tsx`, `GuideExample.tsx` |
| `/brand/` | brand concept | `src/i18n/ui.ts` |

Storybook is for verifying and testing behaviour, so the site links to it but does not
send readers there for usage. A component the package ships without an entry in `guides.ts`
and `ComponentDemo.tsx` fails the build, and so does a semantic colour or colour scale missing
from `foundations.ts`; a library bump that adds one needs the entry.

## Gates

```sh
pnpm lint          # Biome — .astro files are excluded (Biome sees only frontmatter,
                   # so every template-used binding reads as unused); astro check covers them
pnpm check         # astro check
pnpm check:links   # every /components link resolves on the deployed Storybook (network)
pnpm build
```

## Related

- Library conventions (component API, CSS API, tokens): `.claude/rules/` in
  [yasmro/schatten](https://github.com/yasmro/schatten). This site follows them as a
  consumer; it does not restate them.
- Copy lives in `src/i18n/ui.ts` (en + ja, type-checked against each other); per-component
  guides live in `src/i18n/guides.ts` and foundations in `src/i18n/foundations.ts`, each string
  holding both locales. Explain
  mechanisms plainly — what / against what / how — not metaphorically.
