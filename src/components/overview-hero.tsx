"use client"

import Image from "next/image"
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Landmark, MoveRight } from "lucide-react"
import { banks, DATA_AS_OF } from "@/lib/banks"
import { bankTabLabel, chartName, presentBank, type Locale } from "@/lib/copy"
import { history } from "@/lib/history"
import { metricsFor, stanceColor, summary } from "@/lib/metrics"
import { headquarters } from "@/lib/places"

const featured = ["fed", "ecb", "boe", "boj", "boc", "pboc", "rbi", "mas", "rba"]

const stanceIcon = {
  tightening: ArrowUpRight,
  holding: ArrowRight,
  easing: ArrowDownRight,
  unclear: ArrowRight,
}

const regionColumns = [
  { title: "Americas", ids: ["fed", "boc"] },
  { title: "Europe", ids: ["ecb", "boe"] },
  { title: "Asia Pacific", ids: ["rbi", "pboc", "boj", "mas", "rba"] },
]

export function OverviewHero({ locale, onSelect }: { locale: Locale; onSelect: (id: string) => void }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const s = summary(locale)
  const calendar = banks
    .map((bank) => ({ bank, meeting: history[bank.id]?.nextMeeting, note: history[bank.id]?.nextMeetingNote }))
    .filter((item): item is typeof item & { meeting: NonNullable<typeof item.meeting> } => Boolean(item.meeting))
    .sort((a, b) => a.meeting.date.localeCompare(b.meeting.date))

  return (
    <div className="grid gap-5">
      <section className="hero-shell relative overflow-hidden rounded-[1.75rem] bg-[#0b2034] text-white shadow-[0_28px_70px_-38px_rgba(8,30,49,0.9)]">
        <div className="absolute inset-y-0 right-0 hidden w-[60%] lg:grid lg:grid-cols-3 lg:grid-rows-3">
          {featured.map((id) => {
            const place = headquarters[id]
            const bank = banks.find((item) => item.id === id)
            return place ? (
              <div key={id} className="relative overflow-hidden border-l border-t border-white/15 first:border-t-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${place.image}`}
                  alt={place.alt[locale]}
                  fill
                  priority
                  sizes="260px"
                  className="object-cover opacity-75 saturate-[.78] contrast-[1.06]"
                />
                {bank ? (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071725]/85 via-[#071725]/45 to-transparent px-2.5 pt-6 pb-1.5">
                    <span className="block truncate text-[9px] font-semibold tracking-[0.12em] text-white/85 uppercase">
                      {chartName(bank, locale)}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : null
          })}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0b2034_0%,rgba(11,32,52,.98)_36%,rgba(11,32,52,.74)_51%,rgba(11,32,52,.08)_100%)]" />
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-20" />

        <div className="relative z-10 max-w-3xl px-5 py-7 sm:px-8 sm:py-9 lg:py-11">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase backdrop-blur">
            <Landmark className="h-3.5 w-3.5" /> {label("全球货币政策观察", "Global monetary policy monitor")}
          </div>
          <h2 className="mt-5 max-w-2xl text-3xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
            {label("九家央行，一张政策全景图。", "Nine central banks. One policy picture.")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {label("对照政策利率、通胀缺口、最近决策与下一次会议。", "Compare policy rates, inflation gaps, latest decisions and the next meeting on a single research surface.")}
          </p>
          <div className="mt-7 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: label("收紧", "Tightening"), value: s.tightening, color: stanceColor.tightening },
              { label: label("维持", "Holding"), value: s.holding, color: stanceColor.holding },
              { label: label("放松", "Easing"), value: s.easing, color: stanceColor.easing },
              { label: label("数据截至", "Data as of"), value: DATA_AS_OF.slice(5), color: "#d7b46a" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/[.075] px-3 py-3 backdrop-blur-md">
                <p className="flex items-center gap-1.5 text-[10px] tracking-wide text-white/55 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />{item.label}
                </p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(20rem,.75fr)]">
        <div className="craft-card overflow-hidden p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">{label("区域分布", "Regional pulse")}</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#142c41]">{label("政策温度图", "Policy pulse map")}</h2>
            </div>
            <p className="max-w-sm text-right text-[11px] leading-relaxed text-slate-500">
              {label("颜色表示最近决定；点击银行进入完整档案。", "Colour shows the latest decision. Select a bank to open its full profile.")}
            </p>
          </div>
          <div className="relative mt-5 overflow-hidden rounded-2xl border border-[#15344d]/10 bg-[#edf3f6] p-3 sm:p-5">
            <div className="pointer-events-none absolute inset-0 policy-map-grid opacity-50" />
            <div className="relative grid gap-3 md:grid-cols-[.8fr_.8fr_1.35fr]">
              {regionColumns.map((region) => (
                <div key={region.title} className="rounded-xl border border-white/80 bg-white/70 p-3 shadow-[0_10px_30px_-24px_rgba(20,44,65,.65)] backdrop-blur">
                  <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase">{region.title}</p>
                  <div className="grid gap-2">
                    {region.ids.map((id) => {
                      const bank = banks.find((item) => item.id === id)!
                      const view = presentBank(bank, locale)
                      const m = metricsFor(bank, locale)
                      const Direction = stanceIcon[m.stance]
                      return (
                        <button key={id} type="button" onClick={() => onSelect(id)} className="group flex items-center gap-2 rounded-lg p-1.5 text-left transition hover:bg-white hover:shadow-sm">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm" style={{ backgroundColor: stanceColor[m.stance] }}>
                            <Direction className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-xs font-semibold text-slate-800">{chartName(bank, locale)}</span>
                            <span className="block truncate text-[10px] text-slate-500">{view.stanceLabel}</span>
                          </span>
                          <span className="max-w-[8.5rem] text-right text-[10px] leading-tight font-semibold break-words tabular-nums text-[#15344d] sm:text-xs">{view.policyDisplay}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl bg-[#f4f7f9] p-3"><p className="text-[10px] text-slate-500">{label("最高利率", "Highest rate")}</p><p className="mt-1 text-sm font-semibold text-slate-900">{chartName(s.highest.bank, locale)} <span className="tabular-nums">{presentBank(s.highest.bank, locale).policyDisplay}</span></p></div>
            <div className="rounded-xl bg-[#f4f7f9] p-3"><p className="text-[10px] text-slate-500">{label("最低利率", "Lowest rate")}</p><p className="mt-1 text-sm font-semibold text-slate-900">{chartName(s.lowest.bank, locale)} <span className="tabular-nums">{presentBank(s.lowest.bank, locale).policyDisplay}</span></p></div>
            <div className="rounded-xl bg-[#f4f7f9] p-3"><p className="text-[10px] text-slate-500">{label("设定利率的央行", "Rate-setting banks")}</p><p className="mt-1 text-sm font-semibold text-slate-900">8 / 9</p></div>
            <div className="rounded-xl bg-[#f4f7f9] p-3"><p className="text-[10px] text-slate-500">{label("通胀高于目标", "Above target")}</p><p className="mt-1 text-sm font-semibold text-slate-900">6 {label("家央行", "banks")}</p></div>
          </div>
        </div>

        <aside className="craft-card overflow-hidden">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <p className="eyebrow">{label("决策日历", "Decision calendar")}</p>
            <h2 className="mt-1 flex items-center gap-2 text-xl font-semibold tracking-tight text-[#142c41]"><CalendarDays className="h-5 w-5 text-[#b4532a]" />{label("下一轮会议", "Next meetings")}</h2>
            <p className="mt-1 text-xs text-slate-500">{label(`截至 ${DATA_AS_OF} 的已核实日程`, `Verified schedule as of ${DATA_AS_OF}`)}</p>
          </div>
          <div className="divide-y divide-slate-100">
            {calendar.slice(0, 6).map(({ bank, meeting, note }, index) => (
              <button key={bank.id} type="button" onClick={() => onSelect(bank.id)} className="group flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-[#f7fafb] sm:px-6">
                <span className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl ${index === 0 ? "bg-[#b4532a] text-white" : "bg-[#edf2f5] text-[#15344d]"}`}>
                  <span className="text-[9px] font-medium uppercase">{meeting.date.slice(5, 7)}</span>
                  <span className="-mt-0.5 text-base font-semibold tabular-nums">{meeting.date.slice(8)}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-800">{bankTabLabel[bank.id][locale]}</span>
                  <span className="block truncate text-[10px] text-slate-500">{note ?? meeting.date}</span>
                </span>
                <MoveRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#15344d]" />
              </button>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
