// The live example at the top of each /components/[slug] page. Every demo
// hydrates, so each one behaves as the React component it shows.
//
// Copy arrives as props from the Astro side so the island stays i18n-agnostic.
import {
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  FieldSet,
  Icon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  toast,
} from '@yasmro/schatten'
import { Plus, Search } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import type { DemoCopy } from '../i18n/ui'

function DialogDemo({ copy }: { copy: DemoCopy }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        {copy.delete}
      </Button>
      <Dialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={copy.dialogTitle}
        description={copy.dialogBody}
        actionButton={{ label: copy.delete, onClick: () => setIsOpen(false) }}
        cancelButton={{ label: copy.cancel }}
      />
    </>
  )
}

const demos: Record<string, (copy: DemoCopy) => ReactNode> = {
  avatar: () => (
    <>
      <Avatar size="sm" alt="Jane Doe" fallback="JD" />
      <Avatar size="md" alt="Jane Doe" fallback="JD" />
      <Avatar size="lg" alt="Jane Doe" fallback="JD" />
    </>
  ),
  badge: (copy) => (
    <>
      <Badge variant="neutral">{copy.draft}</Badge>
      <Badge variant="success">{copy.status}</Badge>
      <Badge variant="info" appearance="outline">
        {copy.draft}
      </Badge>
      <Badge variant="error" appearance="solid">
        {copy.delete}
      </Badge>
    </>
  ),
  button: (copy) => (
    <>
      <Button variant="primary">{copy.save}</Button>
      <Button variant="secondary">{copy.cancel}</Button>
      <Button variant="tertiary" icon={Plus}>
        {copy.draft}
      </Button>
      <Button variant="destructive">{copy.delete}</Button>
    </>
  ),
  callout: (copy) => (
    <Callout variant="warning" title={copy.noticeTitle} description={copy.noticeBody} />
  ),
  card: (copy) => (
    <Card>
      <CardHeader>
        <CardTitle>{copy.cardTitle}</CardTitle>
        <CardDescription>{copy.cardBody}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="success">{copy.status}</Badge>
      </CardContent>
    </Card>
  ),
  checkbox: (copy) => <Checkbox label={copy.terms} defaultChecked />,
  dialog: (copy) => <DialogDemo copy={copy} />,
  dropdownmenu: (copy) => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary">{copy.open}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>{copy.menuRename}</DropdownMenuItem>
        <DropdownMenuItem>{copy.menuDuplicate}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">{copy.delete}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  field: (copy) => (
    <Field label={copy.email} description={copy.hint} required>
      <Input type="email" />
    </Field>
  ),
  fieldset: (copy) => (
    <FieldSet legend={copy.name} direction="row" wrap>
      <Field label={copy.name} flexGrow={1}>
        <Input />
      </Field>
      <Field label={copy.email} flexGrow={1}>
        <Input type="email" />
      </Field>
    </FieldSet>
  ),
  icon: () => (
    <>
      <Icon icon={Search} size="sm" />
      <Icon icon={Search} size="md" color="muted" />
      <Icon icon={Search} size="lg" color="info" />
    </>
  ),
  input: (copy) => (
    <Field label={copy.email}>
      <Input type="email" iconLeft={Search} />
    </Field>
  ),
  popover: (copy) => (
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary">{copy.open}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Text size="sm">{copy.hint}</Text>
      </PopoverContent>
    </Popover>
  ),
  radio: (copy) => (
    <Field label={copy.name}>
      <RadioGroup defaultValue="a">
        <Radio value="a" label={copy.optionA} />
        <Radio value="b" label={copy.optionB} />
      </RadioGroup>
    </Field>
  ),
  select: (copy) => (
    <Field label={copy.name}>
      <Select defaultValue="a">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">{copy.optionA}</SelectItem>
          <SelectItem value="b">{copy.optionB}</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  ),
  separator: (copy) => (
    <div style={{ width: '100%' }}>
      <Text size="sm">{copy.tabA}</Text>
      <Separator style={{ margin: 'var(--spacing-3) 0' }} />
      <Text size="sm">{copy.tabB}</Text>
    </div>
  ),
  skeleton: () => (
    // biome-ignore lint/a11y/useSemanticElements: the pattern Skeleton's TSDoc documents
    <div
      role="status"
      aria-busy="true"
      style={{ width: '100%', display: 'grid', gap: 'var(--spacing-2)' }}
    >
      <Skeleton style={{ height: 'var(--spacing-4)', width: '60%' }} />
      <Skeleton style={{ height: 'var(--spacing-4)', width: '90%' }} />
    </div>
  ),
  spinner: () => (
    <>
      <Spinner />
      <Spinner type="ripple" />
    </>
  ),
  switch: (copy) => <Switch label={copy.notifications} defaultChecked />,
  table: (copy) => (
    <Table>
      <TableCaption>{copy.tableCaption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">{copy.tableItem}</TableHead>
          <TableHead scope="col" align="end">
            {copy.tableAmount}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell align="end">¥12,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-002</TableCell>
          <TableCell align="end">¥980</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  tabs: (copy) => (
    <Tabs defaultValue="a" style={{ width: '100%' }}>
      <TabsList>
        <TabsTrigger value="a">{copy.tabA}</TabsTrigger>
        <TabsTrigger value="b">{copy.tabB}</TabsTrigger>
      </TabsList>
      <TabsContent value="a">
        <Text size="sm">{copy.tabBodyA}</Text>
      </TabsContent>
      <TabsContent value="b">
        <Text size="sm">{copy.tabBodyB}</Text>
      </TabsContent>
    </Tabs>
  ),
  text: (copy) => (
    <div>
      <Text as="h3" variant="heading" size="lg">
        {copy.noticeTitle}
      </Text>
      <Text color="muted">{copy.noticeBody}</Text>
    </div>
  ),
  textarea: (copy) => (
    <Field label={copy.message}>
      <Textarea rows={4} />
    </Field>
  ),
  toast: (copy) => (
    <>
      <Toaster />
      <Button onClick={() => toast({ variant: 'success', title: copy.toastTitle })}>
        {copy.save}
      </Button>
    </>
  ),
  tooltip: (copy) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="secondary">{copy.open}</Button>
        </TooltipTrigger>
        <TooltipContent>{copy.hint}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export default function ComponentDemo({ slug, copy }: { slug: string; copy: DemoCopy }) {
  const demo = demos[slug]
  if (!demo) {
    throw new Error(`no demo for "${slug}" — add it to src/components/ComponentDemo.tsx`)
  }
  return <div className="detail__demo">{demo(copy)}</div>
}
