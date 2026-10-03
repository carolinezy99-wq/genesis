"use client"

// English-only presentation; source labels can identify original-language releases.

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowDownRight, Landmark, ShieldCheck } from "lucide-react"
import { BankPanel } from "@/components/bank-card"
import { BankGallery } from "@/components/bank-gallery"
import { InflationGap, PanoramaMatrix, Verified } from "@/components/analysis-panels"
import { useLocale } from "@/components/locale"
import { RateChart } from "@/components/rate-chart"
import { analysis } from "@/lib/analysis"
import { banks, DATA_AS_OF } from "@/lib/banks"
import { bankTabLabel, chartName, presentBank, ui } from "@/lib/copy"
import { summary } from "@/lib/metrics"

function InsightCard({ eyebrow, value, detail, tone = "navy" }: { eyebrow: string; value: string; detail: string; tone?: "navy" | "coral" | "green" | "gold" }) {
  const accents = {
    navy: "from-[#183c55] to-[#244f68] text-white",
    coral: "from-[#f1ddd4] to-[#fff7f3] text-[#17364a]",
    green: "from-[#dcefe7] to-[#f4fbf7] text-[#17364a]",
    gold: "from-[#f2e6cc] to-[#fffaf0] text-[#17364a]",
  }
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br p-4 shadow-sm ring-1 ring-black/5 ${accents[tone]}`}>
      <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/12" />
      <p className="text-[10px] font-semibold tracking-[.16em] uppercase opacity-65">{eyebrow}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="mt-1 text-xs leading-snug opacity-70">{detail}</p>
    </div>
  )
}

export function Dashboard() {
  const { locale } = useLocale()
  const copy = ui[locale]
  const [tab, setTab] = useState("overview")
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

  const averageGap = useMemo(() => {
    const values = banks.map((bank) => analysis[bank.id].gap).filter((value): value is number => value != null)
    return values.reduce((total, value) => total + value, 0) / values.length
  }, [])

  const tabs = [{ id: "overview", label: copy.overview }, ...banks.map((bank) => ({ id: bank.id, label: bankTabLabel[bank.id][locale] }))]

  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#17364a]">
      <header className="relative overflow-hidden bg-[#102f45] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(244,180,74,.24),transparent_28%),radial-gradient(circle_at_12%_100%,rgba(45,155,117,.18),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[.2em] text-[#f4b44a] uppercase">{copy.kicker}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">{copy.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">{copy.lede}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 ring-1 ring-white/12"><Landmark className="h-3.5 w-3.5" />9 central banks</span>
              <span className="rounded-full bg-white/8 px-3 py-1.5 ring-1 ring-white/12">Data as of {DATA_AS_OF}</span>
              <Verified locale={locale} />
            </div>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-30 border-b border-black/8 bg-[#f4f1eb]/95 backdrop-blur">
        <div ref={stripRef} role="tablist" aria-label="Central banks" className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-1 overflow-x-auto px-4 sm:px-6">
          {tabs.map((item) => {
            const active = tab === item.id
            return <button key={item.id} type="button" role="tab" id={`tab-${item.id}`} aria-selected={active} aria-controls={`panel-${item.id}`} onClick={() => setTab(item.id)} className={`shrink-0 snap-start border-b-2 px-3 py-3 text-sm whitespace-nowrap transition ${active ? "border-[#d86545] font-semibold text-[#17364a]" : "border-transparent text-[#64747f] hover:text-[#17364a]"}`}>{item.label}</button>
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {tab === "overview" ? (
          <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className="grid gap-6">
            <section aria-label="Key findings" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <InsightCard eyebrow="Highest policy rate" value={presentBank(s.highest.bank, locale).policyDisplay} detail={`${chartName(s.highest.bank, locale)} · ${presentBank(s.highest.bank, locale).policyName}`} tone="coral" />
              <InsightCard eyebrow="Lowest policy rate" value={presentBank(s.lowest.bank, locale).policyDisplay} detail={`${chartName(s.lowest.bank, locale)} · ${presentBank(s.lowest.bank, locale).policyName}`} tone="green" />
              <InsightCard eyebrow="Latest tightening actions" value={`${s.tightening} / 9`} detail={`${s.holding} holding · ${s.easing} easing`} tone="navy" />
              <InsightCard eyebrow="Average inflation gap*" value={`${averageGap >= 0 ? "+" : ""}${averageGap.toFixed(2)}pp`} detail="Eight banks with a comparable objective" tone="gold" />
            </section>

            <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
              <section className="rounded-2xl bg-card p-4 ring-1 ring-black/8 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[.16em] text-[#d86545] uppercase">Rate ranking</p><h2 className="mt-1 text-xl font-semibold">Eight rate-setting banks, ranked</h2></div><Verified locale={locale} compact /></div>
                <p className="mt-1 text-xs text-muted-foreground">Orange = tightening, blue = hold, green = easing. The Fed uses the midpoint of its range.</p>
                <RateChart locale={locale} caption="Policy rates for eight central banks" yAxis="Policy rate (%)" />
                <p className="mt-1 text-xs text-muted-foreground">Singapore is excluded because MAS uses the S$NEER policy band rather than a policy interest rate. China is represented by the 7-day reverse-repo operation rate.</p>
              </section>
              <InflationGap locale={locale} />
            </div>

            <PanoramaMatrix locale={locale} onSelect={select} />
            <BankGallery locale={locale} onSelect={select} />

            <section className="flex items-start gap-3 rounded-2xl bg-[#102f45] p-4 text-xs leading-relaxed text-white/65 sm:p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#f4b44a]" />
              <p><strong className="text-white">Verification note.</strong> Each bank is cross-checked against at least two primary sources: an official policy or framework release and official inflation statistics. Policy-bias labels and inflation gaps are dashboard analysis rather than official central-bank wording. *Australia uses the 2.5% midpoint of its 2–3% band; China uses the annual expected objective; MAS has no point objective.</p>
            </section>
          </div>
        ) : selected ? (
          <div role="tabpanel" id={`panel-${selected.id}`} aria-labelledby={`tab-${selected.id}`}>
            <button type="button" onClick={() => select("overview")} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-[#477694] hover:text-[#17364a]"><ArrowDownRight className="h-4 w-4 rotate-90" />Back to comparison</button>
            <BankPanel bank={selected} locale={locale} />
          </div>
        ) : null}
      </main>

      <footer className="border-t border-black/8 bg-[#ebe6dc]">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-[11px] leading-relaxed text-[#667680] sm:px-6"><p>Data as of <strong className="text-[#17364a]">{DATA_AS_OF}</strong>. Figures do not re-fetch when the page opens.</p><p>Germany, France and Italy are covered by the ECB. Select any bank for official sources, policy context and decision history.</p></div>
      </footer>
    </div>
  )
}
