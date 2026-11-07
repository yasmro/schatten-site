// Copies a swatch's CSS custom property on the Color page and confirms it
// with a Schatten Toast. The swatches are static buttons carrying
// `data-copy`; this island listens for their clicks and mounts the Toaster.
//
// Copy arrives as props from the Astro side so the island stays i18n-agnostic.
import { Toaster, toast } from '@yasmro/schatten'
import { useEffect } from 'react'

export interface CopyToastProps {
  copiedLabel: string
  failedLabel: string
}

export default function CopyToast({ copiedLabel, failedLabel }: CopyToastProps) {
  useEffect(() => {
    const onClick = async (event: MouseEvent) => {
      const button = (event.target as Element).closest<HTMLElement>('[data-copy]')
      const token = button?.dataset.copy
      if (!token) return
      try {
        await navigator.clipboard.writeText(token)
        toast({ variant: 'success', title: copiedLabel, description: token, duration: 2000 })
      } catch {
        toast({ variant: 'error', title: failedLabel, description: token })
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [copiedLabel, failedLabel])

  return <Toaster />
}
