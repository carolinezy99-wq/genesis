import { banks, type Bank, type Source } from "@/lib/banks"
import { presentBank, stanceOf, type Locale, type Stance } from "@/lib/copy"

type Text = { en: string; zh: string }

const targetPoint: Record<string, { value: number | null; basis: Text; sourceIndex?: number }> = {
  fed: { value: 2, basis: { en: "2% goal", zh: "2% 目标" } },
  ecb: { value: 2, basis: { en: "2% symmetric target", zh: "2% 对称目标" } },
  boe: { value: 2, basis: { en: "2% CPI target", zh: "2% CPI 目标" } },
  boj: { value: 2, basis: { en: "2% price stability target", zh: "2% 物价稳定目标" } },
  boc: { value: 2, basis: { en: "Midpoint of 1–3% range", zh: "1%–3% 区间中点" }, sourceIndex: 0 },
  pboc: { value: 2, basis: { en: "Expected objective, around 2%", zh: "预期目标，2% 左右" }, sourceIndex: 5 },
  rbi: { value: 4, basis: { en: "4% target (2–6% band)", zh: "4% 目标（2%–6% 区间）" }, sourceIndex: 0 },
  mas: { value: null, basis: { en: "No point target", zh: "无点目标" }, sourceIndex: 1 },
  rba: { value: 2.5, basis: { en: "Midpoint of 2–3% band", zh: "2%–3% 区间中点" }, sourceIndex: 0 },
}

const round2 = (n: number) => Math.round(n * 100) / 100

export type BankMetrics = {
  id: string
  stance: Stance
  policyRate: number | null
  inflation: number
  inflationMeasure: string
  inflationPeriod: string
  target: number | null
  targetBasis: string
  gap: number | null
  policySource: Source
  inflationSource: Source
  targetSource: Source
}

export function metricsFor(bank: Bank, locale: Locale): BankMetrics {
  const view = presentBank(bank, locale)
  const t = targetPoint[bank.id]
  const inflation = parseFloat(bank.inflationActual.display)
  const policyRate = bank.policy.chartValue
  return {
    id: bank.id,
    stance: stanceOf(bank.cycle.kind),
    policyRate,
    inflation,
    inflationMeasure: view.latestGauge,
    inflationPeriod: view.latestPeriod,
    target: t.value,
    targetBasis: t.basis[locale],
    gap: t.value == null ? null : round2(inflation - t.value),
    policySource: bank.primarySource,
    inflationSource: bank.inflationActual.source,
    targetSource: t.sourceIndex != null ? (bank.sources[t.sourceIndex] ?? bank.primarySource) : bank.primarySource,
  }
}

export function allMetrics(locale: Locale) {
  return banks.map((bank) => ({ bank, m: metricsFor(bank, locale) }))
}

export function signed(n: number | null, unit: string, digits = 2) {
  if (n == null) return "—"
  const s = n.toFixed(digits)
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${s.replace("-", "")}${unit}`
}

export function pct(n: number | null, digits = 2) {
  return n == null ? "—" : `${n.toFixed(digits)}%`
}

export function summary(locale: Locale) {
  const rows = allMetrics(locale)
  const count = (s: Stance) => rows.filter((r) => r.m.stance === s).length
  const rated = rows.filter((r) => r.m.policyRate != null).sort((a, b) => b.m.policyRate! - a.m.policyRate!)
  return {
    tightening: count("tightening"),
    holding: count("holding"),
    easing: count("easing"),
    highest: rated[0],
    lowest: rated[rated.length - 1],
  }
}

export const stanceColor: Record<Stance, string> = {
  tightening: "#b4532a",
  holding: "#8a949c",
  easing: "#2f7d6b",
  unclear: "#c3c9ce",
}
