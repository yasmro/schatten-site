// One side of a guide's Do / Don't panel (DoDont.astro), built from the real
// components and rendered statically by Astro. Panels whose component needs a browser to show
// the point do not belong here; the guide text carries those rules.
import {
  Badge,
  Button,
  Callout,
  Field,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@yasmro/schatten'
import type { ReactNode } from 'react'
import type { ExampleId } from '../i18n/guides'
import type { DemoCopy } from '../i18n/ui'

type Side = 'do' | 'dont'

function amounts(copy: DemoCopy, align: 'start' | 'end') {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">{copy.tableItem}</TableHead>
          <TableHead scope="col" align={align}>
            {copy.tableAmount}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell align={align}>¥12,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-002</TableCell>
          <TableCell align={align}>¥980</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

const examples: Record<ExampleId, Record<Side, (copy: DemoCopy) => ReactNode>> = {
  'button-priority': {
    do: (copy) => (
      <>
        <Button variant="primary">{copy.save}</Button>
        <Button variant="secondary">{copy.draft}</Button>
        <Button variant="tertiary">{copy.cancel}</Button>
      </>
    ),
    dont: (copy) => (
      <>
        <Button variant="primary">{copy.save}</Button>
        <Button variant="primary">{copy.draft}</Button>
        <Button variant="primary">{copy.cancel}</Button>
      </>
    ),
  },
  'button-destructive': {
    do: (copy) => (
      <>
        <Button variant="destructive">{copy.delete}</Button>
        <Button variant="secondary">{copy.cancel}</Button>
      </>
    ),
    dont: (copy) => (
      <>
        <Button variant="primary">{copy.delete}</Button>
        <Button variant="secondary">{copy.cancel}</Button>
      </>
    ),
  },
  'badge-tone': {
    do: (copy) => (
      <>
        <Badge variant="success">{copy.status}</Badge>
        <Badge variant="neutral">{copy.draft}</Badge>
      </>
    ),
    dont: (copy) => (
      <>
        <Badge variant="error">{copy.status}</Badge>
        <Badge variant="info">{copy.draft}</Badge>
      </>
    ),
  },
  'callout-tone': {
    do: (copy) => (
      <Callout variant="warning" title={copy.noticeTitle} description={copy.noticeBody} />
    ),
    dont: (copy) => (
      <Callout variant="success" title={copy.noticeTitle} description={copy.noticeBody} />
    ),
  },
  'field-label': {
    do: (copy) => (
      <Field label={copy.email}>
        <Input type="email" />
      </Field>
    ),
    dont: (copy) => <Input type="email" placeholder={copy.email} aria-label={copy.email} />,
  },
  'field-error': {
    do: (copy) => (
      <Field label={copy.email} error={copy.errorMessage}>
        <Input type="email" defaultValue="jane@" />
      </Field>
    ),
    dont: (copy) => (
      <Field label={copy.email} isError>
        <Input type="email" defaultValue="jane@" />
      </Field>
    ),
  },
  'table-align': {
    do: (copy) => amounts(copy, 'end'),
    dont: (copy) => amounts(copy, 'start'),
  },
}

export default function GuideExample({
  id,
  side,
  copy,
}: {
  id: ExampleId
  side: Side
  copy: DemoCopy
}) {
  return examples[id][side](copy)
}
