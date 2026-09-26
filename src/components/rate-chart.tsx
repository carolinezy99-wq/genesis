"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { chartBanks } from "@/lib/banks"

const INK = "#2c3d55"
const ACCENT = "#8c2f2b"

const chartConfig = {
  rate: {
    label: "政策利率",
    color: INK,
  },
} satisfies ChartConfig

export function RateChart() {
  const rows = chartBanks()
  const peak = Math.max(...rows.map((bank) => bank.policy.chartValue ?? 0))
  const data = rows.map((bank) => ({
    name: bank.shortLabel,
    rate: bank.policy.chartValue,
    barLabel: bank.policy.barLabel,
    full: `${bank.nameZh} · ${bank.policy.nameZh}`,
    fill: bank.policy.chartValue === peak ? ACCENT : INK,
  }))

  return (
    <figure className="min-w-0">
      <figcaption className="sr-only">
        八家以利率为工具的央行政策利率比较，纵轴单位为百分比。新加坡未列入。美国柱高为目标区间中点，柱顶标注区间。中国柱为7天期逆回购操作利率。
      </figcaption>
      <div className="overflow-x-auto">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[320px] min-w-[680px] w-full"
          initialDimension={{ width: 720, height: 320 }}
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
                value: "利率（%）",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#5c564c", fontSize: 12 },
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => (
                    <span>
                      {item.payload.full}：{item.payload.barLabel}%
                      {typeof value === "number" && item.payload.barLabel.includes("–")
                        ? "（柱高为区间中点）"
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
