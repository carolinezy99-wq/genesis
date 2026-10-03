"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { chartBanks } from "@/lib/banks"
import { chartName, presentBank, type Locale } from "@/lib/copy"

const colors = { tightening: "#e86f51", holding: "#527a93", easing: "#2d9b75", unclear: "#9aa5ac" }

export function RateChart({ locale, caption }: { locale: Locale; caption: string; yAxis: string }) {
  const config = { rate: { label: locale === "zh" ? "政策利率" : "Policy rate", color: "#527a93" } } satisfies ChartConfig
  const data = chartBanks().map((bank) => {
    const view = presentBank(bank, locale)
    return { name: chartName(bank, locale), rate: bank.policy.chartValue, barLabel: `${bank.policy.barLabel}%`, move: `${view.stanceLabel} · ${view.cycleSize}`, full: `${view.institution} · ${view.policyName}`, fill: colors[view.stance] }
  })
  return <figure className="min-w-0"><figcaption className="sr-only">{caption}</figcaption><ChartContainer config={config} className="aspect-auto h-[410px] w-full" initialDimension={{ width: 760, height: 410 }}><BarChart data={data} layout="vertical" margin={{ top: 8, right: 82, left: 8, bottom: 8 }}><CartesianGrid horizontal={false} strokeDasharray="3 5" stroke="#d9dedf" /><XAxis type="number" domain={[0, 6]} ticks={[0,1,2,3,4,5,6]} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} /><YAxis type="category" dataKey="name" width={78} axisLine={false} tickLine={false} tick={{ fill: "#17364a", fontWeight: 600, fontSize: 12 }} /><ChartTooltip content={<ChartTooltipContent formatter={(_value, _name, item) => <span>{item.payload.full}: {item.payload.barLabel} · {item.payload.move}</span>} />} /><Bar dataKey="rate" radius={[0,8,8,0]} barSize={25}>{data.map((row) => <Cell key={row.name} fill={row.fill} />)}<LabelList dataKey="barLabel" position="right" className="fill-foreground" fontSize={12} fontWeight={700} /></Bar></BarChart></ChartContainer></figure>
}
