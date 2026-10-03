export const analysis: Record<string, { inflation: number; target: number | null; targetBasis: string; gap: number | null; assessment: { zh: string; en: string }; framework: { zh: string; en: string }; momentum: string[] }> = {
  fed: { inflation: 3.4, target: 2, targetBasis: "2%", gap: 1.4, assessment: { zh: "温和限制", en: "Moderately restrictive" }, framework: { zh: "双重使命", en: "Dual mandate" }, momentum: ["→","→","↑"] },
  ecb: { inflation: 3.8, target: 2, targetBasis: "2%", gap: 1.8, assessment: { zh: "收紧中", en: "Tightening" }, framework: { zh: "对称通胀目标", en: "Symmetric inflation target" }, momentum: ["↑","→","↑"] },
  boe: { inflation: 3.1, target: 2, targetBasis: "2%", gap: 1.1, assessment: { zh: "限制性维持", en: "Restrictive hold" }, framework: { zh: "通胀目标制", en: "Inflation targeting" }, momentum: ["→","→","→"] },
  boj: { inflation: 1.7, target: 2, targetBasis: "2%", gap: -0.3, assessment: { zh: "渐进正常化", en: "Gradual normalisation" }, framework: { zh: "物价稳定目标", en: "Price stability target" }, momentum: ["→","→","↑"] },
  boc: { inflation: 3, target: 2, targetBasis: "2% midpoint (1–3% range)", gap: 1, assessment: { zh: "中性附近维持", en: "Hold near neutral" }, framework: { zh: "目标区间制", en: "Target-control range" }, momentum: ["→","→","→"] },
  pboc: { inflation: 0.8, target: 2, targetBasis: "around 2%", gap: -1.2, assessment: { zh: "多工具支持性", en: "Multi-tool support" }, framework: { zh: "多目标／多工具", en: "Multi-objective / multi-tool" }, momentum: ["→","→","→"] },
  rbi: { inflation: 4.82, target: 4, targetBasis: "4% (2–6% tolerance band)", gap: 0.82, assessment: { zh: "中性维持", en: "Neutral hold" }, framework: { zh: "灵活通胀目标", en: "Flexible inflation targeting" }, momentum: ["→","→","→"] },
  mas: { inflation: 2.2, target: null, targetBasis: "No point target", gap: null, assessment: { zh: "汇率带收紧", en: "FX-band tightening" }, framework: { zh: "汇率中心框架", en: "Exchange-rate centred" }, momentum: ["→","↑","↑"] },
  rba: { inflation: 4, target: 2.5, targetBasis: "2–3% (gap uses midpoint)", gap: 1.5, assessment: { zh: "明显收紧", en: "Active tightening" }, framework: { zh: "灵活通胀目标", en: "Flexible inflation targeting" }, momentum: ["↑","→","↑"] },
}

export const policyContext: Record<string, {
  mandate: string
  transmission: string
  comparability: string
  bias: string
  biasTag: string
}> = {
  fed: { mandate: "Maximum employment and stable prices", transmission: "An administered-rate corridor steers the federal funds rate and broader financial conditions.", comparability: "The policy setting is a target range; charts use its midpoint only for ranking.", bias: "Inflation control with labour-market monitoring", biasTag: "Inflation-focused" },
  ecb: { mandate: "Price stability across the euro area", transmission: "Three administered rates influence money-market rates; the deposit facility is the comparison rate.", comparability: "One policy setting applies across euro-area economies with different national conditions.", bias: "Data-dependent tightening", biasTag: "Tightening" },
  boe: { mandate: "Price stability, subject to the UK government's 2% CPI target", transmission: "Bank Rate influences borrowing, saving, asset prices and demand.", comparability: "The latest hold was split: three MPC members preferred a 25 bp increase.", bias: "Restrictive hold with upside inflation risk", biasTag: "Restrictive" },
  boj: { mandate: "Price stability with a 2% objective", transmission: "The overnight call-rate guideline and balance-sheet operations shape financial conditions.", comparability: "The absolute rate remains low even while the direction of travel is tightening.", bias: "Gradual policy normalisation", biasTag: "Normalising" },
  boc: { mandate: "Price stability through a 2% midpoint within a 1–3% control range", transmission: "The overnight-rate target anchors the operating band and borrowing conditions.", comparability: "A 2% midpoint is used for the gap, while the formal target is a range.", bias: "Hold while balancing growth and inflation risks", biasTag: "Balanced" },
  pboc: { mandate: "Currency stability and economic growth under a multi-objective framework", transmission: "Open-market operations, policy rates, reserve requirements and credit guidance work together.", comparability: "The 7-day reverse-repo rate is only one part of a broader multi-tool framework; the inflation figure is an expected objective, not a point target.", bias: "Appropriately accommodative, using multiple policy tools", biasTag: "Supportive" },
  rbi: { mandate: "Price stability while keeping growth in mind", transmission: "The repo rate under the liquidity adjustment facility anchors short-term funding conditions.", comparability: "The 4% target operates inside a 2–6% tolerance band.", bias: "Neutral hold", biasTag: "Neutral" },
  mas: { mandate: "Medium-term price stability as a basis for sustainable growth", transmission: "The slope, width and centre of the S$NEER policy band manage imported inflation.", comparability: "MAS does not set a policy interest rate and has no published point inflation target.", bias: "Calibrated exchange-rate tightening", biasTag: "FX tightening" },
  rba: { mandate: "Price stability and full employment", transmission: "The cash-rate target influences funding costs, credit, demand and the exchange rate.", comparability: "The target is a 2–3% band; the Dashboard measures the inflation gap against its upper bound.", bias: "Active tightening against upside inflation risk", biasTag: "Tightening" },
}
