import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
    <p className="mt-1 break-words">
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

function Fact({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] gap-3 border-b border-border/80 py-2 last:border-0 sm:grid-cols-[5.5rem_1fr]">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm leading-snug">
        {value}
        {note ? <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{note}</span> : null}
      </dd>
    </div>
  )
}

export function BankCard({ bank, locale }: { bank: Bank; locale: Locale }) {
  const copy = ui[locale]
  const view = presentBank(bank, locale)
  const longLevel = !/\d/.test(view.policyDisplay)

  return (
    <Card className="h-full bg-card shadow-none">
      <CardHeader className="gap-3">
        <div className="flex items-start gap-3">
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-muted sm:h-32 sm:w-28">
            <Image
              src={bank.head.photo}
              alt={view.photoAlt}
              fill
              sizes="(min-width: 640px) 112px, 80px"
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">{view.institution}</p>
            <h2 className="mt-0.5 text-lg leading-tight font-semibold">{view.name}</h2>
            <p className="text-sm text-muted-foreground">{view.title}</p>
          </div>
          <Badge className={`shrink-0 border-0 ${cycleClass[bank.cycle.kind]}`}>
            {view.cycleLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="min-w-0 rounded-lg bg-[#16325c] px-3 py-3 text-white">
            <p className="text-[11px] leading-snug text-white/70">{view.policyName}</p>
            <p
              className={
                longLevel
                  ? "mt-2 text-xl leading-snug font-semibold"
                  : "mt-2 text-3xl leading-none font-semibold tracking-tight tabular-nums"
              }
            >
              {view.policyDisplay}
            </p>
            <p className="mt-2 text-[11px] text-white/60">{view.policyAsOf}</p>
          </div>
          <div className="min-w-0 rounded-lg bg-[#e7eef6] px-3 py-3 text-[#16325c]">
            <p className="text-[11px] text-[#3d5270]">{copy.inflationTarget}</p>
            <p className="mt-2 text-3xl leading-none font-semibold tracking-tight tabular-nums">
              {view.targetDisplay}
            </p>
            <p className="mt-2 text-[11px] leading-snug text-[#3d5270]">
              {view.latestGauge} {view.latestValue}
              <span className="block">{view.latestPeriod}</span>
              {view.targetHint ? <span className="mt-1 block">{view.targetHint}</span> : null}
            </p>
          </div>
        </div>

        <dl>
          <Fact label={copy.setBy} value={view.bodyName} note={view.bodyNote} />
          <Fact label={copy.watches} value={view.indicators} />
          <Fact label={copy.decision} value={view.move} />
        </dl>

        {view.secondary.length > 0 ? (
          <div className="rounded-md bg-muted/60 px-3 py-2">
            <p className="text-xs font-medium">{copy.otherRates}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{view.extraReason}</p>
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

        {view.framework ? (
          <div className="rounded-md bg-muted/60 px-3 py-2">
            <p className="text-xs font-medium">{copy.frameworkTitle}</p>
            <p className="mt-1 text-sm leading-relaxed">{view.framework}</p>
          </div>
        ) : null}

        <div className="text-[11px] leading-relaxed text-muted-foreground">
          <p>
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
      </CardContent>
    </Card>
  )
}
