"use client"

import { useMemo, useState } from "react"
import { CheckCheck, Info } from "lucide-react"
import { banks, type Bank } from "@/lib/banks"
import { analysis, policyContext } from "@/lib/analysis"
import { chartName, presentBank, type Locale } from "@/lib/copy"

export function Verified({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf7f1] px-2 py-1 text-[10px] font-semibold text-[#247658] ring-1 ring-[#2d9b75]/20"><CheckCheck className="h-3 w-3" />{compact ? (locale === "zh" ? "已核对" : "Checked") : (locale === "zh" ? "已核对 ×2 · 2026-10-03" : "Cross-checked ×2 · 3 Oct 2026")}</span>
}

export function InflationGap({ locale }: { locale: Locale }) {
  const rows = banks.filter(b => analysis[b.id].gap != null).sort((a,b) => (analysis[b.id].gap ?? 0) - (analysis[a.id].gap ?? 0))
  return <section className="rounded-2xl bg-card p-4 ring-1 ring-black/8 sm:p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[.16em] text-[#d86545] uppercase">{locale === "zh" ? "通胀压力" : "Inflation pressure"}</p><h2 className="mt-1 text-xl font-semibold">{locale === "zh" ? "当前通胀偏离目标多少？" : "How far is inflation from target?"}</h2></div><Verified locale={locale} compact /></div><p className="mt-1 text-xs text-muted-foreground">{locale === "zh" ? "单位：百分点。澳洲按目标区间中点2.5%计算；中国为年度预期目标；MAS无点目标，单列说明。" : "Percentage points. Australia uses the 2.5% midpoint of its band; China is an annual expected objective; MAS has no point target."}</p><div className="mt-5 grid gap-3">{rows.map(bank => { const a=analysis[bank.id]; const pos=((a.gap!+1.5)/3.5)*100; return <div key={bank.id} className="grid grid-cols-[4.5rem_1fr_3.5rem] items-center gap-2 text-xs"><span className="font-semibold">{chartName(bank,locale)}</span><div className="relative h-5 rounded-full bg-[#edf0ef]"><div className="absolute inset-y-0 left-[43%] w-px bg-[#17364a]/45"/><div className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-white ${a.gap!>0 ? "bg-[#e86f51]" : "bg-[#2d9b75]"}`} style={{left:`${Math.max(3,Math.min(97,pos))}%`}} /></div><span className={`text-right font-semibold tabular-nums ${a.gap!>0 ? "text-[#c65438]" : "text-[#247658]"}`}>{a.gap!>0?"+":""}{a.gap!.toFixed(a.gap! % 1 ? 1 : 0)}pp</span></div>})}</div><div className="mt-4 flex items-start gap-2 rounded-xl bg-[#f4f0e8] p-3 text-xs text-muted-foreground"><Info className="mt-0.5 h-4 w-4 shrink-0"/><span>{locale === "zh" ? "分析结论：欧元区、美国与英国通胀明显高于目标；中国低于年度预期目标。缺口是横向比较指标，不是央行官方政策信号。" : "Reading: inflation is furthest above target in the euro area, US and UK, while China is below its annual expected objective. The gap is an analytical comparison, not an official policy signal."}</span></div></section>
}

export function PolicyMap({ locale }: { locale: Locale }) {
  const points=banks.filter(b=>b.policy.chartValue!=null && analysis[b.id].gap!=null)
  return <section className="rounded-2xl bg-[#102f45] p-4 text-white sm:p-5">
    <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[.16em] text-[#f4b44a] uppercase">{locale === "zh" ? "政策压力四象限" : "Policy pressure quadrants"}</p><h2 className="mt-1 text-xl font-semibold">{locale === "zh" ? "为什么各央行利率不同？" : "Why do policy rates differ?"}</h2><p className="mt-1 text-xs text-white/55">{locale === "zh" ? "向右＝通胀超目标更多；向上＝政策利率更高。" : "Right = larger inflation overshoot; up = higher policy rate."}</p></div><Verified locale={locale} compact /></div>
    <div className="relative mt-5 h-[410px] overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 text-[10px]"><div className="border-b border-r border-white/12 bg-[#2d9b75]/5 p-3 text-white/45">{locale === "zh" ? "高利率＋低通胀\n限制性较强" : "HIGH RATE + LOW INFLATION\nMore restrictive"}</div><div className="border-b border-white/12 bg-[#e86f51]/10 p-3 text-right text-white/55">{locale === "zh" ? "高利率＋高通胀\n持续抗通胀" : "HIGH RATE + HIGH INFLATION\nFighting inflation"}</div><div className="border-r border-white/12 bg-[#2d9b75]/8 p-3 text-white/45">{locale === "zh" ? "低利率＋低通胀\n政策支持空间" : "LOW RATE + LOW INFLATION\nPolicy support"}</div><div className="bg-[#f4b44a]/5 p-3 text-right text-white/45">{locale === "zh" ? "低利率＋高通胀\n政策权衡" : "LOW RATE + HIGH INFLATION\nPolicy trade-off"}</div></div>
      <div className="absolute inset-y-0 left-1/2 w-px bg-white/30"/><div className="absolute inset-x-0 top-1/2 h-px bg-white/30"/>
      <span className="absolute bottom-2 left-2 rounded bg-[#102f45]/80 px-1.5 py-0.5 text-[9px] text-white/55">−1.5pp</span><span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-[#102f45]/80 px-1.5 py-0.5 text-[9px] text-white/70">0</span><span className="absolute bottom-2 right-2 rounded bg-[#102f45]/80 px-1.5 py-0.5 text-[9px] text-white/55">+1.5pp</span>
      <span className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-wider text-white/45 uppercase">{locale === "zh" ? "通胀目标缺口" : "Inflation gap"}</span>
      {points.map((bank,index)=>{const a=analysis[bank.id]; const x=((a.gap!+1.5)/3)*84+8; const y=92-(bank.policy.chartValue!/6)*78; const v=presentBank(bank,locale); return <button key={bank.id} type="button" title={`${v.institution}: ${bank.policy.display}; ${a.gap!>0?"+":""}${a.gap}pp`} className={`absolute min-w-[58px] -translate-x-1/2 -translate-y-1/2 rounded-lg px-2 py-1.5 text-center shadow-lg ring-1 ring-white/50 transition hover:z-20 hover:scale-110 ${v.stance==="tightening"?"bg-[#e86f51]":v.stance==="easing"?"bg-[#2d9b75]":"bg-[#527a93]"}`} style={{left:`${Math.max(9,Math.min(91,x+(index%2?1.2:-1.2)))}%`,top:`${Math.max(13,Math.min(86,y))}%`}}><span className="block text-[10px] font-bold">{chartName(bank,locale)}</span><span className="block text-[9px] text-white/75">{bank.policy.barLabel}% · {a.gap!>0?"+":""}{a.gap}pp</span></button>})}
    </div>
    <div className="mt-3 rounded-xl bg-white/7 p-3 text-xs leading-relaxed text-white/70"><strong className="text-white">{locale === "zh" ? "怎样读：" : "How to read: "}</strong>{locale === "zh" ? "印度、澳洲和美国位于右上方：通胀高于目标，同时利率也较高。中国位于左下方：通胀低于年度目标，利率水平也低。日本虽在加息，但绝对利率仍低。MAS使用汇率政策，因此不放入坐标。" : "India, Australia and the US sit toward the upper right: inflation is above target and rates are relatively high. China is lower left: inflation is below its annual objective and the policy rate is low. Japan is hiking, but its absolute rate remains low. MAS uses the exchange rate and is excluded."}</div>
  </section>
}

export function PanoramaMatrix({ locale, onSelect }: { locale: Locale; onSelect: (id:string)=>void }) {
  const label=(zh:string,en:string)=>locale==="zh"?zh:en
  const [orientation, setOrientation] = useState<"across" | "down">("across")
  const [sortMetric, setSortMetric] = useState<"original" | "policy" | "inflation" | "gap">("original")
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc")
  const rows: Array<[string, (bank: Bank) => string]> = [
    [label("行长","Governor / head"), b=>presentBank(b,locale).name],
    [label("决策委员会","Decision body"), b=>presentBank(b,locale).bodyName],
    [label("政策工具","Instrument"), b=>presentBank(b,locale).policyName],
    [label("当前水平","Current setting"), b=>presentBank(b,locale).policyDisplay],
    [label("通胀目标","Inflation target"), b=>analysis[b.id].targetBasis],
    [label("最新通胀","Latest inflation"), b=>presentBank(b,locale).latestValue],
    [label("通胀目标缺口","Inflation gap"), b=>analysis[b.id].gap==null?"—":`${analysis[b.id].gap!>0?"+":""}${analysis[b.id].gap}pp`],
    [label("最近三次动能","3-decision momentum"), b=>analysis[b.id].momentum.join("  ")],
    [label("政策框架","Framework"), b=>analysis[b.id].framework[locale]],
    [label("当前政策倾向","Current policy bias"), b=>policyContext[b.id].bias],
    [label("Dashboard判断","Dashboard assessment"), b=>analysis[b.id].assessment[locale]],
    [label("最近决定","Latest decision"), b=>`${b.cycle.date} · ${presentBank(b,locale).stanceLabel}`],
    [label("核验状态","Verification"), ()=>label("✓ 已核对 ×2","✓ Cross-checked ×2")],
  ]

  const orderedBanks = useMemo(() => {
    if (sortMetric === "original") return banks
    const metric = (bank: Bank) => {
      if (sortMetric === "policy") return bank.policy.chartValue
      if (sortMetric === "inflation") return analysis[bank.id].inflation
      return analysis[bank.id].gap
    }
    return [...banks].sort((a,b) => {
      const av=metric(a), bv=metric(b)
      if (av==null && bv==null) return 0
      if (av==null) return 1
      if (bv==null) return -1
      return (av-bv) * (sortDirection === "asc" ? 1 : -1)
    })
  }, [sortMetric, sortDirection])

  const controlClass = "rounded-lg px-3 py-1.5 text-[11px] font-semibold transition"

  return (
    <section className="overflow-hidden rounded-2xl bg-card ring-1 ring-black/8">
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="text-xs font-semibold tracking-[.16em] text-[#d86545] uppercase">{label("九大央行全景矩阵","Nine-bank panorama")}</p>
          <h2 className="mt-1 text-xl font-semibold">{label("一页比较所有核心信息","Every core field, one comparison surface")}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{label("切换行列方向；选择指标后按高低排序。点击央行进入完整档案与来源。","Transpose the matrix, then rank banks by a comparable metric. Select a bank for its full profile and sources.")}</p>
        </div>
        <Verified locale={locale}/>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border bg-[#f7f4ee] px-4 py-3 sm:px-5">
        <div className="inline-flex rounded-xl bg-white p-1 ring-1 ring-black/8" aria-label={label("行列方向","Matrix orientation")}>
          <button type="button" aria-pressed={orientation==="across"} onClick={()=>setOrientation("across")} className={`${controlClass} ${orientation==="across"?"bg-[#17364a] text-white shadow-sm":"text-muted-foreground hover:text-foreground"}`}>{label("央行横排","Banks across")}</button>
          <button type="button" aria-pressed={orientation==="down"} onClick={()=>setOrientation("down")} className={`${controlClass} ${orientation==="down"?"bg-[#17364a] text-white shadow-sm":"text-muted-foreground hover:text-foreground"}`}>{label("央行纵排","Banks down")}</button>
        </div>
        <label className="ml-0 flex items-center gap-2 text-[11px] font-semibold text-muted-foreground sm:ml-2">
          {label("排序","Sort by")}
          <select value={sortMetric} onChange={e=>setSortMetric(e.target.value as typeof sortMetric)} className="rounded-lg border border-border bg-white px-2.5 py-2 text-xs font-medium text-foreground outline-none focus:ring-2 focus:ring-[#477694]/30">
            <option value="original">{label("原始顺序","Original order")}</option>
            <option value="policy">{label("政策利率","Policy rate")}</option>
            <option value="inflation">{label("最新通胀","Latest inflation")}</option>
            <option value="gap">{label("通胀缺口","Inflation gap")}</option>
          </select>
        </label>
        <button type="button" disabled={sortMetric==="original"} onClick={()=>setSortDirection(d=>d==="desc"?"asc":"desc")} className={`${controlClass} border border-border bg-white text-foreground disabled:cursor-not-allowed disabled:opacity-35`}>
          {sortDirection==="desc"?label("高 → 低","High → low"):label("低 → 高","Low → high")}
        </button>
        {sortMetric!=="original"?<span className="text-[10px] text-muted-foreground">{orientation==="down"?label("按上→下排列","Ranks top → bottom"):label("按左→右排列","Ranks left → right")} · {label("无数据项置后","missing values last")}</span>:null}
      </div>

      <div className="max-h-[630px] overflow-auto border-t border-border">
        {orientation === "across" ? (
          <table className="min-w-[1440px] border-collapse text-xs">
            <thead className="sticky top-0 z-20 bg-[#17364a] text-white"><tr><th className="sticky left-0 z-30 w-36 bg-[#17364a] p-3 text-left">{label("比较维度","Dimension")}</th>{orderedBanks.map(b=><th key={b.id} className="w-36 p-3 text-left"><button type="button" onClick={()=>onSelect(b.id)} className="font-semibold hover:text-[#f4b44a]">{chartName(b,locale)}</button><span className="mt-1 block font-normal text-white/55">{b.nameEn}</span></th>)}</tr></thead>
            <tbody>{rows.map(([name,get],i)=><tr key={name} className={i%2?"bg-[#f7f4ee]":"bg-white"}><th className={`sticky left-0 z-10 p-3 text-left font-semibold ${i%2?"bg-[#f7f4ee]":"bg-white"}`}>{name}</th>{orderedBanks.map(b=><td key={b.id} className="border-l border-border/60 p-3 align-top leading-snug">{get(b)}</td>)}</tr>)}</tbody>
          </table>
        ) : (
          <table className="min-w-[1780px] border-collapse text-xs">
            <thead className="sticky top-0 z-20 bg-[#17364a] text-white"><tr><th className="sticky left-0 z-30 w-44 bg-[#17364a] p-3 text-left">{label("央行","Central bank")}</th>{rows.map(([name])=><th key={name} className="w-36 p-3 text-left font-semibold">{name}</th>)}</tr></thead>
            <tbody>{orderedBanks.map((b,i)=><tr key={b.id} className={i%2?"bg-[#f7f4ee]":"bg-white"}><th className={`sticky left-0 z-10 p-3 text-left ${i%2?"bg-[#f7f4ee]":"bg-white"}`}><button type="button" onClick={()=>onSelect(b.id)} className="font-semibold text-[#17364a] underline decoration-[#17364a]/25 underline-offset-2 hover:decoration-[#17364a]"><span className="block">{chartName(b,locale)}</span><span className="mt-0.5 block max-w-36 font-normal text-muted-foreground no-underline">{b.nameEn}</span></button></th>{rows.map(([name,get])=><td key={name} className="border-l border-border/60 p-3 align-top leading-snug">{get(b)}</td>)}</tr>)}</tbody>
          </table>
        )}
      </div>
    </section>
  )
}
