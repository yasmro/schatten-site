// A Schatten Button rendered as an anchor.
//
// Why this file exists: `<Button asChild><a …/></Button>` cannot be written in
// an .astro template. Astro hands a framework component its children as one
// pre-rendered static-HTML node, so Radix Slot has no real `<a>` element to
// merge the button props onto and the class chain is lost (verified: the
// output was a bare `<a>`). Inside a .tsx the child is a genuine React
// element and `asChild` works as designed. Rendered statically by Astro — no
// `client:` directive, so nothing ships to the browser.
import { Button, type ButtonProps } from '@yasmro/schatten'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

export interface LinkButtonProps
  extends Pick<ButtonProps, 'variant' | 'size' | 'className'>,
    Pick<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      'href' | 'hrefLang' | 'lang' | 'rel' | 'target' | 'title' | 'aria-current' | 'aria-label'
    > {
  children: ReactNode
}

export default function LinkButton({
  variant,
  size,
  className,
  children,
  ...anchor
}: LinkButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a {...anchor}>{children}</a>
    </Button>
  )
}
