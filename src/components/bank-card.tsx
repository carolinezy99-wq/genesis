import Image from "next/image"
import { DecisionStrip } from "@/components/decision-strip"
import { BankReading } from "@/components/reading"
import { SourceLink } from "@/components/source-link"
import { Sparkline } from "@/components/sparkline"
import { policyContext } from "@/lib/analysis"
import type { Bank, Source } from "@/lib/banks"
import { chartName, kindLabel, presentBank, sourceTitle, ui, type Locale } from "@/lib/copy"
import { history, HISTORY_CHECKED_ON } from "@/lib/history"
import { inflationPathFor } from "@/lib/inflation-path"
import { metricsFor, signed, stanceColor } from "@/lib/metrics"

const portraitFrame: Record<string, { position: string; zoom: number }> = {
  boc: { position: "49% 30%", zoom: 1.15 },
  rba: { position: "49% 38%", zoom: 1.7 },
  rbi: { position: "50% 20%", zoom: 2.3 },
  boe: { position: "50% 30%", zoom: 1.1 },
}

function Portrait({ bank, alt }: { bank: Bank; alt: string }) {
  const frame = portraitFrame[bank.id] ?? { position: "50% 25%", zoom: 1 }
  return (
    <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-[0_8px_20px_-14px_rgba(30,58,82,0.8)] ring-1 ring-[#1e3a52]/10">
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${bank.head.photo}`}
        alt={alt}
        fill
        sizes="112px"
        priority
        className="object-cover"
        style={{ objectPosition: frame.position, transform: `scale(${frame.zoom})`, transformOrigin: frame.position }}
      />
    </div>
  )
}

function Figure({ label, value, sub, source, locale, muted = false }: { label: string; value: string; sub: string; source?: Source; locale: Locale; muted?: boolean }) {
  return (
    <div className="craft-card craft-card-hover flex min-w-0 flex-col p-4 sm:p-5">
      <p className="flex items-center justify-between gap-2 text-[11px] font-medium text-slate-500">
        <span>{label}</span>
        {source ? <SourceLink source={source} locale={locale} /> : null}
      </p>
      <p className={`mt-1.5 font-semibold tracking-tight tabular-nums ${muted ? "text-lg text-slate-400" : "text-3xl text-slate-900"}`}>{value}</p>
      <p className="mt-1 text-[11px] leading-snug text-slate-500">{sub}</p>
    </div>
  )
}

function SourceLine({ source, locale }: { source: Source; locale: Locale }) {
  const copy = ui[locale]
  return (
    <p className="break-words">
      <span className="mr-1 inline-block rounded bg-slate-100 px-1 py-px text-[10px] text-slate-600">{kindLabel(source.kind, locale)}</span>
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2 hover:decoration-slate-700">
        {sourceTitle(source, locale)}
      </a>
      <span className="text-slate-400"> · {copy.readOn} {source.readOn}</span>
    </p>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-slate-100 py-2">
      <dt className="text-[11px] text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm leading-snug break-words text-slate-800">{value}</dd>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="border-l-2 border-[#1e3a52] pl-2.5 text-sm font-semibold tracking-tight text-[#1e3a52]">{children}</h3>
}

export function BankPanel({ bank, locale, onGovernor }: { bank: Bank; locale: Locale; onGovernor?: (id: string) => void }) {
  const copy = ui[locale]
  const view = presentBank(bank, locale)
  const m = metricsFor(bank, locale)
  const h = history[bank.id]
  const context = policyContext[bank.id]
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const role = `${view.title}${locale === "zh" ? "，" : ", "}${view.institution}`
  const noRate = m.policyRate == null
  const path = inflationPathFor(bank.id)
  const otherInflation = (["headline", "core"] as const)
    .map((key) => h?.[key])
    .filter((item): item is NonNullable<typeof item> => item != null && item.value !== bank.inflationActual.display)

  return (
    <article className="grid gap-5">
      <section className="craft-card p-5 sm:p-6">
        <div className="flex gap-4">
          <button type="button" onClick={() => onGovernor?.(bank.id)} className="shrink-0 rounded-md text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a52]" aria-label={label("打开行长简介", "Open governor profile")}>
            <Portrait bank={bank} alt={view.photoAlt} />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-semibold tracking-tight text-[#1e3a52] sm:text-3xl">
              <button type="button" onClick={() => onGovernor?.(bank.id)} className="text-left underline decoration-transparent underline-offset-4 hover:decoration-[#1e3a52]/40">
                {view.name}
              </button>
            </h2>
            <p className="mt-1 text-sm text-slate-600">{role}</p>
            <p className="mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-700">
              <span className="inline-flex items-center gap-1.5 font-medium"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stanceColor[m.stance] }} />{view.stanceLabel}</span>
              <span className="text-slate-400">·</span>
              <span>{view.cycleSize}</span>
              <span className="text-slate-400">·</span>
              <span className="tabular-nums">{bank.cycle.date}</span>
              <SourceLink source={bank.primarySource} locale={locale} />
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              {copy.portrait} · <a href={bank.head.photoPageUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">{copy.biography}</a>
            </p>
          </div>
        </div>
      </section>

      <section aria-label={label("核心数字", "Key figures")} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Figure
          locale={locale}
          label={label("政策利率", "Policy rate")}
          value={noRate ? label("无政策利率", "No policy rate") : view.policyDisplay}
          muted={noRate}
          sub={noRate ? `${view.policyName} · ${view.policyDisplay}` : view.policyName}
          source={m.policySource}
        />
        <Figure locale={locale} label={label("通胀目标", "Inflation target")} value={view.targetDisplay} muted={m.target == null} sub={m.targetBasis} source={m.targetSource} />
        <Figure locale={locale} label={label("最新通胀", "Latest inflation")} value={bank.inflationActual.display} sub={`${m.inflationMeasure} · ${m.inflationPeriod}`} source={m.inflationSource} />
        <Figure
          locale={locale}
          label={label("通胀缺口", "Inflation gap")}
          value={signed(m.gap, " pp")}
          muted={m.gap == null}
          sub={m.gap == null ? label("无点目标，不计算", "Not computed: no point target") : `${m.inflation}% − ${m.target}% (${label("最新通胀 − 目标", "latest inflation − target")})`}
        />
      </section>
      {otherInflation.length > 0 || h?.coreNote ? (
        <p className="text-[11px] leading-relaxed text-slate-500">
          {otherInflation.map((item) => (
            <span key={item.measure} className="mr-3">
              {item.measure} {item.value}
              <span className="text-slate-400"> · {item.period}</span>
            </span>
          ))}
          {h?.coreNote}
        </p>
      ) : null}

      <section className="craft-card grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="min-w-0">
          <SectionTitle>{label("近期政策决定（旧→新）", "Recent decisions (oldest → latest)")}</SectionTitle>
          <div className="mt-3"><DecisionStrip bankId={bank.id} locale={locale} size="lg" /></div>
          <p className="mt-2 text-[11px] leading-snug text-slate-500">
            {label(`各项决定已于 ${HISTORY_CHECKED_ON} 在央行官网核对；点击日期打开来源。`, `Each decision checked on the bank's official site on ${HISTORY_CHECKED_ON}; select a date to open its source.`)}
            {h?.historyNote ? <span className="block">{h.historyNote}</span> : null}
          </p>
        </div>
        <div className="min-w-0">
          <SectionTitle>{label("下次会议", "Next meeting")}</SectionTitle>
          {h?.nextMeeting ? (
            <p className="mt-3 text-2xl font-semibold tabular-nums text-slate-900">
              {h.nextMeeting.date}{" "}
              <SourceLink source={{ kind: "official", institution: bank.nameEn, title: label("会议日程", "Meeting calendar"), url: h.nextMeeting.url, readOn: HISTORY_CHECKED_ON }} locale={locale} />
            </p>
          ) : (
            <p className="mt-3 text-2xl font-semibold text-slate-300">—</p>
          )}
          <p className="mt-1 text-[11px] text-slate-500">{h?.nextMeetingNote ?? (h?.nextMeeting ? "" : label("未核实", "Not verified"))}</p>
        </div>
      </section>

      <section className="craft-card p-5 sm:p-6">
        <SectionTitle>{label("本行解读", "This bank")}</SectionTitle>
        <div className="mt-3"><BankReading bank={bank} locale={locale} /></div>
        {path ? (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="text-[11px] leading-snug text-slate-500">{path.measure[locale]}</p>
            <Sparkline points={path.points} label={`${chartName(bank, locale)} ${path.measure[locale]}, ${path.period[locale]}`} />
            <p className="mt-1 text-[11px] text-slate-500">
              {path.period[locale]}{" "}
              <SourceLink source={{ kind: "stats", institution: chartName(bank, locale), title: path.sourceTitle[locale], url: path.sourceUrl, readOn: HISTORY_CHECKED_ON }} locale={locale} />
            </p>
          </div>
        ) : null}
      </section>

      <section className="craft-card p-5 sm:p-6">
        <SectionTitle>{label("比较前须知", "Before comparing")}</SectionTitle>
        <dl className="mt-3 grid gap-4 text-sm lg:grid-cols-3">
          <div><dt className="text-[11px] font-medium text-slate-500">{label("职责", "Mandate")}</dt><dd className="mt-1 leading-relaxed text-slate-800">{context.mandate}</dd></div>
          <div><dt className="text-[11px] font-medium text-slate-500">{label("传导", "Transmission")}</dt><dd className="mt-1 leading-relaxed text-slate-800">{context.transmission}</dd></div>
          <div><dt className="text-[11px] font-medium text-slate-500">{label("可比性", "Comparability")}</dt><dd className="mt-1 leading-relaxed text-slate-800">{context.comparability}</dd></div>
        </dl>
        {view.framework ? <p className="mt-4 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-700">{view.framework}</p> : null}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="craft-card p-5 sm:p-6">
          <SectionTitle>{label("决策要点", "Decision facts")}</SectionTitle>
          <dl className="mt-2 grid content-start sm:grid-cols-2 sm:gap-x-4">
            <Field label={copy.setBy} value={view.bodyName} />
            <Field label={copy.watches} value={view.indicators} />
          </dl>
          {view.secondary.length > 0 ? (
            <div className="mt-4 rounded-md bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-800">{label("操作利率", "Operating rates")}</p>
              {view.extraReason ? <p className="mt-1 text-xs leading-relaxed text-slate-500">{view.extraReason}</p> : null}
              <ul className="mt-2 grid gap-1 text-sm">
                {view.secondary.map((rate) => <li key={rate.key} className="flex items-baseline justify-between gap-3"><span>{rate.name}</span><span className="font-semibold tabular-nums">{rate.display}</span></li>)}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="craft-card p-5 sm:p-6">
          <SectionTitle>{copy.latestNews}</SectionTitle>
          {view.news.length > 0 ? (
            <ul className="mt-2 grid gap-3">
              {view.news.map((item) => (
                <li key={item.url} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <p className="text-[11px] tabular-nums text-slate-500">{item.date}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-0.5 block text-sm font-medium break-words text-slate-800 underline decoration-slate-300 underline-offset-2">{item.title}</a>
                  {item.line ? <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.line}</p> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">{view.newsMissing}</p>
          )}
        </div>
      </section>

      <section className="craft-card px-5 py-4 text-[11px] leading-relaxed text-slate-500 sm:px-6">
        <p className="text-xs font-medium text-slate-800">{copy.sources}</p>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          <SourceLine source={bank.primarySource} locale={locale} />
          <SourceLine source={bank.inflationActual.source} locale={locale} />
          {bank.sources.map((source) => <SourceLine key={source.url} source={source} locale={locale} />)}
        </div>
      </section>
    </article>
  )
}
