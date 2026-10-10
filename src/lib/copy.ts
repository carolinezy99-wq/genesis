import { banks, sourceKindLabel, type Bank, type CycleKind, type Source, type SourceKind } from "@/lib/banks"

export type Locale = "en" | "zh"

export const ui = {
  en: {
    kicker: "Monetary policy",
    title: "Global central bank policy",
    lede: "Nine central banks, updated from official releases through 3 October 2026. Germany, France, and Italy are covered by the ECB.",
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
    lede: "九家主要央行，依据官方发布更新至 2026-10-03。德、法、意由欧洲央行代表。",
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
    period: "August 2026, year over year",
    gauge: "PCE price index; core PCE 3.0%.",
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
    period: "September 2026, year over year, flash estimate released 2026-10-02",
    gauge: "Euro-area HICP flash estimate; core 2.5% (August final 3.2%)",
    gaugeShort: "HICP flash",
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
    period: "12 months to August 2026",
    gauge: "CPI; trimmed mean inflation 3.6%.",
    gaugeShort: "CPI",
    policyName: "Cash rate target",
    policyDisplay: "4.60%",
    asOf: "Decided 2026-09-29",
    secondary: [],
    cycleLabel: "Hike",
    sizeLabel: "+25 bp",
    detail: "The Board unanimously raised the cash rate target by 25 basis points to 4.60% as upside inflation risks materialised.",
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
  "https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-02102026-ap": {
    en: "Euro-area inflation 3.8% in September 2026 (flash estimate, released 2 October)",
    zh: "2026年9月欧元区通胀快报 3.8%（10月2日发布）",
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

export type NewsItem = { date: string; title: string; line: string; url: string; sourceLabel?: string }

const news: Record<string, { en: NewsItem[]; zh: NewsItem[] }> = {
  fed: {
    en: [
      {
        date: "2026-10-09",
        title: "Federal Reserve Board releases results of the 2025 Survey of Consumer Finances",
        line: "The survey provides the public and policymakers with detailed insights into the economic condition of American families.",
        url: "https://www.federalreserve.gov/newsevents/pressreleases/other20261009a.htm",
      },
      {
        date: "2026-10-07",
        title: "Minutes of the Federal Open Market Committee, September 15-16, 2026",
        line: "The Federal Reserve released the minutes of the FOMC meeting held on September 15–16, 2026.",
        url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261007a.htm",
      },
      {
        date: "2026-09-16",
        title: "Federal Reserve issues FOMC statement",
        line: "The Committee raised the target range for the federal funds rate by 1/4 percentage point, to 3-3/4 to 4 percent.",
        url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm",
      },
    ],
    zh: [],
  },
  ecb: {
    en: [
      {
        date: "2026-10-08",
        title: "Meeting of 9-10 September 2026",
        line: "Monetary policy account. Since the July meeting, euro area financial markets had continued to be driven by energy price developments.",
        url: "https://www.ecb.europa.eu/press/accounts/2026/html/ecb.mg261008~a10153d090.en.html",
      },
      {
        date: "2026-10-05",
        title: "Philip R. Lane: Diagnostic Challenges for ECB Monetary Policy",
        line: "Speech at the 2026 ECB Conference on Monetary Policy: bridging science and practice.",
        url: "https://www.ecb.europa.eu/press/key/date/2026/html/ecb.sp261005~1d8d998ef4.en.html",
      },
      {
        date: "2026-10-02",
        title: "Decisions taken by the Governing Council of the ECB (in addition to decisions setting interest rates)",
        line: "A record of Governing Council decisions other than interest-rate settings.",
        url: "https://www.ecb.europa.eu/press/govcdec/otherdec/2026/html/ecb.gc261002~54c6b5672b.en.html",
      },
    ],
    zh: [],
  },
  boe: {
    en: [
      {
        date: "2026-09-17",
        title: "Bank Rate maintained at 3.75% — September 2026",
        line: "Monetary Policy Summary and minutes of the September meeting.",
        url: "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/september-2026",
      },
      {
        date: "2026-09-17",
        title: "Transcript of the Governor's pooled broadcast interview given on 17 September 2026",
        line: "The interview followed publication of the Monetary Policy Summary and minutes.",
        url: "https://www.bankofengland.co.uk/news/2026/september/the-governor-interview-transcript-17-september-2026",
      },
      {
        date: "2026-09-17",
        title: "Exchange of letters between the Governor and the Chancellor regarding CPI inflation — September 2026",
        line: "The Governor and the Chancellor exchanged letters on CPI inflation.",
        url: "https://www.bankofengland.co.uk/letter/2026/cpi-inflation-september-2026",
      },
    ],
    zh: [],
  },
  boj: {
    en: [
      {
        date: "2026-10-08",
        title: "Regional Economic Report (Summary) (October 2026)",
        line: "All nine regions reported that their economies had been recovering moderately, picking up, or picking up moderately, although some weakness had been seen in part.",
        url: "https://www.boj.or.jp/en/research/brp/rer/rer261008.htm",
      },
      {
        date: "2026-10-01",
        title: "Summary of Opinions at the Monetary Policy Meeting on September 17 and 18, 2026",
        line: "Opinions of Policy Board members at the September monetary policy meeting.",
        url: "https://www.boj.or.jp/en/mopo/mpmsche_minu/opinion_2026/opi260918.pdf",
      },
      {
        date: "2026-10-01",
        title: "Tankan (September): Summary and Outline",
        line: "The September Tankan summary and outline.",
        url: "https://www.boj.or.jp/en/statistics/tk/tankan09a.htm",
      },
    ],
    zh: [],
  },
  boc: {
    en: [
      {
        date: "2026-10-08",
        title: "Demographic changes are reshaping the Canadian economy",
        line: "Canada’s population is aging and fewer immigrants are arriving. The workforce is shrinking, which changes what people produce and consume, and matters for monetary policy.",
        url: "https://www.bankofcanada.ca/2026/10/demographic-changes-are-reshaping-the-canadian-economy/",
      },
      {
        date: "2026-10-01",
        title: "Canada’s housing affordability dilemma",
        line: "Senior Deputy Governor Carolyn Rogers discusses how housing affordability became such a challenge, and why there are no easy solutions.",
        url: "https://www.bankofcanada.ca/2026/10/canadas-housing-affordability-dilemma/",
      },
      {
        date: "2026-09-29",
        title: "Repo markets and monetary policy implementation",
        line: "Deputy Governor Toni Gravelle discusses resilience in repurchase-agreement markets and how the Bank’s implementation framework has evolved.",
        url: "https://www.bankofcanada.ca/2026/09/repo-markets-monetary-policy-implementation/",
      },
    ],
    zh: [],
  },
  pboc: {
    en: [
      {
        date: "2026-10-09",
        title: "Governor Pan Gongsheng meets the president and chief operating officer of Goldman Sachs",
        line: "They discussed the global economic and financial situation and China’s macroeconomic policy.",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026100918390137001/index.html",
        sourceLabel: "Official release in Chinese · translated summary",
      },
      {
        date: "2026-10-08",
        title: "The People’s Bank of China on its renminbi exchange-rate stance",
        line: "China runs a managed float based on market supply and demand, with reference to a basket of currencies, and lets the market play the decisive role in the exchange rate.",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026100816231113295/index.html",
        sourceLabel: "Official release in Chinese · translated summary",
      },
      {
        date: "2026-09-29",
        title: "The People’s Bank of China adjusts several monetary-policy tools",
        line: "The one-year pledged supplementary lending rate was cut by 0.25 percentage points, to 1.5%, and the eligible uses of that facility were widened.",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026092917474922559/index.html",
        sourceLabel: "Official release in Chinese · translated summary",
      },
    ],
    zh: [
      {
        date: "2026-10-09",
        title: "中国人民银行行长潘功胜会见高盛集团总裁兼首席运营官温泽恩",
        line: "双方围绕全球经济金融形势、中国宏观经济政策等议题进行了交流。",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026100918390137001/index.html",
      },
      {
        date: "2026-10-08",
        title: "中国人民银行关于人民币汇率的政策立场",
        line: "中国实施以市场供求为基础、参考一篮子货币进行调节、有管理的浮动汇率制度，坚持让市场在汇率形成中发挥决定性作用。",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026100816231113295/index.html",
      },
      {
        date: "2026-09-29",
        title: "中国人民银行调整完善若干货币政策工具",
        line: "一年期抵押补充贷款利率从 1.75% 下调 0.25 个百分点至 1.5%，并扩大抵押补充贷款支持领域。",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026092917474922559/index.html",
      },
    ],
  },
  rbi: {
    en: [
      {
        date: "2026-10-10",
        title: "RBI announces a special window for public-sector oil marketing companies to meet dollar requirements",
        line: "From 12 October the Reserve Bank will sell US dollars to three public-sector oil companies through designated banks.",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63784",
      },
      {
        date: "2026-10-10",
        title: "RBI announces regulatory measures for the foreign exchange market",
        line: "To keep the market orderly, authorised dealers may not let users rebook cancelled foreign-exchange derivative contracts.",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63783",
      },
      {
        date: "2026-10-09",
        title: "RBI announces an OMO sale of Government of India securities",
        line: "On a review of liquidity, the Reserve Bank will sell ₹25,000 crore of government securities on 13 October.",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63779",
      },
    ],
    zh: [],
  },
  mas: {
    en: [
      {
        date: "2026-10-09",
        title: "Building Trusted Foundations for Digital Finance",
        line: "Keynote by Managing Director Chia Der Jiun at the INSEAD Digital Finance and Agentic AI Summit.",
        url: "https://www.mas.gov.sg/news/speeches/2026/building-trusted-foundations-for-digital-finance",
      },
      {
        date: "2026-10-07",
        title: "Oral reply on the impact of sustained increases in US Treasury yields",
        line: "Interest rates in Singapore are market-determined and generally track rates in the major economies; they have not risen as much as elsewhere.",
        url: "https://www.mas.gov.sg/news/parliamentary-replies/2026/oral-reply-to-parliamentary-question-on-the-impact-of-sustained-increases-in-us-treasury-yields",
      },
      {
        date: "2026-10-07",
        title: "MAS sets out supervisory expectations on responsible AI adoption",
        line: "MAS issued Guidelines on AI Risk Management for financial institutions. The guidelines take effect on 7 October 2027.",
        url: "https://www.mas.gov.sg/news/media-releases/2026/mas-sets-out-supervisory-expectations-on-responsible-ai-adoption-by-financial-institutions",
      },
    ],
    zh: [],
  },
  rba: {
    en: [
      {
        date: "2026-10-01",
        title: "Release of the Financial Stability Review — October 2026",
        line: "The Reserve Bank released its October 2026 Financial Stability Review.",
        url: "https://www.rba.gov.au/media-releases/2026/mr-26-28.html",
      },
      {
        date: "2026-09-29",
        title: "Statement by the Monetary Policy Board: Monetary Policy Decision",
        line: "The Board increased the cash rate target by 25 basis points to 4.60 per cent. Inflation remains elevated.",
        url: "https://www.rba.gov.au/media-releases/2026/mr-26-27.html",
      },
      {
        date: "2026-09-22",
        title: "A wage-price spiral: what are the chances?",
        line: "Speech by Iain Ross, Monetary Policy Board member, at the University of Melbourne.",
        url: "https://www.rba.gov.au/speeches/2026/sp-mpb-2026-09-22.html",
      },
    ],
    zh: [],
  },
}

const newsMissing: Record<string, { en: string; zh: string }> = {
  pboc: {
    en: "The English press-release page opened, but it did not include article headlines on 2026-10-03.",
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
    en: "August 2026 PCE was released on 2026-09-30; headline inflation was 3.4% and core PCE was 3.0% year over year.",
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
    en: "August 2026 CPI was released on 2026-09-30; headline inflation rose to 4.0% while trimmed mean inflation was 3.6%.",
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
        ? "The official news list could not be loaded on 2026-10-03."
        : "2026-10-03 未能打开该行的新闻列表。"),
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
