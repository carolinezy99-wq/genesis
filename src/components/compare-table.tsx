"use client"

import { useMemo, useState } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { DecisionLegend, DecisionStrip } from "@/components/decision-strip"
import { SourceLink } from "@/components/source-link"
import { chartName, presentBank, ui, type Locale } from "@/lib/copy"
import { history, HISTORY_CHECKED_ON } from "@/lib/history"
import { policyContext } from "@/lib/analysis"
import { allMetrics, signed, stanceColor } from "@/lib/metrics"

type SortKey = "bank" | "policy" | "inflation" | "gap" | "next"

export function CompareTable({ locale, onSelect }: { locale: Locale; onSelect: (id: string) => void }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "policy", dir: -1 })

  const rows = useMemo(() => {
    const base = allMetrics(locale).map(({ bank, m }) => ({ bank, m, view: presentBank(bank, locale), next: history[bank.id]?.nextMeeting?.date ?? null }))
    const value = (r: (typeof base)[number]): number | string | null => {
      switch (sort.key) {
        case "bank": return chartName(r.bank, locale)
        case "policy": return r.m.policyRate
        case "inflation": return r.m.inflation
        case "gap": return r.m.gap
        case "next": return r.next
      }
    }
    return [...base].sort((a, b) => {
      const av = value(a), bv = value(b)
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir
    })
  }, [locale, sort])

  const head = (key: SortKey, text: string, align: "left" | "right" = "right") => {
    const active = sort.key === key
    const Icon = active ? (sort.dir === 1 ? ArrowUp : ArrowDown) : ArrowUpDown
    return (
      <th scope="col" aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"} className={`px-3 py-2.5 font-medium whitespace-nowrap ${align === "right" ? "text-right" : "text-left"}`}>
        <button type="button" onClick={() => setSort({ key, dir: active ? (sort.dir === 1 ? -1 : 1) : key === "bank" || key === "next" ? 1 : -1 })} className={`inline-flex items-center gap-1 hover:text-slate-900 ${active ? "text-slate-900" : ""}`}>
          {text}<Icon className="h-3 w-3" />
        </button>
      </th>
    )
  }

  return (
    <section className="min-w-0 rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-wrap items-end justify-between gap-2 px-4 pt-4 pb-3 sm:px-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{label("九家央行对照", "Nine banks compared")}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{label("点击表头排序；点击央行名称查看详情。", "Select a column header to sort. Select a bank for its detail tab.")}</p>
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500"><DecisionLegend locale={locale} /></p>
      </div>
      <div className="overflow-x-auto overscroll-x-contain border-t border-slate-200">
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <caption className="sr-only">{label("九家央行政策利率、通胀与通胀缺口对照", "Policy rate, inflation and inflation gap for nine central banks")}</caption>
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th scope="col" aria-sort={sort.key === "bank" ? (sort.dir === 1 ? "ascending" : "descending") : "none"} className="sticky left-0 z-10 bg-slate-50 px-3 py-2.5 text-left font-medium shadow-[1px_0_0_#e2e8f0]">
                <button type="button" onClick={() => setSort({ key: "bank", dir: sort.key === "bank" && sort.dir === 1 ? -1 : 1 })} className="inline-flex items-center gap-1 hover:text-slate-900">
                  {label("央行", "Bank")}{sort.key === "bank" ? (sort.dir === 1 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3" />}
                </button>
              </th>
              <th scope="col" className="px-3 py-2.5 text-left font-medium whitespace-nowrap">{label("最近动作／政策倾向", "Latest action / policy bias")}</th>
              {head("policy", label("政策利率", "Policy rate"))}
              {head("inflation", label("最新通胀", "Latest inflation"))}
              <th scope="col" className="px-3 py-2.5 text-right font-medium whitespace-nowrap">{label("目标（计算用）", "Target used")}</th>
              {head("gap", label("通胀缺口", "Inflation gap"))}
              <th scope="col" className="px-3 py-2.5 text-left font-medium whitespace-nowrap">{label("近期决定（旧→新）", "Recent decisions (old → new)")}</th>
              {head("next", label("下次会议", "Next meeting"), "left")}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ bank, m, view, next }) => {
              const h = history[bank.id]
              const context = policyContext[bank.id]
              return (
                <tr key={bank.id} className="group border-t border-slate-100 align-top">
                  <th scope="row" className="sticky left-0 z-10 bg-white px-3 py-3 text-left shadow-[1px_0_0_#e2e8f0] group-hover:bg-slate-50">
                    <button type="button" onClick={() => onSelect(bank.id)} className="text-left">
                      <span className="block font-semibold text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-700">{chartName(bank, locale)}</span>
                      <span className="block max-w-[8rem] text-[11px] font-normal text-slate-500">{locale === "zh" ? bank.nameZh : bank.nameEn}</span>
                    </button>
                  </th>
                  <td className="px-3 py-3 whitespace-nowrap group-hover:bg-slate-50">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stanceColor[m.stance] }} />Action · {view.stanceLabel}</span>
                    <span className="mt-0.5 block max-w-[9rem] text-[11px] whitespace-normal tabular-nums text-slate-500">{bank.cycle.date} · {view.cycleSize}</span>
                    <span className={`mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${bank.id === "pboc" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-amber-50 text-amber-800 ring-amber-200/70"}`}>Bias · {context.biasTag}</span>
                  </td>
                  <td className="px-3 py-3 text-right whitespace-nowrap group-hover:bg-slate-50">
                    <span className={`font-semibold tabular-nums text-slate-900 ${m.policyRate == null ? "text-xs font-normal text-slate-500" : ""}`}>{m.policyRate == null ? label("无政策利率", "No policy rate") : view.policyDisplay}</span> <SourceLink source={m.policySource} locale={locale} />
                    <span className="ml-auto block max-w-[9.5rem] text-[11px] whitespace-normal text-slate-500">{view.policyName}</span>
                  </td>
                  <td className="px-3 py-3 text-right whitespace-nowrap group-hover:bg-slate-50">
                    <span className="font-semibold tabular-nums text-slate-900">{bank.inflationActual.display}</span> <SourceLink source={m.inflationSource} locale={locale} />
                    <span className="block text-[11px] text-slate-500">{m.inflationMeasure}</span>
                    {h?.core && h.headline?.value === bank.inflationActual.display && h.headline.period === h.core.period ? <span className="block text-[11px] text-slate-500">{label("核心", "Core")} {h.core.value}</span> : null}
                    {h?.headline && h.core?.value === bank.inflationActual.display && h.headline.period === h.core.period ? <span className="block text-[11px] text-slate-500">{label("整体", "Headline")} {h.headline.value}</span> : null}
                  </td>
                  <td className="px-3 py-3 text-right whitespace-nowrap group-hover:bg-slate-50">
                    <span className="tabular-nums text-slate-900">{m.target == null ? "—" : `${m.target}%`}</span> <SourceLink source={m.targetSource} locale={locale} />
                    <span className="ml-auto block max-w-[8rem] text-[11px] whitespace-normal text-slate-500">{m.targetBasis}</span>
                  </td>
                  <td className="px-3 py-3 text-right whitespace-nowrap tabular-nums group-hover:bg-slate-50">
                    <span className={`text-slate-900 ${m.gap != null && Math.abs(m.gap) >= 1 ? "font-semibold" : ""}`}>{signed(m.gap, " pp")}</span>
                  </td>
                  <td className="px-3 py-3 group-hover:bg-slate-50"><DecisionStrip bankId={bank.id} locale={locale} /></td>
                  <td className="px-3 py-3 whitespace-nowrap text-xs tabular-nums text-slate-700 group-hover:bg-slate-50">
                    {next && h?.nextMeeting ? (
                      <>
                        <span className="font-semibold text-slate-900">{next}</span> <SourceLink source={{ kind: "official", institution: bank.nameEn, title: label("会议日程", "Meeting calendar"), url: h.nextMeeting.url, readOn: HISTORY_CHECKED_ON }} locale={locale} />
                        {h.nextMeetingNote ? <span className="block max-w-[11rem] text-[11px] whitespace-normal text-slate-500">{h.nextMeetingNote}</span> : null}
                      </>
                    ) : <span className="text-slate-400">{h?.nextMeetingNote ?? label("未核实", "Not verified")}</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-200 px-4 py-3 text-[11px] leading-relaxed text-slate-500 sm:px-5">
        {label(
          "通胀缺口 = 最新通胀 − 目标（区间取中点）。新加坡金管局无点目标，因此不计算通胀缺口。所用通胀口径见每格下方。近期决定为最近六次例会决定，均已在央行官网核对；中国人民银行没有固定议息会议，因此显示六个 2026 年政策利率核查点。",
          "Inflation gap = latest inflation − target (using the midpoint where the target is a range). MAS has no point target, so no inflation gap is calculated. The inflation measure used is named under each figure. Recent decisions are the last six scheduled decisions, each checked on the bank's official site; because the PBoC has no scheduled rate meetings, its strip shows six representative 2026 policy-rate checkpoints.",
        )}
        {" "}{ui[locale].asOf} 2026-10-03.
      </p>
    </section>
  )
}
