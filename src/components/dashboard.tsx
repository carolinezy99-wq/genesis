"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { BankPanel } from "@/components/bank-card"
import { BankGallery } from "@/components/bank-gallery"
import { CompareTable } from "@/components/compare-table"
import { InflationGapChart } from "@/components/compare-charts"
import { GovernorDialog } from "@/components/governor-dialog"
import { useLocale } from "@/components/locale"
import { OverviewHero } from "@/components/overview-hero"
import { MeetingWatch } from "@/components/meeting-watch"
import { Reading } from "@/components/reading"
import { banks, DATA_AS_OF } from "@/lib/banks"
import { bankTabLabel, ui } from "@/lib/copy"

export function Dashboard() {
  const { locale } = useLocale()
  const copy = ui[locale]
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const [tab, setTab] = useState("overview")
  const [governorId, setGovernorId] = useState<string | null>(null)
  const closeGovernor = useCallback(() => setGovernorId(null), [])
  const selected = banks.find((bank) => bank.id === tab)
  const stripRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="min-h-screen bg-[#edf2f5] text-slate-800">
      <header className="border-b border-[#16344b]/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102b42] text-sm font-semibold tracking-tight text-white shadow-sm">MP</span>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold tracking-[0.19em] text-[#b4532a] uppercase">{copy.kicker}</p>
              <h1 className="truncate text-base font-semibold tracking-tight text-[#142c41] sm:text-lg">{copy.title}</h1>
            </div>
          </div>
          <div className="hidden items-center gap-5 text-[11px] text-slate-500 sm:flex">
            <span><strong className="font-semibold tabular-nums text-slate-800">{banks.length}</strong> {label("家央行", "central banks")}</span>
            <span className="h-4 w-px bg-slate-200" />
            <span>{copy.asOf} <strong className="font-semibold tabular-nums text-slate-800">{DATA_AS_OF}</strong></span>
          </div>
        </div>
      </header>
      <nav className="sticky top-0 z-30 border-b border-[#16344b]/10 bg-white/90 shadow-[0_12px_30px_-24px_rgba(20,44,65,.7)] backdrop-blur-xl">
          <div ref={stripRef} role="tablist" aria-label={label("央行", "Central banks")} className="no-scrollbar mx-auto flex max-w-[1440px] snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain px-4 sm:px-6 lg:px-8">
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
                  className={`shrink-0 snap-start border-b-2 px-3 py-3 text-xs whitespace-nowrap transition sm:text-sm ${active ? "border-[#b4532a] font-semibold text-[#142c41]" : "border-transparent text-slate-500 hover:text-slate-900"}`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        {tab === "overview" ? (
          <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className="grid gap-7">
            <div className="overview-hero-enter"><OverviewHero locale={locale} /></div>
            <div className="overview-module-enter overview-delay-1 grid gap-5 md:grid-cols-[minmax(0,1.45fr)_minmax(17rem,.65fr)]">
              <InflationGapChart locale={locale} />
              <MeetingWatch locale={locale} onSelect={select} />
            </div>
            <div className="overview-module-enter overview-delay-2"><Reading locale={locale} /></div>
            <div className="overview-module-enter overview-delay-3"><CompareTable locale={locale} onSelect={select} onGovernor={setGovernorId} /></div>
            <div className="overview-module-enter overview-delay-4"><BankGallery locale={locale} onSelect={select} /></div>
          </div>
        ) : selected ? (
          <div role="tabpanel" id={`panel-${selected.id}`} aria-labelledby={`tab-${selected.id}`}>
            <BankPanel key={selected.id} bank={selected} locale={locale} onGovernor={setGovernorId} />
          </div>
        ) : null}
      </main>

      <footer className="mt-5 bg-[#0d2539] text-slate-300">
        <div className="mx-auto max-w-[1440px] px-4 py-7 text-[11px] leading-relaxed sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2 text-white"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-[10px] font-semibold">MP</span><span className="font-semibold">{copy.title}</span></div>
          <p className="text-xs text-slate-200">{copy.asOf} <strong className="font-semibold tabular-nums text-white">{DATA_AS_OF}</strong>. {label("数字取自各央行与官方统计机构页面；打开网页时不会重新抓取。", "Figures were read from central-bank and official statistics pages on that date; the site does not re-fetch them.")}</p>
          <p className="mt-1.5">{label("德国、法国、意大利由欧洲央行代表。通胀缺口为本页根据所列数字计算的分析指标，不是央行官方表述。", "Germany, France and Italy are covered by the ECB. The inflation gap is computed on this page from the figures shown; it is not official central-bank language.")}</p>
          <p className="mt-1.5">{label("各行新闻已于 2026-10-10 按官网更新。其余数字仍使用其各自标注的日期。", "News was refreshed on 2026-10-10 from each bank's official site. Other figures keep the dates shown with them.")}</p>
        </div>
      </footer>
      <GovernorDialog bankId={governorId} locale={locale} onClose={closeGovernor} />
    </div>
  )
}
