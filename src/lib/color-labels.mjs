// Label helpers for the Color page swatches. Plain .mjs so the Astro
// components share one formatting of names and hex values.
import { colorHex, listColorValues } from './library.mjs'

const values = listColorValues()

/** `--sumi-500` → `sumi-500`. @param {string} name */
export const short = (name) => name.replace(/^--/, '')

/**
 * Hex of a token, `≈`-marked when the OKLCH value is outside sRGB.
 * @param {string} name - a primitive or `--color-theme-*` name
 * @returns {string}
 */
export function hexOf(name) {
  const value = values.get(name)
  const hex = value ? colorHex(value) : null
  if (!hex) return value ?? ''
  return hex.inGamut ? hex.hex : `≈${hex.hex}`
}

/**
 * The value a name points at, one step down: `--ink-black` → `--sumi-900`.
 * @param {string} name
 * @param {Record<string, string>} aliases
 */
export const aliasLine = (name, aliases) =>
  aliases[name] ? `→ ${short(aliases[name])} · ${hexOf(name)}` : hexOf(name)
