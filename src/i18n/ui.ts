import type { CategoryId } from './guides'

// Site copy, both locales. Strings that carry inline markup (<code>…</code>)
// are marked `Html` and injected with `set:html` — they are authored
// constants, never user input.
//
// Shape: `common` (shell chrome) + one group per page. A missing string in
// either locale is a type error, so the two editions cannot drift apart.
// Per-component guide copy is in ./guides.ts.

// `en` is the default locale: it renders at `/`, and `ja` at `/ja/`.
// The site's primary reader is an evaluator who may not read Japanese, so the
// bare URL serves English; the Japanese edition is one click away.
export const locales = ['en', 'ja'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

type Html = string

interface Common {
  langSwitchLabel: string
  themeToggleLabel: string
  navBrand: string
  navComponents: string
  navFoundations: string
}

interface Landing {
  metaDescription: string
  heroTitle: string
  heroLead: Html
  ctaGetStarted: string
  ctaComponents: string
  proofTitle: string
  proofDesc: string
  proofRenderLabel: string
  proofRenderButton: string
  proofFooter: Html
  calloutNote: Html
}

interface Brand {
  metaDescription: string
  pageTitle: string
  thesis: Html
  /** Plain-language origin statement: the German name, the source essay, the design intent. Deliberately unpoetic — sits under `thesis`, not instead of it. */
  origin: Html
  gradationPaper: string
  gradationInk: string

  colorLabel: string
  colorTitle: string
  colorLead: Html
  /** 朱 / 墨 / 和紙 / 藍 — name, romanised primitive, role. */
  colorSwatches: readonly [
    { name: string; token: string; role: string },
    { name: string; token: string; role: string },
    { name: string; token: string; role: string },
    { name: string; token: string; role: string },
  ]
  warmCoolTitle: string
  warmCoolLead: Html
  warmLabel: string
  coolLabel: string
  achromaticLabel: string
  chromaticLabel: string
  mirrorTitle: string
  mirrorLead: Html
  chromaticRampTitle: string
  oklchNote: Html

  seasonsLabel: string
  seasonsTitle: string
  seasonsLead: Html
  seasonNames: readonly [string, string, string, string, string, string, string, string]
  seasonsNote: string

  typeLabel: string
  typeTitle: string
  typeLead1: Html
  typeLead2: Html
  faceSansRole: string
  faceSerifRole: string
  faceSampleLatin: string
  faceSampleJa: string
  scaleTitle: string
  scaleLead: Html
  scaleSample: string
  roleNote: Html
}

interface ComponentsPage {
  metaDescription: string
  pageTitle: string
  title: string
  lead: Html
  liveTitle: string
  liveDesc: string
  saveLabel: string
  savingDoneLabel: string
  switchLabel: string
  errorToggleLabel: string
  inputPlaceholder: string
  listLead: Html
  categories: Record<CategoryId, string>
  storybookTitle: string
  storybookNote: Html
}

interface ComponentDetail {
  backLabel: string
  usageTitle: string
  guideTitle: string
  doLabel: string
  dontLabel: string
  storybookCta: string
}

/** Labels inside the live examples on the component pages. */
export interface DemoCopy {
  save: string
  cancel: string
  delete: string
  draft: string
  status: string
  name: string
  email: string
  errorMessage: string
  notifications: string
  terms: string
  message: string
  open: string
  menuRename: string
  menuDuplicate: string
  dialogTitle: string
  dialogBody: string
  optionA: string
  optionB: string
  tabA: string
  tabB: string
  tabBodyA: string
  tabBodyB: string
  hint: string
  noticeTitle: string
  noticeBody: string
  tableCaption: string
  tableItem: string
  tableAmount: string
  toastTitle: string
  cardTitle: string
  cardBody: string
}

interface Strings {
  common: Common
  landing: Landing
  brand: Brand
  components: ComponentsPage
  detail: ComponentDetail
  demo: DemoCopy
}

export const ui: Record<Locale, Strings> = {
  en: {
    common: {
      langSwitchLabel: '日本語',
      themeToggleLabel: 'Toggle light / dark mode',
      navBrand: 'Brand',
      navComponents: 'Components',
      navFoundations: 'Foundations',
    },
    landing: {
      metaDescription:
        'Schatten design system — React components and a framework-agnostic CSS class API on one token foundation.',
      heroTitle: 'Interfaces with shadow, shipped in two layers.',
      heroLead:
        'React components, and CSS classes you can use in plain HTML. Schatten ships both on one set of design tokens.<br>This page is built with the React components and rendered to static HTML at build time; what reaches your browser is that HTML and the single stylesheet we publish.',
      ctaGetStarted: 'Get started',
      ctaComponents: 'Browse components',
      proofTitle: 'One button, two ways to write it',
      proofDesc:
        'React or plain HTML — the same single stylesheet arrives, so the render is identical.',
      proofRenderLabel: 'Render (live on this page)',
      proofRenderButton: 'Save',
      proofFooter:
        'This sample is painted by the same <code>dist/schatten.css</code> as the page you are reading.',
      calloutNote:
        'Dark mode follows the OS setting (<code>prefers-color-scheme</code>). That switch is the token layer’s job too — zero page-side code.',
    },
    brand: {
      pageTitle: 'Brand Concept',
      metaDescription:
        'Schatten brand concept — shadow as the gradation between paper and ink: sumi, washi, vermillion, indigo, and the eight seasonal markers.',
      thesis:
        'Shadow is not the absence of light.<br>It is the <em>gradation</em> that arises between paper and ink.',
      origin:
        'Schatten is German for “shadow.” It implements the portfolio site’s brand concept, <em>In Praise of Shadows</em> (Jun’ichirō Tanizaki), as component-level design tokens instead of page-level visuals.',
      gradationPaper: 'paper · washi',
      gradationInk: 'ink · shadow',

      colorLabel: 'Color',
      colorTitle: 'Four colors, named in Japanese',
      colorLead:
        'Schatten’s primitives carry Japanese names. The values below are the real v1.0.0 tokens (<a href="https://github.com/yasmro/schatten/blob/v1.0.0/src/core/tokens/primitives.css"><code>src/core/tokens/primitives.css</code></a> in <code>yasmro/schatten</code>).',
      colorSwatches: [
        {
          name: 'Vermillion',
          token: '朱 · vermillion',
          role: 'The brand’s heat. The vermillion of shrine gates, seals, and lacquer.',
        },
        {
          name: 'Sumi ink',
          token: '墨 · sumi',
          role: 'Foreground and text. An achromatic that leans cool.',
        },
        {
          name: 'Washi paper',
          token: '和紙 · alabaster',
          role: 'Surfaces and ground. An achromatic that leans warm.',
        },
        {
          name: 'Indigo',
          token: '藍 · indigo',
          role: 'The second brand color. Ink that carries chroma.',
        },
      ],
      warmCoolTitle: 'Ink runs cool, paper runs warm — at identical chroma',
      warmCoolLead:
        '<code>sumi</code> and <code>alabaster</code> share the same lightness and the same chroma; <strong>only the hue differs, 250 against 70</strong>. Both read as near-neutral, yet ink tilts blue and paper tilts yellow.',
      warmLabel: 'warm',
      coolLabel: 'cool',
      achromaticLabel: 'achromatic',
      chromaticLabel: 'chromatic',
      mirrorTitle: 'All eleven steps are mirrored',
      mirrorLead:
        'This is not a fact about the <code>-500</code> rung alone. <strong>Every one of the eleven steps matches in lightness and chroma; only the hue parts.</strong> Ink and paper share one ladder.',
      chromaticRampTitle: 'The chromatic pair has the same eleven steps',
      oklchNote:
        'Everything is defined in OKLCH. The space is perceptually uniform, so “the same lightness” holds <strong>to the eye</strong>, not merely in the arithmetic.',

      seasonsLabel: 'Seasons',
      seasonsTitle: 'Eight seasons, one lightness',
      seasonsLead:
        'A season (a Special theme) swaps only the <code>--color-theme-*</code> ramp. Every 500 rung sits at L 64%, every 700 rung at L 46% — hue and chroma move, nothing else. The dates match the classical <strong>eight markers</strong>: the four beginnings and the two solstices and equinoxes.',
      seasonNames: [
        'Spring begins',
        'Spring equinox',
        'Summer begins',
        'Summer solstice',
        'Autumn begins',
        'Autumn equinox',
        'Winter begins',
        'Winter solstice',
      ],
      seasonsNote:
        'Seasons turn; legibility does not. The eight markers carry color alone and never touch the lightness ladder.',

      typeLabel: 'Type',
      typeTitle: 'Speaking two languages at once',
      typeLead1:
        'The <strong>structure</strong> is Western engineering vocabulary — shadcn, Radix, OKLCH, BEM, CVA. The <strong>surface</strong> is Japanese aesthetic vocabulary — vermillion, ink, washi, indigo, the eight markers. Neither decorates the other.',
      typeLead2:
        'That duality is not confined to names and colors; it is implemented in the typesetting. Both the sans and the serif role <strong>pair a Latin face with a Japanese face</strong> into a single stack. Being bilingual is the default state.',
      faceSansRole: 'sans — UI and body',
      faceSerifRole: 'serif — headings and long form',
      faceSampleLatin: 'Paper &amp; Ink',
      faceSampleJa: '紙と墨',
      scaleTitle: 'Eight sizes, six leadings',
      scaleLead:
        'Sizes come from <code>--text-*</code>, leading from <code>--leading-*</code> — public tokens, all in <code>rem</code>.',
      scaleSample: 'Typography 文字組み',
      roleNote:
        'Note that <strong>body / label / heading are not CSS variables</strong>. Size, leading, and weight are three properties, and a single <code>var()</code> cannot carry three — so the roles bind to the <code>.st-text--*</code> class rules instead.',
    },
    components: {
      pageTitle: 'Components',
      metaDescription:
        'Every Schatten component, with a live React island — the second delivery layer, running on this page.',
      title: 'Components',
      lead: 'Every component, with a guide on when and how to use it.',
      liveTitle: 'Live — this corner is a React island',
      liveDesc:
        'The rest of this site uses the same React components, rendered to static HTML at build time with no JavaScript shipped. This card hydrates them for real — real state, real events, real ARIA wiring — through the same exports map a consumer uses.',
      saveLabel: 'Save',
      savingDoneLabel: 'Saved ✓',
      switchLabel: 'Notifications',
      errorToggleLabel: 'Show the error state',
      inputPlaceholder: 'Email address',
      listLead:
        'Generated at build time from the published <code>@yasmro/schatten</code> package: every component that ships a CSS subpath.',
      categories: {
        action: 'Action',
        form: 'Form',
        display: 'Data display',
        navigation: 'Navigation',
        feedback: 'Feedback',
        overlay: 'Overlay',
      },
      storybookTitle: 'Storybook',
      storybookNote:
        '<a href="%STORYBOOK%">Storybook</a> is where behavior is verified and tested. Each component page links to its own entry.',
    },
    detail: {
      backLabel: 'All components',
      usageTitle: 'Usage',
      guideTitle: 'Guidelines',
      doLabel: 'Do',
      dontLabel: 'Don’t',
      storybookCta: 'Open in Storybook',
    },
    demo: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      draft: 'Draft',
      status: 'Active',
      name: 'Name',
      email: 'Email address',
      errorMessage: 'Enter a full address, like name@example.com.',
      notifications: 'Notifications',
      terms: 'Accept the terms',
      message: 'Message',
      open: 'Open',
      menuRename: 'Rename',
      menuDuplicate: 'Duplicate',
      dialogTitle: 'Delete this project?',
      dialogBody: 'This cannot be undone.',
      optionA: 'Free',
      optionB: 'Pro',
      tabA: 'Account',
      tabB: 'Billing',
      tabBodyA: 'Account settings.',
      tabBodyB: 'Billing settings.',
      hint: 'A short hint',
      noticeTitle: 'Trial ends soon',
      noticeBody: 'Add a payment method to keep your data.',
      tableCaption: 'Invoices',
      tableItem: 'Item',
      tableAmount: 'Amount',
      toastTitle: 'Saved',
      cardTitle: 'Usage',
      cardBody: '12 of 20 seats in use.',
    },
  },
  ja: {
    common: {
      langSwitchLabel: 'English',
      themeToggleLabel: 'ライト / ダークを切り替え',
      navBrand: 'ブランド',
      navComponents: 'コンポーネント',
      navFoundations: 'ファンデーション',
    },
    landing: {
      metaDescription:
        'Schatten design system — React コンポーネントと、フレームワークに依存しない CSS クラス API を、共通のトークン基盤の上に。',
      heroTitle: '階調のあるインターフェースを、ふたつの配信層で。',
      heroLead:
        'React のコンポーネントと、素の HTML で使える CSS クラス。Schatten はこの両方を、共通のデザイントークンの上で提供しています。<br>このページ自体も React コンポーネントで組み、ビルド時に静的 HTML へ書き出しています。ブラウザに届くのは、その HTML と配布している CSS 1 枚です。',
      ctaGetStarted: 'Get started',
      ctaComponents: 'コンポーネントを見る',
      proofTitle: 'ひとつのボタン、ふたつの書き方',
      proofDesc: 'React でも、素の HTML でも、届く CSS は同じ 1 枚。だから描画も同じになります。',
      proofRenderLabel: 'Render(このページの実物)',
      proofRenderButton: '保存',
      proofFooter:
        'この見本を描画しているのも、いま読んでいるページ全体と同じ <code>dist/schatten.css</code> です。',
      calloutNote:
        'ダークモードは OS 設定に追従します(<code>prefers-color-scheme</code>)。この切り替えもトークン層の仕事で、ページ側のコードはゼロです。',
    },
    brand: {
      pageTitle: 'ブランドコンセプト',
      metaDescription:
        'Schatten のブランドコンセプト: 紙と墨のあいだに生まれる階調としての影。朱・墨・和紙・藍と八節。',
      thesis:
        'Schatten の影は、光の不在ではなく、<br>紙と墨のあいだに生まれる<em>階調</em>である。',
      origin:
        'Schatten はドイツ語で「影」を意味する。ポートフォリオサイトのブランドコンセプト『陰翳礼讃』(谷崎潤一郎)を、ページ単位ではなくボタンや文字などのコンポーネント単位のデザイントークンとして実装した。',
      gradationPaper: '紙 · 和紙',
      gradationInk: '墨 · 影',

      colorLabel: '色',
      colorTitle: '和の名前を持つ四つの色',
      colorLead:
        'Schatten の primitive の色名は、和の語彙に由来する。数値は v1.0.0 の実トークンである(<code>yasmro/schatten</code> の <a href="https://github.com/yasmro/schatten/blob/v1.0.0/src/core/tokens/primitives.css"><code>src/core/tokens/primitives.css</code></a>)。',
      colorSwatches: [
        {
          name: '朱',
          token: 'vermillion',
          role: '第一のブランドカラー。鳥居・印章・漆の朱。',
        },
        {
          name: '墨',
          token: 'sumi',
          role: '前景と文字に使う。寒色寄りの無彩色。',
        },
        {
          name: '和紙',
          token: 'alabaster',
          role: '面と背景に使う。暖色寄りの無彩色。',
        },
        {
          name: '藍',
          token: 'indigo',
          role: '第二のブランドカラー。墨に近い色相で、彩度が高い。',
        },
      ],
      warmCoolTitle: '墨は寒色、紙は暖色で、彩度は同じ',
      warmCoolLead:
        '<code>sumi</code> と <code>alabaster</code> は明度も彩度も同じで、<strong>色相だけが 250 と 70 で正反対</strong>である。どちらもほぼ無彩色に見えるが、墨は青みに、紙は黄みに寄っている。',
      warmLabel: '暖 · warm',
      coolLabel: '寒 · cool',
      achromaticLabel: '無彩 C≈0.01',
      chromaticLabel: '有彩',
      mirrorTitle: '全 11 段で明度と彩度が一致する',
      mirrorLead:
        '<code>-500</code> に限らず、<strong>全 11 段で明度と彩度が一致し、違うのは色相だけ</strong>だ。墨と和紙は、同じ階調を持つ一対である。',
      chromaticRampTitle: '有彩の二色も、同じ 11 段の階調を持つ',
      oklchNote:
        'すべて OKLCH で定義している。知覚的に均等な色空間なので、数値の明度が同じなら、<strong>見た目の明るさも揃う</strong>。',

      seasonsLabel: '季節',
      seasonsTitle: '八つの季節は明度が同じ',
      seasonsLead:
        '季節(Special テーマ)は <code>--color-theme-*</code> のランプだけを替える。500 段はすべて L 64%、700 段はすべて L 46% に固定されていて、変わるのは色相と彩度だけだ。区切りの日付は、古典的な<strong>八節</strong>(四立と二至二分)と一致する。',
      seasonNames: ['立春', '春分', '立夏', '夏至', '立秋', '秋分', '立冬', '冬至'],
      seasonsNote:
        '季節テーマは色だけを替え、明度の段階は変えないので、どの季節でも読みやすさは変わらない。',

      typeLabel: '書体',
      typeTitle: '構造は西洋の工学、表層は和の美学',
      typeLead1:
        '<strong>構造</strong>には西洋の工学語彙(shadcn / Radix / OKLCH / BEM / CVA)を、<strong>表層</strong>には和の美学語彙(朱・墨・和紙・藍・八節)を使っている。どちらも他方の装飾ではない。',
      typeLead2:
        'この組み合わせは、名前や色名だけでなく組版にも実装している。sans も serif も、<strong>欧文フェイスと和文フェイスを明示的に対にして</strong>ひとつのスタックを組む。欧文と和文の両方を扱えることが、既定の状態である。',
      faceSansRole: 'sans — UI・本文',
      faceSerifRole: 'serif — 見出し・長文',
      faceSampleLatin: 'Paper &amp; Ink',
      faceSampleJa: '紙と墨',
      scaleTitle: 'サイズは 8 段、行送りは 6 段',
      scaleLead:
        'サイズは <code>--text-*</code>、行送りは <code>--leading-*</code>。いずれも <code>rem</code> 基準の公開トークン。',
      scaleSample: '文字組み Typography',
      roleNote:
        'なお <strong>body / label / heading というロールは CSS 変数ではない</strong>。サイズ・行送り・ウェイトの 3 つを 1 つの <code>var()</code> では表せないため、<code>.st-text--*</code> のクラス規則にまとめている。',
    },
    components: {
      pageTitle: 'コンポーネント',
      metaDescription:
        'Schatten の全コンポーネント一覧と、React island によるライブデモ — 第二の配信層がこのページで動いている。',
      title: 'コンポーネント',
      lead: '全コンポーネントの一覧。各ページに、使いどころと使い方のガイドがある。',
      liveTitle: 'Live — この一角だけ React island',
      liveDesc:
        'サイトの他の部分も同じ React コンポーネントで組んでいるが、ビルド時に静的 HTML へ書き出していて JavaScript は届かない。この一角だけは hydrate していて、state もイベントも ARIA 配線も実際に動く。利用者が使うのと同じ exports map を、そのまま経由している。',
      saveLabel: '保存',
      savingDoneLabel: '保存しました ✓',
      switchLabel: '通知',
      errorToggleLabel: 'エラー状態にする',
      inputPlaceholder: 'メールアドレス',
      listLead:
        'ビルド時に npm の <code>@yasmro/schatten</code> パッケージから生成している。CSS サブパスを持つコンポーネントがそのまま並ぶ。',
      categories: {
        action: 'アクション',
        form: 'フォーム',
        display: 'データ表示',
        navigation: 'ナビゲーション',
        feedback: 'フィードバック',
        overlay: 'オーバーレイ',
      },
      storybookTitle: 'Storybook',
      storybookNote:
        '動作検証とテストは <a href="%STORYBOOK%">Storybook</a> で行う。各コンポーネントのページから、該当する項目へ移動できる。',
    },
    detail: {
      backLabel: 'コンポーネント一覧',
      usageTitle: '使い方',
      guideTitle: 'ガイドライン',
      doLabel: 'Do',
      dontLabel: 'Don’t',
      storybookCta: 'Storybook で開く',
    },
    demo: {
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      draft: '下書き',
      status: '有効',
      name: '名前',
      email: 'メールアドレス',
      errorMessage: 'name@example.com の形式で入力してください。',
      notifications: '通知',
      terms: '利用規約に同意する',
      message: 'メッセージ',
      open: '開く',
      menuRename: '名前を変更',
      menuDuplicate: '複製',
      dialogTitle: 'このプロジェクトを削除しますか?',
      dialogBody: 'この操作は取り消せません。',
      optionA: 'Free',
      optionB: 'Pro',
      tabA: 'アカウント',
      tabB: '請求',
      tabBodyA: 'アカウントの設定。',
      tabBodyB: '請求の設定。',
      hint: '短い補足',
      noticeTitle: 'トライアルがまもなく終了します',
      noticeBody: 'データを保持するには、支払い方法を追加してください。',
      tableCaption: '請求書',
      tableItem: '項目',
      tableAmount: '金額',
      toastTitle: '保存しました',
      cardTitle: '利用状況',
      cardBody: '20 席中 12 席を使用中。',
    },
  },
}

// Deploy subpath (astro.config `base`, e.g. `/schatten/pr/494/site/` on the
// PR preview). '/' locally. Normalized to no trailing slash for concatenation.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '')

/** Route prefix for a locale (base-aware: `${base}/` or `${base}/ja/`). */
export const localePath = (locale: Locale): string =>
  locale === defaultLocale ? `${BASE}/` : `${BASE}/${locale}/`
