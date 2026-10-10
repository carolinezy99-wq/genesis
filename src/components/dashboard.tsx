"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { DecisionLegend, DecisionStrip } from "@/components/decision-strip"
import { useLocale } from "@/components/locale"
import { PolicyPathChart } from "@/components/policy-path-chart"
import { Sparkline } from "@/components/sparkline"
import { banks, DATA_AS_OF, type Bank, type Source } from "@/lib/banks"
import { bankTabLabel, chartName, kindLabel, presentBank, sourceTitle, ui, type Locale } from "@/lib/copy"
import { governors, rbaTermSource } from "@/lib/governors"
import { history } from "@/lib/history"
import { allMetrics, signed, stanceColor, summary, type BankMetrics } from "@/lib/metrics"
import { policyPaths, tighteningCountSeries, type PolicyPath } from "@/lib/rate-path"

type SectionId = "overview" | "compare" | "banks" | "governors" | "sources"
type ViewId = SectionId | `bank-${string}`

const sections: SectionId[] = ["overview", "compare", "banks", "governors", "sources"]
const tighteningSeries = tighteningCountSeries().filter((point) => point.date >= "2026-01-01")

const text = {
  en: {
    nav: { overview: "Overview", compare: "Compare", banks: "Banks", governors: "Governors", sources: "Sources" },
    conclusion: "Every latest decision was either a tightening step or a hold.",
    asOf: "Data as of",
    highest: "Highest policy rate",
    lowest: "Lowest policy rate",
    tightening: "Banks tightening",
    gap: "Average inflation gap",
    ofNine: "of 9",
    eightTargets: "Eight banks with a point target. MAS excluded.",
    noHigh: "No trend line. India’s repo path is the chart in Compare.",
    noLow: "No trend line. Japan’s call-rate path is the chart in Compare.",
    noGap: "No trend line. A gap history would need monthly inflation prints that are not in the verified set.",
    tightNote: "Latest decision was a hike or an S$NEER tightening. Holds replace an earlier hike. Computed from official decisions, not an official statistic.",
    compareLead: "One policy-rate path at a time, then every bank on the same columns.",
    banksLead: "The same sections for every central bank. Rates are not charted again here.",
    governorsLead: "One profile per governor, limited to the official biography.",
    sourcesLead: "Official pages used for the figures and the biographies.",
    chartTitle: "Policy-rate path",
    masChart: "MAS sets the slope, width and centre of the S$NEER band. It has no policy interest rate, so this chart has no line.",
    masMath: "MAS is excluded from the rate path, the real-rate column and the inflation-gap average.",
    formula: "Inflation gap = headline inflation − target midpoint. Real rate = policy rate − headline inflation. The Fed cell uses the midpoint of the target range. China is the 7-day reverse repo, not the LPR. Australia’s target is the 2.5% midpoint of 2–3%. China’s target is the expected objective of around 2%.",
    sort: "Sort by",
    negative: "Shaded cells are negative real rates.",
    open: "Open",
    back: "All banks",
    identity: "Identity",
    policy: "Policy setting",
    prices: "Inflation and the gap",
    decisions: "Decisions",
    next: "Next meeting",
    mandate: "Mandate",
    source: "Sources",
    governorLink: "Governor profile",
    real: "Real rate",
    gapLabel: "Inflation gap",
    target: "Target used",
    headline: "Headline",
    core: "Core",
    none: "Not published",
    blankRate: "No policy interest rate.",
    blankReal: "Not computed. MAS has no policy interest rate.",
    step: "Official decision dates only. Between them the line is flat because the rate is unchanged until the next decision.",
    portrait: "Official portrait",
    term: "Term",
    prior: "Prior roles",
    education: "Education",
    focus: "Policy focus",
    notStated: "Not stated on the official biography.",
    read: "Official biography",
    termTable: "Statutory appointments table",
  },
  zh: {
    nav: { overview: "总览", compare: "对照", banks: "央行", governors: "行长", sources: "来源" },
    conclusion: "每家央行最近一次决定，不是收紧一步，就是维持。",
    asOf: "数据截至",
    highest: "最高政策利率",
    lowest: "最低政策利率",
    tightening: "收紧的央行",
    gap: "平均通胀缺口",
    ofNine: "/ 9",
    eightTargets: "八家有点目标的央行。不含新加坡金管局。",
    noHigh: "没有趋势线。印度回购利率路径在“对照”。",
    noLow: "没有趋势线。日本拆借利率路径在“对照”。",
    noGap: "没有趋势线。缺口历史需要逐月通胀，已核实的资料里没有完整序列。",
    tightNote: "最近一次决定为加息或上调新元汇率带斜率。之后的维持会替换此前的加息。由官方决定计算，不是官方统计。",
    compareLead: "一次只画一条政策利率路径，下面用同一组列对照各行。",
    banksLead: "每家央行同一组栏目。这里不再画利率图。",
    governorsLead: "每位行长一份简介，只采用官方简历。",
    sourcesLead: "数字和简历所用的官方页面。",
    chartTitle: "政策利率路径",
    masChart: "金管局调节新元名义有效汇率政策带的斜率、宽度和中心，不设政策利率，因此这条图没有线。",
    masMath: "金管局不进入利率路径、实际利率列和通胀缺口平均。",
    formula: "通胀缺口 = 整体通胀 − 目标中点。实际利率 = 政策利率 − 整体通胀。美国用目标区间中点。中国是7天期逆回购，不是贷款市场报价利率。澳大利亚目标取2%–3%的中点2.5%。中国目标是2%左右的预期目标。",
    sort: "排序",
    negative: "底色表示实际利率为负。",
    open: "打开",
    back: "全部央行",
    identity: "身份",
    policy: "政策设定",
    prices: "通胀与缺口",
    decisions: "决定",
    next: "下次会议",
    mandate: "职责",
    source: "来源",
    governorLink: "行长简介",
    real: "实际利率",
    gapLabel: "通胀缺口",
    target: "所用目标",
    headline: "整体",
    core: "核心",
    none: "未公布",
    blankRate: "没有政策利率。",
    blankReal: "不计算。金管局没有政策利率。",
    step: "只用官方决定日。决定日之间画平线，因为利率在下一次决定前不变。",
    portrait: "官方肖像",
    term: "任期",
    prior: "此前职务",
    education: "学历",
    focus: "政策重点",
    notStated: "官方简历没有写明。",
    read: "官方简历",
    termTable: "法定任命表",
  },
} as const

const mandate: Record<string, { en: string; zh: string }> = {
  fed: {
    en: "The FOMC sets the federal funds target range.",
    zh: "FOMC 决定联邦基金利率目标区间。",
  },
  ecb: {
    en: "The Governing Council sets the three key interest rates for the euro area.",
    zh: "管理委员会决定欧元区三项关键利率。",
  },
  boe: {
    en: "The MPC sets Bank Rate. The inflation target is 2% CPI.",
    zh: "MPC 决定银行利率。通胀目标是 2% 的 CPI。",
  },
  boj: {
    en: "The Policy Board sets the guideline for money market operations. The price-stability target is 2%.",
    zh: "政策委员会决定金融市场调节方针。物价稳定目标是 2%。",
  },
  boc: {
    en: "Governing Council sets the overnight-rate target. The inflation-control target is the 2% midpoint of 1–3%.",
    zh: "理事会决定隔夜利率目标。通胀控制目标是 1%–3% 的中点 2%。",
  },
  pboc: {
    en: "The 7-day reverse repo is the policy rate. The Monetary Policy Committee is consultative and does not vote that rate.",
    zh: "7天期逆回购操作利率是政策利率。货币政策委员会是咨询机构，不表决该利率。",
  },
  rbi: {
    en: "The MPC sets the policy repo rate. The inflation target is 4%, with a 2–6% band.",
    zh: "MPC 决定政策回购利率。通胀目标是 4%，容忍区间 2%–6%。",
  },
  mas: {
    en: "The instrument is the S$NEER policy band, not an interest rate. There is no published point inflation target.",
    zh: "工具是新元名义有效汇率政策带，不是利率。没有公布的通胀点目标。",
  },
  rba: {
    en: "The Monetary Policy Board sets the cash-rate target. The inflation aim is 2–3%.",
    zh: "货币政策委员会决定现金利率目标。通胀目标是 2%–3%。",
  },
}

function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}

function parseHash(hash: string): ViewId {
  const id = hash.replace(/^#/, "")
  if (sections.includes(id as SectionId)) return id as SectionId
  if (id.startsWith("bank-") && banks.some((bank) => bank.id === id.slice(5))) return id as ViewId
  return "overview"
}

function sectionOf(view: ViewId): SectionId {
  return view.startsWith("bank-") ? "banks" : (view as SectionId)
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

type Copy = (typeof text)[Locale]
type SortKey = "bank" | "date" | "direction" | "rate" | "inflation" | "gap" | "real" | "next"

type Row = {
  id: string
  bank: string
  date: string
  direction: string
  stance: keyof typeof stanceColor
  rate: number | null
  rateLabel: string
  inflation: number
  inflationLabel: string
  measure: string
  targetLabel: string
  gap: number | null
  real: number | null
  next: string
}

function buildRows(locale: Locale): Row[] {
  return allMetrics(locale).map(({ bank, m }) => {
    const view = presentBank(bank, locale)
    const next = history[bank.id]?.nextMeeting?.date ?? ""
    return {
      id: bank.id,
      bank: chartName(bank, locale),
      date: bank.cycle.date,
      direction: view.stanceLabel,
      stance: view.stance,
      rate: m.policyRate,
      rateLabel: view.policyDisplay,
      inflation: m.inflation,
      inflationLabel: bank.inflationActual.display,
      measure: view.latestGauge,
      targetLabel: m.target == null ? view.targetDisplay : `${m.targetBasis}`,
      gap: m.gap,
      real: m.policyRate == null ? null : round2(m.policyRate - m.inflation),
      next,
    }
  })
}

export function Dashboard() {
  const { locale } = useLocale()
  const copy = text[locale]
  const labels = ui[locale]
  const [view, setView] = useState<ViewId>("overview")
  const [bankId, setBankId] = useState("fed")
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "rate", dir: "desc" })

  useEffect(() => {
    const apply = () => setView(parseHash(window.location.hash))
    apply()
    window.addEventListener("hashchange", apply)
    return () => window.removeEventListener("hashchange", apply)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  const active = sectionOf(view)
  const s = summary(locale)
  const rows = useMemo(() => buildRows(locale), [locale])
  const averageGap = useMemo(() => {
    const gaps = rows.map((row) => row.gap).filter((gap): gap is number => gap != null)
    return gaps.reduce((total, gap) => total + gap, 0) / gaps.length
  }, [rows])
  const sorted = useMemo(() => {
    const list = [...rows]
    const dir = sort.dir === "asc" ? 1 : -1
    const valueOf = (row: Row): string | number | null => {
      if (sort.key === "bank" || sort.key === "direction" || sort.key === "date" || sort.key === "next") return row[sort.key]
      return row[sort.key]
    }
    list.sort((a, b) => {
      const av = valueOf(a)
      const bv = valueOf(b)
      const empty = (value: string | number | null) => value == null || value === ""
      if (empty(av) && empty(bv)) return a.bank.localeCompare(b.bank)
      if (empty(av)) return 1
      if (empty(bv)) return -1
      if (typeof av === "string" && typeof bv === "string") return av.localeCompare(bv) * dir
      return ((av as number) - (bv as number)) * dir
    })
    return list
  }, [rows, sort])

  const selectedBank = banks.find((bank) => bank.id === (view.startsWith("bank-") ? view.slice(5) : "")) ?? null
  const pathBank = banks.find((bank) => bank.id === bankId) ?? banks[0]
  const path = policyPaths[pathBank.id]

  const toggle = (key: SortKey) => {
    setSort((current) => (current.key === key ? { key, dir: current.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "bank" ? "asc" : "desc" }))
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f4f6f8] text-[#1c2a3a]">
      <header className="bg-[#15253a] text-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase">{labels.kicker}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{labels.title}</h1>
            <p className="text-sm text-white/70">
              {copy.asOf} <time dateTime={DATA_AS_OF}>{DATA_AS_OF}</time>
            </p>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80">
            {active === "overview" ? copy.conclusion : active === "compare" ? copy.compareLead : active === "banks" ? copy.banksLead : active === "governors" ? copy.governorsLead : copy.sourcesLead}
          </p>
        </div>
      </header>

      <nav aria-label={locale === "zh" ? "分区" : "Sections"} className="sticky top-0 z-40 border-b border-[#e3e7ec] bg-[#f4f6f8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap px-2 sm:px-6">
          {sections.map((id) => {
            const current = active === id
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={current ? "page" : undefined}
                className={`border-b-2 px-2.5 py-3 text-sm whitespace-nowrap sm:px-3 ${current ? "border-[#15253a] font-semibold text-[#15253a]" : "border-transparent text-[#5c6b7a]"}`}
              >
                {copy.nav[id]}
              </a>
            )
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl min-w-0 px-4 py-6 sm:px-6">
        {view === "overview" ? <Overview copy={copy} locale={locale} highest={s.highest} lowest={s.lowest} tightening={s.tightening} averageGap={averageGap} /> : null}
        {view === "compare" ? (
          <Compare
            copy={copy}
            locale={locale}
            rows={sorted}
            sort={sort}
            onSort={toggle}
            bankId={bankId}
            onBank={setBankId}
            pathBankName={chartName(pathBank, locale)}
            path={path}
          />
        ) : null}
        {view === "banks" ? <BankIndex copy={copy} locale={locale} /> : null}
        {selectedBank ? <BankDetail bank={selectedBank} copy={copy} locale={locale} /> : null}
        {view === "governors" ? <GovernorList copy={copy} locale={locale} /> : null}
        {view === "sources" ? <SourceIndex copy={copy} locale={locale} /> : null}
      </main>

      <footer className="border-t border-[#e3e7ec]">
        <div className="mx-auto max-w-6xl px-4 py-5 text-[11px] leading-relaxed text-[#5c6b7a] sm:px-6">
          <p>
            {copy.asOf} {DATA_AS_OF}. {copy.masMath}
          </p>
        </div>
      </footer>
    </div>
  )
}

function Overview({
  copy,
  locale,
  highest,
  lowest,
  tightening,
  averageGap,
}: {
  copy: Copy
  locale: Locale
  highest: ReturnType<typeof summary>["highest"]
  lowest: ReturnType<typeof summary>["lowest"]
  tightening: number
  averageGap: number
}) {
  const high = presentBank(highest.bank, locale)
  const low = presentBank(lowest.bank, locale)
  const period = `${tighteningSeries[0]?.date} – ${tighteningSeries[tighteningSeries.length - 1]?.date}`
  return (
    <section aria-labelledby="overview-heading" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <h2 id="overview-heading" className="sr-only">
        {copy.nav.overview}
      </h2>
      <Kpi eyebrow={copy.highest} value={high.policyDisplay} detail={`${chartName(highest.bank, locale)} · ${high.policyName}`} note={copy.noHigh} />
      <Kpi eyebrow={copy.lowest} value={low.policyDisplay} detail={`${chartName(lowest.bank, locale)} · ${low.policyName}`} note={copy.noLow} />
      <article className="rounded-xl bg-white p-4 ring-1 ring-[#e3e7ec]">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#5c6b7a] uppercase">{copy.tightening}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
          {tightening} <span className="text-base font-medium text-[#5c6b7a]">{copy.ofNine}</span>
        </p>
        <Sparkline points={tighteningSeries} label={`${copy.tightNote} ${period}`} />
        <p className="mt-2 text-[11px] leading-relaxed text-[#5c6b7a]">
          {period}. {copy.tightNote}
        </p>
      </article>
      <Kpi eyebrow={copy.gap} value={signed(round2(averageGap), " pp")} detail={copy.eightTargets} note={copy.noGap} />
    </section>
  )
}

function Kpi({ eyebrow, value, detail, note }: { eyebrow: string; value: string; detail: string; note: string }) {
  return (
    <article className="rounded-xl bg-white p-4 ring-1 ring-[#e3e7ec]">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#5c6b7a] uppercase">{eyebrow}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-[#1c2a3a]">{detail}</p>
      <p className="mt-3 text-[11px] leading-relaxed text-[#5c6b7a]">{note}</p>
    </article>
  )
}

function Compare({
  copy,
  locale,
  rows,
  sort,
  onSort,
  bankId,
  onBank,
  pathBankName,
  path,
}: {
  copy: Copy
  locale: Locale
  rows: Row[]
  sort: { key: SortKey; dir: "asc" | "desc" }
  onSort: (key: SortKey) => void
  bankId: string
  onBank: (id: string) => void
  pathBankName: string
  path: PolicyPath | null
}) {
  const columns: { key: SortKey; label: string }[] = [
    { key: "bank", label: locale === "zh" ? "央行" : "Bank" },
    { key: "date", label: locale === "zh" ? "决定日" : "Decision" },
    { key: "direction", label: locale === "zh" ? "方向" : "Direction" },
    { key: "rate", label: locale === "zh" ? "政策利率" : "Policy rate" },
    { key: "inflation", label: locale === "zh" ? "通胀" : "Inflation" },
    { key: "gap", label: locale === "zh" ? "缺口" : "Gap" },
    { key: "real", label: locale === "zh" ? "实际利率" : "Real rate" },
    { key: "next", label: locale === "zh" ? "下次" : "Next" },
  ]
  return (
    <div className="grid min-w-0 gap-6">
      <section className="min-w-0 rounded-xl bg-white p-4 ring-1 ring-[#e3e7ec] sm:p-5" aria-labelledby="path-heading">
        <h2 id="path-heading" className="text-lg font-semibold">
          {copy.chartTitle}
          <span className="font-medium text-[#5c6b7a]"> · {pathBankName}</span>
        </h2>
        <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto" role="group" aria-label={pathBankName}>
          {banks.map((bank) => {
            const selected = bank.id === bankId
            return (
              <button
                key={bank.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onBank(bank.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm ${selected ? "bg-[#15253a] text-white" : "bg-[#f4f6f8] text-[#1c2a3a] ring-1 ring-[#e3e7ec]"}`}
              >
                {chartName(bank, locale)}
              </button>
            )
          })}
        </div>
        {path ? (
          <>
            <p className="mt-3 text-xs text-[#5c6b7a]">
              {path.instrument[locale]}. {path.points[0].date} – {path.points[path.points.length - 1].date}. {copy.step}
            </p>
            <PolicyPathChart points={path.points} label={`${pathBankName} ${path.instrument[locale]}`} />
            <p className="text-xs leading-relaxed text-[#5c6b7a]">{path.note[locale]}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-[#5c6b7a]">
              {path.points.map((point, index) => (
                <a key={point.date + point.url} href={point.url} target="_blank" rel="noopener noreferrer" className="underline decoration-[#d5dbe1] underline-offset-2">
                  {point.date}
                  {index < path.points.length - 1 ? " · " : ""}
                </a>
              ))}
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-[#1c2a3a]">{copy.masChart}</p>
        )}
      </section>

      <section className="min-w-0" aria-labelledby="table-heading">
        <h2 id="table-heading" className="text-lg font-semibold">
          {locale === "zh" ? "对照表" : "Comparison"}
        </h2>
        <p className="mt-1 text-xs text-[#5c6b7a]">{copy.negative}</p>
        <div className="mt-3 min-w-0 overflow-x-auto rounded-xl bg-white ring-1 ring-[#e3e7ec]">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#e3e7ec] text-[11px] tracking-wide text-[#5c6b7a] uppercase">
                {columns.map((column) => (
                  <th key={column.key} scope="col" aria-sort={sort.key === column.key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"} className={`bg-white px-3 py-2 font-semibold ${column.key === "bank" ? "sticky left-0 z-10" : ""}`}>
                    <button type="button" onClick={() => onSort(column.key)} className="inline-flex items-center gap-1">
                      {column.label}
                      <span aria-hidden="true">{sort.key === column.key ? (sort.dir === "asc" ? "↑" : "↓") : ""}</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-[#eef1f4] last:border-0">
                  <th scope="row" className="sticky left-0 z-10 bg-white px-3 py-2 font-semibold whitespace-nowrap">
                    <a href={`#bank-${row.id}`} className="underline decoration-[#d5dbe1] underline-offset-2">
                      {row.bank}
                    </a>
                  </th>
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">{row.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap" style={{ color: stanceColor[row.stance] }}>
                    {row.direction}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">{row.rateLabel}</td>
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                    {row.inflationLabel}
                    <span className="mt-0.5 block text-[11px] text-[#5c6b7a]">{row.measure}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">{signed(row.gap, " pp")}</td>
                  <td className={`px-3 py-2 whitespace-nowrap tabular-nums ${row.real != null && row.real < 0 ? "bg-[#f6ebe6]" : ""}`}>{row.real == null ? "—" : signed(row.real, " pp")}</td>
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">{row.next || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-[#5c6b7a]">{copy.formula}</p>
      </section>
    </div>
  )
}

function BankIndex({ copy, locale }: { copy: Copy; locale: Locale }) {
  return (
    <section aria-labelledby="banks-heading">
      <h2 id="banks-heading" className="sr-only">
        {copy.nav.banks}
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {banks.map((bank) => {
          const view = presentBank(bank, locale)
          return (
            <li key={bank.id}>
              <a href={`#bank-${bank.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-[#e3e7ec]">
                <span>
                  <span className="block font-semibold">{view.institution}</span>
                  <span className="text-sm text-[#5c6b7a]">
                    {view.name}, {view.title}
                  </span>
                </span>
                <span className="text-sm text-[#5c6b7a]">{copy.open}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function BankDetail({ bank, copy, locale }: { bank: Bank; copy: Copy; locale: Locale }) {
  const view = presentBank(bank, locale)
  const metrics: BankMetrics | undefined = allMetrics(locale).find((row) => row.bank.id === bank.id)?.m
  if (!metrics) return null
  const record = history[bank.id]
  const real = metrics.policyRate == null ? null : round2(metrics.policyRate - metrics.inflation)
  const governor = governors.find((profile) => profile.bankId === bank.id)
  return (
    <article className="grid gap-4">
      <p>
        <a href="#banks" className="text-sm font-semibold text-[#1a3a5c] underline decoration-[#d5dbe1] underline-offset-2">
          {copy.back}
        </a>
      </p>
      <header>
        <h2 className="text-2xl font-semibold tracking-tight">{view.institution}</h2>
        <p className="mt-1 text-sm text-[#5c6b7a]">{bankTabLabel[bank.id][locale]}</p>
      </header>

      <DetailSection title={copy.identity}>
        <p>
          {view.name}, {view.title}
        </p>
        {governor ? (
          <p className="mt-1">
            <a href="#governors" className="text-sm underline decoration-[#d5dbe1] underline-offset-2">
              {copy.governorLink}
            </a>
          </p>
        ) : null}
        <p className="mt-2 text-sm text-[#5c6b7a]">{view.bodyName}</p>
      </DetailSection>

      <DetailSection title={copy.policy}>
        <p className="text-sm text-[#5c6b7a]">{view.policyName}</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums">{view.policyDisplay}</p>
        <p className="mt-1 text-sm text-[#5c6b7a]">{view.policyAsOf}</p>
        {bank.id === "mas" ? <p className="mt-2 text-sm">{copy.blankRate}</p> : null}
        {view.secondary.length > 0 ? (
          <ul className="mt-3 grid gap-1 text-sm">
            {view.secondary.map((rate) => (
              <li key={rate.key} className="flex justify-between gap-3 border-t border-[#eef1f4] py-1">
                <span>{rate.name}</span>
                <span className="tabular-nums">{rate.display}</span>
              </li>
            ))}
            <li className="text-[11px] text-[#5c6b7a]">{locale === "zh" ? "其他已公布利率，不是上面的政策设定。" : "Other published rates. Not the policy setting above."}</li>
          </ul>
        ) : null}
        <p className="mt-2">
          <SourceAnchor source={bank.primarySource} locale={locale} />
        </p>
      </DetailSection>

      <DetailSection title={copy.prices}>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[#5c6b7a]">{copy.headline}</dt>
            <dd className="font-semibold tabular-nums">
              {metrics.inflationMeasure}: {bank.inflationActual.display}
            </dd>
            <dd className="text-[11px] text-[#5c6b7a]">{view.latestPeriod}</dd>
          </div>
          <div>
            <dt className="text-[#5c6b7a]">{copy.core}</dt>
            <dd>{record?.core ? `${record.core.measure}: ${record.core.value}` : copy.none}</dd>
            {record?.core ? <dd className="text-[11px] text-[#5c6b7a]">{record.core.period}</dd> : null}
            {record?.coreNote ? <dd className="text-[11px] text-[#5c6b7a]">{record.coreNote}</dd> : null}
          </div>
          <div>
            <dt className="text-[#5c6b7a]">{copy.target}</dt>
            <dd>{metrics.targetBasis}</dd>
          </div>
          <div>
            <dt className="text-[#5c6b7a]">{copy.gapLabel}</dt>
            <dd className="tabular-nums">{signed(metrics.gap, " pp")}</dd>
          </div>
          <div>
            <dt className="text-[#5c6b7a]">{copy.real}</dt>
            <dd className="tabular-nums">{real == null ? copy.blankReal : signed(real, " pp")}</dd>
          </div>
        </dl>
        <p className="mt-2 text-[11px]">
          <SourceAnchor source={metrics.inflationSource} locale={locale} />
        </p>
      </DetailSection>

      <DetailSection title={copy.decisions}>
        <p className="mb-3 text-sm">
          {bank.cycle.date} · {view.cycleLabel} · {view.cycleSize}
        </p>
        <DecisionStrip bankId={bank.id} locale={locale} size="lg" />
        <p className="mt-3 text-[11px] text-[#5c6b7a]">
          <DecisionLegend locale={locale} />
        </p>
        {record?.historyNote ? <p className="mt-2 text-[11px] leading-relaxed text-[#5c6b7a]">{record.historyNote}</p> : null}
      </DetailSection>

      <DetailSection title={copy.next}>
        {record?.nextMeeting ? (
          <p>
            <a href={record.nextMeeting.url} target="_blank" rel="noopener noreferrer" className="tabular-nums underline decoration-[#d5dbe1] underline-offset-2">
              {record.nextMeeting.date}
            </a>
            {record.nextMeetingNote ? <span className="mt-1 block text-sm text-[#5c6b7a]">{record.nextMeetingNote}</span> : null}
          </p>
        ) : (
          <p className="text-sm text-[#5c6b7a]">{record?.nextMeetingNote ?? "—"}</p>
        )}
      </DetailSection>

      <DetailSection title={copy.mandate}>
        <p className="text-sm leading-relaxed">{mandate[bank.id][locale]}</p>
      </DetailSection>

      <DetailSection title={copy.source}>
        <SourceList bank={bank} locale={locale} />
      </DetailSection>
    </article>
  )
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl bg-white p-4 ring-1 ring-[#e3e7ec]">
      <h3 className="text-[11px] font-semibold tracking-[0.14em] text-[#5c6b7a] uppercase">{title}</h3>
      <div className="mt-2">{children}</div>
    </section>
  )
}

function GovernorList({ copy, locale }: { copy: Copy; locale: Locale }) {
  return (
    <section className="grid gap-4" aria-labelledby="governors-heading">
      <h2 id="governors-heading" className="sr-only">
        {copy.nav.governors}
      </h2>
      {governors.map((profile) => {
        const bank = banks.find((item) => item.id === profile.bankId)
        return (
          <article key={profile.bankId} id={`governor-${profile.bankId}`} className="grid gap-4 rounded-xl bg-white p-4 ring-1 ring-[#e3e7ec] sm:grid-cols-[8.5rem_1fr]">
            <figure className="w-28">
              <div className="h-36 w-28 overflow-hidden bg-[#e7ebef]">
                <img
                  src={asset(profile.photo)}
                  alt={`${profile.name[locale]}, ${profile.title[locale]}`}
                  width={112}
                  height={144}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: `${profile.focal.x} ${profile.focal.y}`, transform: `scale(${profile.focal.scale})`, transformOrigin: `${profile.focal.x} ${profile.focal.y}` }}
                />
              </div>
              <figcaption className="mt-1 text-[10px] leading-snug text-[#5c6b7a]">
                {copy.portrait}. {profile.photoCredit}
              </figcaption>
            </figure>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#5c6b7a] uppercase">{bank ? chartName(bank, locale) : profile.bankId}</p>
              <h3 className="mt-1 text-xl font-semibold">{profile.name[locale]}</h3>
              <p className="text-sm text-[#5c6b7a]">{profile.title[locale]}</p>
              <dl className="mt-3 grid gap-3 text-sm leading-relaxed">
                <Fact term={copy.term} value={profile.term?.[locale] ?? copy.notStated} />
                <Fact term={copy.prior} value={profile.prior?.[locale] ?? copy.notStated} />
                <Fact term={copy.education} value={profile.education?.[locale] ?? copy.notStated} />
                <Fact term={copy.focus} value={profile.policyFocus?.[locale] ?? copy.notStated} />
              </dl>
              {profile.gapNote ? <p className="mt-3 text-[11px] leading-relaxed text-[#5c6b7a]">{profile.gapNote[locale]}</p> : null}
              <p className="mt-3 text-sm">
                <a href={profile.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-[#d5dbe1] underline-offset-2">
                  {copy.read}: {profile.sourceLabel[locale]}
                </a>
              </p>
              {profile.bankId === "rba" ? (
                <p className="mt-1 text-sm">
                  <a href={rbaTermSource} target="_blank" rel="noopener noreferrer" className="underline decoration-[#d5dbe1] underline-offset-2">
                    {copy.termTable}
                  </a>
                </p>
              ) : null}
            </div>
          </article>
        )
      })}
    </section>
  )
}

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold tracking-[0.12em] text-[#5c6b7a] uppercase">{term}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function SourceIndex({ copy, locale }: { copy: Copy; locale: Locale }) {
  return (
    <section className="grid gap-4" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="sr-only">
        {copy.nav.sources}
      </h2>
      {banks.map((bank) => (
        <section key={bank.id} className="rounded-xl bg-white p-4 ring-1 ring-[#e3e7ec]">
          <h3 className="font-semibold">{chartName(bank, locale)}</h3>
          <SourceList bank={bank} locale={locale} />
        </section>
      ))}
      <p className="text-[11px] text-[#5c6b7a]">{copy.masMath}</p>
    </section>
  )
}

function SourceList({ bank, locale }: { bank: Bank; locale: Locale }) {
  const items = collectSources(bank, locale)
  return (
    <ul className="mt-2 grid gap-1.5 text-sm">
      {items.map((item) => (
        <li key={item.url} className="min-w-0">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="break-words underline decoration-[#d5dbe1] underline-offset-2">
            {item.label}
          </a>
          <span className="ml-2 text-[10px] tracking-wide text-[#8a949c] uppercase">{item.kind}</span>
        </li>
      ))}
    </ul>
  )
}

function SourceAnchor({ source, locale }: { source: Source; locale: Locale }) {
  return (
    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[11px] underline decoration-[#d5dbe1] underline-offset-2">
      {source.institution}: {sourceTitle(source, locale)}
    </a>
  )
}

function collectSources(bank: Bank, locale: Locale) {
  const items: { url: string; label: string; kind: string }[] = []
  const add = (source: Source | undefined) => {
    if (!source || items.some((item) => item.url === source.url)) return
    items.push({ url: source.url, label: `${source.institution}: ${sourceTitle(source, locale)}`, kind: kindLabel(source.kind, locale) })
  }
  add(bank.primarySource)
  add(bank.inflationActual.source)
  bank.sources.forEach(add)
  const record = history[bank.id]
  record?.decisions.forEach((decision) => {
    if (!decision.url || items.some((item) => item.url === decision.url)) return
    items.push({ url: decision.url, label: decision.date ?? decision.url, kind: locale === "zh" ? "决定" : "Decision" })
  })
  if (record?.nextMeeting && !items.some((item) => item.url === record.nextMeeting?.url)) {
    items.push({ url: record.nextMeeting.url, label: record.nextMeeting.date, kind: locale === "zh" ? "日程" : "Calendar" })
  }
  const profile = governors.find((item) => item.bankId === bank.id)
  if (profile && !items.some((item) => item.url === profile.sourceUrl)) {
    items.push({ url: profile.sourceUrl, label: profile.sourceLabel[locale], kind: locale === "zh" ? "简历" : "Biography" })
  }
  if (bank.id === "rba" && !items.some((item) => item.url === rbaTermSource)) {
    items.push({ url: rbaTermSource, label: locale === "zh" ? "法定任命" : "Statutory appointments", kind: locale === "zh" ? "简历" : "Biography" })
  }
  return items
}
