// The one React island on the site (#449 candidate A: "React 必須のライブデモ
// だけ islands にする"). Everything around it is static `.st-*` HTML — this
// card is where the React layer proves it is alive: real state, real events,
// real ARIA wiring, imported from `@yasmro/schatten` through the exports map.
//
// Copy arrives as props from the Astro side so the island stays i18n-agnostic.
import { Button, Checkbox, Input, Switch } from '@yasmro/schatten'
import { useState } from 'react'

export interface LiveDemoProps {
  saveLabel: string
  savingDoneLabel: string
  switchLabel: string
  errorToggleLabel: string
  inputPlaceholder: string
}

export default function LiveDemo({
  saveLabel,
  savingDoneLabel,
  switchLabel,
  errorToggleLabel,
  inputPlaceholder,
}: LiveDemoProps) {
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [on, setOn] = useState(true)
  const [isError, setIsError] = useState(false)

  const save = () => {
    setBusy(true)
    setDone(false)
    window.setTimeout(() => {
      setBusy(false)
      setDone(true)
    }, 1200)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div
        style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center', flexWrap: 'wrap' }}
      >
        <Button variant="primary" size="md" isLoading={busy} onClick={save}>
          {done ? savingDoneLabel : saveLabel}
        </Button>
        <Switch label={switchLabel} checked={on} onCheckedChange={setOn} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-3)',
          maxWidth: '20rem',
        }}
      >
        <Checkbox
          label={errorToggleLabel}
          checked={isError}
          onCheckedChange={(v) => setIsError(v === true)}
        />
        <Input placeholder={inputPlaceholder} isError={isError} aria-label={inputPlaceholder} />
      </div>
    </div>
  )
}
