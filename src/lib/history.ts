export type DecisionAction = "hike" | "hold" | "cut"

export type Decision = {
  date: string | null
  action: DecisionAction | null
  detail?: string
  url?: string
  verified: boolean
}

type Reading = { measure: string; value: string; period: string; url: string }

export type BankHistory = {
  decisions: Decision[]
  historyNote?: string
  nextMeeting: { date: string; url: string } | null
  nextMeetingNote?: string
  headline: Reading | null
  core: Reading | null
  coreNote?: string
}

export const HISTORY_CHECKED_ON = "2026-10-03"

const d = (date: string, action: DecisionAction, detail: string, url: string): Decision => ({ date, action, detail, url, verified: true })

const FED = "https://www.federalreserve.gov/newsevents/pressreleases/"
const BOC_KIR = "https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/"
const RBA_CR = "https://www.rba.gov.au/statistics/cash-rate/"
const MAS_PAST = "https://www.mas.gov.sg/monetary-policy/past-monetary-policy-decisions"
const RBI = "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid="

export const history: Record<string, BankHistory> = {
  fed: {
    decisions: [
      d("2026-01-28", "hold", "3.50–3.75%", `${FED}monetary20260128a.htm`),
      d("2026-03-18", "hold", "3.50–3.75%", `${FED}monetary20260318a.htm`),
      d("2026-04-29", "hold", "3.50–3.75%", `${FED}monetary20260429a.htm`),
      d("2026-06-17", "hold", "3.50–3.75%", `${FED}monetary20260617a.htm`),
      d("2026-07-29", "hold", "3.50–3.75%", `${FED}monetary20260729a.htm`),
      d("2026-09-16", "hike", "+25 bp to 3.75–4.00%", `${FED}monetary20260916a.htm`),
    ],
    nextMeeting: { date: "2026-10-28", url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" },
    nextMeetingNote: "FOMC meeting 27–28 October",
    headline: { measure: "PCE price index", value: "3.4%", period: "Aug 2026", url: "https://www.bea.gov/news/2026/personal-income-and-outlays-august-2026" },
    core: { measure: "Core PCE (ex food and energy)", value: "3.0%", period: "Aug 2026", url: "https://www.bea.gov/data/personal-consumption-expenditures-price-index-excluding-food-and-energy" },
  },
  ecb: {
    decisions: [
      d("2026-02-05", "hold", "DFR 2.00%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260205~001d26959b.en.html"),
      d("2026-03-19", "hold", "DFR 2.00%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260319~3057739775.en.html"),
      d("2026-04-30", "hold", "DFR 2.00%", "https://www.ecb.europa.eu/press/press_conference/monetary-policy-statement/shared/pdf/ecb.ds260430~1c397fa90c.en.pdf"),
      d("2026-06-11", "hike", "+25 bp, DFR 2.25%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260611~4d41bd5e83.en.html"),
      d("2026-07-23", "hold", "DFR 2.25%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260723~29f24d99bc.en.html"),
      d("2026-09-10", "hike", "+25 bp, DFR 2.50%", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260910~314e508016.en.html"),
    ],
    nextMeeting: { date: "2026-10-29", url: "https://www.ecb.europa.eu/press/calendars/mgcgc/html/index.en.html" },
    nextMeetingNote: "Governing Council 28–29 October",
    headline: { measure: "HICP, flash", value: "3.8%", period: "Sep 2026", url: "https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-02102026-ap" },
    core: { measure: "HICP ex energy, food, alcohol & tobacco, flash", value: "2.5%", period: "Sep 2026", url: "https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-02102026-ap" },
    coreNote: "Eurostat flash estimate released 2026-10-02; full September data due 2026-10-16. August final was 3.2%.",
  },
  boe: {
    decisions: [
      d("2026-02-05", "hold", "3.75%, vote 5–4", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/february-2026"),
      d("2026-03-19", "hold", "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/march-2026"),
      d("2026-04-30", "hold", "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/april-2026"),
      d("2026-06-18", "hold", "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/june-2026"),
      d("2026-07-30", "hold", "3.75%", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/july-2026"),
      d("2026-09-17", "hold", "3.75%, vote 6–3", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/september-2026"),
    ],
    historyNote: "Each date now opens that meeting's MPC Summary and Minutes. Bank Rate has been 3.75% since 2025-12-18.",
    nextMeeting: { date: "2026-11-05", url: "https://www.bankofengland.co.uk/monetary-policy/upcoming-mpc-dates" },
    headline: { measure: "CPI", value: "3.1%", period: "Aug 2026", url: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/latest" },
    core: { measure: "Core CPI (ex energy, food, alcohol & tobacco)", value: "2.6%", period: "Aug 2026", url: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/latest" },
  },
  boj: {
    decisions: [
      d("2026-01-23", "hold", "around 0.75%", "https://www.boj.or.jp/en/mopo/mpmdeci/state_2026/k260123a.htm"),
      d("2026-03-19", "hold", "around 0.75%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260319a.pdf"),
      d("2026-04-28", "hold", "around 0.75%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260428a.pdf"),
      d("2026-06-16", "hike", "to around 1.0%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260616a.pdf"),
      d("2026-07-31", "hold", "around 1.0%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260731a.pdf"),
      d("2026-09-18", "hike", "to around 1.25%", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260918a.pdf"),
    ],
    nextMeeting: { date: "2026-10-30", url: "https://www.boj.or.jp/en/mopo/mpmsche_minu/index.htm" },
    nextMeetingNote: "MPM 29–30 October (Outlook Report)",
    headline: { measure: "CPI all items", value: "1.9%", period: "Aug 2026", url: "https://www.stat.go.jp/data/cpi/sokuhou/tsuki/index-z.htm" },
    core: { measure: "CPI less fresh food", value: "1.7%", period: "Aug 2026", url: "https://www.stat.go.jp/data/cpi/sokuhou/tsuki/index-z.htm" },
  },
  boc: {
    decisions: [
      d("2026-01-28", "hold", "2.25%", BOC_KIR),
      d("2026-03-18", "hold", "2.25%", BOC_KIR),
      d("2026-04-29", "hold", "2.25%", BOC_KIR),
      d("2026-06-10", "hold", "2.25%", BOC_KIR),
      d("2026-07-15", "hold", "2.25%", BOC_KIR),
      d("2026-09-02", "hold", "2.25%", BOC_KIR),
    ],
    nextMeeting: { date: "2026-10-28", url: BOC_KIR },
    headline: { measure: "CPI all-items", value: "3.0%", period: "Aug 2026", url: "https://www150.statcan.gc.ca/n1/daily-quotidien/260914/dq260914a-eng.htm" },
    core: { measure: "CPI-trim", value: "1.9%", period: "Aug 2026", url: "https://www150.statcan.gc.ca/n1/daily-quotidien/260914/dq260914a-eng.pdf" },
    coreNote: "CPI-median 2.0%, CPI-common 2.6%.",
  },
  pboc: {
    decisions: [
      d("2026-04-30", "hold", "7-day reverse-repo rate unchanged at 1.40%", "https://www.mnimarkets.com/articles/pboc-injects-cny1257bn-via-omo-1777512396005"),
      d("2026-05-29", "hold", "7-day reverse-repo rate unchanged at 1.40%", "https://www.mnimarkets.com/articles/pboc-withdraws-cny30bn-via-omo-1780018265305"),
      d("2026-06-29", "hold", "7-day reverse-repo rate unchanged at 1.40%", "https://finance.yahoo.com/economy/policy/articles/china-debuts-overnight-reverse-repos-050826868.html"),
      d("2026-07-29", "hold", "7-day reverse-repo rate unchanged at 1.40%", "https://uk.marketscreener.com/news/china-sets-overnight-reverse-repo-rate-steady-at-1-25-sources-say-ce7f51d2dd89f22d"),
      d("2026-08-19", "hold", "7-day reverse-repo rate unchanged at 1.40%", "https://www.mnimarkets.com/articles/pboc-withdraws-cny1423bn-during-omo-1787102873686"),
      d("2026-09-24", "hold", "7-day reverse-repo rate unchanged at 1.40%", "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125475/2026092408454713496/index.html"),
    ],
    historyNote: "The PBoC has no scheduled rate meetings. Shown are six representative 2026 policy-rate checkpoints, cross-checked with the PBoC, Reuters and MNI—not six rate changes or MPC-style votes. The last actual rate change was the May 2025 cut to 1.40%.",
    nextMeeting: null,
    nextMeetingNote: "No scheduled rate meetings",
    headline: { measure: "CPI", value: "0.8%", period: "Aug 2026", url: "https://www.stats.gov.cn/sj/zxfbhjd/202609/t20260909_1965263.html" },
    core: { measure: "CPI ex food and energy", value: "1.0%", period: "Aug 2026", url: "https://www.stats.gov.cn/sj/zxfbhjd/202609/t20260909_1965263.html" },
  },
  rbi: {
    decisions: [
      d("2025-10-01", "hold", "5.50%", `${RBI}61332`),
      d("2025-12-05", "cut", "−25 bp to 5.25%", `${RBI}61749`),
      d("2026-02-06", "hold", "5.25%", `${RBI}62169`),
      d("2026-04-08", "hold", "5.25%", `${RBI}62514`),
      d("2026-06-05", "hold", "5.25%", `${RBI}62863`),
      d("2026-08-05", "hold", "5.25%", `${RBI}63287`),
    ],
    nextMeeting: { date: "2026-10-07", url: `${RBI}62422` },
    nextMeetingNote: "MPC 5–7 October; decision on the final day",
    headline: { measure: "All-India CPI (2024=100), provisional", value: "4.82%", period: "Aug 2026", url: "https://www.mospi.gov.in/uploads/latestReleases/latest_release_1789381904344_6c792dcf-8a9f-4fca-93d3-99d833bdb358_Press_Release_of_CPI_for_August_2026.pdf" },
    core: null,
    coreNote: "MoSPI publishes no official core CPI series.",
  },
  mas: {
    decisions: [
      d("2025-04-14", "cut", "Slope reduced slightly (eased)", MAS_PAST),
      d("2025-07-30", "hold", "Slope, width and centre unchanged", MAS_PAST),
      d("2025-10-14", "hold", "Slope, width and centre unchanged", MAS_PAST),
      d("2026-01-29", "hold", "Slope, width and centre unchanged", MAS_PAST),
      d("2026-04-14", "hike", "Slope increased slightly (tightened)", MAS_PAST),
      d("2026-07-27", "hike", "Slope increased very slightly (tightened)", "https://www.mas.gov.sg/news/monetary-policy-statements/2026/mas-monetary-policy-statement-27jul26"),
    ],
    historyNote: "MAS adjusts the S$NEER band, not an interest rate: ▲ = tighten, ▼ = ease. No basis-point sizes are published.",
    nextMeeting: { date: "2026-10-14", url: "https://www.mas.gov.sg/monetary-policy/advance-release-calendar" },
    nextMeetingNote: "Statement due no later than this date",
    headline: { measure: "CPI-All Items", value: "2.3%", period: "Aug 2026", url: "https://www.mas.gov.sg/news/consumer-price-developments/2026/consumer-price-developments-in-august-2026" },
    core: { measure: "MAS Core Inflation", value: "2.2%", period: "Aug 2026", url: "https://www.mas.gov.sg/news/consumer-price-developments/2026/consumer-price-developments-in-august-2026" },
  },
  rba: {
    decisions: [
      d("2026-02-03", "hike", "+25 bp to 3.85%", RBA_CR),
      d("2026-03-17", "hike", "+25 bp to 4.10%", RBA_CR),
      d("2026-05-05", "hike", "+25 bp to 4.35%", RBA_CR),
      d("2026-06-16", "hold", "4.35%", RBA_CR),
      d("2026-08-11", "hold", "4.35%", RBA_CR),
      d("2026-09-29", "hike", "+25 bp to 4.60%", "https://www.rba.gov.au/media-releases/2026/mr-26-27.html"),
    ],
    historyNote: "Announcement dates. The RBA cash-rate table lists effective dates, one day later.",
    nextMeeting: { date: "2026-11-03", url: "https://www.rba.gov.au/schedules-events/board-meeting-schedules.html" },
    nextMeetingNote: "Board meeting 2–3 November",
    headline: { measure: "Monthly CPI", value: "4.0%", period: "Aug 2026", url: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release" },
    core: { measure: "Trimmed mean", value: "3.6%", period: "Aug 2026", url: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release" },
  },
}
