import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Bank, CycleKind, Source } from "@/lib/banks"
import { kindLabel, presentBank, sourceTitle, ui, type Locale } from "@/lib/copy"
import { cn } from "@/lib/utils"

const cycleClass: Record<CycleKind, string> = {
  hike: "bg-[#8c2f2b] text-white",
  tighten: "bg-[#8c2f2b] text-white",
  hold: "bg-[#e6e0d4] text-[#3c3832]",
  cut: "bg-[#1f4d3a] text-white",
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
  const sep = locale === "zh" ? "，" : ", "
  return (
    <p className="mt-1 break-words">
      <KindMark label={kindLabel(source.kind, locale)} />
      {source.institution}
      {sep}
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-foreground/25 underline-offset-2 hover:decoration-foreground"
      >
        {sourceTitle(source, locale)}
      </a>
      {sep}
      {copy.readOn} {source.readOn}.
    </p>
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
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={bank.head.photo}
              alt={view.photoAlt}
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs tracking-wide text-muted-foreground">
              {view.institution}
              <span className="ml-1">({view.institutionAlt})</span>
            </p>
            <h2 className="mt-1 text-lg leading-tight font-semibold">{bank.head.name}</h2>
            <p className="text-sm text-muted-foreground">
              {view.title}
              <span className="ml-1">({view.titleAlt})</span>
            </p>
            <Badge className={`mt-2 border-0 ${cycleClass[bank.cycle.kind]}`}>
              {view.cycleLabel}
              <span className="font-normal"> · {view.cycleSize}</span>
            </Badge>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed break-words text-muted-foreground">
          {copy.portrait}: {bank.head.photoCredit}.{" "}
          <KindMark label={copy.official} />
          <a
            href={bank.head.photoPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-foreground/25 underline-offset-2 hover:decoration-foreground"
          >
            {bank.head.photoPageTitle}
          </a>
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
          <div className="min-w-0 rounded-lg bg-[#1c2838] px-3 py-3 text-white">
            <p className="text-[11px] text-white/70">
              {view.policyName}
              <span className="mt-0.5 block break-words text-white/55">{view.policyNameAlt}</span>
            </p>
            <p
              className={cn(
                "mt-2 font-semibold tracking-tight break-words tabular-nums",
                longLevel ? "text-2xl leading-snug" : "text-3xl leading-none sm:text-4xl",
              )}
            >
              {view.policyDisplay}
            </p>
            <p className="mt-2 text-[11px] text-white/65">{view.policyAsOf}</p>
          </div>
          <div className="min-w-0 rounded-lg bg-[#f3ead6] px-3 py-3 text-[#2a241c]">
            <p className="text-[11px] text-[#6a5e4a]">{copy.inflationTarget}</p>
            <p className="mt-2 text-3xl leading-none font-semibold tracking-tight break-words tabular-nums sm:text-4xl">
              {view.targetDisplay}
            </p>
            <p className="mt-2 text-[11px] leading-snug text-[#6a5e4a]">
              {copy.latest} {view.latestGauge} {view.latestValue}
              <span className="block">{view.latestPeriod}</span>
            </p>
          </div>
        </div>

        {bank.policy.secondary.length > 0 ? (
          <ul className="grid gap-1 text-sm">
            {view.secondary.map((rate) => (
              <li key={rate.key} className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 break-words">
                  {rate.name}
                  <span className="ml-1 text-xs text-muted-foreground">({rate.alt})</span>
                </span>
                <span className="font-medium tabular-nums">{rate.display}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {view.framework ? <p className="text-sm leading-relaxed">{view.framework}</p> : null}

        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">{copy.decisionBody}</dt>
            <dd className="mt-0.5">
              {view.bodyName}
              <span className="ml-1 text-xs text-muted-foreground">({view.bodyAlt})</span>
            </dd>
            <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{view.bodyNote}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">{copy.indicators}</dt>
            <dd className="mt-0.5">{view.indicators}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">{copy.targetNote}</dt>
            <dd className="mt-0.5 text-muted-foreground">{view.targetNote}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">{copy.latestDecision}</dt>
            <dd className="mt-0.5">
              {bank.cycle.date} · {view.cycleLabel} · {view.cycleSize}
            </dd>
            <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{view.cycleDetail}</dd>
          </div>
        </dl>

        <div className="border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">
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
