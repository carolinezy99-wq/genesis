export const DATA_AS_OF = "2026-09-26"

export type CycleKind = "hike" | "hold" | "cut" | "tighten"

export type Source = {
  institution: string
  title: string
  url: string
  readOn: string
}

export type Bank = {
  id: string
  nameZh: string
  nameEn: string
  shortLabel: string
  head: {
    name: string
    titleZh: string
    titleEn: string
    photo: string
    photoCredit: string
    photoPageTitle: string
    photoPageUrl: string
  }
  decisionBody: {
    nameZh: string
    nameEn: string
    note: string
  }
  indicators: string[]
  inflationTarget: {
    display: string
    note: string
  }
  inflationActual: {
    display: string
    period: string
    gauge: string
    source: Source
  }
  policy: {
    nameZh: string
    nameEn: string
    display: string
    chartValue: number | null
    barLabel: string
    includeInChart: boolean
    asOf: string
    secondary: { nameZh: string; nameEn: string; display: string }[]
  }
  cycle: {
    kind: CycleKind
    label: string
    date: string
    sizeLabel: string
    detail: string
  }
  frameworkNote?: string
  primarySource: Source
  sources: Source[]
}

export const banks: Bank[] = [
  {
    id: "fed",
    nameZh: "美国联邦储备系统",
    nameEn: "Federal Reserve",
    shortLabel: "美国",
    head: {
      name: "Kevin Warsh",
      titleZh: "主席",
      titleEn: "Chair",
      photo: "/portraits/fed-kevin-warsh.png",
      photoCredit: "Board of Governors of the Federal Reserve System",
      photoPageTitle: "Kevin Warsh, Chairman",
      photoPageUrl: "https://www.federalreserve.gov/aboutthefed/bios/board/warsh.htm",
    },
    decisionBody: {
      nameZh: "联邦公开市场委员会",
      nameEn: "Federal Open Market Committee (FOMC)",
      note: "FOMC 决定联邦基金利率目标区间。2026年9月16日声明以 12–0 通过。",
    },
    indicators: ["个人消费支出物价指数（PCE）", "核心 PCE（不含食品与能源）", "失业率与就业"],
    inflationTarget: {
      display: "2%",
      note: "FOMC 声明中的 2 percent goal。9月16日主席记者会与经济预测以 PCE 物价指数表述。",
    },
    inflationActual: {
      display: "3.7%",
      period: "2026年7月，同比",
      gauge: "PCE 物价指数；核心 PCE 3.3%",
      source: {
        institution: "U.S. Bureau of Economic Analysis",
        title: "Personal Income and Outlays, July 2026",
        url: "https://www.bea.gov/news/2026/personal-income-and-outlays-july-2026",
        readOn: DATA_AS_OF,
      },
    },
    policy: {
      nameZh: "联邦基金利率目标区间",
      nameEn: "Federal funds rate target range",
      display: "3.75–4.00%",
      chartValue: 3.875,
      barLabel: "3.75–4.00",
      includeInChart: true,
      asOf: "2026-09-16 决定，2026-09-17 起执行",
      secondary: [
        { nameZh: "隔夜逆回购利率", nameEn: "ON RRP offering rate", display: "3.75%" },
        { nameZh: "隔夜回购利率", nameEn: "Standing repo rate", display: "4.00%" },
      ],
    },
    cycle: {
      kind: "hike",
      label: "加息",
      date: "2026-09-16",
      sizeLabel: "+25 bp",
      detail: "目标区间上调 1/4 个百分点，至 3.75%–4%。为 12–0 投票。",
    },
    primarySource: {
      institution: "Federal Reserve",
      title: "Federal Reserve issues FOMC statement",
      url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm",
      readOn: DATA_AS_OF,
    },
    sources: [
      {
        institution: "Federal Reserve",
        title: "Transcript of Chairman Warsh’s Press Conference, September 16, 2026",
        url: "https://www.federalreserve.gov/mediacenter/files/FOMCpresconf20260916.pdf",
        readOn: DATA_AS_OF,
      },
    ],
  },
  {
    id: "ecb",
    nameZh: "欧洲中央银行",
    nameEn: "European Central Bank",
    shortLabel: "欧元区",
    head: {
      name: "Christine Lagarde",
      titleZh: "行长",
      titleEn: "President",
      photo: "/portraits/ecb-christine-lagarde.jpg",
      photoCredit: "European Central Bank",
      photoPageTitle: "Christine Lagarde",
      photoPageUrl: "https://www.ecb.europa.eu/ecb/decisions/html/cvlagarde.en.html",
    },
    decisionBody: {
      nameZh: "管理委员会",
      nameEn: "Governing Council",
      note: "德国、法国、意大利没有单独的政策利率，由欧洲央行管理委员会代表欧元区决策。",
    },
    indicators: ["总体通胀（欧元区 HICP）", "不含能源与食品的通胀"],
    inflationTarget: {
      display: "2%",
      note: "中期对称目标。9月10日决定写明 inflation stabilises at its 2% target in the medium term。",
    },
    inflationActual: {
      display: "3.2%",
      period: "2026年8月，同比",
      gauge: "欧元区 HICP（终值；快报曾为 3.3%）",
      source: {
        institution: "Eurostat",
        title: "Annual inflation up to 3.2% in the euro area",
        url: "https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-17092026-ap",
        readOn: DATA_AS_OF,
      },
    },
    policy: {
      nameZh: "存款便利利率",
      nameEn: "Deposit facility rate",
      display: "2.50%",
      chartValue: 2.5,
      barLabel: "2.50",
      includeInChart: true,
      asOf: "2026-09-10 决定，2026-09-16 起生效",
      secondary: [
        { nameZh: "主要再融资利率", nameEn: "Main refinancing operations", display: "2.65%" },
        { nameZh: "边际贷款便利利率", nameEn: "Marginal lending facility", display: "2.90%" },
      ],
    },
    cycle: {
      kind: "hike",
      label: "加息",
      date: "2026-09-10",
      sizeLabel: "+25 bp",
      detail: "三项关键利率同时上调 25 个基点。图中柱为存款便利利率。",
    },
    primarySource: {
      institution: "European Central Bank",
      title: "Monetary policy decisions",
      url: "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260910~314e508016.en.html",
      readOn: DATA_AS_OF,
    },
    sources: [],
  },
  {
    id: "boe",
    nameZh: "英格兰银行",
    nameEn: "Bank of England",
    shortLabel: "英国",
    head: {
      name: "Andrew Bailey",
      titleZh: "行长",
      titleEn: "Governor",
      photo: "/portraits/boe-andrew-bailey.jpg",
      photoCredit: "Bank of England",
      photoPageTitle: "Andrew Bailey",
      photoPageUrl: "https://www.bankofengland.co.uk/about/people/andrew-bailey/biography",
    },
    decisionBody: {
      nameZh: "货币政策委员会",
      nameEn: "Monetary Policy Committee (MPC)",
      note: "MPC 决定 Bank Rate，每年八次会议，目标是使通胀回到 2%。",
    },
    indicators: ["消费者物价指数（CPI）"],
    inflationTarget: {
      display: "2%",
      note: "CPI 通胀目标。官网当前页同时给出最新通胀读数。",
    },
    inflationActual: {
      display: "3.1%",
      period: "截至 2026年8月的 12 个月",
      gauge: "CPI；核心 CPI 2.6%",
      source: {
        institution: "Office for National Statistics",
        title: "Consumer price inflation, UK: August 2026",
        url: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/august2026",
        readOn: DATA_AS_OF,
      },
    },
    policy: {
      nameZh: "银行利率",
      nameEn: "Bank Rate",
      display: "3.75%",
      chartValue: 3.75,
      barLabel: "3.75",
      includeInChart: true,
      asOf: "会议截至 2026-09-16，2026-09-17 公布",
      secondary: [],
    },
    cycle: {
      kind: "hold",
      label: "维持",
      date: "2026-09-17",
      sizeLabel: "0 bp",
      detail: "6–3 维持在 3.75%。三名委员主张上调 25 个基点至 4%。下次会议 2026-11-05。",
    },
    primarySource: {
      institution: "Bank of England",
      title: "Interest rates and Bank Rate: our latest decision",
      url: "https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate",
      readOn: DATA_AS_OF,
    },
    sources: [
      {
        institution: "Bank of England",
        title: "Monetary Policy Summary and minutes, September 2026",
        url: "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/september-2026",
        readOn: DATA_AS_OF,
      },
    ],
  },
  {
    id: "boj",
    nameZh: "日本银行",
    nameEn: "Bank of Japan",
    shortLabel: "日本",
    head: {
      name: "植田和男（Kazuo Ueda）",
      titleZh: "总裁",
      titleEn: "Governor",
      photo: "/portraits/boj-kazuo-ueda.jpg",
      photoCredit: "Bank of Japan",
      photoPageTitle: "政策委员会：植田和男",
      photoPageUrl: "https://www.boj.or.jp/about/organization/policyboard/index.htm",
    },
    decisionBody: {
      nameZh: "政策委员会",
      nameEn: "Policy Board",
      note: "政策委员会决定金融市场调节方针。2026年9月18日为 7–2。",
    },
    indicators: ["消费者物价指数（生鲜食品除外）", "综合 CPI"],
    inflationTarget: {
      display: "2%",
      note: "物价稳定目标。政策委员会以基调 CPI 稳定在 2% 左右为着眼点。",
    },
    inflationActual: {
      display: "1.7%",
      period: "2026年8月，同比",
      gauge: "生鲜食品除外综合；综合 CPI 1.9%",
      source: {
        institution: "日本总务省统计局",
        title: "2025年基准 消费者物价指数 全国 2026年8月分",
        url: "https://www.stat.go.jp/data/cpi/sokuhou/tsuki/index-z.html",
        readOn: DATA_AS_OF,
      },
    },
    policy: {
      nameZh: "无担保隔夜拆借利率",
      nameEn: "Uncollateralized overnight call rate",
      display: "1.25% 左右",
      chartValue: 1.25,
      barLabel: "1.25",
      includeInChart: true,
      asOf: "2026-09-18 决定，2026-09-24 起适用",
      secondary: [],
    },
    cycle: {
      kind: "hike",
      label: "加息",
      date: "2026-09-18",
      sizeLabel: "+25 bp",
      detail: "引导目标由「1.0% 左右」调整为「1.25% 左右」。浅田东一郎、佐藤绫乃反对。",
    },
    primarySource: {
      institution: "Bank of Japan",
      title: "Change in the Guideline for Money Market Operations (September 2026 MPM)",
      url: "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260918b.pdf",
      readOn: DATA_AS_OF,
    },
    sources: [
      {
        institution: "Bank of Japan",
        title: "Interest rate applied to the complementary deposit facility",
        url: "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260918a.pdf",
        readOn: DATA_AS_OF,
      },
    ],
  },
  {
    id: "boc",
    nameZh: "加拿大银行",
    nameEn: "Bank of Canada",
    shortLabel: "加拿大",
    head: {
      name: "Tiff Macklem",
      titleZh: "行长",
      titleEn: "Governor",
      photo: "/portraits/boc-tiff-macklem.jpg",
      photoCredit: "Bank of Canada",
      photoPageTitle: "Tiff Macklem",
      photoPageUrl: "https://www.bankofcanada.ca/profile/tiff-macklem/",
    },
    decisionBody: {
      nameZh: "理事会",
      nameEn: "Governing Council",
      note: "理事会决定隔夜利率目标。2026年9月2日决定维持政策利率。",
    },
    indicators: ["总体消费者物价指数（CPI）", "剔除汽油的 CPI", "核心通胀"],
    inflationTarget: {
      display: "2%",
      note: "1%–3% 控制区间的中点，以总体 CPI 的 12 个月变化衡量。现行协议至 2026-12-31。",
    },
    inflationActual: {
      display: "3.0%",
      period: "2026年8月，同比",
      gauge: "总体 CPI；剔除汽油 2.4%",
      source: {
        institution: "Statistics Canada",
        title: "Consumer Price Index, August 2026",
        url: "https://www150.statcan.gc.ca/n1/daily-quotidien/260914/dq260914a-eng.htm",
        readOn: DATA_AS_OF,
      },
    },
    policy: {
      nameZh: "隔夜利率目标",
      nameEn: "Target for the overnight rate",
      display: "2.25%",
      chartValue: 2.25,
      barLabel: "2.25",
      includeInChart: true,
      asOf: "2026-09-02",
      secondary: [
        { nameZh: "银行利率", nameEn: "Bank Rate", display: "2.50%" },
        { nameZh: "存款利率", nameEn: "Deposit rate", display: "2.20%" },
      ],
    },
    cycle: {
      kind: "hold",
      label: "维持",
      date: "2026-09-02",
      sizeLabel: "0 bp",
      detail: "政策利率维持 2.25%。下次公布隔夜利率目标：2026-10-28。",
    },
    primarySource: {
      institution: "Bank of Canada",
      title: "Bank of Canada maintains the policy rate at 2¼%",
      url: "https://www.bankofcanada.ca/2026/09/fad-press-release-2026-09-02/",
      readOn: DATA_AS_OF,
    },
    sources: [
      {
        institution: "Bank of Canada",
        title: "Inflation-control target",
        url: "https://www.bankofcanada.ca/rates/indicators/key-variables/inflation-control-target/",
        readOn: DATA_AS_OF,
      },
    ],
  },
  {
    id: "pboc",
    nameZh: "中国人民银行",
    nameEn: "People's Bank of China",
    shortLabel: "中国",
    head: {
      name: "潘功胜（Pan Gongsheng）",
      titleZh: "行长",
      titleEn: "Governor",
      photo: "/portraits/pboc-pan-gongsheng.jpg",
      photoCredit: "中国人民银行",
      photoPageTitle: "行领导：潘功胜",
      photoPageUrl: "https://www.pbc.gov.cn/hanglingdao/128697/128734/index.html",
    },
    decisionBody: {
      nameZh: "中国人民银行（货币政策委员会为咨询机构）",
      nameEn: "People's Bank of China; Monetary Policy Committee is consultative",
      note: "货币政策委员会例会用语是「建议」，不表决政策利率。7天期逆回购由人民银行公开市场业务操作室以固定利率、数量招标开展。现行官网为 pbc.gov.cn。",
    },
    indicators: ["居民消费价格（CPI）", "社会融资规模与货币供应量（与增长和价格目标相匹配）"],
    inflationTarget: {
      display: "2% 左右",
      note: "2026年政府工作报告的居民消费价格涨幅预期目标，不是通胀目标制下的点目标。",
    },
    inflationActual: {
      display: "0.8%",
      period: "2026年8月，同比",
      gauge: "CPI；核心 CPI（扣除食品和能源）1.0%",
      source: {
        institution: "国家统计局",
        title: "2026年8月份居民消费价格同比上涨0.8%",
        url: "https://www.stats.gov.cn/sj/zxfbhjd/202609/t20260909_1965263.html",
        readOn: DATA_AS_OF,
      },
    },
    policy: {
      nameZh: "7天期逆回购操作利率",
      nameEn: "7-day reverse repo operation rate",
      display: "1.40%",
      chartValue: 1.4,
      barLabel: "1.40",
      includeInChart: true,
      asOf: "2026-09-24 操作，公告〔2026〕第189号",
      secondary: [
        { nameZh: "1年期贷款市场报价利率", nameEn: "1-year LPR", display: "3.0%" },
        { nameZh: "5年期以上贷款市场报价利率", nameEn: "5-year-plus LPR", display: "3.5%" },
      ],
    },
    cycle: {
      kind: "hold",
      label: "维持",
      date: "2026-09-24",
      sizeLabel: "操作利率未变",
      detail: "最近一次公开市场操作仍为 1.40%。最近一次把该利率调整至 1.40% 的公告日期，本页未单独核实，故不填写。1年期与5年期以上 LPR 于 2026-09-20 公布，至下次发布前有效。",
    },
    primarySource: {
      institution: "中国人民银行",
      title: "公开市场业务交易公告〔2026〕第189号",
      url: "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125475/2026092408454713496/index.html",
      readOn: DATA_AS_OF,
    },
    sources: [
      {
        institution: "中国人民银行",
        title: "2026年9月20日贷款市场报价利率（LPR）公告",
        url: "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125440/3876551/2026092008384254324/index.html",
        readOn: DATA_AS_OF,
      },
      {
        institution: "中国人民银行",
        title: "货币政策委员会召开2026年第三季度例会",
        url: "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026092416074632670/index.html",
        readOn: DATA_AS_OF,
      },
      {
        institution: "中国政府网",
        title: "李强作的政府工作报告（摘登）",
        url: "https://www.gov.cn/yaowen/liebiao/202603/content_7060692.htm",
        readOn: DATA_AS_OF,
      },
    ],
  },
  {
    id: "rbi",
    nameZh: "印度储备银行",
    nameEn: "Reserve Bank of India",
    shortLabel: "印度",
    head: {
      name: "Sanjay Malhotra",
      titleZh: "行长",
      titleEn: "Governor",
      photo: "/portraits/rbi-sanjay-malhotra.jpg",
      photoCredit: "Reserve Bank of India（媒体资料；照片说明含 Nishikant Gamre Photography）",
      photoPageTitle: "Photographs of the Governor and Deputy Governors",
      photoPageUrl: "https://www.rbi.org.in/scripts/AboutUsDisplay.aspx?pg=MediaKit.htm",
    },
    decisionBody: {
      nameZh: "货币政策委员会",
      nameEn: "Monetary Policy Committee (MPC)",
      note: "MPC 决定流动性调节便利下的政策回购利率。第62次会议由行长主持，全体一致。",
    },
    indicators: ["消费者物价指数（CPI）", "核心 CPI（不含食品与燃料）"],
    inflationTarget: {
      display: "4%",
      note: "容忍区间 2%–6%。印度储备银行公报引述 2026年3月25日公报通知，目标延续至 2031年3月31日。",
    },
    inflationActual: {
      display: "4.82%",
      period: "2026年8月，同比，暂定",
      gauge: "CPI，基期 2024=100；7月终值 4.45%",
      source: {
        institution: "Ministry of Statistics and Programme Implementation",
        title: "Press Release of CPI for August 2026",
        url: "https://www.mospi.gov.in/uploads/latestReleases/latest_release_1789381904344_6c792dcf-8a9f-4fca-93d3-99d833bdb358_Press_Release_of_CPI_for_August_2026.pdf",
        readOn: DATA_AS_OF,
      },
    },
    policy: {
      nameZh: "政策回购利率",
      nameEn: "Policy repo rate",
      display: "5.25%",
      chartValue: 5.25,
      barLabel: "5.25",
      includeInChart: true,
      asOf: "2026-08-05（会议 8月3–5日）",
      secondary: [
        { nameZh: "常设存款便利利率", nameEn: "Standing deposit facility", display: "5.00%" },
        { nameZh: "边际常设便利利率 / 银行利率", nameEn: "MSF and Bank Rate", display: "5.50%" },
      ],
    },
    cycle: {
      kind: "hold",
      label: "维持",
      date: "2026-08-05",
      sizeLabel: "0 bp",
      detail: "全体一致维持 5.25%，并继续中性立场。下次会议 2026-10-05 至 10-07。",
    },
    primarySource: {
      institution: "Reserve Bank of India",
      title: "Monetary Policy Statement, 3 to 5 August 2026",
      url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63287",
      readOn: DATA_AS_OF,
    },
    sources: [
      {
        institution: "Reserve Bank of India",
        title: "RBI Bulletin citing Gazette Notification S.O. 1580(E)",
        url: "https://www.rbi.org.in/Scripts/BS_ViewBulletin.aspx?Id=24174",
        readOn: DATA_AS_OF,
      },
    ],
  },
  {
    id: "mas",
    nameZh: "新加坡金融管理局",
    nameEn: "Monetary Authority of Singapore",
    shortLabel: "新加坡",
    head: {
      name: "Chia Der Jiun",
      titleZh: "总裁",
      titleEn: "Managing Director",
      photo: "/portraits/mas-chia-der-jiun.png",
      photoCredit: "Monetary Authority of Singapore",
      photoPageTitle: "Management Team",
      photoPageUrl: "https://www.mas.gov.sg/who-we-are/management-team",
    },
    decisionBody: {
      nameZh: "新加坡金融管理局",
      nameEn: "Monetary Authority of Singapore",
      note: "经济政策组负责货币政策的拟订，决定以《货币政策声明》公布。没有以投票公布政策利率的委员会。",
    },
    indicators: ["MAS 核心通胀（剔除住宿与私人交通）", "CPI-All Items"],
    inflationTarget: {
      display: "无点目标",
      note: "目标是中期低而稳定的通胀，不是一个公布的利率式通胀点目标。2026年全年核心与整体通胀预测均为 1.5%–2.5%，这是预测区间。",
    },
    inflationActual: {
      display: "2.2%",
      period: "2026年8月，同比",
      gauge: "MAS 核心通胀；CPI-All Items 2.3%",
      source: {
        institution: "Monetary Authority of Singapore",
        title: "Consumer Price Developments in August 2026",
        url: "https://www.mas.gov.sg/news/consumer-price-developments/2026/consumer-price-developments-in-august-2026",
        readOn: DATA_AS_OF,
      },
    },
    policy: {
      nameZh: "新元名义有效汇率政策带",
      nameEn: "S$NEER policy band",
      display: "斜率非常轻微上调",
      chartValue: null,
      barLabel: "",
      includeInChart: false,
      asOf: "2026-07-27",
      secondary: [],
    },
    cycle: {
      kind: "tighten",
      label: "收紧",
      date: "2026-07-27",
      sizeLabel: "基点未公布",
      detail: "提高政策带升值斜率，幅度小于 4月的上调；带宽与中心水平不变。官方未给出基点数。下一次声明不晚于 2026年10月。",
    },
    frameworkNote:
      "新加坡的货币政策工具是新元名义有效汇率（S$NEER）的政策带，而不是政策利率。管理局让贸易加权汇率在一条爬升的政策带内波动，用汇率路径来约束进口价格和中期通胀。",
    primarySource: {
      institution: "Monetary Authority of Singapore",
      title: "MAS Monetary Policy Statement - July 2026",
      url: "https://www.mas.gov.sg/news/monetary-policy-statements/2026/mas-monetary-policy-statement-27jul26",
      readOn: DATA_AS_OF,
    },
    sources: [
      {
        institution: "Monetary Authority of Singapore",
        title: "Past Monetary Policy Decisions",
        url: "https://www.mas.gov.sg/monetary-policy/past-monetary-policy-decisions",
        readOn: DATA_AS_OF,
      },
    ],
  },
  {
    id: "rba",
    nameZh: "澳大利亚储备银行",
    nameEn: "Reserve Bank of Australia",
    shortLabel: "澳大利亚",
    head: {
      name: "Michele Bullock",
      titleZh: "行长",
      titleEn: "Governor",
      photo: "/portraits/rba-michele-bullock.jpg",
      photoCredit: "Reserve Bank of Australia（官方图库高分辨率肖像，网页展示已缩小）",
      photoPageTitle: "Senior RBA Executives",
      photoPageUrl: "https://www.rba.gov.au/media/image-library/senior-rba-executives.html",
    },
    decisionBody: {
      nameZh: "货币政策委员会",
      nameEn: "Monetary Policy Board",
      note: "委员会决定是否调整现金利率目标，成员包括行长、副行长、财政部长秘书及六名由财长任命的委员。",
    },
    indicators: ["消费者物价指数（CPI）", "截尾均值通胀（trimmed mean）"],
    inflationTarget: {
      display: "2–3%",
      note: "使消费者价格通胀保持在 2% 至 3%，并实现可持续的充分就业。",
    },
    inflationActual: {
      display: "3.5%",
      period: "截至 2026年7月的 12 个月",
      gauge: "CPI；截尾均值 3.6%。8月 CPI 预定 2026-09-30 发布。",
      source: {
        institution: "Australian Bureau of Statistics",
        title: "Consumer Price Index, Australia, July 2026",
        url: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release",
        readOn: DATA_AS_OF,
      },
    },
    policy: {
      nameZh: "现金利率目标",
      nameEn: "Cash rate target",
      display: "4.35%",
      chartValue: 4.35,
      barLabel: "4.35",
      includeInChart: true,
      asOf: "2026-08-11 决定，2026-08-12 起生效",
      secondary: [],
    },
    cycle: {
      kind: "hold",
      label: "维持",
      date: "2026-08-11",
      sizeLabel: "0 bp",
      detail: "全体一致维持 4.35%。现金利率历史表显示，最近一次变动是 2026-05-06 加 25 个基点；2月、3月亦各加 25 个基点。下次决定 2026-09-29。",
    },
    primarySource: {
      institution: "Reserve Bank of Australia",
      title: "Statement by the Monetary Policy Board: Monetary Policy Decision",
      url: "https://www.rba.gov.au/media-releases/2026/mr-26-19.html",
      readOn: DATA_AS_OF,
    },
    sources: [
      {
        institution: "Reserve Bank of Australia",
        title: "Cash rate target overview",
        url: "https://www.rba.gov.au/cash-rate-target-overview.html",
        readOn: DATA_AS_OF,
      },
      {
        institution: "Reserve Bank of Australia",
        title: "Cash Rate Target",
        url: "https://www.rba.gov.au/statistics/cash-rate/",
        readOn: DATA_AS_OF,
      },
    ],
  },
]

export function chartBanks() {
  return banks
    .filter((bank) => bank.policy.includeInChart && bank.policy.chartValue != null)
    .sort((a, b) => (b.policy.chartValue ?? 0) - (a.policy.chartValue ?? 0))
}
