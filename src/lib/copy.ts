import { sourceKindLabel, type Bank, type Source, type SourceKind } from "@/lib/banks"

export type Locale = "en" | "zh"

export const ui = {
  en: {
    kicker: "Monetary policy",
    title: "Global central bank policy",
    lede: "Policy stance for nine central banks. Figures come from each institution or its statistics agency. Where an official page did not state a fact, a second authoritative source is linked and labeled. Read on 2026-09-26. Germany, France, and Italy are not shown separately; the ECB sets the euro-area rates.",
    asOf: "Data as of",
    hikes: "Hikes",
    holds: "Holds",
    tightens: "FX-band tightening",
    cuts: "Cuts",
    chartTitle: "Policy rates",
    chartAxisHint: "Vertical axis: percent. The rate is printed on each bar.",
    chartFoot:
      "Bars run from high to low. Rust is the highest rate in the chart (Reserve Bank of India repo rate, 5.25%). The US bar height is the midpoint of the 3.75–4.00% federal funds target range; the range is still printed on the bar. The China bar is the policy rate, the 7-day reverse repo operation rate at 1.40% (set on 2025-05-08; the 2026-09-24 operation was unchanged). The 1-year LPR at 3.0% and the 5-year-plus LPR at 3.5% stay on the card. Singapore has no policy interest rate and is not on the chart. Its instrument is the S$NEER band. On 27 July 2026 MAS raised the slope of appreciation very slightly. Neither the official statement nor the press report gives a basis-point size.",
    chartCaption:
      "Policy rates for eight central banks that use an interest rate, in percent. Singapore is excluded. The US bar is the midpoint of the target range, with the range labeled on the bar. The China bar is the 7-day reverse repo operation rate.",
    yAxis: "Rate (%)",
    inflationTarget: "Inflation target",
    decisionBody: "Who sets the stance",
    indicators: "Indicators the bank emphasizes",
    targetNote: "About the target",
    latestDecision: "Latest decision",
    portrait: "Portrait",
    readOn: "read on",
    latest: "Latest",
    official: "Official",
  },
  zh: {
    kicker: "Monetary policy",
    title: "全球央行货币政策",
    lede: "九家央行的政策立场对照。数字来自各机构官网或统计机构；官网打不开或没有写明的，用另一家权威来源印证，并标明来源类型。阅读日为 2026-09-26。德国、法国、意大利由欧洲央行代表，不单列政策利率。",
    asOf: "数据截至",
    hikes: "加息",
    holds: "维持",
    tightens: "汇率带收紧",
    cuts: "降息",
    chartTitle: "政策利率对照",
    chartAxisHint: "纵轴单位：百分比。柱顶为利率。",
    chartFoot:
      "柱从高到低排列。深红色是图中最高的政策利率（印度储备银行回购利率 5.25%）。美国柱高是联邦基金利率目标区间 3.75%–4.00% 的中点，柱顶仍标区间。中国柱是政策利率，即 7天期逆回购操作利率 1.40%（2025-05-08 起，2026-09-24 操作未变）；1年期 LPR 3.0% 与 5年期以上 LPR 3.5% 写在卡片上，不并进这根柱。新加坡不设政策利率，不在图中；其工具是 S$NEER 政策带，2026年7月27日非常轻微上调升值斜率，官方和媒体报道都没有公布基点。",
    chartCaption:
      "八家以利率为工具的央行政策利率比较，纵轴单位为百分比。新加坡未列入。美国柱高为目标区间中点，柱顶标注区间。中国柱为7天期逆回购操作利率。",
    yAxis: "利率（%）",
    inflationTarget: "通胀目标",
    decisionBody: "决策机构",
    indicators: "关注的价格与政策指标",
    targetNote: "目标说明",
    latestDecision: "最近一次决定",
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

const titleEnByUrl: Record<string, string> = {
  "https://www.stat.go.jp/data/cpi/sokuhou/tsuki/index-z.html":
    "CPI, Japan, August 2026 (2025 base)",
  "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125475/2026092408454713496/index.html":
    "Open market announcement [2026] No. 189",
  "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125469/5699842/index.html":
    "Open market announcement [2025] No. 1 (1.50% to 1.40%)",
  "https://www.pbc.gov.cn/hanglingdao/128697/128734/128874/2025111717153324219/index.html":
    "Press conference transcript: the policy rate is the 7-day reverse repo rate",
  "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125440/3876551/2026092008384254324/index.html":
    "Loan Prime Rate announcement, 20 September 2026",
  "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026092416074632670/index.html":
    "Monetary Policy Committee, third quarter 2026",
  "https://www.gov.cn/yaowen/liebiao/202603/content_7060692.htm":
    "Government work report excerpt",
  "https://www.pbc.gov.cn/hanglingdao/128697/128734/index.html": "Leadership: Pan Gongsheng",
}

export function kindLabel(kind: SourceKind, locale: Locale) {
  return locale === "en" ? kindEn[kind] : sourceKindLabel[kind]
}

export function sourceTitle(source: Source, locale: Locale) {
  if (locale === "zh") return source.title
  return titleEnByUrl[source.url] ?? source.title
}

export function chartName(bank: Bank, locale: Locale) {
  return locale === "en" ? chartLabel[bank.id] : bank.shortLabel
}

export function presentBank(bank: Bank, locale: Locale) {
  if (locale === "zh") {
    return {
      institution: bank.nameZh,
      institutionAlt: bank.nameEn,
      title: bank.head.titleZh,
      titleAlt: bank.head.titleEn,
      photoAlt: `${bank.head.name}，${bank.nameZh}${bank.head.titleZh}官方肖像`,
      policyName: bank.policy.nameZh,
      policyNameAlt: bank.policy.nameEn,
      policyDisplay: bank.policy.display,
      policyAsOf: bank.policy.asOf,
      targetDisplay: bank.inflationTarget.display,
      latestGauge: bank.inflationActual.gauge.split("；")[0],
      latestValue: bank.inflationActual.display,
      latestPeriod: bank.inflationActual.period,
      secondary: bank.policy.secondary.map((rate) => ({
        key: rate.nameEn,
        name: rate.nameZh,
        alt: rate.nameEn,
        display: rate.display,
      })),
      framework: bank.frameworkNote,
      bodyName: bank.decisionBody.nameZh,
      bodyAlt: bank.decisionBody.nameEn,
      bodyNote: bank.decisionBody.note,
      indicators: bank.indicators.join("、"),
      targetNote: bank.inflationTarget.note,
      cycleLabel: bank.cycle.label,
      cycleSize: bank.cycle.sizeLabel,
      cycleDetail: bank.cycle.detail,
    }
  }

  const en = enBanks[bank.id]
  return {
    institution: bank.nameEn,
    institutionAlt: bank.nameZh,
    title: bank.head.titleEn,
    titleAlt: bank.head.titleZh,
    photoAlt: `Official portrait of ${bank.head.name}, ${bank.head.titleEn} of the ${bank.nameEn}`,
    policyName: en.policyName,
    policyNameAlt: bank.policy.nameZh,
    policyDisplay: en.policyDisplay,
    policyAsOf: en.asOf,
    targetDisplay: en.targetDisplay,
    latestGauge: en.gaugeShort,
    latestValue: bank.inflationActual.display,
    latestPeriod: en.period,
    secondary: bank.policy.secondary.map((rate, index) => ({
      key: rate.nameEn,
      name: en.secondary[index] ?? rate.nameEn,
      alt: rate.nameZh,
      display: rate.display,
    })),
    framework: en.framework,
    bodyName: en.bodyName,
    bodyAlt: bank.decisionBody.nameZh,
    bodyNote: en.bodyNote,
    indicators: en.indicators.join("; "),
    targetNote: en.targetNote,
    cycleLabel: en.cycleLabel,
    cycleSize: en.sizeLabel,
    cycleDetail: en.detail,
  }
}

