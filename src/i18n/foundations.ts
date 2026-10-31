// Foundations copy: one entry per page, en + ja side by side. Strings marked
// Html carry inline markup and are injected with `set:html` — authored
// constants, never user input.
//
// The text restates the library's token docs (`src/docs/*.stories.tsx` in
// yasmro/schatten). Token names and values are not typed here: they are read
// from the installed package (src/lib/library.mjs). The exception is `colorGroups`,
// which pairs each semantic color with its role; a color the package ships
// without an entry fails the build, as does a reference to a primitive the
// primitive page does not show.
import type { Localized } from './guides'

const l = (en: string, ja: string): Localized => ({ en, ja })

export const foundationPages = [
  {
    slug: 'color',
    title: l('Color', '色'),
    summary: l(
      'Primitive colors say what a color is; semantic colors say what it is for.',
      'プリミティブは「何色か」を、セマンティックは「何に使うか」を表す。',
    ),
    lead: l(
      'Colors are inspired by Japanese calligraphy: ink on paper. They come in two tiers: primitives say what a color is, and semantic colors say what it is for. Components use the semantic tier.',
      '色の着想は書、つまり紙に墨である。色は 2 層に分かれていて、プリミティブは「何色か」を、セマンティックは「何に使うか」を表す。コンポーネントはセマンティックの層を使う。',
    ),
  },
  {
    slug: 'typography',
    title: l('Typography', 'タイポグラフィ'),
    summary: l(
      'Font families, the type scale, and the size and leading tokens.',
      '書体、タイプスケール、サイズと行送りのトークン。',
    ),
    lead: l(
      'Each role (Heading, Body, Label) bundles font size, line height and weight into one <code>.st-text</code> class. Apply it through <code>Text</code>, so text is styled the same way everywhere.',
      'Heading / Body / Label の各ロールは、サイズ・行送り・ウェイトをひとつの <code>.st-text</code> クラスにまとめている。<code>Text</code> を通して使えば、文字組みがどこでも揃う。',
    ),
  },
  {
    slug: 'spacing',
    title: l('Spacing', '余白'),
    summary: l(
      'The 4px-based scale, and which steps to use inside and between components.',
      '4px 基準の尺度と、コンポーネントの内側・外側で使う段階。',
    ),
    lead: l(
      'The scale is built on a 4px base. Use it instead of arbitrary pixel values, so every layout lands on the same rhythm.',
      '余白の尺度は 4px を基準にしている。任意の px 値の代わりにこの尺度を使えば、どのレイアウトでも余白が揃う。',
    ),
  },
  {
    slug: 'radius',
    title: l('Radius', '角丸'),
    summary: l(
      'The radius scale, and the names by surface type.',
      '角丸の尺度と、面の種類ごとの名前。',
    ),
    lead: l(
      'Pick a radius by what the surface is, not by an absolute corner size. In components, use a semantic token rather than a raw step.',
      '角丸は絶対的な大きさではなく、面の種類で選ぶ。コンポーネントでは primitive の段階ではなくセマンティックトークンを使う。',
    ),
  },
  {
    slug: 'elevation',
    title: l('Elevation', 'エレベーション'),
    summary: l(
      'The shadow scale, and the names by surface type.',
      '影の尺度と、面の種類ごとの名前。',
    ),
    lead: l(
      'Pick a shadow by what the surface is, not by how deep it should look. Every shadow is a translucent black, and the same value is used in light and dark mode.',
      '影は見た目の深さではなく、面の種類で選ぶ。影はすべて半透明の黒で、ライトでもダークでも同じ値を使う。',
    ),
  },
  {
    slug: 'motion',
    title: l('Motion', 'モーション'),
    summary: l(
      'The duration scale, the names by intent, and when not to animate.',
      '時間の尺度、用途別の名前、動きを入れない場面。',
    ),
    lead: l(
      'Enter and exit timing comes from a three-step duration scale. Pick a duration by what the motion is for, not by a millisecond count.',
      '表示と非表示の時間は 3 段階の尺度から取る。ミリ秒の数値ではなく、動きの目的で選ぶ。',
    ),
  },
  {
    slug: 'z-index',
    title: l('Z-index', '重なり順'),
    summary: l(
      'The order overlay layers paint in, and the band reserved for them.',
      'オーバーレイの描画順と、そのために予約された範囲。',
    ),
    lead: l(
      'Schatten reserves the <code>0–100</code> z-index band for its overlay layers, so a Tooltip opened inside a Dialog always paints in front of it. Z-index says what paints in front; a shadow only says how raised a surface looks.',
      'Schatten は z-index の <code>0–100</code> をオーバーレイ用に予約している。Dialog の中で開いた Tooltip が必ず手前に描かれるのはこのためだ。z-index はどちらが手前かを決め、影は高さの見え方を示すだけである。',
    ),
  },
] as const

export type FoundationSlug = (typeof foundationPages)[number]['slug']

export const foundationsIndex = {
  metaDescription: l(
    'Schatten foundations — color, typography, spacing, radius, elevation, motion and z-index.',
    'Schatten のファンデーション: 色、タイポグラフィ、余白、角丸、エレベーション、モーション、重なり順。',
  ),
  title: l('Foundations', 'ファンデーション'),
  lead: l(
    'The public design tokens every component is built on, and how to use them. Tokens are generated at build time from the published package.',
    'すべてのコンポーネントが使う公開デザイントークンと、その使い方。トークンの一覧は、ビルド時に npm パッケージから生成している。',
  ),
  back: l('All foundations', 'ファンデーション一覧'),
}

// ---- Color ----------------------------------------------------------------

export interface ColorToken {
  name: string
  role: Localized
}

export interface ColorGroup {
  title: Localized
  note?: Localized
  tokens: readonly ColorToken[]
}

const stateTokens = (name: string, label: Localized): ColorToken[] => [
  { name, role: l(`${label.en} base color`, `${label.ja}の基本色`) },
  { name: `${name}-hover`, role: l(`Hover state for ${label.en}`, `${label.ja}のホバー状態`) },
  { name: `${name}-foreground`, role: l('Text on the base color', '基本色の上の文字') },
  { name: `${name}-subtle`, role: l('Faint tinted background', '淡い色付きの背景') },
  {
    name: `${name}-emphasis`,
    role: l(
      'Readable colored text on subtle or light surfaces',
      'subtle や明るい面の上で読める、色の付いた文字',
    ),
  },
]

export const colorGroups: readonly ColorGroup[] = [
  {
    title: l('Surfaces & foreground', '面と前景'),
    tokens: [
      { name: 'background', role: l('Page background', 'ページの背景') },
      { name: 'surface', role: l('Card and container surfaces', 'カードやコンテナの面') },
      { name: 'surface-hover', role: l('Hover state for surfaces', '面のホバー状態') },
      { name: 'foreground', role: l('Primary text', '主要な文字') },
      {
        name: 'foreground-muted',
        role: l(
          'Secondary and helper text. Meets AA for small text (≥ 4.5:1)',
          '補助的な文字。小さな文字でも AA を満たす(4.5:1 以上)',
        ),
      },
      {
        name: 'foreground-subtle',
        role: l(
          'Tertiary text, for large or incidental text only (AA large text, 3:1)',
          '三番目に目立つ文字。大きな文字や付随的な文字に限る(AA の大きな文字の基準 3:1)',
        ),
      },
    ],
  },
  {
    title: l('Inverted foreground', '反転した前景'),
    note: l(
      'For text on saturated or dark containers, such as a solid Toast or Callout. Mirrors the foreground hierarchy.',
      'solid の Toast や Callout など、彩度の高い面や暗い面の上の文字に使う。前景と同じ階層を持つ。',
    ),
    tokens: [
      {
        name: 'inverted-foreground',
        role: l('Primary text on a saturated surface', '彩度の高い面の上の主要な文字'),
      },
      {
        name: 'inverted-foreground-muted',
        role: l('Secondary text on a saturated surface', '彩度の高い面の上の補助的な文字'),
      },
      {
        name: 'inverted-foreground-subtle',
        role: l('Tertiary text on a saturated surface', '彩度の高い面の上で三番目に目立つ文字'),
      },
    ],
  },
  {
    title: l('Solid', 'Solid'),
    note: l(
      'For filled components. These tokens consume rungs of the Theme scale, so a seasonal theme recolors them.',
      '塗りのコンポーネントに使う。Theme の階調を参照しているので、季節テーマを適用すると色が変わる。',
    ),
    tokens: [
      {
        name: 'solid',
        role: l(
          'Filled component background, such as a primary Button',
          '塗りのコンポーネントの背景。primary の Button など',
        ),
      },
      {
        name: 'solid-hover',
        role: l('Hover state for filled components', '塗りのコンポーネントのホバー状態'),
      },
      {
        name: 'solid-foreground',
        role: l('Text on filled components', '塗りのコンポーネントの上の文字'),
      },
      {
        name: 'solid-foreground-hover',
        role: l(
          'Text on filled components, on hover',
          'ホバー時の、塗りのコンポーネントの上の文字',
        ),
      },
    ],
  },
  {
    title: l('Brand', 'ブランド'),
    note: l(
      'The two brand colors. Unlike state tokens, these name the color itself (朱 vermillion, 藍 indigo) rather than a meaning. Use them for deliberate brand emphasis.',
      'ふたつのブランドカラー。状態トークンと違い、意味ではなく色そのもの(朱、藍)を名前にしている。意図してブランドを強調するときに使う。',
    ),
    tokens: [
      { name: 'vermillion', role: l('Brand color: 朱 vermillion', 'ブランドカラー: 朱') },
      { name: 'vermillion-foreground', role: l('Text on vermillion', '朱の上の文字') },
      { name: 'indigo', role: l('Brand color: 藍 indigo', 'ブランドカラー: 藍') },
      { name: 'indigo-foreground', role: l('Text on indigo', '藍の上の文字') },
    ],
  },
  {
    title: l('Border & ring', 'ボーダーとリング'),
    tokens: [
      { name: 'border', role: l('Default border for dividers', '区切り線に使う標準のボーダー') },
      {
        name: 'border-strong',
        role: l(
          'Strong border, such as a secondary Button',
          '強いボーダー。secondary の Button など',
        ),
      },
      { name: 'ring', role: l('Focus ring', 'フォーカスリング') },
      {
        name: 'ring-offset',
        role: l(
          'Gap between a control and its focus ring',
          'コントロールとフォーカスリングの間の余白',
        ),
      },
    ],
  },
  {
    title: l('Destructive', 'Destructive'),
    note: l(
      'For destructive actions. Shares the red primitive with error, but the meaning differs.',
      '破壊的な操作に使う。error と同じ red の primitive を使うが、意味は別である。',
    ),
    tokens: stateTokens('destructive', l('destructive', 'destructive ')),
  },
  {
    title: l('Error', 'Error'),
    note: l('Form validation and error notifications.', 'フォームの検証とエラーの通知に使う。'),
    tokens: stateTokens('error', l('error', 'error ')),
  },
  {
    title: l('Success', 'Success'),
    tokens: stateTokens('success', l('success', 'success ')),
  },
  {
    title: l('Warning', 'Warning'),
    tokens: stateTokens('warning', l('warning', 'warning ')),
  },
  {
    title: l('Info', 'Info'),
    note: l(
      'Informational notifications. References blue directly, so a theme that retunes the Theme scale does not affect it.',
      '情報の通知に使う。blue を直接参照しているので、テーマが Theme の階調を変えても影響を受けない。',
    ),
    tokens: stateTokens('info', l('info', 'info ')),
  },
  {
    title: l('Non-interactive states', '操作できない状態'),
    note: l(
      'For controls that cannot be used (disabled) or only display a value (readOnly). There is no hover slot.',
      '使えないコントロール(disabled)や、値を表示するだけのコントロール(readOnly)に使う。hover はない。',
    ),
    tokens: [
      {
        name: 'surface-disabled',
        role: l('Background of disabled controls: cool and muted', 'disabled の背景。寒色で控えめ'),
      },
      {
        name: 'foreground-disabled',
        role: l('Text and icons of disabled controls', 'disabled の文字とアイコン'),
      },
      { name: 'border-disabled', role: l('Border of disabled controls', 'disabled のボーダー') },
      {
        name: 'surface-readonly',
        role: l('Background of readOnly controls: warm and static', 'readOnly の背景。暖色で静的'),
      },
      { name: 'border-readonly', role: l('Border of readOnly controls', 'readOnly のボーダー') },
    ],
  },
]

export const colorStates = ['destructive', 'error', 'success', 'warning', 'info'] as const

export const inkAndPaper: readonly ColorToken[] = [
  { name: 'ink-black', role: l('Darkest ink', '最も濃い墨') },
  { name: 'ink-dark', role: l('Secondary ink', '二番目に濃い墨') },
  { name: 'ink-medium', role: l('Medium ink', '中間の墨') },
  { name: 'ink-faint', role: l('Faint ink', '淡い墨') },
  { name: 'ink-light', role: l('Light ink', '薄い墨') },
  {
    name: 'ink-subtle',
    role: l('Faintest ink. Too light for AA text', '最も薄い墨。文字には薄すぎて AA を満たさない'),
  },
  { name: 'paper-white', role: l('Lightest paper', '最も明るい紙') },
  { name: 'paper-warm', role: l('Warm paper', '暖かみのある紙') },
  { name: 'paper-cream', role: l('Cream paper', 'クリーム色の紙') },
]

export const inkAndPaperInverted: readonly ColorToken[] = [
  { name: 'ink-black-inverted', role: l('Strongest ink on dark paper', '暗い紙の上で最も強い墨') },
  { name: 'ink-dark-inverted', role: l('Second ink on dark paper', '暗い紙の上で二番目に強い墨') },
  { name: 'ink-medium-inverted', role: l('Medium ink on dark paper', '暗い紙の上の中間の墨') },
  { name: 'ink-light-inverted', role: l('Light ink on dark paper', '暗い紙の上の薄い墨') },
  { name: 'ink-subtle-inverted', role: l('Faintest ink on dark paper', '暗い紙の上で最も薄い墨') },
  { name: 'paper-white-inverted', role: l('Dark paper for surfaces', '面に使う暗い紙') },
  { name: 'paper-warm-inverted', role: l('Dark paper for the page', 'ページに使う暗い紙') },
  { name: 'paper-cream-inverted', role: l('Lightest dark paper', '暗い紙の中で最も明るい色') },
]

/** Primitive scales in display order. Their steps come from the package. */
export const colorScales: readonly { name: string; title: Localized; note?: Localized }[] = [
  {
    name: 'gray',
    title: l('Gray', 'Gray'),
    note: l(
      'Neutral scale defined in OKLCH for perceptually uniform steps.',
      'OKLCH で定義した、知覚的に均等な無彩色の階調。',
    ),
  },
  {
    name: 'sumi',
    title: l('Sumi (墨)', 'Sumi(墨)'),
    note: l(
      'Ink-tinted neutral with a subtle blue undertone.',
      'わずかに青みを帯びた、墨の無彩色。',
    ),
  },
  {
    name: 'alabaster',
    title: l('Alabaster (和紙)', 'Alabaster(和紙)'),
    note: l(
      'Paper-tinted neutral. Mirrors sumi in lightness and chroma, with a warm hue. It is the default Theme scale.',
      '紙の無彩色。明度と彩度は sumi と同じで、色相だけが暖色である。Theme の標準の階調でもある。',
    ),
  },
  {
    name: 'vermillion',
    title: l('Vermillion (朱)', 'Vermillion(朱)'),
    note: l(
      'The primary brand color. The semantic token uses -600 in light and -400 in dark, the AA-safe rungs, rather than the vivid -500.',
      '第一のブランドカラー。セマンティックトークンは鮮やかな -500 ではなく、AA を満たすライトの -600、ダークの -400 を使う。',
    ),
  },
  {
    name: 'indigo',
    title: l('Indigo (藍)', 'Indigo(藍)'),
    note: l(
      'The second brand color. Deeper and more saturated than blue.',
      '第二のブランドカラー。blue より深く、彩度が高い。',
    ),
  },
  {
    name: 'red',
    title: l('Red', 'Red'),
    note: l(
      'Backs error and destructive. A separate primitive from vermillion, so the two can be retuned independently.',
      'error と destructive の元の色。vermillion とは別の primitive なので、それぞれ独立して調整できる。',
    ),
  },
  { name: 'green', title: l('Green', 'Green') },
  { name: 'yellow', title: l('Yellow', 'Yellow') },
  { name: 'amber', title: l('Amber', 'Amber') },
  {
    name: 'blue',
    title: l('Blue', 'Blue'),
    note: l(
      'Backs info. Independent of the Theme scale, so a theme cannot change its meaning.',
      'info の元の色。Theme の階調から独立しているので、テーマで意味が変わらない。',
    ),
  },
  { name: 'purple', title: l('Purple', 'Purple') },
]

export const colorPage = {
  primitiveTitle: l('Primitive', 'Primitive'),
  primitiveLead: l(
    'Primitives carry no use, and they do not change between light and dark mode.',
    'プリミティブは用途を持たず、ライトとダークで値も変わらない。',
  ),
  semanticTitle: l('Semantic', 'Semantic'),
  semanticLead: l(
    'Each semantic color points at a primitive. The target changes with the mode, which is how components follow light and dark with no code of their own. Each row shows both modes, whichever you are viewing.',
    'セマンティックカラーはそれぞれプリミティブを参照している。参照先がモードで切り替わるので、コンポーネントはコードなしでライト・ダークに追従する。各行には、表示中のモードに関係なく両方のモードを示す。',
  ),
  tokensTitle: l('Tokens by use', '用途別のトークン'),
  light: l('Light', 'ライト'),
  dark: l('Dark', 'ダーク'),
  stateTitle: l('How state tokens work', '状態トークンの仕組み'),
  stateLead: l(
    'Each state has five tokens: <code>base</code> for fills, borders and icons, <code>hover</code>, <code>foreground</code> for text on the base, <code>subtle</code> for a faint background, and <code>emphasis</code> for colored text. Use <code>emphasis</code> for text: <code>base</code> as text falls just under AA for small text.',
    '各状態には 5 つのトークンがある。<code>base</code> は塗り・ボーダー・アイコン、<code>hover</code> はホバー、<code>foreground</code> は base の上の文字、<code>subtle</code> は淡い背景、<code>emphasis</code> は色の付いた文字に使う。<code>base</code> を文字に使うと、小さな文字の AA 基準にわずかに届かない。',
  ),
  treatmentsTitle: l('Combinations', '組み合わせ'),
  treatmentsLead: l(
    'How the tokens are used together. Toggle the theme to compare both modes.',
    'トークンの組み合わせ方。テーマを切り替えると両方のモードを比べられる。',
  ),
  sample: l('The quick brown fox jumps over the lazy dog', '素早い茶色の狐が怠惰な犬を飛び越える'),
  nonInteractiveTitle: l('Disabled and readOnly', 'disabled と readOnly'),
  nonInteractiveLead: l(
    'Disabled uses a cool, muted palette to say “not usable”. ReadOnly uses a warm palette to say “the value is informational, but static”.',
    'disabled は寒色の控えめな配色で「使えない」ことを示す。readOnly は暖色の配色で「値は読めるが変更できない」ことを示す。',
  ),
  filledTitle: l('Filled', '塗り'),
  filledLead: l(
    '<code>X</code> as the background with <code>X-foreground</code> as the text.',
    '<code>X</code> を背景に、<code>X-foreground</code> を文字に使う。',
  ),
  subtleTitle: l('Subtle', '淡色'),
  subtleLead: l(
    '<code>X-subtle</code> as the background with <code>X-emphasis</code> as the text.',
    '<code>X-subtle</code> を背景に、<code>X-emphasis</code> を文字に使う。',
  ),
  inkTitle: l('Ink & paper', '墨と紙'),
  inkLead: l(
    'Names for the colors of ink and paper. Most ink tokens are aliases of a rung on a scale; the paper tones have values of their own. They still describe a color, not a use.',
    '墨と紙の色に付けた名前である。墨の多くは階調の 1 段の別名で、紙は固有の値を持つ。どちらも用途ではなく色を表す。',
  ),
  inkInvertedTitle: l('Ink & paper for dark mode', 'ダークモードの墨と紙'),
  inkInvertedLead: l(
    'The dark-mode counterparts. Semantic colors switch to these in dark mode.',
    'ライト用の墨と紙に対応する、ダークモード用の色。セマンティックカラーはダークモードでこれらに切り替わる。',
  ),
  scalesTitle: l('Color scales', '色の階調'),
  themeTitle: l('Theme ramp', 'Theme 階調'),
  themeNote: l(
    'A layer between the two tiers: <code>--color-theme-*</code> is what the solid family references. With no seasonal theme it points at the alabaster scale, and a seasonal theme replaces the whole ramp.',
    'ふたつの層の間にある階調である。solid 系は <code>--color-theme-*</code> を参照している。季節テーマがなければ alabaster を指し、季節テーマはこの階調全体を置き換える。',
  ),
  seasonsTitle: l('Seasonal themes', '季節テーマ'),
  seasonsLead: l(
    'Eight themes based on the Japanese solar terms. Each replaces <code>--color-theme-*</code> through the <code>data-theme</code> attribute on the root element, with values like <code>season--spring-early</code>.',
    '二十四節気に基づく 8 つのテーマ。ルート要素の <code>data-theme</code> 属性に <code>season--spring-early</code> のような値を指定すると、<code>--color-theme-*</code> が置き換わる。',
  ),
}

// ---- Typography -----------------------------------------------------------

type TextVariant = 'heading' | 'body' | 'label'
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const typeRoles: readonly {
  title: Localized
  note: Localized
  variant: TextVariant
  sizes: readonly { size: TextSize; use: Localized }[]
}[] = [
  {
    title: l('Heading', 'Heading'),
    note: l(
      'Page titles, section headers and card headings. Semibold or bold, with snug or tight leading.',
      'ページタイトル、セクション見出し、カード見出しに使う。ウェイトは semibold か bold で、行送りは詰める。',
    ),
    variant: 'heading',
    sizes: [
      { size: '2xl', use: l('Display titles', '表示用のタイトル') },
      { size: 'xl', use: l('Page titles', 'ページタイトル') },
      { size: 'lg', use: l('Section titles', 'セクションタイトル') },
      { size: 'md', use: l('Subsection titles', 'サブセクションタイトル') },
      { size: 'sm', use: l('Card titles', 'カードタイトル') },
    ],
  },
  {
    title: l('Body', 'Body'),
    note: l(
      'Paragraphs, descriptions and general content. Normal weight, with relaxed leading for readability.',
      '段落、説明、一般的な内容に使う。ウェイトは normal で、読みやすいよう行送りはゆったりしている。',
    ),
    variant: 'body',
    sizes: [
      { size: 'lg', use: l('Lead paragraphs and introductions', 'リード文や導入') },
      { size: 'md', use: l('Default body text', '標準の本文') },
      { size: 'sm', use: l('Secondary text and descriptions', '補助的な文字や説明') },
      { size: 'xs', use: l('Captions and footnotes', 'キャプションや脚注') },
    ],
  },
  {
    title: l('Label', 'Label'),
    note: l(
      'Form labels, buttons, navigation and badges. Medium weight, with tight leading.',
      'フォームのラベル、ボタン、ナビゲーション、バッジに使う。ウェイトは medium で、行送りは詰める。',
    ),
    variant: 'label',
    sizes: [
      { size: 'lg', use: l('Navigation items', 'ナビゲーションの項目') },
      { size: 'md', use: l('Form labels and buttons', 'フォームのラベルとボタン') },
      { size: 'sm', use: l('Tags and badges', 'タグとバッジ') },
      { size: 'xs', use: l('Overlines and micro labels', 'オーバーラインや小さなラベル') },
    ],
  },
]

export const typeFaces: readonly { token: string; name: string; note: Localized }[] = [
  {
    token: '--font-sans',
    name: 'Hanken Grotesk / LINE Seed JP',
    note: l(
      'The default for UI and body text. Load both faces yourself; otherwise it falls back to the system sans stack. LINE Seed JP has no 500 or 600 weight, so Japanese glyphs use the nearest available weight.',
      'UI と本文の標準の書体。どちらのフォントも利用側で読み込む。読み込まないとシステムのサンセリフになる。LINE Seed JP には 500 と 600 がないので、和文は最も近いウェイトで表示される。',
    ),
  },
  {
    token: '--font-serif',
    name: 'EB Garamond / Noto Serif JP',
    note: l(
      'Editorial serif, used through <code>&lt;Text family="serif"&gt;</code>. Load weights 400 to 700 yourself: a missing weight renders as synthetic bold.',
      '長文や見出し向けのセリフ体。<code>&lt;Text family="serif"&gt;</code> で使う。ウェイト 400〜700 を利用側で読み込む。足りないウェイトは合成の太字になる。',
    ),
  },
  {
    token: '--font-mono',
    name: 'System monospace',
    note: l('For code and technical content.', 'コードや技術的な内容に使う。'),
  },
]

export const typographyPage = {
  familiesTitle: l('Font families', '書体'),
  sampleLatin: 'The quick brown fox jumps over the lazy dog.',
  sampleJa: '素早い茶色の狐が怠惰な犬を飛び越える。',
  sizeAdjustTitle: l('Japanese and Latin sizes', '和文と欧文のサイズ'),
  sizeAdjustLead: l(
    'At the same pixel size, Latin faces look smaller than Japanese faces, which fill their em box. Schatten applies <code>font-size-adjust: cap-height</code> library-wide to lift Latin glyphs to the Japanese height. Tune or turn it off with <code>--st-font-size-adjust</code>.',
    '同じ px では、em ボックスいっぱいに字面を持つ和文より、欧文のほうが小さく見える。Schatten はライブラリ全体に <code>font-size-adjust: cap-height</code> を適用し、欧文を和文の高さに合わせている。調整や無効化は <code>--st-font-size-adjust</code> で行う。',
  ),
  scaleTitle: l('Type scale', 'タイプスケール'),
  primitivesTitle: l('Primitives', 'Primitive'),
  primitivesLead: l(
    'The values behind the roles. Do not apply them to your own elements: go through <code>Text</code>.',
    'ロールの元になる値。自前の要素に直接指定せず、<code>Text</code> を通して使う。',
  ),
  sizesTitle: l('Font sizes', 'フォントサイズ'),
  leadingTitle: l('Line heights', '行送り'),
  sample: l('Typography 文字組み', '文字組み Typography'),
}

// ---- Spacing --------------------------------------------------------------

export const spacingPage = {
  scaleTitle: l('Scale', '尺度'),
  scaleLead: l(
    'These are the public, recommended values. Half steps such as <code>--spacing-0-5</code> and odd steps such as <code>--spacing-7</code> exist for use inside components, so application code does not normally reach for them.',
    'ここに並ぶのが公開された推奨値である。<code>--spacing-0-5</code> のような半段や <code>--spacing-7</code> のような奇数の段はコンポーネント内部用で、アプリケーションでは基本的に使わない。',
  ),
  recommendedTitle: l('Recommended steps', '推奨する段階'),
  innerTitle: l('Inner spacing: gap and padding', '内側の余白: gap と padding'),
  innerLead: l(
    'Between elements inside a component or a tight group.',
    'コンポーネントや密なまとまりの内側の間隔。',
  ),
  innerSteps: ['1', '2', '3', '4', '6', '8'],
  outerTitle: l('Outer spacing: margins and section gaps', '外側の余白: margin とセクション間隔'),
  outerLead: l(
    'Between components and between page sections.',
    'コンポーネントの間やページのセクションの間隔。',
  ),
  outerSteps: ['4', '6', '8', '12', '16'],
  stayTitle: l('Stay on the scale', '尺度から外れない'),
  stayRules: [
    l(
      'Off-scale values render fine, so nothing stops them: this is a rule to keep. Choose the nearest recommended step.',
      '尺度外の値でも描画はされるので、仕組みでは防げない。運用で守る規則として、最も近い推奨値を選ぶ。',
    ),
  ],
  save: l('Save', '保存'),
  cancel: l('Cancel', 'キャンセル'),
  layoutTitle: l('No layout components', 'レイアウト用コンポーネントはない'),
  layoutLead: l(
    'Schatten deliberately ships no <code>Stack</code> or <code>HStack</code>. Compose spacing directly with <code>flex</code> and <code>gap</code> on these tokens, so layout reads inline at the call site.',
    'Schatten は意図的に <code>Stack</code> や <code>HStack</code> を提供していない。余白のトークンを使い、<code>flex</code> と <code>gap</code> で直接組む。レイアウトが呼び出し側のコードでそのまま読める。',
  ),
}

// ---- Radius / Elevation ---------------------------------------------------

export interface SemanticStep {
  name: string
  applied: boolean
  use: Localized
}

export const statusLabels = {
  applied: l('Applied', '適用済み'),
  defined: l('Defined only', '定義のみ'),
}

export const radiusPage = {
  scaleTitle: l('Scale', '尺度'),
  scaleLead: l(
    '<code>--radius-full</code> is a sentinel that rounds any element into a pill or circle. The others are fixed lengths.',
    '<code>--radius-full</code> はどの要素もピル形や円にするための特別な値で、他は固定の長さである。',
  ),
  semanticTitle: l('Semantic tokens', 'セマンティックトークン'),
  semanticLead: l(
    'Each one is an alias of a step above. “Defined only” tokens wait for a component to use them.',
    'それぞれ上の段階の別名である。「定義のみ」のトークンは、使うコンポーネントがまだない。',
  ),
  semantic: [
    {
      name: '--radius-pill',
      applied: true,
      use: l('Chips and toggles: Badge, Radio, Switch', 'チップやトグル: Badge、Radio、Switch'),
    },
    {
      name: '--radius-control',
      applied: false,
      use: l(
        'Buttons and text inputs. Button and Input are square today',
        'ボタンとテキスト入力。現在の Button と Input は角が四角い',
      ),
    },
    {
      name: '--radius-surface',
      applied: false,
      use: l(
        'Larger floating surfaces. Dialog and Select content are square today',
        '浮いて表示される大きな面。現在の Dialog と Select の中身は角が四角い',
      ),
    },
  ] satisfies SemanticStep[],
}

export const elevationPage = {
  scaleTitle: l('Scale', '尺度'),
  scaleLead: l(
    'The primitives behind the semantic tokens. <code>--shadow-xl</code> ships in the scale, but no component uses it yet.',
    'セマンティックトークンの元になる段階。<code>--shadow-xl</code> は尺度に含まれるが、まだどのコンポーネントも使っていない。',
  ),
  semanticTitle: l('Semantic tokens', 'セマンティックトークン'),
  semanticLead: l(
    'Pick by surface type. Each token already encodes the right depth.',
    '面の種類で選ぶ。各トークンに適切な深さが含まれている。',
  ),
  semantic: [
    {
      name: '--shadow-card',
      applied: true,
      use: l(
        'Resting content cards. The lowest elevation',
        'ページに置かれたコンテンツのカード。エレベーションは最も低い',
      ),
    },
    {
      name: '--shadow-popover',
      applied: true,
      use: l(
        'Transient floating content: Tooltip, Select content',
        '一時的に浮かぶ内容: Tooltip、Select の中身',
      ),
    },
    {
      name: '--shadow-toast',
      applied: true,
      use: l(
        'Notifications that overlay content but are not modal',
        '内容に重なるが、モーダルではない通知',
      ),
    },
    {
      name: '--shadow-modal',
      applied: true,
      use: l(
        'Focus-trapping surfaces: Dialog. The highest elevation today',
        'フォーカスを閉じ込める面: Dialog。エレベーションは現在最も高い',
      ),
    },
  ] satisfies SemanticStep[],
  overTitle: l('Do not over-elevate', '影を付けすぎない'),
  overRules: [
    l(
      'A shadow is a signal, not decoration. Most in-flow content is right with no shadow.',
      '影は装飾ではなく合図である。通常の流れにある内容の多くは、影なしが正しい。',
    ),
    l(
      'Reserve elevation for what really floats above the page. Stacking many shadowed surfaces flattens the hierarchy.',
      '影は実際にページの上に浮くものに限る。影のある面を重ねすぎると、階層が分からなくなる。',
    ),
  ],
  darkTitle: l('Dark mode', 'ダークモード'),
  darkLead: l(
    'There are no dark-specific shadow tokens. The same translucent black reads softer against a dark surface, and that is intended.',
    'ダーク専用の影トークンはない。同じ半透明の黒は暗い面の上では弱く見えるが、これは意図した見え方である。',
  ),
}

// ---- Motion ---------------------------------------------------------------

export const motionPage = {
  scaleTitle: l('Duration scale', '時間の尺度'),
  scaleLead: l(
    'Three steps that are perceptually distinct. Run the transition to compare them: the faster knob settles first.',
    '知覚的に区別できる 3 段階。実行すると、速いノブから先に止まる。',
  ),
  run: l('Run transition', '実行する'),
  reset: l('Reset', '戻す'),
  reducedNote: l(
    'prefers-reduced-motion is on, so this demo runs without a transition.',
    'prefers-reduced-motion が有効なので、このデモは動きなしで実行する。',
  ),
  semanticTitle: l('By intent', '用途別'),
  semanticLead: l(
    'The <code>--motion-*</code> tokens are named aliases of the steps. They are defined only: hover transitions are still hardcoded in components, and enter and exit use <code>--st-duration-*</code>. The values carry no easing, so specify your own.',
    '<code>--motion-*</code> は各段階に用途の名前を付けた別名である。現時点では定義のみで、コンポーネントのホバーは固定値、表示と非表示は <code>--st-duration-*</code> を使っている。値にイージングは含まれないので、利用側で指定する。',
  ),
  semantic: [
    {
      name: '--motion-quick',
      applied: false,
      use: l(
        'Hover and exit: light feedback that should feel near-instant',
        'ホバーと非表示: ほぼ一瞬に感じさせたい軽いフィードバック',
      ),
    },
    {
      name: '--motion-base',
      applied: false,
      use: l('The default for most enter transitions', '多くの表示遷移の標準'),
    },
    {
      name: '--motion-expressive',
      applied: false,
      use: l(
        'Dialog and drawer enter: larger surfaces read as deliberate when a little slower',
        'Dialog やドロワーの表示: 大きな面は少し遅いほうが落ち着いて見える',
      ),
    },
  ] satisfies SemanticStep[],
  rulesTitle: l('Principles', '原則'),
  rules: [
    l(
      'Respect <code>prefers-reduced-motion</code>. Every animated component turns motion off under it, and new motion must do the same.',
      '<code>prefers-reduced-motion</code> を尊重する。動きのあるコンポーネントはすべて、これが有効なら動きを止める。新しい動きも同様にする。',
    ),
    l(
      'Do not animate without a reason. If a transition does not help the user see what changed, leave it out.',
      '理由なく動かさない。何が変わったかの理解に役立たないトランジションは入れない。',
    ),
    l(
      'Continuous loops such as the Spinner use timing of their own, not this scale.',
      'Spinner のような繰り返しの動きは、この尺度ではなく独自のタイミングを使う。',
    ),
  ],
}

// ---- Z-index --------------------------------------------------------------

export const zIndexPage = {
  scaleTitle: l('Scale', '尺度'),
  scaleLead: l(
    'Values increase strictly with stacking order. The four lowest slots have no consumer in the library and are reserved for your own page chrome.',
    '値は重なり順に沿って増える。下の 4 つはライブラリでは使っておらず、ページ側の要素のために空けてある。',
  ),
  layers: {
    '--z-base': l('Default flow', '通常の流れ'),
    '--z-dropdown': l('Reserved for your page', 'ページ側用に予約'),
    '--z-sticky': l('Reserved for your sticky chrome', 'ページ側の sticky 要素用に予約'),
    '--z-fixed': l('Reserved for your fixed chrome', 'ページ側の fixed 要素用に予約'),
    '--z-modal-backdrop': l('Dialog overlay', 'Dialog のオーバーレイ'),
    '--z-modal': l('Dialog content', 'Dialog の中身'),
    '--z-popover': l('Select and Popover content', 'Select と Popover の中身'),
    '--z-tooltip': l('Tooltip', 'Tooltip'),
    '--z-toast': l('Toast, the front-most layer', 'Toast。最前面'),
  } as Record<string, Localized>,
  paintTitle: l('Paint order', '描画順'),
  paintLead: l(
    'The later token paints on top, regardless of DOM order. Here the DOM runs from front to back, and the tokens still win.',
    'DOM の順序に関係なく、後のトークンが手前に描かれる。この例の DOM は手前から奥の順に並んでいるが、それでも描画はトークンの順になる。',
  ),
  paintTokens: ['--z-toast', '--z-tooltip', '--z-popover', '--z-modal', '--z-modal-backdrop'],
  ruleTitle: l('Your own stacking values', 'アプリケーション側の重なり順'),
  rules: [
    l(
      'Keep your own z-index values outside the <code>0–100</code> band, so they cannot collide with Schatten’s overlays.',
      'Schatten のオーバーレイと衝突しないよう、自前の z-index は <code>0–100</code> の外に置く。',
    ),
  ],
}
