import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Bank, Source } from "@/lib/banks"
import { decisionText, kindLabel, presentBank, sourceTitle, ui, type Locale, type Stance } from "@/lib/copy"

const stanceClass: Record<Stance, string> = {
  tightening: "bg-[#16325c] text-white",
  holding: "bg-[#e7eef6] text-[#16325c]",
  easing: "bg-white text-[#16325c] ring-1 ring-[#16325c]",
  unclear: "bg-muted text-muted-foreground",
}

function figureClass(value: string) {
  if (value.length > 12) return "mt-2 text-xl leading-snug font-semibold break-words"
  if (value.length > 6) return "mt-2 text-3xl leading-none font-semibold tracking-tight break-words"
  return "mt-2 text-4xl leading-none font-semibold tracking-tight tabular-nums"
}

function KindMark({ label }: { label: string }) {
  return (
    <span className="mr-1 inline-block rounded bg-muted px-1 py-px align-baseline text-[10px] tracking-normal text-foreground/70">
      {label}
    </span>
  )
}

function SourceLine({ source, locale }: { source: Source; locale: Locale }) {
  const copy = ui[locale]
  return (
    <p className="break-words">
      <KindMark label={kindLabel(source.kind, locale)} />
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-foreground/25 underline-offset-2 hover:decoration-foreground"
      >
        {sourceTitle(source, locale)}
      </a>
      <span className="text-foreground/40"> · {copy.readOn} {source.readOn}</span>
    </p>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-border/70 py-2">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm leading-snug break-words">{value}</dd>
    </div>
  )
}

export function BankPanel({ bank, locale }: { bank: Bank; locale: Locale }) {
  const copy = ui[locale]
  const view = presentBank(bank, locale)
  const hasNote = Boolean(view.bodyNote || view.targetHint || view.framework || view.secondary.length > 0)
  const decisionValue = decisionText(view.stanceLabel, view.cycleLabel, view.cycleSize)

  return (
    <section className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="grid items-center gap-4 p-4 sm:p-5 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="mx-auto w-full max-w-[15rem] rounded-lg bg-[#eef3f8] p-3 ring-1 ring-[#16325c]/10 lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={bank.head.photo}
              alt={view.photoAlt}
              fill
              sizes="240px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">{view.institution}</p>
              <h2 className="mt-0.5 text-2xl font-semibold tracking-tight">{view.name}</h2>
              <p className="text-sm text-muted-foreground">{view.title}</p>
            </div>
            <Badge className={`border-0 ${stanceClass[view.stance]}`}>{view.stanceLabel}</Badge>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-left">
            <div className="min-w-0 rounded-lg bg-[#16325c] px-3 py-3 text-white sm:px-4 sm:py-4">
              <p className="text-[11px] leading-snug break-words text-white/70">{view.policyName}</p>
              <p className={figureClass(view.policyDisplay)}>{view.policyDisplay}</p>
              <p className="mt-2 text-[11px] leading-snug break-words text-white/60">{view.policyAsOf}</p>
            </div>
            <div className="min-w-0 rounded-lg bg-[#e7eef6] px-3 py-3 text-[#16325c] sm:px-4 sm:py-4">
              <p className="text-[11px] text-[#3d5270]">{copy.inflationTarget}</p>
              <p className={figureClass(view.targetDisplay)}>{view.targetDisplay}</p>
              <p className="mt-2 text-[11px] leading-snug break-words text-[#3d5270]">
                {view.latestGauge} {view.latestValue}
                <span className="mt-0.5 block">{view.latestPeriod}</span>
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-md bg-[#eef3f8] px-3 py-2">
            <p className="min-w-0 text-sm leading-snug break-words">
              <span className="text-muted-foreground">{copy.colMove}</span>
              <span className="ml-2 font-medium">{decisionValue}</span>
            </p>
            <p className="text-sm tabular-nums text-muted-foreground lg:ml-auto">{bank.cycle.date}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 border-t border-border/80 px-4 py-4 sm:px-5 lg:grid-cols-2">
        <dl className="grid content-start sm:grid-cols-2 lg:grid-cols-1">
          <Field label={copy.colInstrument} value={view.policyName} />
          <Field label={copy.colSetting} value={view.policyDisplay} />
          <Field label={copy.colTarget} value={view.targetDisplay} />
          <Field label={copy.colLatest} value={`${view.latestValue} · ${view.latestPeriod}`} />
          <Field label={copy.colGauge} value={view.latestGauge} />
          <Field label={copy.watches} value={view.indicators} />
          <Field label={copy.setBy} value={view.bodyName} />
          <Field label={copy.colMove} value={decisionValue} />
          <Field label={copy.colDate} value={bank.cycle.date} />
        </dl>

        <div className="grid content-start gap-4">
          {hasNote ? (
            <div className="rounded-md bg-[#e7eef6]/70 px-3 py-2.5">
              <p className="text-xs font-medium text-[#16325c]">{copy.note}</p>
              {view.bodyNote ? <p className="mt-1.5 text-sm leading-relaxed">{view.bodyNote}</p> : null}
              {view.targetHint ? <p className="mt-1.5 text-sm leading-relaxed">{view.targetHint}</p> : null}
              {view.framework ? (
                <div className="mt-3">
                  <p className="text-xs font-medium">{copy.frameworkTitle}</p>
                  <p className="mt-1 text-sm leading-relaxed">{view.framework}</p>
                </div>
              ) : null}
              {view.secondary.length > 0 ? (
                <div className="mt-3">
                  <p className="text-xs font-medium">{copy.otherRates}</p>
                  {view.extraReason ? <p className="mt-1 text-sm leading-relaxed">{view.extraReason}</p> : null}
                  <ul className="mt-2 grid gap-1 text-sm">
                    {view.secondary.map((rate) => (
                      <li key={rate.key} className="flex items-baseline justify-between gap-3">
                        <span className="min-w-0 break-words">{rate.name}</span>
                        <span className="shrink-0 font-medium tabular-nums">{rate.display}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          <div>
            <h3 className="text-sm font-medium">{copy.latestNews}</h3>
            {view.news.length > 0 ? (
              <ul className="mt-2 grid gap-3">
                {view.news.map((item) => (
                  <li key={item.url} className="border-b border-border/80 pb-3 last:border-0 last:pb-0">
                    <p className="text-xs tabular-nums text-muted-foreground">{item.date}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block text-sm font-medium break-words underline decoration-foreground/25 underline-offset-2"
                    >
                      {item.title}
                    </a>
                    {item.line ? (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.line}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">{view.newsMissing}</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border/80 px-4 py-3 text-[11px] leading-relaxed text-muted-foreground sm:px-5">
        <p className="text-xs font-medium text-foreground">{copy.sources}</p>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          <p className="break-words">
            {copy.portrait}
            {" · "}
            <a
              href={bank.head.photoPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/25 underline-offset-2"
            >
              {copy.biography}
            </a>
          </p>
          <SourceLine source={bank.primarySource} locale={locale} />
          <SourceLine source={bank.inflationActual.source} locale={locale} />
          {bank.sources.map((source) => (
            <SourceLine key={source.url} source={source} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
