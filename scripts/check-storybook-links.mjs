#!/usr/bin/env node
// Drift gate for the site → Storybook links. The site lists every lv1 the
// installed package ships and links each to its Storybook docs page; this
// script asserts those pages exist on the DEPLOYED Storybook by reading its
// index.json — the same manifest Storybook's own sidebar renders from.
//
// Storybook tracks the library's develop branch while this site tracks the
// npm release, so the deployed index is a superset of what we link to. A
// story renamed or deleted upstream turns this red instead of shipping a
// dead link.
//
// Run: `pnpm check:links` (CI + Pages deploy). Needs network.
import { listComponents } from '../src/lib/library.mjs'
import { STORYBOOK_ORIGIN, storybookDocsId } from '../src/lib/storybook-links.mjs'

const indexUrl = new URL('index.json', STORYBOOK_ORIGIN)
const res = await fetch(indexUrl)
if (!res.ok) {
  console.error(`check-storybook-links: ${indexUrl} → HTTP ${res.status}`)
  process.exit(1)
}
const index = await res.json()
const ids = new Set(Object.keys(index.entries ?? {}))

const components = await listComponents()
const failures = components
  .map((c) => ({ ...c, id: storybookDocsId(c.name) }))
  .filter((c) => !ids.has(c.id))
  .map((c) => `${c.name}: story id "${c.id}" not in ${indexUrl}`)

if (failures.length > 0) {
  console.error(`check-storybook-links: ${failures.length} dead link(s)\n`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}

console.log(
  `check-storybook-links: OK — ${components.length} components resolve on ${STORYBOOK_ORIGIN}`,
)
