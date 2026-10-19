// Site copy, both locales. Strings that carry inline markup (<code>…</code>)
// are marked `Html` and injected with `set:html` — they are authored
// constants, never user input.
//
// Shape: `common` (shell chrome) + one group per page. A missing string in
// either locale is a type error, so the two editions cannot drift apart.

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
}

interface Landing {
  metaDescription: string
  heroTitle: string
  heroLead: Html
  ctaGetStarted: string
  ctaStorybook: string
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
  faceNote: Html
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
  listTitle: string
  listLead: Html
}

interface Strings {
  common: Common
  landing: Landing
  brand: Brand
  components: ComponentsPage
}

export const ui: Record<Locale, Strings> = {
  en: {
    common: {
      langSwitchLabel: '日本語',
      themeToggleLabel: 'Toggle light / dark mode',
      navBrand: 'Brand',
      navComponents: 'Components',
    },
    landing: {
      metaDescription:
        'Schatten design system — React components and a framework-agnostic CSS class API on one token foundation.',
      heroTitle: 'Interfaces with shadow, shipped in two layers.',
      heroLead:
        'React components, and CSS classes you can use in plain HTML. Schatten ships both on one set of design tokens.<br>This page is proof of the second — no React, painted by the single stylesheet we publish.',
      ctaGetStarted: 'Get started',
      ctaStorybook: 'View Storybook',
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
        'Schatten’s primitives carry Japanese names. The values below are the real v1.0.0 tokens (<code>src/core/tokens/primitives.css</code>).',
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
      chromaticRampTitle: 'The chromatic pair rides the same ladder',
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
      faceSampleLatin: 'Shadow &amp; Gradation',
      faceSampleJa: '陰影と階調',
      faceNote:
        'This page cannot load webfonts under the artifact CSP, so a system mincho and gothic stand in. The faces above are what the real site serves.',
      scaleTitle: 'Eight sizes, six leadings',
      scaleLead:
        'Sizes come from <code>--text-*</code>, leading from <code>--leading-*</code> — public tokens, all in <code>rem</code>.',
      scaleSample: 'Shadow 陰影',
      roleNote:
        'Note that <strong>body / label / heading are not CSS variables</strong>. Size, leading, and weight are three properties, and a single <code>var()</code> cannot carry three — so the roles bind to the <code>.st-text--*</code> class rules instead.',
    },
    components: {
      pageTitle: 'Components',
      metaDescription:
        'Every Schatten component, with a live React island — the second delivery layer, running on this page.',
      title: 'Components',
      lead: 'The full catalog — stories, props, and every visual state — lives in <a href="%STORYBOOK%">Storybook</a>. This page is the index, plus one living proof: a corner of it runs the real React layer.',
      liveTitle: 'Live — this corner is a React island',
      liveDesc:
        'Everything else on this site is static HTML painted by the published CSS. This card hydrates the real React components through the same exports map a consumer uses: real state, real events, real ARIA wiring.',
      saveLabel: 'Save',
      savingDoneLabel: 'Saved ✓',
      switchLabel: 'Notifications',
      errorToggleLabel: 'Show the error state',
      inputPlaceholder: 'Email address',
      listTitle: 'All components',
      listLead:
        'Generated at build time from the published <code>@yasmro/schatten</code> package — every component that ships a CSS subpath. Each links to its Storybook page.',
    },
  },
  ja: {
    common: {
      langSwitchLabel: 'English',
      themeToggleLabel: 'ライト / ダークを切り替え',
      navBrand: 'ブランド',
      navComponents: 'コンポーネント',
    },
    landing: {
      metaDescription:
        'Schatten design system — React コンポーネントと、フレームワークに依存しない CSS クラス API を、共通のトークン基盤の上に。',
      heroTitle: '陰影のあるインターフェースを、ふたつの配信層で。',
      heroLead:
        'React のコンポーネントと、素の HTML で使える CSS クラス。Schatten はこの両方を、共通のデザイントークンの上で提供しています。<br>このページ自体がその証拠です。React は使わず、配布している CSS 1 枚だけで描かれています。',
      ctaGetStarted: 'Get started',
      ctaStorybook: 'Storybook を見る',
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
        'Schatten ブランドコンセプト — 紙と墨のあいだに生まれる階調としての陰影。朱・墨・和紙・藍、そして八節。',
      thesis: '陰影とは、光の不在ではなく、<br>紙と墨のあいだに生まれる<em>階調</em>である。',
      origin:
        'Schatten はドイツ語で「影」。ポートフォリオサイトのブランドコンセプト『陰翳礼讃』(谷崎潤一郎)を、ページ単位ではなくボタンや文字などのコンポーネント単位のデザイントークンとして実装したものである。',
      gradationPaper: '紙 · 和紙',
      gradationInk: '墨 · 影',

      colorLabel: '色',
      colorTitle: '四つの色は、和の語彙でできている',
      colorLead:
        'Schatten の primitive は色名からして和語である。数値は v1.0.0 の実トークン(<code>src/core/tokens/primitives.css</code>)。',
      colorSwatches: [
        {
          name: '朱',
          token: 'vermillion',
          role: 'ブランドの主色。鳥居・印章・漆の朱。',
        },
        {
          name: '墨',
          token: 'sumi',
          role: '前景・文字。寒色へ倒れた無彩。',
        },
        {
          name: '和紙',
          token: 'alabaster',
          role: '面・背景。暖色へ倒れた無彩。',
        },
        {
          name: '藍',
          token: 'indigo',
          role: '第二のブランド色。彩度を持った墨。',
        },
      ],
      warmCoolTitle: '墨は寒く、紙は暖かい ― 彩度は同じ',
      warmCoolLead:
        '<code>sumi</code> と <code>alabaster</code> は明度も彩度も同一で、<strong>色相だけが 250 と 70 で正反対</strong>。ほぼ無彩に見えて、墨は青へ、紙は黄へ倒れている。',
      warmLabel: '暖 · warm',
      coolLabel: '寒 · cool',
      achromaticLabel: '無彩 C≈0.01',
      chromaticLabel: '有彩',
      mirrorTitle: '梯子は 11 段すべてが鏡像',
      mirrorLead:
        'これは <code>-500</code> だけの話ではない。<strong>全 11 段で明度と彩度が一致し、分かれるのは色相だけ</strong>。墨と和紙は同じ階調構造を共有する一対である。',
      chromaticRampTitle: '有彩の二色も、同じ梯子に乗る',
      oklchNote:
        'すべて OKLCH で定義されている。知覚的に均等な色空間なので、「同じ明度」は数値の上だけでなく、<strong>見た目にもそのまま</strong>現れる。',

      seasonsLabel: '季節',
      seasonsTitle: '八つの季節、ひとつの明度',
      seasonsLead:
        '季節(Special テーマ)は <code>--color-theme-*</code> のランプだけを替える。500 段はすべて L 64%、700 段はすべて L 46% に固定されていて、動くのは色相と彩度だけだ。区切りの日付は、古典的な<strong>八節</strong>(四立と二至二分)と一致する。',
      seasonNames: ['立春', '春分', '立夏', '夏至', '立秋', '秋分', '立冬', '冬至'],
      seasonsNote: '巡る季節と、動かない可読性。八節は色だけを運び、明度の梯子には触れない。',

      typeLabel: '書体',
      typeTitle: '二つの言語を、同時に話す',
      typeLead1:
        '<strong>構造</strong>は西洋の工学語彙 ― shadcn / Radix / OKLCH / BEM / CVA。<strong>表層</strong>は和の美学語彙 ― 朱・墨・和紙・藍・八節。どちらも他方の装飾ではない。',
      typeLead2:
        'この二重性は、名前や色名だけにとどまらない。組版そのものに実装されている。sans も serif も、<strong>欧文フェイスと和文フェイスを明示的に対にして</strong>ひとつのスタックを組む。バイリンガルであることが、既定の状態。',
      faceSansRole: 'sans — UI・本文',
      faceSerifRole: 'serif — 見出し・長文',
      faceSampleLatin: 'Shadow &amp; Gradation',
      faceSampleJa: '陰影と階調',
      faceNote:
        'このページは CSP により Web フォントを読み込めないため、システムの明朝／ゴシックで代替表示している。実サイトでは上記のフェイスが載る。',
      scaleTitle: '尺度は 8 段、行送りは 6 段',
      scaleLead:
        'サイズは <code>--text-*</code>、行送りは <code>--leading-*</code>。いずれも <code>rem</code> 基準の公開トークン。',
      scaleSample: '陰影 Schatten',
      roleNote:
        'なお <strong>body / label / heading というロールは CSS 変数ではない</strong>。サイズ・行送り・ウェイトの 3 つを 1 つの <code>var()</code> では表せないため、<code>.st-text--*</code> のクラス規則に束ねられている。',
    },
    components: {
      pageTitle: 'コンポーネント',
      metaDescription:
        'Schatten の全コンポーネント一覧と、React island によるライブデモ — 第二の配信層がこのページで動いている。',
      title: 'コンポーネント',
      lead: '完全なカタログ(stories・props・全状態)は <a href="%STORYBOOK%">Storybook</a> にある。このページはその索引であり、ひとつの生きた証明でもある。ページの一角だけ、本物の React 層が動いている。',
      liveTitle: 'Live — この一角だけ React island',
      liveDesc:
        'このサイトの他の場所はすべて、配布 CSS で描かれた静的 HTML。ここだけが本物の React コンポーネントを hydrate していて、state もイベントも ARIA 配線も実際に動く。利用者が使うのと同じ exports map を、そのまま経由している。',
      saveLabel: '保存',
      savingDoneLabel: '保存しました ✓',
      switchLabel: '通知',
      errorToggleLabel: 'エラー状態にする',
      inputPlaceholder: 'メールアドレス',
      listTitle: '全コンポーネント',
      listLead:
        'ビルド時に npm の <code>@yasmro/schatten</code> パッケージから生成している。CSS サブパスを持つコンポーネントがそのまま並ぶ。各項目は Storybook の該当ページへリンクする。',
    },
  },
}

// Deploy subpath (astro.config `base`, e.g. `/schatten/pr/494/site/` on the
// PR preview). '/' locally. Normalized to no trailing slash for concatenation.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '')

/** Route prefix for a locale (base-aware: `${base}/` or `${base}/ja/`). */
export const localePath = (locale: Locale): string =>
  locale === defaultLocale ? `${BASE}/` : `${BASE}/${locale}/`
