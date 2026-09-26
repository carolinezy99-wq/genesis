"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { chartBanks } from "@/lib/banks"
import { chartName, presentBank, type Locale } from "@/lib/copy"

const NAVY = "#16325c"

export function RateChart({ locale, caption, yAxis }: { locale: Locale; caption: string; yAxis: string }) {
  const chartConfig = {
    rate: {
      label: locale === "en" ? "Rate" : "利率",
      color: NAVY,
    },
  } satisfies ChartConfig
  const rows = chartBanks()
  const data = rows.map((bank) => ({
    name: chartName(bank, locale),
    rate: bank.policy.chartValue,
    barLabel: bank.policy.barLabel,
    full: `${presentBank(bank, locale).institution} · ${presentBank(bank, locale).policyName}`,
    midpoint: locale === "en" ? " (bar height is the midpoint)" : "（柱高为区间中点）",
    fill: NAVY,
  }))

  return (
    <figure className="min-w-0">
      <figcaption className="sr-only">{caption}</figcaption>
      <div className="min-w-0 overflow-x-auto">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] min-w-[680px] w-full"
          initialDimension={{ width: 720, height: 250 }}
        >
          <BarChart data={data} margin={{ top: 28, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              domain={[0, 6]}
              ticks={[0, 1, 2, 3, 4, 5, 6]}
              tickFormatter={(value: number) => `${value}%`}
              label={{
                value: yAxis,
                angle: -90,
                position: "insideLeft",
                style: { fill: "#3d5270", fontSize: 12 },
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => (
                    <span>
                      {item.payload.full}: {item.payload.barLabel}%
                      {typeof value === "number" && item.payload.barLabel.includes("–")
                        ? item.payload.midpoint
                        : ""}
                    </span>
                  )}
                />
              }
            />
            <Bar dataKey="rate" radius={[3, 3, 0, 0]} maxBarSize={56}>
              {data.map((row) => (
                <Cell key={row.name} fill={row.fill} />
              ))}
              <LabelList
                dataKey="barLabel"
                position="top"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </figure>
  )
}
