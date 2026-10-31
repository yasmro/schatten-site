// Runs the three duration steps side by side: a still page cannot show how they
// differ. Under `prefers-reduced-motion: reduce` the transition is dropped, so
// the demo follows the rule the Motion page states.
//
// Copy arrives as props from the Astro side so the island stays i18n-agnostic.
import { Button, Text } from '@yasmro/schatten'
import { useEffect, useState } from 'react'

export interface MotionDemoProps {
  steps: readonly { name: string; value?: string }[]
  runLabel: string
  resetLabel: string
  reducedNote: string
}

export default function MotionDemo({ steps, runLabel, resetLabel, reducedNote }: MotionDemoProps) {
  const [on, setOn] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <div className="fnd__motion">
      <div>
        <Button variant="secondary" size="sm" onClick={() => setOn((v) => !v)}>
          {on ? resetLabel : runLabel}
        </Button>
      </div>
      {reduced && (
        <Text size="sm" color="muted">
          {reducedNote}
        </Text>
      )}
      {steps.map(({ name, value }) => (
        <div key={name} className="fnd__motion-row">
          <Text as="span" size="xs" color="muted">
            <code>{name}</code>
          </Text>
          <div className="fnd__motion-track">
            <div
              className="fnd__motion-knob"
              style={{
                left: on ? 'calc(100% - var(--spacing-6))' : 0,
                transition: reduced ? 'none' : `left var(${name}) ease`,
              }}
            />
          </div>
          <Text as="span" size="xs" color="subtle">
            {value}
          </Text>
        </div>
      ))}
    </div>
  )
}
