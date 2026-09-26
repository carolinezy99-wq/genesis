import { banks, sourceKindLabel, type Bank, type CycleKind, type Source, type SourceKind } from "@/lib/banks"

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
      "High to low. The US bar is the midpoint of 3.75–4.00%. China is the 7-day reverse repo, not the LPR. Singapore is not a policy rate, so it is only in the table.",
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
    overview: "Overview",
    stanceTitle: "Policy stance",
    stanceNote:
      "Stance is the latest decision’s direction versus the previous setting, not the rate level. Singapore is the latest S$NEER slope. China is the latest open-market operation.",
    tightening: "Tightening",
    holding: "Holding",
    easing: "Easing",
    unclear: "Unclear",
    none: "None",
    sameFields: "Open a country tab for the full list.",
    note: "Note",
    sources: "Sources",
    latestNews: "Latest news",
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
      "从高到低。美国柱高是 3.75%–4.00% 的中点。中国是 7 天期逆回购，不是贷款报价利率。新加坡不是政策利率，只出现在表里。",
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
    overview: "全景对比",
    stanceTitle: "政策立场",
    stanceNote:
      "立场是最近一次决定相对上次设定的方向，不是利率高低。新加坡看最近一次新元名义有效汇率斜率。中国看最近一次公开市场操作。",
    tightening: "收紧",
    holding: "维持",
    easing: "放松",
    unclear: "尚不明确",
    none: "无",
    sameFields: "点国家栏目可看全部指标。",
    note: "说明",
    sources: "来源",
    latestNews: "最新新闻",
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

export const bankTabLabel: Record<string, { en: string; zh: string }> = {
  fed: { en: "United States (Fed)", zh: "美国" },
  ecb: { en: "Euro area (ECB)", zh: "欧元区" },
  boe: { en: "United Kingdom (BoE)", zh: "英国" },
  boj: { en: "Japan (BoJ)", zh: "日本" },
  boc: { en: "Canada (BoC)", zh: "加拿大" },
  pboc: { en: "China (PBoC)", zh: "中国" },
  rbi: { en: "India (RBI)", zh: "印度" },
  mas: { en: "Singapore (MAS)", zh: "新加坡" },
  rba: { en: "Australia (RBA)", zh: "澳大利亚" },
}

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
    bodyName: "People's Bank of China",
    bodyNote:
      "The Monetary Policy Committee is consultative and does not vote the policy rate. The Monetary Policy Department drafts and organises implementation.",
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
    bodyName: "Monetary and Investment Policy Meeting",
    bodyNote:
      "A committee of the MAS Board. The Economic Policy Group prepares the review. The Monetary and Domestic Markets Management Department implements it. MAS does not set a policy interest rate.",
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
    zh: "2026年9月16日货币政策声明",
  },
  "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a1.htm": {
    en: "Implementation note, 16 September 2026",
    zh: "2026年9月16日实施说明",
  },
  "https://www.bea.gov/news/schedule": {
    en: "Release schedule: August 2026 PCE on 30 September",
    zh: "发布日程：8月个人消费支出于 9月30日",
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
  "https://www.mas.gov.sg/monetary-policy/singapores-monetary-policy-framework/faqs/section-4": {
    en: "Monetary policy framework FAQ, section 4",
    zh: "货币政策框架问答第四节",
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
  "https://www.pbc.gov.cn/zhengcehuobisi/125207/index.html": {
    en: "Monetary Policy Department",
    zh: "货币政策司",
  },
  "https://www.rba.gov.au/about-rba/our-role.html": {
    en: "Our role",
    zh: "职能",
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

export type NewsItem = { date: string; title: string; line: string; url: string }

const news: Record<string, { en: NewsItem[]; zh: NewsItem[] }> = {
  fed: {
    en: [
      {
        date: "2026-09-25",
        title: "Federal Reserve Board announces approval of application by Peoples Bancorp Inc.",
        line: "",
        url: "https://www.federalreserve.gov/newsevents/pressreleases/orders20260925a.htm",
      },
      {
        date: "2026-09-24",
        title: "Federal Reserve Board requests public comment on two proposals related to establishing a regulatory framework for Board-supervised payment stablecoin issuers under the GENIUS Act",
        line: "",
        url: "https://www.federalreserve.gov/newsevents/pressreleases/bcreg20260924a.htm",
      },
      {
        date: "2026-09-24",
        title: "Federal Reserve Board issues enforcement action with former employee of Sandy Spring Bank",
        line: "",
        url: "https://www.federalreserve.gov/newsevents/pressreleases/enforcement20260924a.htm",
      },
    ],
    zh: [],
  },
  ecb: {
    en: [
      {
        date: "2026-09-24",
        title: "ECB Executive Board member Isabel Schnabel to resign to take senior role at IMF",
        line: "Isabel Schnabel has informed President Christine Lagarde that she will step down from her position on 3 January 2027.",
        url: "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.pr260924~bea1dd9824.en.html",
      },
      {
        date: "2026-09-24",
        title: "Philip R. Lane: The outlook for the euro area economy",
        line: "",
        url: "https://www.ecb.europa.eu/press/key/date/2026/html/ecb.sp260924~e0eceef02c.en.pdf",
      },
      {
        date: "2026-09-23",
        title: "Almost ten million people took part in ECB survey on new euro banknotes",
        line: "9.96 million people shared their views on the future design of euro banknotes in the ECB’s public survey.",
        url: "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.pr260923~6ebddaf01e.en.html",
      },
    ],
    zh: [],
  },
  boe: {
    en: [
      {
        date: "2026-09-25",
        title: "Minutes of the Market Participants Group meeting – 24 September 2026",
        line: "",
        url: "https://www.bankofengland.co.uk/minutes/2026/september/market-participants-group-meeting-25-september-2026",
      },
      {
        date: "2026-09-21",
        title: "Bank of England announces new office space in Leeds",
        line: "The Bank of England has secured a new long-term premises in Leeds.",
        url: "https://www.bankofengland.co.uk/news/2026/september/bank-of-england-announces-new-office-space-in-leeds",
      },
      {
        date: "2026-09-17",
        title: "Transcript of the Governor's pooled broadcast interview given on 17 September 2026",
        line: "",
        url: "https://www.bankofengland.co.uk/news/2026/september/the-governor-interview-transcript-17-september-2026",
      },
    ],
    zh: [],
  },
  boj: {
    en: [
      {
        date: "2026-09-25",
        title: "Conduct of Funds-Supplying Operations against Pooled Collateral",
        line: "",
        url: "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/mpr260925a.pdf",
      },
      {
        date: "2026-09-25",
        title: "The Expansion and Diversification of Private Credit Funds",
        line: "The private credit fund market has been expanding, particularly in the United States.",
        url: "https://www.boj.or.jp/en/research/wps_rev/rev_2026/rev26e13.htm",
      },
      {
        date: "2026-09-25",
        title: "Granular Insights into Depositor Dynamics and Deposit Spreads in Japanese G-SIBs' Foreign Currency Deposits",
        line: "",
        url: "https://www.boj.or.jp/en/research/wps_rev/rev_2026/rev26e12.htm",
      },
    ],
    zh: [],
  },
  boc: {
    en: [
      {
        date: "2026-09-24",
        title: "Global trade is changing how the Canadian economy works",
        line: "International trade benefits the Canadian economy, but changes to our trade relationships are now forcing businesses to adjust to a new reality.",
        url: "https://www.bankofcanada.ca/2026/09/global-trade-is-changing-how-the-canadian-economy-works/",
      },
      {
        date: "2026-09-18",
        title: "The AI transformation",
        line: "AI is reshaping the economy, but its impact on what we produce and the jobs we do remains uncertain.",
        url: "https://www.bankofcanada.ca/2026/09/the-ai-transformation/",
      },
      {
        date: "2026-09-10",
        title: "Bank of Canada Board launches process to fill external Deputy Governor position",
        line: "",
        url: "https://www.bankofcanada.ca/2026/09/bank-canada-board-launches-process-fill-external-deputy-governor-position/",
      },
    ],
    zh: [],
  },
  pboc: {
    en: [],
    zh: [
      {
        date: "2026-09-24",
        title: "中国人民银行货币政策委员会召开2026年第三季度例会",
        line: "货币政策保持适度宽松。",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026092416074632670/index.html",
      },
      {
        date: "2026-09-21",
        title: "中国人民银行行长潘功胜会见香港特别行政区政府财政司司长陈茂波一行",
        line: "双方就当前宏观经济与金融形势、内地与香港金融市场互联互通和香港离岸人民币市场建设交换了意见。",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026092118225220226/index.html",
      },
      {
        date: "2026-09-17",
        title: "中国人民银行副行长宣昌能会见贝宝全球执行副总裁艾伦",
        line: "9月15日，宣昌能会见贝宝全球执行副总裁艾伦，围绕全球金融市场、支付体系以及贝宝在华展业交流。",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026091717202687422/index.html",
      },
    ],
  },
  rbi: {
    en: [
      {
        date: "2026-09-25",
        title: "RBI Bulletin – September 2026",
        line: "",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63674",
      },
      {
        date: "2026-09-25",
        title: "RBI to conduct Overnight Variable Rate Reverse Repo auction under LAF on September 28, 2026",
        line: "",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63673",
      },
      {
        date: "2026-09-25",
        title: "Auction of State Government Securities",
        line: "",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63672",
      },
    ],
    zh: [],
  },
  mas: {
    en: [
      {
        date: "2026-09-24",
        title: "Keynote Address by Mr Gan Kim Yong, Deputy Prime Minister and Minister for Trade and Industry, and Chairman of the Monetary Authority of Singapore, at the Institute of Banking and Finance (IBF) Distinction Evening on 24 September 2026",
        line: "He spoke about preparing Singapore’s financial sector workforce for AI through skills development and stronger tripartite collaboration.",
        url: "https://www.mas.gov.sg/news/speeches/2026/keynote-address-by-dpm-gan-kim-yong-at-the-ibf-distinction-evening-on-24-september-2026",
      },
      {
        date: "2026-09-23",
        title: "Consumer Price Developments in August 2026",
        line: "This August 2026 report updates the latest consumer price developments in Singapore, prepared by MAS and the Ministry of Trade and Industry.",
        url: "https://www.mas.gov.sg/news/consumer-price-developments/2026/consumer-price-developments-in-august-2026",
      },
      {
        date: "2026-09-18",
        title: "MAS and the People’s Bank of China strengthen cooperation in transition and adaptation finance at the 4th Singapore-China Green Finance Taskforce meeting",
        line: "The taskforce met in Nanning on 17 September 2026.",
        url: "https://www.mas.gov.sg/news/media-releases/2026/mas-and-pbc-strengthen-cooperation-at-the-4th-singapore-china-green-finance-taskforce-meeting",
      },
    ],
    zh: [],
  },
  rba: {
    en: [
      {
        date: "2026-09-23",
        title: "Assessment of ASX Clearing and Settlement Facilities – September 2026",
        line: "The Reserve Bank of Australia today released the 2026 Assessment of the ASX Clearing and Settlement Facilities.",
        url: "https://www.rba.gov.au/media-releases/2026/mr-26-26.html",
      },
      {
        date: "2026-09-03",
        title: "Designation of Linfox Armaguard Pty Ltd under the Cash Distribution Framework Act 2026",
        line: "",
        url: "https://www.rba.gov.au/media-releases/2026/mr-26-25.html",
      },
      {
        date: "2026-09-03",
        title: "RITS Consultation and Retail CBDC Update",
        line: "",
        url: "https://www.rba.gov.au/media-releases/2026/mr-26-24.html",
      },
    ],
    zh: [],
  },
}

const newsMissing: Record<string, { en: string; zh: string }> = {
  pboc: {
    en: "The English press-release page opened, but it did not include article headlines on 2026-09-26.",
    zh: "",
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
    pboc: "Monetary Policy Committee",
    rbi: "Monetary Policy Committee",
    mas: "Monetary and Investment Policy Meeting",
    rba: "Monetary Policy Board",
  },
  zh: {
    fed: "Federal Open Market Committee",
    ecb: "Governing Council",
    boe: "Monetary Policy Committee",
    boj: "Policy Board",
    boc: "Governing Council",
    pboc: "货币政策委员会",
    rbi: "Monetary Policy Committee",
    mas: "Monetary and Investment Policy Meeting",
    rba: "Monetary Policy Board",
  },
} as const

const bodyNote: Record<string, { en: string; zh: string }> = {
  fed: {
    en: "August 2026 PCE is scheduled for 2026-09-30, so the reading shown is still July.",
    zh: "2026年8月个人消费支出预定9月30日发布，此处仍为7月。",
  },
  pboc: {
    en: "The committee is consultative: its quarterly meeting recommends a stance and does not vote the policy rate.",
    zh: "该委员会是咨询机构，例会提出建议，不表决政策利率。",
  },
  mas: {
    en: "A committee of the Board. The Economic Policy Group prepares the review; the Monetary and Domestic Markets Management Department implements it. The statement does not give a basis-point size.",
    zh: "董事会下的委员会。Economic Policy Group 拟订审议，Monetary and Domestic Markets Management Department 负责实施。声明没有公布基点。",
  },
  rba: {
    en: "August 2026 CPI is scheduled for 2026-09-30, so the reading shown is still the twelve months to July.",
    zh: "2026年8月消费者物价指数预定9月30日发布，此处仍为截至7月的12个月。",
  },
}

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

export type Stance = "tightening" | "holding" | "easing" | "unclear"

export function decisionText(stanceLabel: string, cycleLabel: string, size: string) {
  const stance = stanceLabel.toLowerCase()
  const cycle = cycleLabel.toLowerCase()
  const same = stance === cycle || stance.startsWith(cycle) || cycle.startsWith(stance)
  return same ? `${stanceLabel} · ${size}` : `${stanceLabel} · ${cycleLabel} · ${size}`
}

export function stanceOf(kind: CycleKind): Stance {
  if (kind === "hike" || kind === "tighten") return "tightening"
  if (kind === "hold") return "holding"
  if (kind === "cut") return "easing"
  return "unclear"
}

export function stanceBuckets(locale: Locale) {
  const keys: Stance[] = ["tightening", "holding", "easing"]
  const unclear = banks.filter((bank) => stanceOf(bank.cycle.kind) === "unclear")
  const shown = unclear.length > 0 ? ([...keys, "unclear"] as Stance[]) : keys
  return shown.map((key) => ({
    key,
    label: ui[locale][key],
    banks: banks
      .filter((bank) => stanceOf(bank.cycle.kind) === key)
      .map((bank) => ({
        id: bank.id,
        name: bankTabLabel[bank.id][locale],
        basis: `${bank.cycle.date} · ${locale === "zh" ? bank.cycle.sizeLabel : enBanks[bank.id].sizeLabel}`,
      })),
  }))
}

function bankNews(id: string, locale: Locale): { items: NewsItem[]; missing: string } {
  const own = news[id]?.[locale] ?? []
  if (own.length > 0) return { items: own, missing: "" }
  if (locale === "zh") {
    const english = news[id]?.en ?? []
    if (english.length > 0) return { items: english, missing: "" }
  }
  return {
    items: [],
    missing:
      newsMissing[id]?.[locale] ||
      (locale === "en"
        ? "The official news list could not be loaded on 2026-09-26."
        : "2026-09-26 未能打开该行的新闻列表。"),
  }
}

export function presentBank(bank: Bank, locale: Locale) {
  const en = enBanks[bank.id]
  const headlines = bankNews(bank.id, locale)
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
    bodyNote: bodyNote[bank.id]?.[locale] ?? "",
    news: headlines.items,
    newsMissing: headlines.missing,
    indicators: locale === "zh" ? bank.indicators.join("、") : en.indicators.join(", "),
    cycleLabel: locale === "zh" ? bank.cycle.label : en.cycleLabel,
    cycleSize: locale === "zh" ? bank.cycle.sizeLabel : en.sizeLabel,
    stance: stanceOf(bank.cycle.kind),
    stanceLabel: ui[locale][stanceOf(bank.cycle.kind)],
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
      move: decisionText(view.stanceLabel, view.cycleLabel, view.cycleSize),
      date: bank.cycle.date,
    }
  })
}

