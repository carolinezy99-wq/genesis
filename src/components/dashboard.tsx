"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { BankPanel } from "@/components/bank-card"
import { CompareTable } from "@/components/compare-table"
import { GapRealScatter, RateRealChart } from "@/components/compare-charts"
import { GovernorDialog } from "@/components/governor-dialog"
import { useLocale } from "@/components/locale"
import { Reading } from "@/components/reading"
import { banks, DATA_AS_OF } from "@/lib/banks"
import { bankTabLabel, chartName, presentBank, ui } from "@/lib/copy"
import { stanceColor, summary } from "@/lib/metrics"

export function Dashboard() {
  const { locale } = useLocale()
  const copy = ui[locale]
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const [tab, setTab] = useState("overview")
  const [governorId, setGovernorId] = useState<string | null>(null)
  const closeGovernor = useCallback(() => setGovernorId(null), [])
  const selected = banks.find((bank) => bank.id === tab)
  const stripRef = useRef<HTMLDivElement>(null)
  const s = summary(locale)

  useEffect(() => {
    stripRef.current?.querySelector<HTMLElement>(`#tab-${tab}`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
  }, [tab])

  const select = (id: string) => {
    setTab(id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const tabs = [
    { id: "overview", label: copy.overview },
    ...banks.map((bank) => ({ id: bank.id, label: bankTabLabel[bank.id][locale] })),
  ]

  const count = (n: number, key: "tightening" | "holding" | "easing") => (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stanceColor[key] }} />
      <strong className="font-semibold text-slate-900 tabular-nums">{n}</strong> {copy[key].toLowerCase()}
    </span>
  )

  return (
    <div className="min-h-screen bg-[#e6edf3] text-slate-800">
      <header className="border-b border-[#1e3a52]/10 bg-white shadow-[0_8px_24px_-20px_rgba(30,58,82,0.65)]">
        <div className="mx-auto max-w-7xl px-4 pt-5 pb-4 sm:px-6">
          <p className="text-[11px] font-medium tracking-wider text-slate-500 uppercase">{copy.kicker}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#1e3a52] sm:text-3xl">{copy.title}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-600">
            <span className="inline-flex flex-wrap items-center gap-x-3">
              {count(s.tightening, "tightening")}
              {count(s.holding, "holding")}
              {count(s.easing, "easing")}
            </span>
            <span className="inline-flex flex-wrap items-center gap-x-3">
              <span className="whitespace-nowrap">{label("最高", "Highest")} <strong className="font-semibold text-slate-900">{chartName(s.highest.bank, locale)} {presentBank(s.highest.bank, locale).policyDisplay}</strong></span>
              <span className="whitespace-nowrap">{label("最低", "Lowest")} <strong className="font-semibold text-slate-900">{chartName(s.lowest.bank, locale)} {presentBank(s.lowest.bank, locale).policyDisplay}</strong></span>
            </span>
          </p>
        </div>
      </header>
      <nav className="sticky top-0 z-30 border-b border-[#1e3a52]/10 bg-white/95 shadow-[0_8px_18px_-16px_rgba(30,58,82,0.7)] backdrop-blur">
          <div ref={stripRef} role="tablist" aria-label={label("央行", "Central banks")} className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain px-4 sm:px-6">
            {tabs.map((item) => {
              const active = tab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => setTab(item.id)}
                  className={`shrink-0 snap-start border-b-2 px-3 py-2.5 text-sm whitespace-nowrap ${active ? "border-[#1e3a52] font-semibold text-[#1e3a52]" : "border-transparent text-slate-500 hover:text-slate-900"}`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {tab === "overview" ? (
          <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className="grid gap-4">
            <CompareTable locale={locale} onSelect={select} onGovernor={setGovernorId} />
            <div className="grid gap-5 lg:grid-cols-2">
              <RateRealChart locale={locale} />
              <GapRealScatter locale={locale} />
            </div>
            <Reading locale={locale} />
          </div>
        ) : selected ? (
          <div role="tabpanel" id={`panel-${selected.id}`} aria-labelledby={`tab-${selected.id}`}>
            <BankPanel bank={selected} locale={locale} onGovernor={setGovernorId} />
          </div>
        ) : null}
      </main>

      <footer className="mt-2 border-t border-[#1e3a52]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 text-[11px] leading-relaxed text-slate-500 sm:px-6">
          <p className="text-xs text-slate-700">{copy.asOf} <strong className="font-semibold tabular-nums">{DATA_AS_OF}</strong>. {label("数字取自各央行与官方统计机构页面；打开网页时不会重新抓取。", "Figures were read from central-bank and official statistics pages on that date; the site does not re-fetch them.")}</p>
          <p className="mt-1">{label("德国、法国、意大利由欧洲央行代表。通胀缺口为本页根据所列数字计算的分析指标，不是央行官方表述。", "Germany, France and Italy are covered by the ECB. The inflation gap is computed on this page from the figures shown; it is not official central-bank language.")}</p>
          <p className="mt-1">{label("各行新闻已于 2026-10-10 按官网更新。其余数字仍使用其各自标注的日期。", "News was refreshed on 2026-10-10 from each bank's official site. Other figures keep the dates shown with them.")}</p>
        </div>
      </footer>
      <GovernorDialog bankId={governorId} locale={locale} onClose={closeGovernor} />
    </div>
  )
}
