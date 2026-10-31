# schatten-site

Public site for [Schatten](https://github.com/yasmro/schatten), the design system — the
foundations (design tokens), the component index, a guide page per component, and the brand
page.
Published at https://yasmro.github.io/schatten-site/.

## How it relates to the library

| Surface | Lives in | Tracks |
|---|---|---|
| This site | `yasmro/schatten-site` (here) | the **npm release** — `@yasmro/schatten` in `package.json` |
| Storybook (behaviour verification and tests) | `yasmro/schatten` | the library's `develop` branch |

The site has no workspace link to the library source. It installs `@yasmro/schatten` from
npm like any consumer, so it can only describe what is published. The `/components` list is
generated at build time from the package's per-component CSS subpaths, `/foundations` from its
token manifest and token CSS, and the version badge is the installed package version. A component
without a guide (`src/i18n/guides.ts`) and demo (`src/components/ComponentDemo.tsx`), or a semantic
colour or colour scale without an entry in `src/i18n/foundations.ts`, fails the build, so a library
release that adds one needs the entry before it can merge.

A new library release reaches the site as a Dependabot bump PR. CI runs the gates below; merging
to `main` deploys.

## PR previews

Each PR is built and published to `https://yasmro.github.io/schatten-site/pr-preview/<number>/`;
a comment on the PR links to it, and closing the PR removes it. Previews sit next to the site on
the `gh-pages` branch, which is what Pages serves. PRs from forks and Dependabot get no preview:
their workflow token cannot write to the branch.

## Authoring rule

The site is built from Schatten's own React components, rendered to static HTML by Astro at
build time (React is shipped only for the live demos). Raw `.st-*` markup appears only where the
markup is the thing being shown; bespoke CSS covers layout and the brand page's palette
visuals. Details and the two Astro-specific mechanics are in [CLAUDE.md](CLAUDE.md).

## Gates

```sh
pnpm lint          # Biome
pnpm check         # astro check (types)
pnpm check:links   # every component's Storybook link resolves on the deployed Storybook (network)
pnpm build
```

## Develop

```sh
pnpm install
pnpm dev
```

`SITE_BASE` is the subpath the site is served under (unset locally = `/`; the Pages deploy sets
`/schatten-site/`, a PR preview `/schatten-site/pr-preview/<number>/`).
