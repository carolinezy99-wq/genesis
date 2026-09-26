"use client"

import { useState } from "react"
import { BankPanel } from "@/components/bank-card"
import { CompareTable } from "@/components/compare-table"
import { useLocale } from "@/components/locale"
import { RateChart } from "@/components/rate-chart"
import { banks, DATA_AS_OF } from "@/lib/banks"
import { bankTabLabel, stanceBuckets, ui } from "@/lib/copy"

export function Dashboard() {
  const { locale, setLocale } = useLocale()
  const copy = ui[locale]
  const [tab, setTab] = useState("overview")
  const selected = banks.find((bank) => bank.id === tab)
  const buckets = stanceBuckets(locale)
  const bucketEdge: Record<string, string> = {
    tightening: "border-l-[#16325c]",
    holding: "border-l-[#9eb0c6]",
    easing: "border-l-[#16325c]/35",
    unclear: "border-l-muted-foreground",
  }

  const tabs = [
    { id: "overview", label: copy.overview },
    ...banks.map((bank) => ({
      id: bank.id,
      label: bankTabLabel[bank.id][locale],
    })),
  ]

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
      <header className="flex flex-col gap-3 border-b border-border pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{copy.kicker}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{copy.title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{copy.lede}</p>
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

      <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div role="tablist" className="flex w-max min-w-full gap-1 border-b border-border">
          {tabs.map((item) => {
            const active = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={active}
                aria-controls={`panel-${item.id}`}
                onClick={() => setTab(item.id)}
                className={`shrink-0 border-b-2 px-3 py-2 text-sm whitespace-nowrap ${
                  active
                    ? "border-[#16325c] font-medium text-[#16325c]"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {tab === "overview" ? (
        <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className="mt-3">
          <section aria-label={copy.stanceTitle}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-sm font-semibold">{copy.stanceTitle}</h2>
              <p className="text-xs text-muted-foreground">
                {copy.asOf} <span className="font-medium tabular-nums text-foreground">{DATA_AS_OF}</span>
              </p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{copy.stanceNote}</p>
            <div className="mt-2 grid gap-2 md:grid-cols-3">
              {buckets.map((bucket) => (
                <div
                  key={bucket.key}
                  className={`rounded-lg border-l-4 ${bucketEdge[bucket.key]} bg-card px-3 py-2.5 ring-1 ring-foreground/10`}
                >
                  <p className="text-xs font-semibold tracking-wide text-[#16325c] uppercase">
                    {bucket.label}
                    <span className="ml-1.5 font-medium tabular-nums">{bucket.banks.length}</span>
                  </p>
                  {bucket.banks.length === 0 ? (
                    <p className="mt-1.5 text-sm text-muted-foreground">{copy.none}</p>
                  ) : (
                    <ul className="mt-1.5 grid gap-1">
                      {bucket.banks.map((item) => (
                        <li key={item.id} className="flex items-baseline justify-between gap-2 text-sm">
                          <button
                            type="button"
                            onClick={() => setTab(item.id)}
                            className="min-w-0 text-left font-medium text-[#16325c] underline decoration-[#16325c]/25 underline-offset-2"
                          >
                            {item.name}
                          </button>
                          <span className="text-right text-xs text-muted-foreground tabular-nums">{item.basis}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-3 min-w-0 rounded-lg bg-card px-3 py-3 ring-1 ring-foreground/10 sm:px-4">
            <div className="mb-2 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-sm font-semibold">{copy.chartTitle}</h2>
              <p className="text-xs text-muted-foreground">{copy.chartAxisHint}</p>
            </div>
            <RateChart locale={locale} caption={copy.chartCaption} yAxis={copy.yAxis} />
            <p className="mt-2 text-xs text-muted-foreground">{copy.chartFoot}</p>
          </section>

          <section className="mt-3 min-w-0 rounded-lg bg-card px-3 py-3 ring-1 ring-foreground/10 sm:px-4">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-sm font-semibold">{copy.tableTitle}</h2>
              <p className="text-xs text-muted-foreground">{copy.tableHint}</p>
            </div>
            <CompareTable locale={locale} />
          </section>
        </div>
      ) : selected ? (
        <div role="tabpanel" id={`panel-${selected.id}`} aria-labelledby={`tab-${selected.id}`} className="mt-3">
          <BankPanel bank={selected} locale={locale} />
        </div>
      ) : null}
    </main>
  )
}
