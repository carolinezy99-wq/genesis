"use client"

import { BankCard } from "@/components/bank-card"
import { CompareTable } from "@/components/compare-table"
import { useLocale } from "@/components/locale"
import { RateChart } from "@/components/rate-chart"
import { banks, DATA_AS_OF } from "@/lib/banks"
import { ui } from "@/lib/copy"

export function Dashboard() {
  const { locale, setLocale } = useLocale()
  const copy = ui[locale]
  const hikes = banks.filter((bank) => bank.cycle.kind === "hike").length
  const holds = banks.filter((bank) => bank.cycle.kind === "hold").length
  const tightens = banks.filter((bank) => bank.cycle.kind === "tighten").length

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{copy.kicker}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{copy.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy.lede}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex rounded-md ring-1 ring-foreground/15" role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1 text-sm ${locale === "en" ? "bg-[#16325c] text-white" : "text-muted-foreground"}`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("zh")}
              className={`px-2.5 py-1 text-sm ${locale === "zh" ? "bg-[#16325c] text-white" : "text-muted-foreground"}`}
              aria-pressed={locale === "zh"}
            >
              中文
            </button>
          </div>
          <p className="text-sm">
            <span className="text-muted-foreground">{copy.asOf}</span>{" "}
            <span className="font-semibold tabular-nums">{DATA_AS_OF}</span>
          </p>
        </div>
      </header>

      <section className="mt-5 flex flex-wrap gap-2 text-sm" aria-label={copy.chartTitle}>
        <span className="rounded-full bg-[#16325c] px-3 py-1 text-white">
          {copy.hikes} {hikes}
        </span>
        <span className="rounded-full bg-[#e7eef6] px-3 py-1 text-[#16325c]">
          {copy.holds} {holds}
        </span>
        <span className="rounded-full bg-[#16325c] px-3 py-1 text-white">
          {copy.tightens} {tightens}
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">
          {copy.cuts} 0
        </span>
      </section>

      <section className="mt-6 min-w-0 rounded-xl bg-card px-3 py-4 ring-1 ring-foreground/10 sm:px-5">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-base font-semibold">{copy.chartTitle}</h2>
          <p className="text-xs text-muted-foreground">{copy.chartAxisHint}</p>
        </div>
        <RateChart locale={locale} caption={copy.chartCaption} yAxis={copy.yAxis} />
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground">{copy.chartFoot}</p>
      </section>

      <section className="mt-6 min-w-0 rounded-xl bg-card px-3 py-4 ring-1 ring-foreground/10 sm:px-5">
        <div className="mb-3">
          <h2 className="text-base font-semibold">{copy.tableTitle}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{copy.tableHint}</p>
        </div>
        <CompareTable locale={locale} />
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground">{copy.sameFields}</p>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {banks.map((bank) => (
          <BankCard key={bank.id} bank={bank} locale={locale} />
        ))}
      </section>
    </main>
  )
}
