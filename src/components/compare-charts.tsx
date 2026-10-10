"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, Scatter, ScatterChart, XAxis, YAxis, ZAxis } from "recharts"
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart"
import { chartName, presentBank, type Locale } from "@/lib/copy"
import { allMetrics, signed, stanceColor } from "@/lib/metrics"

const NAVY = "#1e3a52"
const REAL = NAVY

const labelNudge: Record<string, { dx: number; dy: number }> = {
  ecb: { dx: 0, dy: -10 },
  boc: { dx: 0, dy: 12 },
  rba: { dx: 0, dy: -8 },
  fed: { dx: 0, dy: 8 },
}

function DotLabel(props: { x?: number | string; y?: number | string; value?: unknown; index?: number; ids: string[] }) {
  const id = props.ids[props.index ?? 0]
  const n = labelNudge[id] ?? { dx: 0, dy: 0 }
  return <text x={Number(props.x) + 10 + n.dx} y={Number(props.y) + 4 + n.dy} fontSize={11} fontWeight={600} fill="#1e293b">{String(props.value)}</text>
}

function rated(locale: Locale) {
  return allMetrics(locale)
    .filter(({ m }) => m.policyRate != null && m.realRate != null)
    .map(({ bank, m }) => ({ id: bank.id, name: chartName(bank, locale), policy: m.policyRate!, real: m.realRate!, gap: m.gap, stance: m.stance, policyLabel: presentBank(bank, locale).policyDisplay, measure: m.inflationMeasure, inflation: m.inflation }))
}

function Panel({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <p className="mt-0.5 text-xs text-slate-500">{note}</p>
      {children}
    </section>
  )
}

function Tip({ active, payload, locale }: { active?: boolean; payload?: Array<{ payload: ReturnType<typeof rated>[number] }>; locale: Locale }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-slate-900">{d.name}</p>
      <p className="text-slate-600">{locale === "zh" ? "政策利率" : "Policy rate"} {d.policyLabel}</p>
      <p className="text-slate-600">{locale === "zh" ? "通胀" : "Inflation"} {d.inflation}% ({d.measure})</p>
      <p className="text-slate-600">{locale === "zh" ? "实际利率" : "Real rate"} {signed(d.real, "%")}</p>
      <p className="text-slate-600">{locale === "zh" ? "通胀缺口" : "Inflation gap"} {signed(d.gap, " pp")}</p>
    </div>
  )
}

export function RateRealChart({ locale }: { locale: Locale }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const data = rated(locale).sort((a, b) => b.policy - a.policy)
  const config = { policy: { label: label("政策利率", "Policy rate"), color: NAVY }, real: { label: label("实际利率", "Real rate"), color: REAL } } satisfies ChartConfig
  const min = Math.floor(Math.min(0, ...data.map((d) => d.real)))
  return (
    <Panel
      title={label("政策利率与实际利率", "Policy rate and real rate")}
      note={label("实际利率 = 政策利率 − 最新通胀。粗柱为政策利率，按最近决定方向着色；细的深蓝柱为实际利率。新加坡金管局无政策利率，不列入。", "Real rate = policy rate − latest inflation. Thick bars are the policy rate, coloured by latest decision; thin navy bars are the real rate. MAS has no policy rate and is excluded.")}
    >
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
        {(["tightening", "holding", "easing"] as const).map((s) => <span key={s} className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: stanceColor[s] }} />{label({ tightening: "收紧", holding: "维持", easing: "放松" }[s], { tightening: "Policy rate · tightening", holding: "Policy rate · holding", easing: "Policy rate · easing" }[s])}</span>)}
        <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: REAL }} />{label("实际利率", "Real rate")}</span>
      </div>
      <ChartContainer config={config} className="mt-2 aspect-auto h-[440px] w-full" initialDimension={{ width: 560, height: 440 }}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 52, left: 0, bottom: 4 }} barGap={2}>
          <CartesianGrid horizontal={false} strokeDasharray="3 4" stroke="#e2e8f0" />
          <XAxis type="number" domain={[min, 6]} ticks={Array.from({ length: 6 - min + 1 }, (_, i) => min + i)} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} fontSize={11} />
          <YAxis type="category" dataKey="name" width={72} axisLine={false} tickLine={false} tick={{ fill: "#1e293b", fontSize: 12, fontWeight: 600 }} />
          <ReferenceLine x={0} stroke="#64748b" />
          <ChartTooltip cursor={{ fill: "#f1f5f9" }} content={<Tip locale={locale} />} />
          <Bar dataKey="policy" barSize={14} radius={[0, 3, 3, 0]} isAnimationActive={false}>
            {data.map((d) => <Cell key={d.id} fill={stanceColor[d.stance]} />)}
            <LabelList dataKey="policyLabel" position="right" fontSize={11} fontWeight={600} fill="#1e293b" />
          </Bar>
          <Bar dataKey="real" barSize={10} fill={REAL} radius={2} isAnimationActive={false}>
            <LabelList dataKey="real" content={(p) => { const x = Number(p.x), w = Number(p.width), y = Number(p.y), h = Number(p.height); return <text x={Math.max(x, x + w) + 4} y={y + h / 2 + 3.5} fontSize={10} fill="#64748b">{signed(Number(p.value), "%")}</text> }} />
          </Bar>
        </BarChart>
      </ChartContainer>
      <p className="text-[11px] text-slate-500">{label("美国为目标区间 3.75–4.00% 的中点。中国为 7 天期逆回购操作利率。", "US is the midpoint of its 3.75–4.00% range. China is the 7-day reverse repo operation rate.")}</p>
    </Panel>
  )
}

export function GapRealScatter({ locale }: { locale: Locale }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const data = rated(locale).filter((d) => d.gap != null)
  const config = { real: { label: label("实际利率", "Real rate"), color: NAVY } } satisfies ChartConfig
  const xMax = Math.ceil(Math.max(...data.map((d) => Math.abs(d.gap!))) * 2) / 2 + 0.5
  const yMax = Math.ceil(Math.max(...data.map((d) => Math.abs(d.real))) * 2) / 2 + 0.5
  const quad = "pointer-events-none absolute max-w-[42%] text-[10px] leading-tight text-slate-400"
  return (
    <Panel
      title={label("通胀缺口与实际利率", "Inflation gap vs real rate")}
      note={label("横轴：最新通胀 − 目标（百分点）；纵轴：政策利率 − 最新通胀。点的颜色为最近决定方向。新加坡金管局不列入。", "x: latest inflation − target (pp). y: policy rate − latest inflation. Dot colour is the latest decision. MAS is excluded.")}
    >
      <div className="relative mt-3">
        <span className={`${quad} top-1 left-12`}>{label("低于目标 · 实际利率为正", "Below target · positive real rate")}</span>
        <span className={`${quad} top-1 right-3 text-right`}>{label("高于目标 · 实际利率为正", "Above target · positive real rate")}</span>
        <span className={`${quad} bottom-14 left-12`}>{label("低于目标 · 实际利率为负", "Below target · negative real rate")}</span>
        <span className={`${quad} right-3 bottom-14 text-right`}>{label("高于目标 · 实际利率为负", "Above target · negative real rate")}</span>
        <ChartContainer config={config} className="aspect-auto h-[440px] w-full" initialDimension={{ width: 560, height: 440 }}>
          <ScatterChart margin={{ top: 28, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 4" stroke="#e2e8f0" />
            <XAxis type="number" dataKey="gap" domain={[-xMax, xMax]} tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}`} axisLine={false} tickLine={false} fontSize={11} label={{ value: label("通胀缺口（百分点）", "Inflation gap (pp)"), position: "insideBottom", offset: -12, fontSize: 11, fill: "#64748b" }} />
            <YAxis type="number" dataKey="real" domain={[-yMax, yMax]} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} fontSize={11} width={44} />
            <ZAxis range={[90, 90]} />
            <ReferenceLine x={0} stroke="#64748b" />
            <ReferenceLine y={0} stroke="#64748b" />
            <ChartTooltip cursor={false} content={<Tip locale={locale} />} />
            <Scatter data={data} isAnimationActive={false}>
              {data.map((d) => <Cell key={d.id} fill={stanceColor[d.stance]} stroke="#fff" strokeWidth={1.5} />)}
              <LabelList dataKey="name" content={(p) => <DotLabel {...(p as object)} ids={data.map((d) => d.id)} />} />
            </Scatter>
          </ScatterChart>
        </ChartContainer>
      </div>
    </Panel>
  )
}
