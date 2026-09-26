import { banks, sourceKindLabel, type Bank, type Source, type SourceKind } from "@/lib/banks"

export type Locale = "en" | "zh"

export const ui = {
  en: {
    kicker: "Monetary policy",
    title: "Global central bank policy",
    lede: "Nine central banks, read from official pages on 2026-09-26. Germany, France, and Italy are covered by the ECB.",
    asOf: "Data as of",
    hikes: "Hikes",
    holds: "Holds",
    tightens: "FX-band tightening",
    cuts: "Cuts",
    chartTitle: "Policy rates",
    chartAxisHint: "Percent. The figure is printed on each bar.",
    chartFoot:
      "High to low. Rust is the highest rate. The US bar is the midpoint of 3.75–4.00%. China is the 7-day reverse repo, not the LPR. Singapore is not a policy rate, so it is only in the table.",
    tableTitle: "All compared figures",
    tableHint: "Same columns for every bank. Singapore’s setting is the exchange-rate band, not a percent.",
    colBank: "Bank",
    colInstrument: "Instrument",
    colSetting: "Setting",
    colTarget: "Target",
    colLatest: "Latest inflation",
    colGauge: "Gauge",
    colMove: "Latest move",
    colDate: "Date",
    sameFields:
      "Each card has the same lines: instrument, inflation target, latest inflation, who decides, what they watch, and the latest move. Some banks also publish rates that are not the compared policy rate. Those sit under “Other published rates” and are left off the bar chart. The Bank of England, the Bank of Japan, and the Reserve Bank of Australia publish one policy rate, so that block is absent. Singapore’s extra line is the exchange-rate framework.",
    otherRates: "Other published rates",
    frameworkTitle: "Exchange-rate framework",
    setBy: "Set by",
    watches: "Watches",
    decision: "Latest move",
    biography: "Official page",
    chartCaption:
      "Policy rates for eight central banks that use an interest rate, in percent. Singapore is excluded. The US bar is the midpoint of the target range, with the range labeled on the bar. The China bar is the 7-day reverse repo operation rate.",
    yAxis: "Rate (%)",
    inflationTarget: "Inflation target",
    portrait: "Portrait",
    readOn: "read on",
    latest: "Latest",
    official: "Official",
  },
  zh: {
    kicker: "货币政策",
    title: "全球央行货币政策",
    lede: "九家央行，数字于 2026-09-26 从官方页面核读。德、法、意由欧洲央行代表。",
    asOf: "数据截至",
    hikes: "加息",
    holds: "维持",
    tightens: "汇率带收紧",
    cuts: "降息",
    chartTitle: "政策利率",
    chartAxisHint: "单位：%。数字标在柱顶。",
    chartFoot:
      "从高到低。深红色是最高利率。美国柱高是 3.75%–4.00% 的中点。中国是 7 天期逆回购，不是贷款报价利率。新加坡不是政策利率，只出现在表里。",
    tableTitle: "可对照指标",
    tableHint: "每家同一组列。新加坡的“当前水平”是汇率带，不是百分比。",
    colBank: "央行",
    colInstrument: "工具",
    colSetting: "当前水平",
    colTarget: "通胀目标",
    colLatest: "最新通胀",
    colGauge: "指标",
    colMove: "最近决定",
    colDate: "日期",
    sameFields:
      "每张卡片都是同一组信息：工具、通胀目标、最新通胀、决策机构、关注指标、最近一次决定。有的央行还会公布不拿来横向比较的利率，写在“其他公布利率”里，不进柱状图。英格兰银行、日本银行、澳大利亚储备银行只公布一个政策利率，所以没有这一栏。新加坡多出来的一句是汇率框架。",
    otherRates: "其他公布利率",
    frameworkTitle: "汇率框架",
    setBy: "决策",
    watches: "关注",
    decision: "最近决定",
    biography: "官方页面",
    chartCaption:
      "八家以利率为工具的央行政策利率比较，纵轴单位为百分比。新加坡未列入。美国柱高为目标区间中点，柱顶标注区间。中国柱为7天期逆回购操作利率。",
    yAxis: "利率（%）",
    inflationTarget: "通胀目标",
    portrait: "肖像",
    readOn: "阅读于",
    latest: "最新",
    official: "官网",
  },
} as const

const chartLabel: Record<string, string> = {
  fed: "US",
  ecb: "Euro area",
  boe: "UK",
  boj: "Japan",
  boc: "Canada",
  pboc: "China",
  rbi: "India",
  mas: "Singapore",
  rba: "Australia",
}

const kindEn: Record<SourceKind, string> = {
  official: "Official",
  stats: "Statistics",
  intl: "Intl. org.",
  media: "Press",
}

type EnBank = {
  bodyName: string
  bodyNote: string
  indicators: string[]
  targetDisplay: string
  targetNote: string
  period: string
  gauge: string
  gaugeShort: string
  policyName: string
  policyDisplay: string
  asOf: string
  secondary: string[]
  cycleLabel: string
  sizeLabel: string
  detail: string
  framework?: string
}

const enBanks: Record<string, EnBank> = {
  fed: {
    bodyName: "Federal Open Market Committee (FOMC)",
    bodyNote: "The FOMC sets the federal funds target range. The 16 September 2026 statement passed 12–0.",
    indicators: ["PCE price index", "Core PCE (ex food and energy)", "Unemployment and employment"],
    targetDisplay: "2%",
    targetNote: "The FOMC statement’s 2 percent goal. The 16 September chair press conference and projections refer to the PCE price index.",
    period: "July 2026, year over year",
    gauge: "PCE price index; core PCE 3.3%. August PCE is scheduled for 2026-09-30, so this card still shows July.",
    gaugeShort: "PCE price index",
    policyName: "Federal funds rate target range",
    policyDisplay: "3.75–4.00%",
    asOf: "Decided 2026-09-16, effective 2026-09-17",
    secondary: ["ON RRP offering rate", "Standing repo rate"],
    cycleLabel: "Hike",
    sizeLabel: "+25 bp",
    detail: "The target range was raised by 1/4 percentage point, to 3.75%–4%. Vote 12–0.",
  },
  ecb: {
    bodyName: "Governing Council",
    bodyNote: "Germany, France, and Italy do not have separate policy rates. The ECB Governing Council decides for the euro area.",
    indicators: ["Headline inflation (euro-area HICP)", "Inflation excluding energy and food"],
    targetDisplay: "2%",
    targetNote: "Symmetric medium-term target. The 10 September decision says inflation stabilises at its 2% target in the medium term.",
    period: "August 2026, year over year",
    gauge: "Euro-area HICP (final; the flash estimate was 3.3%)",
    gaugeShort: "HICP",
    policyName: "Deposit facility rate",
    policyDisplay: "2.50%",
    asOf: "Decided 2026-09-10, effective 2026-09-16",
    secondary: ["Main refinancing operations", "Marginal lending facility"],
    cycleLabel: "Hike",
    sizeLabel: "+25 bp",
    detail: "All three key rates were raised by 25 basis points. The bar in the chart is the deposit facility rate.",
  },
  boe: {
    bodyName: "Monetary Policy Committee (MPC)",
    bodyNote: "The MPC sets Bank Rate at eight meetings a year. The aim is to return inflation to 2%.",
    indicators: ["Consumer Prices Index (CPI)"],
    targetDisplay: "2%",
    targetNote: "CPI inflation target. The Bank’s current page also shows the latest inflation reading.",
    period: "12 months to August 2026",
    gauge: "CPI; core CPI 2.6%",
    gaugeShort: "CPI",
    policyName: "Bank Rate",
    policyDisplay: "3.75%",
    asOf: "Meeting ended 2026-09-16, published 2026-09-17",
    secondary: [],
    cycleLabel: "Hold",
    sizeLabel: "0 bp",
    detail: "Held at 3.75% by 6–3. Three members preferred a 25 bp rise to 4%. Next meeting 2026-11-05.",
  },
  boj: {
    bodyName: "Policy Board",
    bodyNote: "The Policy Board sets the guideline for money market operations. The 18 September 2026 vote was 7–2.",
    indicators: ["CPI excluding fresh food", "All-items CPI"],
    targetDisplay: "2%",
    targetNote: "Price stability target. The Board aims for the underlying CPI to settle around 2%.",
    period: "August 2026, year over year",
    gauge: "All items excluding fresh food; all-items CPI 1.9%",
    gaugeShort: "CPI ex fresh food",
    policyName: "Uncollateralized overnight call rate",
    policyDisplay: "around 1.25%",
    asOf: "Decided 2026-09-18, applied from 2026-09-24",
    secondary: [],
    cycleLabel: "Hike",
    sizeLabel: "+25 bp",
    detail: "The guideline moved from around 1.0% to around 1.25%. Two members dissented.",
  },
  boc: {
    bodyName: "Governing Council",
    bodyNote: "The Governing Council sets the target for the overnight rate. On 2 September 2026 it held the policy rate.",
    indicators: ["Total CPI", "CPI excluding gasoline", "Core inflation"],
    targetDisplay: "2%",
    targetNote: "Midpoint of the 1%–3% control range, measured by the 12-month change in total CPI. The current agreement runs to 2026-12-31.",
    period: "August 2026, year over year",
    gauge: "Total CPI; excluding gasoline 2.4%",
    gaugeShort: "CPI",
    policyName: "Target for the overnight rate",
    policyDisplay: "2.25%",
    asOf: "2026-09-02",
    secondary: ["Bank Rate", "Deposit rate"],
    cycleLabel: "Hold",
    sizeLabel: "0 bp",
    detail: "Policy rate held at 2.25%. Next overnight-rate announcement: 2026-10-28.",
  },
  pboc: {
    bodyName: "People’s Bank of China (the Monetary Policy Committee is consultative)",
    bodyNote:
      "The Monetary Policy Committee’s quarterly meetings use the word “recommend”; they do not vote the policy rate. At the 7 May 2025 State Council press conference the Governor said the policy rate means the 7-day reverse repo operation rate. Operations are run by the Open Market Operations Office at a fixed rate by quantity tender. pboc.gov.cn did not resolve on 2026-09-26; this page uses pbc.gov.cn only.",
    indicators: ["Consumer price index (CPI)", "Aggregate financing and money supply (matched to growth and price goals)"],
    targetDisplay: "around 2%",
    targetNote: "The 2026 government work report’s expected rise in consumer prices. It is not a point target under an inflation-targeting regime.",
    period: "August 2026, year over year",
    gauge: "CPI; core CPI excluding food and energy 1.0%",
    gaugeShort: "CPI",
    policyName: "7-day reverse repo operation rate",
    policyDisplay: "1.40%",
    asOf: "2026-09-24 operation, Announcement [2026] No. 189",
    secondary: ["1-year LPR", "5-year-plus LPR"],
    cycleLabel: "Hold",
    sizeLabel: "Operation rate unchanged",
    detail:
      "Announcement [2026] No. 189 on 2026-09-24 was still at 1.40%. The previous change is Announcement [2025] No. 1: from 1.50% to 1.40% effective 2025-05-08 (−10 bp). The 1-year and 5-year-plus LPRs were published on 2026-09-20 and stay in force until the next release.",
  },
  rbi: {
    bodyName: "Monetary Policy Committee (MPC)",
    bodyNote: "The MPC sets the policy repo rate under the liquidity adjustment facility. The 62nd meeting was chaired by the Governor and was unanimous.",
    indicators: ["Consumer price index (CPI)", "Core CPI (ex food and fuel)"],
    targetDisplay: "4%",
    targetNote: "Tolerance band 2%–6%. The RBI Bulletin cites the Gazette notification of 25 March 2026. The target runs through 31 March 2031.",
    period: "August 2026, year over year, provisional",
    gauge: "CPI, base 2024=100; July final 4.45%",
    gaugeShort: "CPI",
    policyName: "Policy repo rate",
    policyDisplay: "5.25%",
    asOf: "2026-08-05 (meeting 3–5 August)",
    secondary: ["Standing deposit facility", "MSF and Bank Rate"],
    cycleLabel: "Hold",
    sizeLabel: "0 bp",
    detail: "Unanimous hold at 5.25%, with the neutral stance kept. Next meeting 2026-10-05 to 2026-10-07.",
  },
  mas: {
    bodyName: "Monetary Authority of Singapore",
    bodyNote: "The Economic Policy Group formulates monetary policy. Decisions are published as Monetary Policy Statements. There is no committee that votes a policy interest rate.",
    indicators: ["MAS Core Inflation (ex accommodation and private transport)", "CPI-All Items"],
    targetDisplay: "No point target",
    targetNote: "The aim is low and stable inflation over the medium term, not a published point target. The 2026 forecast band for both MAS Core and CPI-All Items is 1.5%–2.5%. That band is a projection.",
    period: "August 2026, year over year",
    gauge: "MAS Core Inflation; CPI-All Items 2.3%",
    gaugeShort: "MAS Core",
    policyName: "S$NEER policy band",
    policyDisplay: "Slope raised very slightly",
    asOf: "2026-07-27",
    secondary: [],
    cycleLabel: "Tighten",
    sizeLabel: "Basis points not published",
    detail:
      "MAS raised the rate of appreciation of the band by less than the April increase. The width and centre were unchanged. The statement does not give basis points. The Business Times report the same day repeats “very slightly” and also gives no basis-point figure. The next statement is due no later than October 2026.",
    framework:
      "Singapore’s monetary policy instrument is the policy band for the Singapore dollar nominal effective exchange rate (S$NEER), not a policy interest rate. MAS lets the trade-weighted exchange rate fluctuate inside a crawling band, and uses that path to restrain import prices and medium-term inflation.",
  },
  rba: {
    bodyName: "Monetary Policy Board",
    bodyNote: "The Board decides whether to change the cash rate target. Members are the Governor, the Deputy Governor, the Treasury Secretary, and six members appointed by the Treasurer.",
    indicators: ["Consumer price index (CPI)", "Trimmed mean inflation"],
    targetDisplay: "2–3%",
    targetNote: "Keep consumer price inflation between 2 and 3 percent, and sustain full employment.",
    period: "12 months to July 2026",
    gauge: "CPI; trimmed mean 3.6%. August CPI is scheduled for 2026-09-30.",
    gaugeShort: "CPI",
    policyName: "Cash rate target",
    policyDisplay: "4.35%",
    asOf: "Decided 2026-08-11, effective 2026-08-12",
    secondary: [],
    cycleLabel: "Hold",
    sizeLabel: "0 bp",
    detail:
      "Unanimous hold at 4.35%. The cash-rate history shows the last change was +25 bp on 2026-05-06; February and March 2026 were also +25 bp each. Next decision 2026-09-29.",
  },
}

const linkText: Record<string, { en: string; zh: string }> = {
  "https://www.bea.gov/news/2026/personal-income-and-outlays-july-2026": {
    en: "Personal income and outlays, July 2026",
    zh: "2026年7月个人收入与支出",
  },
  "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm": {
    en: "FOMC statement, 16 September 2026",
    zh: "2026年9月16日联邦公开市场委员会声明",
  },
  "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a1.htm": {
    en: "Implementation note, 16 September 2026",
    zh: "2026年9月16日实施说明",
  },
  "https://www.bea.gov/news/schedule": {
    en: "Release schedule: August 2026 PCE on 30 September",
    zh: "发布日程：8月 PCE 于 9月30日",
  },
  "https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-17092026-ap": {
    en: "Euro-area inflation 3.2% in August 2026",
    zh: "2026年8月欧元区通胀 3.2%",
  },
  "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260910~314e508016.en.html": {
    en: "Monetary policy decisions, 10 September 2026",
    zh: "2026年9月10日货币政策决定",
  },
  "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/august2026": {
    en: "UK consumer price inflation, August 2026",
    zh: "2026年8月英国居民消费价格",
  },
  "https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate": {
    en: "Bank Rate, latest decision",
    zh: "银行利率：最新决定",
  },
  "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/september-2026": {
    en: "Monetary policy summary, September 2026",
    zh: "2026年9月货币政策纪要",
  },
  "https://www.stat.go.jp/data/cpi/sokuhou/tsuki/index-z.html": {
    en: "Japan CPI, August 2026",
    zh: "2026年8月日本消费者物价指数",
  },
  "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260918b.pdf": {
    en: "Money-market guideline, 18 September 2026",
    zh: "2026年9月18日金融市场调节方针",
  },
  "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260918a.pdf": {
    en: "Complementary deposit facility rate",
    zh: "互补存款便利适用利率",
  },
  "https://www150.statcan.gc.ca/n1/daily-quotidien/260914/dq260914a-eng.htm": {
    en: "Consumer price index, August 2026",
    zh: "2026年8月消费者物价指数",
  },
  "https://www.bankofcanada.ca/2026/09/fad-press-release-2026-09-02/": {
    en: "Policy rate held at 2.25%, 2 September 2026",
    zh: "2026年9月2日政策利率维持 2.25%",
  },
  "https://www.bankofcanada.ca/rates/indicators/key-variables/inflation-control-target/": {
    en: "Inflation-control target",
    zh: "通胀控制目标",
  },
  "https://www.stats.gov.cn/sj/zxfbhjd/202609/t20260909_1965263.html": {
    en: "CPI up 0.8% year over year in August 2026",
    zh: "2026年8月居民消费价格同比上涨 0.8%",
  },
  "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125475/2026092408454713496/index.html": {
    en: "Open-market announcement [2026] No. 189",
    zh: "公开市场业务交易公告〔2026〕第189号",
  },
  "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125469/5699842/index.html": {
    en: "Open-market announcement [2025] No. 1",
    zh: "公开市场业务公告〔2025〕第1号",
  },
  "https://www.pbc.gov.cn/hanglingdao/128697/128734/128874/2025111717153324219/index.html": {
    en: "Press conference: the policy rate is the 7-day reverse repo rate",
    zh: "发布会实录：政策利率即7天期逆回购操作利率",
  },
  "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125440/3876551/2026092008384254324/index.html": {
    en: "Loan Prime Rate, 20 September 2026",
    zh: "2026年9月20日贷款市场报价利率",
  },
  "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026092416074632670/index.html": {
    en: "Monetary Policy Committee, third quarter 2026",
    zh: "货币政策委员会 2026年第三季度例会",
  },
  "https://www.gov.cn/yaowen/liebiao/202603/content_7060692.htm": {
    en: "Government work report excerpt",
    zh: "政府工作报告（摘登）",
  },
  "https://www.mospi.gov.in/uploads/latestReleases/latest_release_1789381904344_6c792dcf-8a9f-4fca-93d3-99d833bdb358_Press_Release_of_CPI_for_August_2026.pdf": {
    en: "CPI press release, August 2026",
    zh: "2026年8月消费者物价新闻稿",
  },
  "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63287": {
    en: "Monetary policy statement, 3–5 August 2026",
    zh: "2026年8月3–5日货币政策声明",
  },
  "https://www.rbi.org.in/Scripts/BS_ViewBulletin.aspx?Id=24174": {
    en: "Bulletin note on the inflation target",
    zh: "公报：通胀目标通知",
  },
  "https://www.mas.gov.sg/news/consumer-price-developments/2026/consumer-price-developments-in-august-2026": {
    en: "Consumer prices, August 2026",
    zh: "2026年8月消费价格",
  },
  "https://www.mas.gov.sg/news/monetary-policy-statements/2026/mas-monetary-policy-statement-27jul26": {
    en: "Monetary policy statement, 27 July 2026",
    zh: "2026年7月27日货币政策声明",
  },
  "https://www.mas.gov.sg/monetary-policy/past-monetary-policy-decisions": {
    en: "Past monetary policy decisions",
    zh: "历次货币政策决定",
  },
  "https://www.businesstimes.com.sg/singapore/mas-tightens-monetary-policy-very-slightly-july-defying-expectations-hold": {
    en: "Business Times, 27 July 2026",
    zh: "《商业时报》2026年7月27日",
  },
  "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/jul-2026": {
    en: "Consumer price index, July 2026",
    zh: "2026年7月消费者物价指数",
  },
  "https://www.rba.gov.au/media-releases/2026/mr-26-19.html": {
    en: "Monetary policy decision, 11 August 2026",
    zh: "2026年8月11日货币政策决定",
  },
  "https://www.rba.gov.au/cash-rate-target-overview.html": {
    en: "Cash rate target overview",
    zh: "现金利率目标说明",
  },
  "https://www.rba.gov.au/statistics/cash-rate/": {
    en: "Cash rate target history",
    zh: "现金利率目标历史",
  },
}

export function kindLabel(kind: SourceKind, locale: Locale) {
  return locale === "en" ? kindEn[kind] : sourceKindLabel[kind]
}

export function sourceTitle(source: Source, locale: Locale) {
  return linkText[source.url]?.[locale] ?? source.title
}

const bodyShort = {
  en: {
    fed: "Federal Open Market Committee",
    ecb: "Governing Council",
    boe: "Monetary Policy Committee",
    boj: "Policy Board",
    boc: "Governing Council",
    pboc: "People's Bank of China",
    rbi: "Monetary Policy Committee",
    mas: "Monetary Authority of Singapore",
    rba: "Monetary Policy Board",
  },
  zh: {
    fed: "联邦公开市场委员会",
    ecb: "管理委员会",
    boe: "货币政策委员会",
    boj: "政策委员会",
    boc: "理事会",
    pboc: "中国人民银行",
    rbi: "货币政策委员会",
    mas: "新加坡金融管理局",
    rba: "货币政策委员会",
  },
} as const

const extraReason: Record<string, { en: string; zh: string }> = {
  fed: {
    en: "Corridor around the funds target. Not the compared rate.",
    zh: "目标区间的走廊利率，不纳入对照。",
  },
  ecb: {
    en: "The other two key rates. The chart uses the deposit facility rate.",
    zh: "另外两项关键利率。对照柱是存款便利利率。",
  },
  boc: {
    en: "Top and bottom of the overnight corridor.",
    zh: "隔夜利率走廊的上下沿。",
  },
  rbi: {
    en: "Top and bottom of the policy corridor.",
    zh: "政策利率走廊的上下沿。",
  },
  pboc: {
    en: "Loan benchmarks. Not the open-market policy rate.",
    zh: "贷款报价利率，不是公开市场政策利率。",
  },
}

const targetHint: Record<string, { en: string; zh: string }> = {
  boc: { en: "Midpoint of 1–3%.", zh: "1%–3% 的中点。" },
  pboc: { en: "Expected rise, not a point target.", zh: "预期涨幅，不是点目标。" },
  rbi: { en: "Band 2–6% through March 2031.", zh: "容忍区间 2%–6%，至 2031 年 3 月。" },
  mas: {
    en: "The 2026 forecast of 1.5–2.5% is a projection.",
    zh: "2026 年预测 1.5%–2.5% 是预测，不是目标。",
  },
}

function personName(bank: Bank, locale: Locale) {
  if (bank.id === "boj") return locale === "zh" ? "植田和男" : "Kazuo Ueda"
  if (bank.id === "pboc") return locale === "zh" ? "潘功胜" : "Pan Gongsheng"
  return bank.head.name
}

export function chartName(bank: Bank, locale: Locale) {
  return locale === "en" ? chartLabel[bank.id] : bank.shortLabel
}

export function presentBank(bank: Bank, locale: Locale) {
  const en = enBanks[bank.id]
  const name = personName(bank, locale)
  const institution = locale === "zh" ? bank.nameZh : bank.nameEn
  const title = locale === "zh" ? bank.head.titleZh : bank.head.titleEn
  return {
    name,
    institution,
    title,
    photoAlt:
      locale === "zh"
        ? `${name}，${institution}${title}`
        : `${name}, ${title}, ${institution}`,
    policyName: locale === "zh" ? bank.policy.nameZh : en.policyName,
    policyDisplay: locale === "zh" ? bank.policy.display : en.policyDisplay,
    policyAsOf: locale === "zh" ? bank.policy.asOf : en.asOf,
    targetDisplay: locale === "zh" ? bank.inflationTarget.display : en.targetDisplay,
    targetHint: targetHint[bank.id]?.[locale] ?? "",
    latestGauge: locale === "zh" ? bank.inflationActual.gauge.split("；")[0] : en.gaugeShort,
    latestValue: bank.inflationActual.display,
    latestPeriod: locale === "zh" ? bank.inflationActual.period : en.period,
    gauge: locale === "zh" ? bank.inflationActual.gauge.split("；")[0] : en.gaugeShort,
    secondary: bank.policy.secondary.map((rate, index) => ({
      key: rate.nameEn,
      name: locale === "zh" ? rate.nameZh : (en.secondary[index] ?? rate.nameEn),
      display: rate.display,
    })),
    extraReason: extraReason[bank.id]?.[locale] ?? "",
    framework: locale === "zh" ? (bank.frameworkNote ?? "") : (en.framework ?? ""),
    bodyName: bodyShort[locale][bank.id as keyof (typeof bodyShort)["en"]],
    indicators: locale === "zh" ? bank.indicators.join("、") : en.indicators.join(", "),
    cycleLabel: locale === "zh" ? bank.cycle.label : en.cycleLabel,
    cycleSize: locale === "zh" ? bank.cycle.sizeLabel : en.sizeLabel,
    move: `${bank.cycle.date} · ${locale === "zh" ? bank.cycle.label : en.cycleLabel} · ${locale === "zh" ? bank.cycle.sizeLabel : en.sizeLabel}`,
  }
}

export function comparisonRows(locale: Locale) {
  return [...banks].sort((a, b) => {
    const av = a.policy.chartValue
    const bv = b.policy.chartValue
    if (av == null && bv == null) return 0
    if (av == null) return 1
    if (bv == null) return -1
    return bv - av
  }).map((bank) => {
    const view = presentBank(bank, locale)
    return {
      id: bank.id,
      bank: chartName(bank, locale),
      instrument: view.policyName,
      setting: view.policyDisplay,
      target: view.targetDisplay,
      latest: view.latestValue,
      gauge: view.gauge,
      move: `${view.cycleLabel} · ${view.cycleSize}`,
      date: bank.cycle.date,
    }
  })
}

