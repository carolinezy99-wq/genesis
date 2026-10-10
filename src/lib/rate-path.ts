import { history, type DecisionAction } from "@/lib/history"

export type RatePoint = {
  date: string
  value: number
  label: string
  url: string
}

export type PolicyPath = {
  instrument: { en: string; zh: string }
  note: { en: string; zh: string }
  points: RatePoint[]
}

const FED = "https://www.federalreserve.gov/newsevents/pressreleases/"
const BOC = "https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/"
const RBA = "https://www.rba.gov.au/statistics/cash-rate/"
const RBI = "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid="

function point(date: string, value: number, label: string, url: string): RatePoint {
  return { date, value, label, url }
}

/**
 * Official policy-rate decision points only. The administered rate is carried
 * forward between these dates (a step, not an interpolated month).
 * PBoC uses the three published operation-rate changes plus the 24 Sep 2026
 * operation that restates 1.40%. Media checkpoints are not included.
 */
export const policyPaths: Record<string, PolicyPath | null> = {
  fed: {
    instrument: { en: "Federal funds target, midpoint of the range", zh: "联邦基金目标区间中点" },
    note: {
      en: "Each point is the midpoint of the range in that FOMC statement. The range itself is the published setting.",
      zh: "每个点是当次 FOMC 声明区间的中点。公布的设定是区间本身。",
    },
    points: [
      point("2026-01-28", 3.625, "3.50–3.75%", `${FED}monetary20260128a.htm`),
      point("2026-03-18", 3.625, "3.50–3.75%", `${FED}monetary20260318a.htm`),
      point("2026-04-29", 3.625, "3.50–3.75%", `${FED}monetary20260429a.htm`),
      point("2026-06-17", 3.625, "3.50–3.75%", `${FED}monetary20260617a.htm`),
      point("2026-07-29", 3.625, "3.50–3.75%", `${FED}monetary20260729a.htm`),
      point("2026-09-16", 3.875, "3.75–4.00%", `${FED}monetary20260916a.htm`),
    ],
  },
  ecb: {
    instrument: { en: "Deposit facility rate", zh: "存款便利利率" },
    note: {
      en: "Governing Council decision dates. The 10 September rate took effect on 16 September.",
      zh: "管理委员会决定日。9月10日的利率于9月16日生效。",
    },
    points: [
      point("2026-02-05", 2, "2.00%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260205~001d26959b.en.html"),
      point("2026-03-19", 2, "2.00%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260319~3057739775.en.html"),
      point("2026-04-30", 2, "2.00%", "https://www.ecb.europa.eu/press/press_conference/monetary-policy-statement/shared/pdf/ecb.ds260430~1c397fa90c.en.pdf"),
      point("2026-06-11", 2.25, "2.25%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260611~4d41bd5e83.en.html"),
      point("2026-07-23", 2.25, "2.25%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260723~29f24d99bc.en.html"),
      point("2026-09-10", 2.5, "2.50%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260910~314e508016.en.html"),
    ],
  },
  boe: {
    instrument: { en: "Bank Rate", zh: "银行利率" },
    note: {
      en: "MPC announcement dates in 2026. Bank Rate is 3.75% at each of them.",
      zh: "2026年 MPC 公布日。每次银行利率均为 3.75%。",
    },
    points: [
      point("2026-02-05", 3.75, "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/february-2026"),
      point("2026-03-19", 3.75, "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/march-2026"),
      point("2026-04-30", 3.75, "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/april-2026"),
      point("2026-06-18", 3.75, "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/june-2026"),
      point("2026-07-30", 3.75, "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/july-2026"),
      point("2026-09-17", 3.75, "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/september-2026"),
    ],
  },
  boj: {
    instrument: { en: "Uncollateralized overnight call rate, guideline", zh: "无担保隔夜拆借利率引导目标" },
    note: {
      en: "The statements say “around” these levels. The line uses 0.75, 1.00 and 1.25.",
      zh: "声明写的是“左右”。图中取 0.75、1.00 和 1.25。",
    },
    points: [
      point("2026-01-23", 0.75, "around 0.75%", "https://www.boj.or.jp/en/mopo/mpmdeci/state_2026/k260123a.htm"),
      point("2026-03-19", 0.75, "around 0.75%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260319a.pdf"),
      point("2026-04-28", 0.75, "around 0.75%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260428a.pdf"),
      point("2026-06-16", 1, "around 1.0%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260616a.pdf"),
      point("2026-07-31", 1, "around 1.0%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260731a.pdf"),
      point("2026-09-18", 1.25, "around 1.25%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260918a.pdf"),
    ],
  },
  boc: {
    instrument: { en: "Target for the overnight rate", zh: "隔夜利率目标" },
    note: {
      en: "Six 2026 decision dates on the Bank of Canada key-interest-rate page. The target is 2.25% at each.",
      zh: "加拿大银行关键利率页上的六个 2026 年决定日，目标均为 2.25%。",
    },
    points: [
      point("2026-01-28", 2.25, "2.25%", BOC),
      point("2026-03-18", 2.25, "2.25%", BOC),
      point("2026-04-29", 2.25, "2.25%", BOC),
      point("2026-06-10", 2.25, "2.25%", BOC),
      point("2026-07-15", 2.25, "2.25%", BOC),
      point("2026-09-02", 2.25, "2.25%", BOC),
    ],
  },
  pboc: {
    instrument: { en: "7-day reverse repo operation rate", zh: "7天期逆回购操作利率" },
    note: {
      en: "Published changes only, plus the 24 September 2026 operation that restates 1.40%. The rate is carried forward between those dates. 2026 media checkpoints are not plotted.",
      zh: "只画已公布的调整，以及 2026-09-24 仍写明 1.40% 的操作。两次之间按未变处理。不采用 2026 年媒体检查点。",
    },
    points: [
      point("2024-07-22", 1.7, "1.70%", "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125469/5409998/index.html"),
      point("2024-09-27", 1.5, "1.50%", "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125469/5468922/index.html"),
      point("2025-05-08", 1.4, "1.40%", "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125469/5699842/index.html"),
      point("2026-09-24", 1.4, "1.40%", "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125475/2026092408454713496/index.html"),
    ],
  },
  rbi: {
    instrument: { en: "Policy repo rate", zh: "政策回购利率" },
    note: {
      en: "MPC press releases. The December 2025 cut is included; later 2026 meetings held the rate.",
      zh: "MPC 新闻稿。含 2025年12月的下调；2026年几次会议维持利率。",
    },
    points: [
      point("2025-10-01", 5.5, "5.50%", `${RBI}61332`),
      point("2025-12-05", 5.25, "5.25%", `${RBI}61749`),
      point("2026-02-06", 5.25, "5.25%", `${RBI}62169`),
      point("2026-04-08", 5.25, "5.25%", `${RBI}62514`),
      point("2026-06-05", 5.25, "5.25%", `${RBI}62863`),
      point("2026-08-05", 5.25, "5.25%", `${RBI}63287`),
    ],
  },
  mas: null,
  rba: {
    instrument: { en: "Cash rate target", zh: "现金利率目标" },
    note: {
      en: "Announcement dates. The RBA cash-rate table lists the effective date one day later.",
      zh: "公布日。储备银行现金利率表上的生效日晚一天。",
    },
    points: [
      point("2026-02-03", 3.85, "3.85%", RBA),
      point("2026-03-17", 4.1, "4.10%", RBA),
      point("2026-05-05", 4.35, "4.35%", RBA),
      point("2026-06-16", 4.35, "4.35%", RBA),
      point("2026-08-11", 4.35, "4.35%", RBA),
      point("2026-09-29", 4.6, "4.60%", "https://www.rba.gov.au/media-releases/2026/mr-26-27.html"),
    ],
  },
}

export type CountPoint = { date: string; value: number }

/**
 * Banks whose latest official decision on that date was a hike or an S$NEER
 * tightening. Holds replace an earlier hike. PBoC rows that are not on pbc.gov.cn
 * are left out. This is computed here; it is not an official statistic.
 */
export function tighteningCountSeries(): CountPoint[] {
  const events: { date: string; id: string; action: DecisionAction }[] = []
  for (const [id, record] of Object.entries(history)) {
    for (const decision of record.decisions) {
      if (!decision.verified || !decision.date || !decision.action) continue
      if (id === "pboc" && !decision.url?.includes("pbc.gov.cn")) continue
      events.push({ date: decision.date, id, action: decision.action })
    }
  }
  events.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id))
  const latest = new Map<string, DecisionAction>()
  const points: CountPoint[] = []
  let index = 0
  while (index < events.length) {
    const date = events[index].date
    while (index < events.length && events[index].date === date) {
      latest.set(events[index].id, events[index].action)
      index += 1
    }
    let value = 0
    for (const action of latest.values()) if (action === "hike") value += 1
    points.push({ date, value })
  }
  return points
}
