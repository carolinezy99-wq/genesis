"use client"

import { Sparkline } from "@/components/sparkline"
import { SourceLink } from "@/components/source-link"
import { chartName, type Locale } from "@/lib/copy"
import { banks } from "@/lib/banks"
import { HISTORY_CHECKED_ON } from "@/lib/history"
import { inflationPaths } from "@/lib/inflation-path"

export function InflationTrends({ locale }: { locale: Locale }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  return (
    <section id="inflation-paths" className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
      <h2 className="text-base font-semibold text-slate-900">{label("通胀的近一年路径", "Inflation over the last 12 months")}</h2>
      <p className="mt-0.5 text-xs text-slate-500">
        {label(
          "每条线只画一次，用的是该行页面上同一通胀口径的官方月度数据。表内最新读数不再另画。",
          "Each line is drawn once, using official monthly prints of the same gauge named for that bank. The latest reading in the table is not charted again.",
        )}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {inflationPaths.map((path) => {
          const bank = banks.find((item) => item.id === path.id)
          if (!bank) return null
          const first = path.points[0]
          const last = path.points[path.points.length - 1]
          return (
            <article key={path.id} className="flex h-full flex-col rounded-lg border border-slate-200 p-3">
              <h3 className="text-sm font-semibold text-slate-900">{chartName(bank, locale)}</h3>
              <p className="mt-1 text-[11px] leading-snug text-slate-500">{path.measure[locale]}</p>
              <Sparkline
                points={path.points}
                label={`${chartName(bank, locale)} ${path.measure[locale]}, ${path.period[locale]}, ${first.value}% to ${last.value}%`}
              />
              <p className="mt-1 text-[11px] tabular-nums text-slate-600">
                {first.value.toFixed(1)}% → {last.value.toFixed(1)}%
                <span className="text-slate-400"> · {path.period[locale]}</span>
              </p>
              <p className="mt-2 text-[11px] leading-snug text-slate-500">
                <SourceLink
                  source={{ kind: "stats", institution: chartName(bank, locale), title: path.sourceTitle[locale], url: path.sourceUrl, readOn: HISTORY_CHECKED_ON }}
                  locale={locale}
                />
              </p>
            </article>
          )
        })}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
        {label(
          "欧元区、中国、印度和新加坡没有这条线：这里没有核对到 2025年9月至2026年8月完整的官方月度序列。它们的最新读数仍在上方对照表中。",
          "The euro area, China, India and Singapore have no line here: a complete official monthly series for September 2025–August 2026 was not available from the sources checked. Their latest readings stay in the table above.",
        )}
      </p>
    </section>
  )
}
