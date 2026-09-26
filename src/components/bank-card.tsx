import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Bank, CycleKind, Source } from "@/lib/banks"
import { kindLabel, presentBank, sourceTitle, ui, type Locale } from "@/lib/copy"

const cycleClass: Record<CycleKind, string> = {
  hike: "bg-[#16325c] text-white",
  tighten: "bg-[#16325c] text-white",
  hold: "bg-[#e7eef6] text-[#16325c]",
  cut: "bg-transparent text-[#16325c] ring-1 ring-[#16325c]",
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
    <p className="mt-1.5 break-words">
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
    <div className="grid grid-cols-1 gap-0.5 border-b border-border/80 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm leading-snug">{value}</dd>
    </div>
  )
}

export function BankPanel({ bank, locale }: { bank: Bank; locale: Locale }) {
  const copy = ui[locale]
  const view = presentBank(bank, locale)
  const longLevel = !/\d/.test(view.policyDisplay)
  const hasNote = Boolean(view.bodyNote || view.targetHint || view.framework || view.secondary.length > 0)

  return (
    <section className="rounded-xl bg-card px-4 py-5 ring-1 ring-foreground/10 sm:px-6 sm:py-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative h-56 w-72 max-w-full shrink-0 overflow-hidden rounded-md bg-[#e7eef6]">
          <Image
            src={bank.head.photo}
            alt={view.photoAlt}
            fill
            sizes="288px"
            className="object-contain"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{view.institution}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{view.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{view.title}</p>
          <Badge className={`mt-3 border-0 ${cycleClass[bank.cycle.kind]}`}>{view.cycleLabel}</Badge>
        </div>
      </div>

      <div className="mt-6 grid max-w-xl grid-cols-2 gap-3">
        <div className="min-w-0 rounded-lg bg-[#16325c] px-4 py-4 text-white">
          <p className="text-[11px] leading-snug text-white/70">{view.policyName}</p>
          <p
            className={
              longLevel
                ? "mt-2 text-2xl leading-snug font-semibold"
                : "mt-2 text-4xl leading-none font-semibold tracking-tight tabular-nums"
            }
          >
            {view.policyDisplay}
          </p>
          <p className="mt-2 text-[11px] text-white/60">{view.policyAsOf}</p>
        </div>
        <div className="min-w-0 rounded-lg bg-[#e7eef6] px-4 py-4 text-[#16325c]">
          <p className="text-[11px] text-[#3d5270]">{copy.inflationTarget}</p>
          <p className="mt-2 text-4xl leading-none font-semibold tracking-tight tabular-nums">
            {view.targetDisplay}
          </p>
          <p className="mt-2 text-[11px] leading-snug text-[#3d5270]">
            {view.latestGauge} {view.latestValue}
            <span className="block">{view.latestPeriod}</span>
          </p>
        </div>
      </div>

      <dl className="mt-6 max-w-3xl">
        <Field label={copy.colInstrument} value={view.policyName} />
        <Field label={copy.colSetting} value={view.policyDisplay} />
        <Field label={copy.colTarget} value={view.targetDisplay} />
        <Field label={copy.colLatest} value={`${view.latestValue} · ${view.latestPeriod}`} />
        <Field label={copy.colGauge} value={view.latestGauge} />
        <Field label={copy.watches} value={view.indicators} />
        <Field label={copy.setBy} value={view.bodyName} />
        <Field label={copy.colMove} value={`${view.cycleLabel} · ${view.cycleSize}`} />
        <Field label={copy.colDate} value={bank.cycle.date} />
      </dl>

      {hasNote ? (
        <div className="mt-6 max-w-3xl rounded-md bg-[#e7eef6]/70 px-4 py-3">
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
                    <span className="min-w-0">{rate.name}</span>
                    <span className="font-medium tabular-nums">{rate.display}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 max-w-3xl">
        <h3 className="text-sm font-medium">{copy.latestNews}</h3>
        {view.news.length > 0 ? (
          <ul className="mt-3 grid gap-3">
            {view.news.map((item) => (
              <li key={item.url} className="border-b border-border/80 pb-3 last:border-0">
                <p className="text-xs tabular-nums text-muted-foreground">{item.date}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block text-sm font-medium underline decoration-foreground/25 underline-offset-2"
                >
                  {item.title}
                </a>
                {item.line ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.line}</p> : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">{view.newsMissing}</p>
        )}
      </div>

      <div className="mt-6 max-w-3xl text-[11px] leading-relaxed text-muted-foreground">
        <p className="text-xs font-medium text-foreground">{copy.sources}</p>
        <p className="mt-1.5">
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
    </section>
  )
}
