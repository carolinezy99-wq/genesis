"use client"

import { chartName, presentBank, type Locale } from "@/lib/copy"
import { banks } from "@/lib/banks"
import { inflationPathFor } from "@/lib/inflation-path"
import { allMetrics, signed, summary } from "@/lib/metrics"

export function Reading({ locale }: { locale: Locale }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const s = summary(locale)
  const rows = allMetrics(locale)
  const above = rows.filter((row) => row.m.gap != null && row.m.gap > 0)
  const below = rows.filter((row) => row.m.gap != null && row.m.gap < 0)
  const negativeReal = rows.filter((row) => row.m.realRate != null && row.m.realRate < 0)
  const names = (list: typeof rows) => list.map((row) => chartName(row.bank, locale)).join(locale === "zh" ? "、" : ", ")

  const tighteningAbove = rows.filter((row) => row.m.stance === "tightening" && row.m.gap != null && row.m.gap > 0)

  return (
    <section id="reading" className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
      <h2 className="text-base font-semibold text-slate-900">{label("读数与走势", "Reading and trend")}</h2>
      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
        {label(
          "以下是对本页数字的分析性阅读，不是央行的官方指引，也不是预测。",
          "This is an analytical reading of the figures on this page. It is not official central-bank guidance, and it is not a forecast.",
        )}
      </p>
      <ol className="mt-4 grid gap-2 text-sm leading-relaxed text-slate-700">
        <li>
          {label("最近一次决定中，", "Of the latest decisions, ")}
          <strong className="font-semibold text-slate-900">{s.tightening}</strong>
          {label(" 家收紧，", " are tightening, ")}
          <strong className="font-semibold text-slate-900">{s.holding}</strong>
          {label(" 家维持，", " are holding, and ")}
          <strong className="font-semibold text-slate-900">{s.easing}</strong>
          {label(" 家宽松。", " are easing.")}
        </li>
        <li>
          {label(
            `通胀高于本页所用目标的是${names(above)}。低于目标的是${names(below)}。新加坡金管局没有点目标。`,
            `Inflation is above the target used on this page in ${names(above)}. It is below target in ${names(below)}. MAS has no point target.`,
          )}
        </li>
        <li>
          {label(
            `实际利率为负的是${names(negativeReal)}。其余设定利率的央行实际利率为正。新加坡金管局不设政策利率，不计算实际利率。`,
            `Real rates are negative in ${names(negativeReal)}. The other rate-setting banks have a positive real rate. MAS sets no policy rate, so no real rate is calculated.`,
          )}
        </li>
        <li>
          {label(
            `最近一次决定为收紧、同时通胀仍高于目标的是${names(tighteningAbove)}。英国和加拿大在通胀仍高于目标时维持利率；其中加拿大的实际利率为负。`,
            `${names(tighteningAbove)} tightened at the latest decision while inflation was still above target. The UK and Canada are holding with inflation still above target; Canada's real rate is negative.`,
          )}
        </li>
        <li>
          {label(
            `政策利率最高的是${chartName(s.highest.bank, locale)} ${presentBank(s.highest.bank, locale).policyDisplay}。设定利率的央行中最低的是${chartName(s.lowest.bank, locale)} ${presentBank(s.lowest.bank, locale).policyDisplay}。`,
            `The highest policy rate is ${chartName(s.highest.bank, locale)} at ${presentBank(s.highest.bank, locale).policyDisplay}. The lowest among rate-setting banks is ${chartName(s.lowest.bank, locale)} at ${presentBank(s.lowest.bank, locale).policyDisplay}.`,
          )}
        </li>
      </ol>
      <h3 className="mt-5 text-sm font-semibold text-slate-900">{label("各央行一行", "One line per bank")}</h3>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {rows.map(({ bank, m }) => {
          const path = inflationPathFor(bank.id)
          const first = path?.points[0]
          const last = path?.points[path.points.length - 1]
          const pathText = path && first && last
            ? label(
                `近12个月该口径从 ${first.value.toFixed(1)}% 到 ${last.value.toFixed(1)}%。`,
                ` Over the last 12 months that gauge went from ${first.value.toFixed(1)}% to ${last.value.toFixed(1)}%.`,
              )
            : ""
          const gapText = m.gap == null ? label("无点目标，不计缺口。", "No point target, so no gap.") : label(`缺口 ${signed(m.gap, " pp")}。`, `Gap ${signed(m.gap, " pp")}.`)
          const realText = m.realRate == null ? label("不计实际利率。", "No real rate.") : label(`实际利率 ${signed(m.realRate, "%")}。`, `Real rate ${signed(m.realRate, "%")}.`)
          return (
            <li key={bank.id} className="rounded-lg border border-slate-200 px-3 py-2 text-xs leading-relaxed text-slate-700">
              <span className="font-semibold text-slate-900">{chartName(bank, locale)}. </span>
              {label(
                `最近决定为${m.stance === "tightening" ? "收紧" : m.stance === "holding" ? "维持" : "宽松"}。通胀 ${bank.inflationActual.display}。${gapText}${realText}`,
                `Latest decision is ${m.stance}. Inflation ${bank.inflationActual.display}. ${gapText} ${realText}`,
              )}
              {pathText}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
