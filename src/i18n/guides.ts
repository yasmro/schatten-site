// Per-component guide copy: one entry per lv1 / lv2, en + ja side by side, so the two
// editions cannot differ in shape. `rules` strings carry inline <code> and are
// injected with `set:html` — authored constants, never user input.
//
// Scope: when and how to use a component. Each rule rests on the library's TSDoc
// or on an accessibility requirement; props and states stay in Storybook.
//
// /components/[slug] renders one page per component the installed package
// ships, and fails the build when an entry here is missing — a new component cannot
// reach the site without a guide.
import type { Locale } from './ui'

export type Localized = Record<Locale, string>

/** Do / Don't panel, rendered from real components in GuideExample.tsx. */
export type ExampleId =
  | 'button-priority'
  | 'button-destructive'
  | 'badge-tone'
  | 'callout-tone'
  | 'field-label'
  | 'field-error'
  | 'table-align'

export interface GuideSection {
  title: Localized
  rules: readonly Localized[]
  example?: ExampleId
}

export type CategoryId = 'action' | 'form' | 'display' | 'navigation' | 'feedback' | 'overlay'

export interface ComponentGuide {
  category: CategoryId
  summary: Localized
  /** Minimal usage. The `import` line is part of the snippet. */
  usage: string
  sections: readonly GuideSection[]
}

/** Display order of the /components index. */
export const categoryOrder: readonly CategoryId[] = [
  'action',
  'form',
  'display',
  'navigation',
  'feedback',
  'overlay',
]

/** Components by category, in display order. Unknown slugs are left out. */
export function groupByCategory<T extends { slug: string }>(components: readonly T[]) {
  return categoryOrder.map((id) => ({
    id,
    items: components.filter(({ slug }) => guides[slug]?.category === id),
  }))
}

export const guides: Record<string, ComponentGuide> = {
  avatar: {
    category: 'display',
    summary: {
      en: 'A user’s profile image, falling back to initials when the image is absent or fails to load.',
      ja: 'ユーザーのプロフィール画像。画像がない、または読み込めないときはイニシャルを表示する。',
    },
    usage: `import { Avatar } from '@yasmro/schatten'

<Avatar src="/users/jd.png" alt="Jane Doe" fallback="JD" />`,
    sections: [
      {
        title: { en: 'Name and fallback', ja: '名前とフォールバック' },
        rules: [
          {
            en: 'Pass the person’s name as <code>alt</code>. Pass <code>alt=""</code> only when a visible name sits next to the avatar.',
            ja: '<code>alt</code> には人の名前を渡す。隣に名前が表示されているときだけ <code>alt=""</code> にする。',
          },
          {
            en: 'Always set <code>fallback</code> to short initials, so a failed image still identifies the person.',
            ja: '画像が読み込めなくても人物を識別できるよう、<code>fallback</code> には短いイニシャルを必ず指定する。',
          },
        ],
      },
    ],
  },
  badge: {
    category: 'display',
    summary: {
      en: 'A small label for a status or a category. It is not clickable.',
      ja: '状態や分類を示す小さなラベル。クリックはできない。',
    },
    usage: `import { Badge } from '@yasmro/schatten'

<Badge variant="success" appearance="subtle">Active</Badge>`,
    sections: [
      {
        title: { en: 'Tone', ja: 'トーン' },
        rules: [
          {
            en: 'Use <code>success</code> / <code>error</code> / <code>warning</code> / <code>info</code> only when the label states one of those conditions.',
            ja: '<code>success</code> / <code>error</code> / <code>warning</code> / <code>info</code> は、ラベルがその状態を表すときだけ使う。',
          },
          {
            en: 'Use <code>neutral</code> for categories and other labels with no state.',
            ja: '分類など、状態を持たないラベルには <code>neutral</code> を使う。',
          },
          {
            en: 'Do not use a Badge to mean “delete”. Destructive actions are <code>&lt;Button variant="destructive"&gt;</code>.',
            ja: '削除の操作に Badge は使わない。破壊的な操作は <code>&lt;Button variant="destructive"&gt;</code> にする。',
          },
        ],
        example: 'badge-tone',
      },
      {
        title: { en: 'Appearance', ja: '見た目の強さ' },
        rules: [
          {
            en: 'Start from <code>subtle</code>, which suits list rows and status tags. Use <code>solid</code> only for a label that must stand out.',
            ja: '一覧の行やステータスには、標準の <code>subtle</code> を使う。<code>solid</code> は特に目立たせたいラベルに限る。',
          },
        ],
      },
    ],
  },
  button: {
    category: 'action',
    summary: {
      en: 'Triggers an action. The variant states how important that action is.',
      ja: '操作を実行する。variant で、その操作の重要度を示す。',
    },
    usage: `import { Button } from '@yasmro/schatten'

<Button variant="primary" size="md">Save</Button>`,
    sections: [
      {
        title: { en: 'Priority', ja: '優先度' },
        rules: [
          {
            en: 'Place at most one <code>primary</code> Button in a region. It is the main action of that region.',
            ja: '<code>primary</code> はひとつの領域に 1 つまで。その領域の主要な操作に使う。',
          },
          {
            en: 'Use <code>secondary</code> for supporting actions and <code>tertiary</code> for low-priority ones.',
            ja: '補助的な操作には <code>secondary</code>、優先度の低い操作には <code>tertiary</code> を使う。',
          },
        ],
        example: 'button-priority',
      },
      {
        title: { en: 'Destructive actions', ja: '破壊的な操作' },
        rules: [
          {
            en: 'Use <code>destructive</code> for delete and remove actions, so they cannot be mistaken for a normal commit.',
            ja: '通常の確定操作と見分けられるよう、削除や除去には <code>destructive</code> を使う。',
          },
        ],
        example: 'button-destructive',
      },
      {
        title: { en: 'Icons and loading', ja: 'アイコンと読み込み中' },
        rules: [
          {
            en: 'An icon-only Button has no visible label, so give it an <code>aria-label</code>.',
            ja: 'アイコンのみの Button には表示ラベルがないので、<code>aria-label</code> を指定する。',
          },
          {
            en: 'Use <code>isLoading</code> while the action runs. It shows a spinner and disables the Button, which prevents a double submit.',
            ja: '処理中は <code>isLoading</code> を使う。スピナーを表示して Button を無効にするので、二重送信を防げる。',
          },
          {
            en: 'On a saturated surface such as a solid Toast or banner, use <code>inverted</code>.',
            ja: 'solid の Toast やバナーなど彩度の高い面の上では <code>inverted</code> を使う。',
          },
        ],
      },
    ],
  },
  callout: {
    category: 'feedback',
    summary: {
      en: 'An inline status block that stays in the page. Use it for notes and notices tied to the content around it.',
      ja: 'ページ内に置くステータス表示。周囲の内容に関わる注記やお知らせに使う。',
    },
    usage: `import { Callout } from '@yasmro/schatten'

<Callout variant="warning" title="Trial ends soon" description="Add a payment method to keep your data." />`,
    sections: [
      {
        title: { en: 'Choosing the variant', ja: 'variant の選び方' },
        rules: [
          {
            en: 'Choose the variant from the meaning of the message. The icon and color follow from it.',
            ja: 'variant はメッセージの意味で選ぶ。アイコンと色はそれに連動する。',
          },
          {
            en: 'Use a Toast instead when the message reports the result of an action and can disappear.',
            ja: '操作の結果を伝えるだけで消えてよいメッセージには、Toast を使う。',
          },
        ],
        example: 'callout-tone',
      },
      {
        title: { en: 'Actions and live messages', ja: '操作と動的なメッセージ' },
        rules: [
          {
            en: 'With <code>appearance="solid"</code>, put an <code>inverted</code> Button in <code>action</code> so it stays legible.',
            ja: '<code>appearance="solid"</code> では、背景の上でも読めるよう、<code>action</code> に <code>inverted</code> の Button を置く。',
          },
          {
            en: 'A Callout that appears dynamically needs <code>role="status"</code>, or <code>role="alert"</code> when urgent.',
            ja: '動的に現れる Callout には <code>role="status"</code>、緊急のものには <code>role="alert"</code> を指定する。',
          },
        ],
      },
    ],
  },
  card: {
    category: 'display',
    summary: {
      en: 'A bordered surface that groups related content, such as a widget or a settings panel.',
      ja: '関連する内容をまとめる枠付きの面。ウィジェットや設定パネルなどに使う。',
    },
    usage: `import { Card, CardContent, CardHeader, CardTitle } from '@yasmro/schatten'

<Card>
  <CardHeader>
    <CardTitle>Usage</CardTitle>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>`,
    sections: [
      {
        title: { en: 'Structure', ja: '構成' },
        rules: [
          {
            en: 'Compose from <code>CardHeader</code>, <code>CardContent</code> and <code>CardFooter</code>. Put actions in <code>CardFooter</code>.',
            ja: '<code>CardHeader</code> / <code>CardContent</code> / <code>CardFooter</code> を組み合わせる。操作は <code>CardFooter</code> に置く。',
          },
          {
            en: '<code>CardTitle</code> renders a <code>&lt;div&gt;</code>. When the title belongs in the document outline, nest a heading inside it.',
            ja: '<code>CardTitle</code> は <code>&lt;div&gt;</code> を描画する。文書の見出しにしたいときは、中に見出し要素を入れる。',
          },
          {
            en: 'Use <code>variant="plain"</code> for nested or low-emphasis grouping.',
            ja: '入れ子のグループや、強調の弱いまとまりには <code>variant="plain"</code> を使う。',
          },
        ],
      },
    ],
  },
  checkbox: {
    category: 'form',
    summary: {
      en: 'Turns one option on or off, or selects any number of options from a list.',
      ja: 'ひとつの項目のオン・オフや、一覧からの複数選択に使う。',
    },
    usage: `import { Checkbox } from '@yasmro/schatten'

<Checkbox label="Accept the terms" />`,
    sections: [
      {
        title: { en: 'Choosing the control', ja: 'コントロールの選び方' },
        rules: [
          {
            en: 'Use Checkbox when the choice takes effect on submit, and when several options can be on. Use Radio when exactly one option must be chosen.',
            ja: '送信時に確定する選択や、複数を選べる選択には Checkbox を使う。必ずひとつだけ選ぶ場合は Radio を使う。',
          },
          {
            en: 'Use <code>indeterminate</code> on a parent item whose children are partly selected.',
            ja: '子項目の一部だけが選択された親項目には <code>indeterminate</code> を使う。',
          },
        ],
      },
    ],
  },
  datecalendar: {
    category: 'form',
    summary: {
      en: 'An always-visible month grid for picking one date. DateRangeCalendar picks a range.',
      ja: '常に表示される月のカレンダーで、日付をひとつ選ぶ。期間を選ぶときは DateRangeCalendar を使う。',
    },
    usage: `import { DateCalendar } from '@yasmro/schatten'

<DateCalendar defaultValue="2026-11-14" onValueChange={setDate} />`,
    sections: [
      {
        title: { en: 'Choosing the control', ja: 'コントロールの選び方' },
        rules: [
          {
            en: 'Use DateCalendar when the calendar stays on the page, as on a booking page. In a form field, use DatePicker, which pairs a typed input with the calendar in a popover.',
            ja: '予約ページのように、カレンダーを常にページに出しておくときに DateCalendar を使う。フォームの入力欄には、入力とポップオーバーのカレンダーを組み合わせた DatePicker を使う。',
          },
          {
            en: 'Use DateRangeCalendar for a range. Its value is <code>{ from, to }</code>, not a date, so it is a separate component rather than a <code>mode</code> prop.',
            ja: '期間には DateRangeCalendar を使う。値が日付ではなく <code>{ from, to }</code> なので、<code>mode</code> のような prop ではなく別のコンポーネントになっている。',
          },
        ],
      },
      {
        title: { en: 'Values and language', ja: '値と言語' },
        rules: [
          {
            en: 'Values are <code>YYYY-MM-DD</code> strings, not <code>Date</code> objects, so a time zone cannot shift a date by one day. Convert with <code>toDate</code> / <code>toDateString</code> from <code>@yasmro/schatten/date</code>.',
            ja: '値は <code>Date</code> オブジェクトではなく <code>YYYY-MM-DD</code> の文字列で、タイムゾーンで日付が 1 日ずれることはない。変換には <code>@yasmro/schatten/date</code> の <code>toDate</code> / <code>toDateString</code> を使う。',
          },
          {
            en: 'When you set <code>locale</code>, pass <code>labels</code> in the same language. Otherwise a screen reader reads two languages.',
            ja: '<code>locale</code> を指定したら、<code>labels</code> も同じ言語で渡す。渡さないと、スクリーンリーダーが 2 つの言語を混ぜて読み上げる。',
          },
          {
            en: 'With server rendering, pass <code>today</code> or <code>defaultMonth</code>, so the server and the browser show the same first month.',
            ja: 'サーバーで描画するときは <code>today</code> か <code>defaultMonth</code> を渡す。サーバーとブラウザで、最初に表示する月がそろう。',
          },
        ],
      },
    ],
  },
  datepicker: {
    category: 'form',
    summary: {
      en: 'A date input with a calendar in a popover. The typed date and the picked day stay in sync. DateRangePicker takes a range.',
      ja: '日付の入力欄と、ポップオーバーのカレンダーを組み合わせたもの。入力した日付と選んだ日は同期する。期間は DateRangePicker で選ぶ。',
    },
    usage: `import { DatePicker, Field } from '@yasmro/schatten'

<Field label="Due date">
  <DatePicker name="due" defaultValue="2026-11-14" />
</Field>`,
    sections: [
      {
        title: { en: 'Label', ja: 'ラベル' },
        rules: [
          {
            en: 'Place the picker in a <code>Field</code>. The Field label names the input of DatePicker, and the group of DateRangePicker’s two inputs. Outside a Field, pass <code>aria-label</code>.',
            ja: '<code>Field</code> の中に置く。Field のラベルが、DatePicker では入力欄の名前に、DateRangePicker では 2 つの入力欄をまとめたグループの名前になる。Field の外では <code>aria-label</code> を渡す。',
          },
        ],
      },
      {
        title: { en: 'Date and time', ja: '日付と時刻' },
        rules: [
          {
            en: 'Add <code>granularity="minute"</code> when the value needs a time. The value becomes a local <code>YYYY-MM-DDTHH:mm</code> with no time zone.',
            ja: '時刻も必要なときは <code>granularity="minute"</code> を付ける。値は、タイムゾーンを持たないローカルの <code>YYYY-MM-DDTHH:mm</code> になる。',
          },
          {
            en: 'A string from an API or a form is not yet a date value. Check it with <code>isDateValue</code> / <code>isDateTimeValue</code> from <code>@yasmro/schatten/date</code> before passing it.',
            ja: 'API やフォームから来た文字列は、そのままでは日付の値として渡せない。<code>@yasmro/schatten/date</code> の <code>isDateValue</code> / <code>isDateTimeValue</code> で確かめてから渡す。',
          },
          {
            en: "<code>onValueChange</code> receives <code>''</code> while the input holds an unfinished or invalid date. Treat <code>''</code> as no value.",
            ja: "入力途中や無効な日付の間、<code>onValueChange</code> には <code>''</code> が渡る。<code>''</code> は値がないものとして扱う。",
          },
        ],
      },
      {
        title: { en: 'Without React', ja: 'React を使わない場合' },
        rules: [
          {
            en: 'DatePicker is lv2 and ships for React only. Without React, use <code>&lt;input type="date"&gt;</code>, or <code>&lt;input type="datetime-local"&gt;</code> for a time.',
            ja: 'DatePicker は lv2 で、React 専用。React を使わないときは <code>&lt;input type="date"&gt;</code> を使う。時刻も必要なら <code>&lt;input type="datetime-local"&gt;</code> を使う。',
          },
        ],
      },
    ],
  },
  dialog: {
    category: 'overlay',
    summary: {
      en: 'A modal window that blocks the page until the user finishes or dismisses a focused task.',
      ja: '作業を終えるか閉じるまで、ページの操作を止めるモーダルウィンドウ。',
    },
    usage: `import { Dialog } from '@yasmro/schatten'

<Dialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="Delete project?"
  actionButton={{ label: 'Delete', onClick: remove }}
  cancelButton={{ label: 'Cancel' }}
/>`,
    sections: [
      {
        title: { en: 'When to use', ja: '使う場面' },
        rules: [
          {
            en: 'Use a Dialog when the user must decide before continuing. Use a Popover when the page should stay usable.',
            ja: '続ける前に判断が必要なときに Dialog を使う。ページを操作できる状態のままにしたいときは Popover を使う。',
          },
        ],
      },
      {
        title: { en: 'Buttons', ja: 'ボタン' },
        rules: [
          {
            en: '<code>actionButton</code> is required. Name it after the action (“Delete”), not “OK”.',
            ja: '<code>actionButton</code> は必須。「OK」ではなく「削除」のように、実行する操作の名前を付ける。',
          },
          {
            en: 'Use <code>subActionButton</code> for an alternative commit path such as “Save as draft”.',
            ja: '<code>subActionButton</code> は「下書き保存」のような、別の確定操作に使う。',
          },
          {
            en: 'Set <code>isLoading</code> during async work. The Dialog then disables the other buttons and blocks dismissal.',
            ja: '非同期処理の間は <code>isLoading</code> を設定する。他のボタンが無効になり、閉じる操作もできなくなる。',
          },
        ],
      },
    ],
  },
  dropdownmenu: {
    category: 'overlay',
    summary: {
      en: 'A list of actions opened from a trigger. Use it to fold away secondary actions.',
      ja: 'トリガーから開く操作の一覧。副次的な操作をまとめるときに使う。',
    },
    usage: `import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@yasmro/schatten'

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="secondary">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Rename</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    sections: [
      {
        title: { en: 'Menu or Select', ja: 'メニューか Select か' },
        rules: [
          {
            en: 'Use a DropdownMenu for actions. Use Select to choose a form value.',
            ja: '操作には DropdownMenu を使う。フォームの値を選ぶときは Select を使う。',
          },
        ],
      },
      {
        title: { en: 'Items', ja: '項目' },
        rules: [
          {
            en: 'Use <code>variant="destructive"</code> for delete and remove items.',
            ja: '削除や除去の項目には <code>variant="destructive"</code> を使う。',
          },
          {
            en: 'When an item’s children are not plain text, pass <code>textValue</code> so typeahead still matches.',
            ja: '項目の中身がプレーンテキストでないときは、キー入力で項目を探せるよう <code>textValue</code> を渡す。',
          },
        ],
      },
    ],
  },
  emptystate: {
    category: 'feedback',
    summary: {
      en: 'Shows that there is nothing here yet: an icon, a title, a description, and the next step.',
      ja: 'まだ何もないことを示す。アイコン、見出し、説明、次の操作を決まった配置で並べる。',
    },
    usage: `import { Button, EmptyState } from '@yasmro/schatten'
import { Inbox } from 'lucide-react'

<EmptyState
  icon={Inbox}
  title="No projects yet"
  description="Create a project to get started."
  action={<Button>New project</Button>}
/>`,
    sections: [
      {
        title: { en: 'Heading and size', ja: '見出しとサイズ' },
        rules: [
          {
            en: 'Set <code>headingLevel</code> to fit the page outline. It defaults to 2, and EmptyState does not guess it.',
            ja: '<code>headingLevel</code> はページの見出し構造に合わせて指定する。標準値は 2 で、EmptyState が自動で決めることはない。',
          },
          {
            en: 'Pick <code>size</code> by where it sits: <code>sm</code> in a card or a table body, <code>md</code> in a panel or a section, <code>lg</code> for a whole page.',
            ja: '<code>size</code> は置く場所で選ぶ。カードや表の本体には <code>sm</code>、パネルやセクションには <code>md</code>、ページ全体には <code>lg</code> を使う。',
          },
        ],
      },
      {
        title: { en: 'Content', ja: '内容' },
        rules: [
          {
            en: 'The icon is decorative and hidden from screen readers. Say what is empty in <code>title</code>.',
            ja: 'アイコンは飾りで、スクリーンリーダーには読まれない。何がないのかは <code>title</code> に書く。',
          },
          {
            en: 'Put the step the user can take next in <code>action</code>, usually one Button.',
            ja: '次にできる操作を <code>action</code> に置く。ふつうは Button をひとつにする。',
          },
        ],
      },
      {
        title: { en: 'Announcing a change', ja: '表示の変化を伝える' },
        rules: [
          {
            en: 'When it appears at runtime, as when search results run out, wrap it in an element with <code>role="status"</code> that stays mounted. A status region mounted together with its content is usually not read out.',
            ja: '検索結果が 0 件になったときのように途中で現れるなら、<code>role="status"</code> を付けた要素で包み、その要素は表示したままにする。中身と一緒に現れた status 領域は、ふつう読み上げられない。',
          },
        ],
      },
      {
        title: { en: 'Without React', ja: 'React を使わない場合' },
        rules: [
          {
            en: 'EmptyState is lv2 and ships for React only. Without React, compose the <code>.st-icon</code> / <code>.st-text</code> / <code>.st-btn</code> classes directly.',
            ja: 'EmptyState は lv2 で、React 専用。React を使わないときは、<code>.st-icon</code> / <code>.st-text</code> / <code>.st-btn</code> のクラスを直接組み合わせる。',
          },
        ],
      },
    ],
  },
  field: {
    category: 'form',
    summary: {
      en: 'Wraps one form control with its label, description and error, and connects them for assistive technology.',
      ja: 'フォームのコントロールひとつにラベル・説明・エラーを付け、支援技術でも読み取れるよう関連付ける。',
    },
    usage: `import { Field, Input } from '@yasmro/schatten'

<Field label="Email" description="We only use this for sign-in." required>
  <Input type="email" />
</Field>`,
    sections: [
      {
        title: { en: 'Labels', ja: 'ラベル' },
        rules: [
          {
            en: 'Give every control a <code>label</code>. A placeholder disappears as soon as the user types, so it cannot replace one.',
            ja: 'すべてのコントロールに <code>label</code> を付ける。プレースホルダーは入力すると消えるので、ラベルの代わりにならない。',
          },
          {
            en: 'Put format hints in <code>description</code>.',
            ja: '入力形式の案内は <code>description</code> に書く。',
          },
        ],
        example: 'field-label',
      },
      {
        title: { en: 'Errors', ja: 'エラー' },
        rules: [
          {
            en: 'Set <code>error</code> with a message that says how to fix the value. Setting it also puts the control in its error state.',
            ja: '<code>error</code> には値の直し方が分かるメッセージを設定する。これでコントロールもエラー状態になる。',
          },
          {
            en: 'Set <code>isError</code> alone only when a message is shown elsewhere, such as on a parent FieldSet.',
            ja: '<code>isError</code> だけを設定するのは、親の FieldSet など別の場所にメッセージがある場合に限る。',
          },
        ],
        example: 'field-error',
      },
    ],
  },
  fieldset: {
    category: 'form',
    summary: {
      en: 'Groups related fields under one legend, and can share disabled and error states among them.',
      ja: '関連するフィールドをひとつの legend でまとめ、無効状態やエラー状態を共有する。',
    },
    usage: `import { Field, FieldSet, Input } from '@yasmro/schatten'

<FieldSet legend="Name" direction="row">
  <Field label="First name" flexGrow={1}><Input /></Field>
  <Field label="Last name" flexGrow={1}><Input /></Field>
</FieldSet>`,
    sections: [
      {
        title: { en: 'Grouping', ja: 'グループ化' },
        rules: [
          {
            en: 'Set <code>legend</code> when the fields form one question, such as an address. Omit it for layout-only grouping.',
            ja: '住所のように、ひとつの設問を構成するフィールドには <code>legend</code> を付ける。レイアウトだけが目的なら省く。',
          },
          {
            en: 'Use the group-level <code>error</code> for a problem that belongs to no single field.',
            ja: '特定のフィールドに属さない問題は、グループの <code>error</code> で伝える。',
          },
          {
            en: 'With <code>direction="row"</code>, set <code>wrap</code> so the fields still fit on narrow screens.',
            ja: '狭い画面でも収まるよう、<code>direction="row"</code> では <code>wrap</code> も指定する。',
          },
        ],
      },
    ],
  },
  icon: {
    category: 'display',
    summary: {
      en: 'Renders a lucide-react icon with Schatten’s sizes and colors.',
      ja: 'lucide-react のアイコンを、Schatten のサイズと色で描画する。',
    },
    usage: `import { Icon } from '@yasmro/schatten'
import { Search } from 'lucide-react'

<Icon icon={Search} size="md" />`,
    sections: [
      {
        title: { en: 'Meaning', ja: '意味の伝え方' },
        rules: [
          {
            en: 'An Icon is decorative by default and hidden from assistive technology. When it carries meaning on its own, give it an <code>aria-label</code>.',
            ja: 'Icon は標準で装飾扱いになり、支援技術からは隠れる。アイコン単体で意味を伝えるときは <code>aria-label</code> を指定する。',
          },
          {
            en: 'An Icon is not interactive. For a clickable icon, use <code>&lt;Button icon={…} /&gt;</code>.',
            ja: 'Icon は操作できない。クリックできるアイコンには <code>&lt;Button icon={…} /&gt;</code> を使う。',
          },
          {
            en: 'Use the same <code>color</code> as the adjacent Text; the two share one vocabulary.',
            ja: '隣の Text と同じ <code>color</code> を指定する。両者の指定値は共通している。',
          },
        ],
      },
    ],
  },
  input: {
    category: 'form',
    summary: {
      en: 'A single-line text input.',
      ja: '1 行のテキスト入力。',
    },
    usage: `import { Field, Input } from '@yasmro/schatten'

<Field label="Price">
  <Input type="number" textRight="JPY" />
</Field>`,
    sections: [
      {
        title: { en: 'Use', ja: '使い方' },
        rules: [
          {
            en: 'Place Input inside a Field so it gets a label, and so errors and disabled state reach it.',
            ja: 'Input は Field の中に置く。ラベルが付き、エラーと無効状態も伝わるようになる。',
          },
          {
            en: 'Use <code>textLeft</code> / <code>textRight</code> for units. Each takes priority over the icon on the same side.',
            ja: '単位には <code>textLeft</code> / <code>textRight</code> を使う。同じ側にアイコンがあれば、テキストが優先される。',
          },
          {
            en: 'Use Textarea when the expected text runs to several lines.',
            ja: '複数行の入力が想定されるときは Textarea を使う。',
          },
        ],
      },
    ],
  },
  popover: {
    category: 'overlay',
    summary: {
      en: 'A click-triggered panel anchored to an element. The rest of the page stays usable.',
      ja: 'クリックで開き、要素に紐づいて表示されるパネル。開いている間もページは操作できる。',
    },
    usage: `import { Button, Popover, PopoverContent, PopoverTrigger } from '@yasmro/schatten'

<Popover>
  <PopoverTrigger>
    <Button variant="secondary">Filters</Button>
  </PopoverTrigger>
  <PopoverContent>…</PopoverContent>
</Popover>`,
    sections: [
      {
        title: { en: 'Choosing the overlay', ja: 'オーバーレイの選び方' },
        rules: [
          {
            en: 'Use a Popover for interactive content such as filters. Use a Tooltip for short text with no controls.',
            ja: 'フィルターのように操作を含む内容には Popover を使う。操作を含まない短い補足には Tooltip を使う。',
          },
          {
            en: 'Use a Dialog when the user must finish the task before continuing.',
            ja: '作業を終えるまで先に進ませたくないときは Dialog を使う。',
          },
        ],
      },
    ],
  },
  radio: {
    category: 'form',
    summary: {
      en: 'Chooses exactly one option from a short list where every option stays visible.',
      ja: '選択肢をすべて見せたまま、短い一覧からひとつを選ぶ。',
    },
    usage: `import { Field, Radio, RadioGroup } from '@yasmro/schatten'

<Field label="Plan">
  <RadioGroup defaultValue="free">
    <Radio value="free" label="Free" />
    <Radio value="pro" label="Pro" />
  </RadioGroup>
</Field>`,
    sections: [
      {
        title: { en: 'Choosing the control', ja: 'コントロールの選び方' },
        rules: [
          {
            en: 'Use Select instead when the list is long and showing every option would take too much room.',
            ja: '選択肢が多く、すべて表示すると場所を取りすぎるときは Select を使う。',
          },
          {
            en: 'Set <code>size</code>, <code>isError</code> and <code>disabled</code> on <code>RadioGroup</code> so they apply to every item.',
            ja: '<code>size</code> / <code>isError</code> / <code>disabled</code> は <code>RadioGroup</code> に設定する。全項目に適用される。',
          },
        ],
      },
    ],
  },
  select: {
    category: 'form',
    summary: {
      en: 'Chooses one value from a list that opens on demand.',
      ja: '開いた一覧から値をひとつ選ぶ。',
    },
    usage: `import { Field, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@yasmro/schatten'

<Field label="Country">
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Choose" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="jp">Japan</SelectItem>
    </SelectContent>
  </Select>
</Field>`,
    sections: [
      {
        title: { en: 'Accessible name', ja: 'アクセシブルネーム' },
        rules: [
          {
            en: 'Always put the trigger in <code>&lt;Field label="…"&gt;</code> or pass <code>aria-label</code>. The placeholder and the selected value never become its name.',
            ja: 'トリガーは必ず <code>&lt;Field label="…"&gt;</code> の中に置くか、<code>aria-label</code> を渡す。プレースホルダーや選択中の値は名前にならない。',
          },
        ],
      },
      {
        title: { en: 'Choosing the control', ja: 'コントロールの選び方' },
        rules: [
          {
            en: 'Use Radio when the options are few enough to show all at once.',
            ja: '選択肢が少なく、すべて表示できるときは Radio を使う。',
          },
          {
            en: 'Use DropdownMenu when the items are actions rather than values.',
            ja: '項目が値ではなく操作のときは DropdownMenu を使う。',
          },
        ],
      },
    ],
  },
  separator: {
    category: 'display',
    summary: {
      en: 'A thin line between groups of content.',
      ja: '内容のまとまりを区切る細い線。',
    },
    usage: `import { Separator } from '@yasmro/schatten'

<Separator />`,
    sections: [
      {
        title: { en: 'Semantics', ja: 'セマンティクス' },
        rules: [
          {
            en: 'By default it is decorative and hidden from assistive technology.',
            ja: '標準では装飾扱いで、支援技術からは隠れる。',
          },
          {
            en: 'Set <code>decorative={false}</code> when the line marks a real boundary between sections. It is then exposed with <code>role="separator"</code>.',
            ja: '線が内容の区切りそのものを示すときは <code>decorative={false}</code> にする。<code>role="separator"</code> として公開される。',
          },
        ],
      },
    ],
  },
  skeleton: {
    category: 'feedback',
    summary: {
      en: 'A shimmering placeholder that holds the shape of content while it loads.',
      ja: '読み込み中の内容の形を示すプレースホルダー。',
    },
    usage: `import { Skeleton } from '@yasmro/schatten'

<div role="status" aria-busy="true">
  <Skeleton className="h-4 w-48" />
</div>`,
    sections: [
      {
        title: { en: 'Loading state', ja: '読み込み中の表現' },
        rules: [
          {
            en: 'A Skeleton is hidden from assistive technology. Announce loading on the container with <code>role="status"</code> and <code>aria-busy="true"</code>.',
            ja: 'Skeleton は支援技術からは隠れる。読み込み中であることは、親要素に <code>role="status"</code> と <code>aria-busy="true"</code> を付けて伝える。',
          },
          {
            en: 'Use a Skeleton when the shape of the result is known. Use a Spinner otherwise.',
            ja: '結果の形が分かっているときは Skeleton、分からないときは Spinner を使う。',
          },
        ],
      },
    ],
  },
  spinner: {
    category: 'feedback',
    summary: {
      en: 'An animated indicator for work in progress.',
      ja: '処理中であることを示すアニメーション。',
    },
    usage: `import { Spinner } from '@yasmro/schatten'

<Spinner label="Loading results" />`,
    sections: [
      {
        title: { en: 'Use', ja: '使い方' },
        rules: [
          {
            en: 'Set <code>label</code> to say what is loading. It is read by screen readers and defaults to “Loading”.',
            ja: '<code>label</code> には読み込んでいる対象を書く。スクリーンリーダーが読み上げる文言で、標準値は「Loading」。',
          },
          {
            en: 'Use <code>variant="inverted"</code> on a saturated surface.',
            ja: '彩度の高い面の上では <code>variant="inverted"</code> を使う。',
          },
          {
            en: 'For a Button, use its <code>isLoading</code> instead of placing a Spinner beside it.',
            ja: 'Button の処理中は、隣に Spinner を置かず <code>isLoading</code> を使う。',
          },
        ],
      },
    ],
  },
  switch: {
    category: 'form',
    summary: {
      en: 'Turns a single setting on or off.',
      ja: 'ひとつの設定をオン・オフする。',
    },
    usage: `import { Switch } from '@yasmro/schatten'

<Switch label="Notifications" />`,
    sections: [
      {
        title: { en: 'Choosing the control', ja: 'コントロールの選び方' },
        rules: [
          {
            en: 'Use a Switch when the change applies immediately. Use a Checkbox when it applies on submit.',
            ja: '切り替えた時点で反映される設定には Switch を使う。送信時に反映されるものは Checkbox を使う。',
          },
          {
            en: 'Name the setting in <code>label</code>, and keep the label the same in both states.',
            ja: '<code>label</code> には設定の名前を書き、オンでもオフでも文言を変えない。',
          },
        ],
      },
    ],
  },
  table: {
    category: 'display',
    summary: {
      en: 'A semantic table for tabular data. It provides the look only: no sorting, filtering or pagination.',
      ja: '表形式のデータを示すセマンティックなテーブル。見た目のみを提供し、並べ替え・絞り込み・ページ送りの機能は持たない。',
    },
    usage: `import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@yasmro/schatten'

<Table>
  <TableCaption>Invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Number</TableHead>
      <TableHead scope="col" align="end">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell align="end">¥12,000</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    sections: [
      {
        title: { en: 'Accessible structure', ja: 'アクセシブルな構造' },
        rules: [
          {
            en: 'Name the table with <code>TableCaption</code>.',
            ja: 'テーブルの名前は <code>TableCaption</code> で示す。',
          },
          {
            en: 'Pass <code>scope="col"</code> or <code>scope="row"</code> to <code>TableHead</code>. Table does not set it for you.',
            ja: '<code>TableHead</code> に <code>scope="col"</code> または <code>scope="row"</code> を渡す。Table は自動では設定しない。',
          },
        ],
      },
      {
        title: { en: 'Alignment', ja: '揃え方' },
        rules: [
          {
            en: 'Align numbers to the end, in the head and the cells alike, so digits line up for comparison.',
            ja: '数値は見出しもセルも末尾に揃える。桁が揃うので比較しやすい。',
          },
        ],
        example: 'table-align',
      },
      {
        title: { en: 'Interactive rows', ja: '操作できる行' },
        rules: [
          {
            en: '<code>hoverable</code> and <code>selected</code> change only the look. If a row is interactive, add a real button or link to it.',
            ja: '<code>hoverable</code> と <code>selected</code> は見た目だけを変える。行を操作できるようにするなら、ボタンやリンクを実際に置く。',
          },
        ],
      },
    ],
  },
  tabs: {
    category: 'navigation',
    summary: {
      en: 'Switches between panels of related content on the same page.',
      ja: '同じページの中で、関連する内容のパネルを切り替える。',
    },
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@yasmro/schatten'

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="account">…</TabsContent>
  <TabsContent value="billing">…</TabsContent>
</Tabs>`,
    sections: [
      {
        title: { en: 'Use', ja: '使い方' },
        rules: [
          {
            en: 'Use Tabs for content at the same level that is not compared side by side. Do not use them to move between pages.',
            ja: 'Tabs は同じ階層の内容で、並べて比較しないものに使う。ページ間の移動には使わない。',
          },
          {
            en: 'Use <code>activationMode="manual"</code> when switching a panel is slow, so arrow keys do not load each tab on the way past.',
            ja: 'パネルの切り替えに時間がかかるときは <code>activationMode="manual"</code> にする。矢印キーで通過するだけのタブを読み込まずに済む。',
          },
        ],
      },
    ],
  },
  text: {
    category: 'display',
    summary: {
      en: 'All typography: paragraphs, labels and headings, on the type tokens.',
      ja: '本文・ラベル・見出しなど、すべての文字組みをタイポグラフィトークンで扱う。',
    },
    usage: `import { Text } from '@yasmro/schatten'

<Text as="h2" variant="heading" size="lg">Billing</Text>`,
    sections: [
      {
        title: { en: 'Role and element', ja: '役割と要素' },
        rules: [
          {
            en: '<code>variant</code> and <code>size</code> set the look; <code>as</code> sets the element. Choose <code>as</code> from the document outline, not from the visual size.',
            ja: '見た目は <code>variant</code> と <code>size</code>、要素は <code>as</code> で決める。<code>as</code> は文字の大きさではなく文書構造で選ぶ。',
          },
          {
            en: 'Use <code>color</code> for hierarchy: <code>default</code>, <code>muted</code>, <code>subtle</code>, from most to least prominent.',
            ja: '情報の階層は <code>color</code> で示す。目立つ順に <code>default</code> / <code>muted</code> / <code>subtle</code>。',
          },
          {
            en: '<code>family="serif"</code> suits long-form and display copy. You must load the serif webfonts yourself.',
            ja: '<code>family="serif"</code> は長文や見出し向け。serif の Web フォントは利用側で読み込む。',
          },
        ],
      },
    ],
  },
  textarea: {
    category: 'form',
    summary: {
      en: 'A multi-line text input.',
      ja: '複数行のテキスト入力。',
    },
    usage: `import { Field, Textarea } from '@yasmro/schatten'

<Field label="Message">
  <Textarea rows={4} />
</Field>`,
    sections: [
      {
        title: { en: 'Use', ja: '使い方' },
        rules: [
          {
            en: 'Place Textarea inside a Field so it gets a label, and so errors and disabled state reach it.',
            ja: 'Textarea は Field の中に置く。ラベルが付き、エラーと無効状態も伝わるようになる。',
          },
          {
            en: 'Set <code>rows</code> near the length you expect, so the size of the box suggests how much to write.',
            ja: '<code>rows</code> は想定する分量に近い値にする。入力欄の大きさが、書く量の目安になる。',
          },
        ],
      },
    ],
  },
  toast: {
    category: 'feedback',
    summary: {
      en: 'A short message that overlays the page and dismisses itself.',
      ja: 'ページに重ねて表示され、自動で消える短いメッセージ。',
    },
    usage: `import { Button, Toaster, toast } from '@yasmro/schatten'

<Toaster />
<Button onClick={() => toast({ variant: 'success', title: 'Saved' })}>Save</Button>`,
    sections: [
      {
        title: { en: 'When to use', ja: '使う場面' },
        rules: [
          {
            en: 'Use a Toast to report the result of an action. It closes after 5 seconds by default, so anything the user must read belongs in a Callout or a Dialog.',
            ja: 'Toast は操作の結果を伝えるのに使う。標準で 5 秒後に閉じるので、必ず読んでほしい内容は Callout や Dialog にする。',
          },
          {
            en: 'Render <code>&lt;Toaster /&gt;</code> once at the app root.',
            ja: '<code>&lt;Toaster /&gt;</code> はアプリのルートに 1 度だけ置く。',
          },
        ],
      },
      {
        title: { en: 'Async work', ja: '非同期処理' },
        rules: [
          {
            en: 'Use <code>toast.promise</code> to show loading, then success or error, from one promise.',
            ja: '<code>toast.promise</code> を使うと、ひとつの Promise から読み込み中、成功、失敗を順に表示できる。',
          },
          {
            en: 'A <code>toast.loading</code> toast does not dismiss itself. Always end it through the returned handle.',
            ja: '<code>toast.loading</code> は自動では閉じない。返されるハンドルで必ず終了させる。',
          },
        ],
      },
    ],
  },
  tooltip: {
    category: 'overlay',
    summary: {
      en: 'A short text hint shown on hover or keyboard focus.',
      ja: 'ホバーやキーボードフォーカスで表示される短い補足テキスト。',
    },
    usage: `import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@yasmro/schatten'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Button variant="secondary">Export</Button>
    </TooltipTrigger>
    <TooltipContent>Download as CSV</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    sections: [
      {
        title: { en: 'Content', ja: '内容' },
        rules: [
          {
            en: 'Keep it to short text. Use a Popover when the content needs a link or a control.',
            ja: '短いテキストにとどめる。リンクや操作が必要なら Popover を使う。',
          },
          {
            en: 'Do not put required information in a Tooltip. On a touch screen there is no hover to reveal it.',
            ja: 'タッチ操作の画面ではホバーできず表示されないので、必須の情報は Tooltip に入れない。',
          },
        ],
      },
    ],
  },
}
