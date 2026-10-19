# schatten-site

Public site for [Schatten](https://github.com/yasmro/schatten), the design system — the
brand page, the component index, and the live React proof.
Published at https://yasmro.github.io/schatten-site/.

## How it relates to the library

| Surface | Lives in | Tracks |
|---|---|---|
| This site | `yasmro/schatten-site` (here) | the **npm release** — `@yasmro/schatten` in `package.json` |
| Storybook (the component catalog) | `yasmro/schatten` | the library's `develop` branch |

The site has no workspace link to the library source. It installs `@yasmro/schatten` from
npm like any consumer, so it can only describe what is published. The `/components` list is
generated at build time from the package's per-component CSS subpaths, and the version badge
is the installed package version.

A new library release reaches the site as a Dependabot bump PR. CI runs the gates below; merging
to `main` deploys.

## Authoring rule

The site is built from Schatten's own React components, rendered to static HTML by Astro at
build time (React is shipped only for the live demo). Raw `.st-*` markup appears only where the
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
`/schatten-site/`).
