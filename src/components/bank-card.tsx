import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { sourceKindLabel, type Bank, type CycleKind, type Source } from "@/lib/banks"
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

function SourceLine({ source }: { source: Source }) {
  return (
    <p className="mt-1 break-words">
      <KindMark label={sourceKindLabel[source.kind]} />
      {source.institution}，
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-foreground/25 underline-offset-2 hover:decoration-foreground"
      >
        {source.title}
      </a>
      ，阅读于 {source.readOn}。
    </p>
  )
}

export function BankCard({ bank }: { bank: Bank }) {
  const longLevel = !/\d/.test(bank.policy.display)
  return (
    <Card className="h-full bg-card shadow-none">
      <CardHeader className="gap-3">
        <div className="flex items-start gap-3">
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={bank.head.photo}
              alt={`${bank.head.name}，${bank.nameZh}${bank.head.titleZh}官方肖像`}
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs tracking-wide text-muted-foreground">
              {bank.nameZh}
              <span className="ml-1">({bank.nameEn})</span>
            </p>
            <h2 className="mt-1 text-lg leading-tight font-semibold">{bank.head.name}</h2>
            <p className="text-sm text-muted-foreground">
              {bank.head.titleZh}
              <span className="ml-1">({bank.head.titleEn})</span>
            </p>
            <Badge className={`mt-2 border-0 ${cycleClass[bank.cycle.kind]}`}>
              {bank.cycle.label}
              <span className="font-normal"> · {bank.cycle.sizeLabel}</span>
            </Badge>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed break-words text-muted-foreground">
          肖像：{bank.head.photoCredit}。
          <KindMark label="官网" />
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
              {bank.policy.nameZh}
              <span className="mt-0.5 block break-words text-white/55">{bank.policy.nameEn}</span>
            </p>
            <p
              className={cn(
                "mt-2 font-semibold tracking-tight break-words tabular-nums",
                longLevel ? "text-2xl leading-snug" : "text-3xl leading-none sm:text-4xl",
              )}
            >
              {bank.policy.display}
            </p>
            <p className="mt-2 text-[11px] text-white/65">{bank.policy.asOf}</p>
          </div>
          <div className="min-w-0 rounded-lg bg-[#f3ead6] px-3 py-3 text-[#2a241c]">
            <p className="text-[11px] text-[#6a5e4a]">通胀目标</p>
            <p className="mt-2 text-3xl leading-none font-semibold tracking-tight break-words tabular-nums sm:text-4xl">
              {bank.inflationTarget.display}
            </p>
            <p className="mt-2 text-[11px] leading-snug text-[#6a5e4a]">
              最新 {bank.inflationActual.gauge.split("；")[0]} {bank.inflationActual.display}
              <span className="block">{bank.inflationActual.period}</span>
            </p>
          </div>
        </div>

        {bank.policy.secondary.length > 0 ? (
          <ul className="grid gap-1 text-sm">
            {bank.policy.secondary.map((rate) => (
              <li key={rate.nameEn} className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 break-words">
                  {rate.nameZh}
                  <span className="ml-1 text-xs text-muted-foreground">({rate.nameEn})</span>
                </span>
                <span className="font-medium tabular-nums">{rate.display}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {bank.frameworkNote ? (
          <p className="text-sm leading-relaxed">{bank.frameworkNote}</p>
        ) : null}

        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">决策机构</dt>
            <dd className="mt-0.5">
              {bank.decisionBody.nameZh}
              <span className="ml-1 text-xs text-muted-foreground">
                ({bank.decisionBody.nameEn})
              </span>
            </dd>
            <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {bank.decisionBody.note}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">关注的价格与政策指标</dt>
            <dd className="mt-0.5">{bank.indicators.join("、")}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">目标说明</dt>
            <dd className="mt-0.5 text-muted-foreground">{bank.inflationTarget.note}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">最近一次决定</dt>
            <dd className="mt-0.5">
              {bank.cycle.date} · {bank.cycle.label} · {bank.cycle.sizeLabel}
            </dd>
            <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {bank.cycle.detail}
            </dd>
          </div>
        </dl>

        <div className="border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">
          <SourceLine source={bank.primarySource} />
          <SourceLine source={bank.inflationActual.source} />
          {bank.sources.map((source) => (
            <SourceLine key={source.url} source={source} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
