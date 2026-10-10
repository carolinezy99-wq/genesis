"use client"

import { chartName, type Locale } from "@/lib/copy"
import type { Bank } from "@/lib/banks"
import { inflationPathFor } from "@/lib/inflation-path"
import { allMetrics, metricsFor } from "@/lib/metrics"

export function Reading({ locale }: { locale: Locale }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const rows = allMetrics(locale)
  const above = rows.filter((row) => row.m.gap != null && row.m.gap > 0)
  const below = rows.filter((row) => row.m.gap != null && row.m.gap < 0)
  const names = (list: typeof rows) => list.map((row) => chartName(row.bank, locale)).join(locale === "zh" ? "、" : ", ")
  const tighteningAbove = rows.filter((row) => row.m.stance === "tightening" && row.m.gap != null && row.m.gap > 0)
  const holdingAbove = rows.filter((row) => row.m.stance === "holding" && row.m.gap != null && row.m.gap > 0)

  return (
    <section id="reading" className="craft-card p-5 sm:p-6">
      <h2 className="border-l-2 border-[#1e3a52] pl-2.5 text-base font-semibold tracking-tight text-[#1e3a52]">{label("读数与走势", "Reading and trend")}</h2>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        {label(
          "以下是对本页数字的分析性阅读，不是央行的官方指引，也不是预测。各行的一句解读在该行页面。",
          "This is an analytical reading of the figures on this page. It is not official central-bank guidance, and it is not a forecast. Each bank's one-line reading is on that bank's page.",
        )}
      </p>
      <ol className="mt-4 grid gap-3 text-sm leading-relaxed text-slate-700">
        <li>
          {label(
            `通胀高于本页所用目标的是${names(above)}。低于目标的是${names(below)}。新加坡金管局没有点目标。`,
            `Inflation is above the target used on this page in ${names(above)}. It is below target in ${names(below)}. MAS has no point target.`,
          )}
        </li>
        <li>
          {label(
            `${names(tighteningAbove)}在最近一次决定中收紧，同时通胀仍高于目标。${names(holdingAbove)}在通胀仍高于目标时维持。`,
            `${names(tighteningAbove)} tightened at the latest decision while inflation was still above target. ${names(holdingAbove)} are holding with inflation still above target.`,
          )}
        </li>
      </ol>
    </section>
  )
}

export function BankReading({ bank, locale }: { bank: Bank; locale: Locale }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const m = metricsFor(bank, locale)
  const path = inflationPathFor(bank.id)
  const first = path?.points[0]
  const last = path?.points[path.points.length - 1]
  const stance = m.stance === "tightening" ? label("收紧", "tightening") : m.stance === "holding" ? label("维持", "holding") : m.stance === "easing" ? label("宽松", "easing") : label("方向未明", "unclear")
  const gap = m.gap == null
    ? label("没有点目标，因此本页不计算通胀缺口。", "There is no point target, so this page does not show an inflation gap.")
    : m.gap > 0
      ? label("通胀高于本页所用目标。", "Inflation is above the target used on this page.")
      : m.gap < 0
        ? label("通胀低于本页所用目标。", "Inflation is below the target used on this page.")
        : label("通胀与本页所用目标相同。", "Inflation matches the target used on this page.")
  const trend = path && first && last
    ? label(
        `近 12 个月该口径从 ${first.value.toFixed(1)}% 到 ${last.value.toFixed(1)}%。`,
        `Over the last 12 months that gauge went from ${first.value.toFixed(1)}% to ${last.value.toFixed(1)}%.`,
      )
    : ""
  return (
    <p className="text-sm leading-relaxed text-slate-700">
      {label(`最近决定为${stance}。${gap}`, `The latest decision is ${stance}. ${gap}`)}
      {trend ? ` ${trend}` : ""}
      <span className="mt-1 block text-[11px] text-slate-500">{label("这是对本行页面数字的分析性阅读，不是官方指引，也不是预测。", "An analytical reading of this bank's figures. Not official guidance, and not a forecast.")}</span>
    </p>
  )
}
