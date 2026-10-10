export type InflationPoint = { date: string; value: number }

export type InflationPath = {
  id: string
  measure: { en: string; zh: string }
  period: { en: string; zh: string }
  sourceTitle: { en: string; zh: string }
  sourceUrl: string
  points: InflationPoint[]
}

// Last 12 official monthly prints, September 2025–August 2026.
// Only series with every month present are included. Nothing here is interpolated.
export const inflationPaths: InflationPath[] = [
  {
    id: "fed",
    measure: { en: "PCE price index, year-ago percent", zh: "个人消费支出价格指数，同比" },
    period: { en: "Sep 2025 – Aug 2026", zh: "2025年9月 – 2026年8月" },
    sourceTitle: { en: "BEA Table 2.8.4, Personal consumption expenditures", zh: "BEA 表 2.8.4，个人消费支出" },
    sourceUrl: "https://www.bea.gov/news/2026/personal-income-and-outlays-august-2026",
    points: [
      { date: "2025-09-01", value: 2.8 },
      { date: "2025-10-01", value: 2.7 },
      { date: "2025-11-01", value: 2.7 },
      { date: "2025-12-01", value: 2.8 },
      { date: "2026-01-01", value: 2.7 },
      { date: "2026-02-01", value: 2.8 },
      { date: "2026-03-01", value: 3.4 },
      { date: "2026-04-01", value: 3.6 },
      { date: "2026-05-01", value: 3.8 },
      { date: "2026-06-01", value: 3.5 },
      { date: "2026-07-01", value: 3.4 },
      { date: "2026-08-01", value: 3.4 },
    ],
  },
  {
    id: "boe",
    measure: { en: "CPI annual rate, all items", zh: "CPI 年率，全部项目" },
    period: { en: "Sep 2025 – Aug 2026", zh: "2025年9月 – 2026年8月" },
    sourceTitle: { en: "ONS series D7G7, CPI annual rate", zh: "ONS 序列 D7G7，CPI 年率" },
    sourceUrl: "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7g7/mm23",
    points: [
      { date: "2025-09-01", value: 3.8 },
      { date: "2025-10-01", value: 3.6 },
      { date: "2025-11-01", value: 3.2 },
      { date: "2025-12-01", value: 3.4 },
      { date: "2026-01-01", value: 3.0 },
      { date: "2026-02-01", value: 3.0 },
      { date: "2026-03-01", value: 3.3 },
      { date: "2026-04-01", value: 2.8 },
      { date: "2026-05-01", value: 2.8 },
      { date: "2026-06-01", value: 2.6 },
      { date: "2026-07-01", value: 2.9 },
      { date: "2026-08-01", value: 3.1 },
    ],
  },
  {
    id: "boj",
    measure: { en: "CPI excluding fresh food, year-ago", zh: "剔除生鲜食品的 CPI，同比" },
    period: { en: "Sep 2025 – Aug 2026", zh: "2025年9月 – 2026年8月" },
    sourceTitle: { en: "Statistics Bureau of Japan, national CPI, table 1", zh: "日本总务省统计局全国 CPI 表 1" },
    sourceUrl: "https://www.stat.go.jp/data/cpi/sokuhou/tsuki/index-z.html",
    points: [
      { date: "2025-09-01", value: 2.9 },
      { date: "2025-10-01", value: 3.0 },
      { date: "2025-11-01", value: 3.0 },
      { date: "2025-12-01", value: 2.4 },
      { date: "2026-01-01", value: 1.9 },
      { date: "2026-02-01", value: 1.5 },
      { date: "2026-03-01", value: 1.7 },
      { date: "2026-04-01", value: 1.4 },
      { date: "2026-05-01", value: 1.4 },
      { date: "2026-06-01", value: 1.6 },
      { date: "2026-07-01", value: 1.8 },
      { date: "2026-08-01", value: 1.7 },
    ],
  },
  {
    id: "boc",
    measure: { en: "CPI all-items, 12-month percent change", zh: "CPI 全部项目，12 个月变动" },
    period: { en: "Sep 2025 – Aug 2026", zh: "2025年9月 – 2026年8月" },
    sourceTitle: { en: "Statistics Canada table 18-10-0004-01", zh: "加拿大统计局表 18-10-0004-01" },
    sourceUrl: "https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000401",
    points: [
      { date: "2025-09-01", value: 2.4 },
      { date: "2025-10-01", value: 2.2 },
      { date: "2025-11-01", value: 2.2 },
      { date: "2025-12-01", value: 2.4 },
      { date: "2026-01-01", value: 2.3 },
      { date: "2026-02-01", value: 1.8 },
      { date: "2026-03-01", value: 2.4 },
      { date: "2026-04-01", value: 2.8 },
      { date: "2026-05-01", value: 3.2 },
      { date: "2026-06-01", value: 2.8 },
      { date: "2026-07-01", value: 3.0 },
      { date: "2026-08-01", value: 3.0 },
    ],
  },
  {
    id: "rba",
    measure: { en: "Monthly CPI, change from a year earlier", zh: "月度 CPI，较上年同月" },
    period: { en: "Sep 2025 – Aug 2026", zh: "2025年9月 – 2026年8月" },
    sourceTitle: { en: "ABS monthly CPI, all groups, Australia", zh: "ABS 月度 CPI，全部项目，澳大利亚" },
    sourceUrl: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/aug-2026",
    points: [
      { date: "2025-09-01", value: 3.6 },
      { date: "2025-10-01", value: 3.8 },
      { date: "2025-11-01", value: 3.4 },
      { date: "2025-12-01", value: 3.8 },
      { date: "2026-01-01", value: 3.8 },
      { date: "2026-02-01", value: 3.7 },
      { date: "2026-03-01", value: 4.6 },
      { date: "2026-04-01", value: 4.2 },
      { date: "2026-05-01", value: 4.0 },
      { date: "2026-06-01", value: 3.8 },
      { date: "2026-07-01", value: 3.5 },
      { date: "2026-08-01", value: 4.0 },
    ],
  },
]

export function inflationPathFor(id: string) {
  return inflationPaths.find((path) => path.id === id) ?? null
}
