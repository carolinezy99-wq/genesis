import { history, type Decision } from "@/lib/history"
import { stanceColor } from "@/lib/metrics"
import type { Locale } from "@/lib/copy"

const glyph = { hike: "▲", hold: "–", cut: "▼" } as const

function actionName(d: Decision, locale: Locale) {
  if (!d.verified || !d.action) return locale === "zh" ? "未核实" : "Unverified"
  const en = { hike: "Hike / tighten", hold: "Hold", cut: "Cut / ease" }
  const zh = { hike: "加息／收紧", hold: "维持", cut: "降息／放松" }
  return (locale === "zh" ? zh : en)[d.action]
}

function Square({ d, locale, size }: { d: Decision; locale: Locale; size: "sm" | "lg" }) {
  const dim = size === "lg" ? "h-7 w-7 text-[11px]" : "h-4 w-4 text-[8px]"
  const title = `${d.date ?? "?"} · ${actionName(d, locale)}${d.detail ? ` · ${d.detail}` : ""}`
  if (!d.verified || !d.action) {
    return <span title={title} className={`${dim} inline-flex shrink-0 items-center justify-center rounded-[3px] border border-dashed border-slate-300 text-slate-400`}>?</span>
  }
  const color = d.action === "hike" ? stanceColor.tightening : d.action === "cut" ? stanceColor.easing : stanceColor.holding
  return <span title={title} className={`${dim} inline-flex shrink-0 items-center justify-center rounded-[3px] font-bold text-white`} style={{ backgroundColor: color }}>{glyph[d.action]}</span>
}

export function DecisionStrip({ bankId, locale, size = "sm" }: { bankId: string; locale: Locale; size?: "sm" | "lg" }) {
  const decisions = history[bankId]?.decisions ?? []
  if (decisions.length === 0) return <span className="text-xs text-slate-400">{locale === "zh" ? "未核实" : "Not verified"}</span>
  if (size === "sm") {
    return <span className="inline-flex gap-1" aria-label={decisions.map((d) => `${d.date ?? "?"} ${actionName(d, locale)}`).join("; ")}>{decisions.map((d, i) => <Square key={i} d={d} locale={locale} size="sm" />)}</span>
  }
  return (
    <ol className="flex flex-wrap gap-x-1.5 gap-y-3">
      {decisions.map((d, i) => (
        <li key={i} className="flex w-16 flex-col items-center gap-1 text-center">
          <Square d={d} locale={locale} size="lg" />
          {d.url && d.verified ? (
            <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-[10px] tabular-nums text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-slate-800">{d.date}</a>
          ) : (
            <span className="text-[10px] tabular-nums text-slate-400">{d.date ?? "—"}</span>
          )}
          <span className="text-[10px] leading-tight text-slate-500">{actionName(d, locale)}</span>
        </li>
      ))}
    </ol>
  )
}

export function DecisionLegend({ locale }: { locale: Locale }) {
  const items: Array<[Decision, string]> = [
    [{ date: null, action: "hike", verified: true }, locale === "zh" ? "加息／收紧" : "Hike / tighten"],
    [{ date: null, action: "hold", verified: true }, locale === "zh" ? "维持" : "Hold"],
    [{ date: null, action: "cut", verified: true }, locale === "zh" ? "降息／放松" : "Cut / ease"],
    [{ date: null, action: null, verified: false }, locale === "zh" ? "未核实" : "Unverified"],
  ]
  return <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">{items.map(([d, l]) => <span key={l} className="inline-flex items-center gap-1"><Square d={d} locale={locale} size="sm" />{l}</span>)}</span>
}
