export type Bilingual = { en: string; zh: string }

export type GovernorProfile = {
  bankId: string
  name: Bilingual
  title: Bilingual
  photo: string
  photoCredit: string
  focal: { x: string; y: string; scale: number }
  term: Bilingual | null
  prior: Bilingual | null
  education: Bilingual | null
  policyFocus: Bilingual | null
  sourceUrl: string
  sourceLabel: Bilingual
  gapNote: Bilingual | null
}

const blank = "The official biography page did not state this."
const blankZh = "官方简历页没有写明。"

export const governors: GovernorProfile[] = [
  {
    bankId: "fed",
    name: { en: "Kevin Warsh", zh: "Kevin Warsh" },
    title: { en: "Chair", zh: "主席" },
    photo: "/portraits/fed-kevin-warsh.png",
    photoCredit: "Board of Governors of the Federal Reserve System",
    focal: { x: "50%", y: "22%", scale: 1 },
    term: {
      en: "Took office as chairman on 22 May 2026 for a four-year term ending 21 May 2030. Also chairman of the FOMC. Term as a Board member ends 31 January 2040.",
      zh: "2026年5月22日就任主席，四年任期至2030年5月21日。同时担任 FOMC 主席。理事任期至2040年1月31日。",
    },
    prior: {
      en: "Member of the Board, 2006–2011. Shepard Family Distinguished Visiting Fellow in Economics at Stanford University’s Hoover Institution and lecturer at the Stanford Graduate School of Business; partner at Duquesne Family Office. Special assistant to the president for economic policy and executive secretary of the National Economic Council, 2002–2006, and a member of the President’s Working Group on Financial Markets. Vice president and executive director at Morgan Stanley, 1995–2002.",
      zh: "2006–2011年任理事。其后为斯坦福大学胡佛研究所经济学 Shepard Family 杰出访问研究员、斯坦福商学院讲师，以及 Duquesne Family Office 合伙人。2002–2006年任总统经济政策特别助理、国家经济委员会执行秘书，并任总统金融市场工作组成员。1995–2002年任摩根士丹利副总裁、执行董事。",
    },
    education: {
      en: "AB, Stanford University, 1992. JD, Harvard Law School, 1995.",
      zh: "1992年斯坦福大学文学士。1995年哈佛法学院法律博士。",
    },
    policyFocus: null,
    sourceUrl: "https://www.federalreserve.gov/aboutthefed/bios/board/warsh.htm",
    sourceLabel: { en: "Board of Governors biography", zh: "理事会简历" },
    gapNote: { en: `Policy focus: ${blank}`, zh: `政策重点：${blankZh}` },
  },
  {
    bankId: "ecb",
    name: { en: "Christine Lagarde", zh: "Christine Lagarde" },
    title: { en: "President", zh: "行长" },
    photo: "/portraits/ecb-christine-lagarde.jpg",
    photoCredit: "European Central Bank",
    focal: { x: "50%", y: "22%", scale: 1 },
    term: {
      en: "President of the ECB since November 2019. The CV does not give an end date. Born 1 January 1956 in Paris. Also chair of the European Systemic Risk Board, a member of the BIS Board, and a participant in G7 and G20 meetings.",
      zh: "2019年11月起任欧洲央行行长。简历未写明任期结束日。1956年1月1日生于巴黎。同时担任欧洲系统风险委员会主席、国际清算银行董事会成员，并参加 G7 与 G20。",
    },
    prior: {
      en: "Managing Director of the IMF, 2011–2019. French minister for the economy, finance and industry, 2007–2011; minister for agriculture and fisheries, 2007; minister for trade, 2005–2007. Global chairman of Baker McKenzie, 1999–2005; managing partner of the Paris office, 1995–1999; attorney, 1981–1999. Lecturer in contract law at Paris X, 1980–1982.",
      zh: "2011–2019年任国际货币基金组织总裁。2007–2011年任法国经济、财政与工业部长；2007年任农业与渔业部长；2005–2007年任贸易部长。1999–2005年任贝克·麦坚时全球主席；1995–1999年任巴黎办公室管理合伙人；1981–1999年任律师。1980–1982年在巴黎第十大学讲授合同法。",
    },
    education: {
      en: "Master in commercial law and DESS, University Paris X, 1980. Master in economics and finance, Sciences Po Aix, 1977. Master in American literature, Avignon Art College, 1977.",
      zh: "1980年巴黎第十大学商法硕士及 DESS。1977年艾克斯政治学院经济与金融硕士。1977年阿维尼翁艺术学院美国文学硕士。",
    },
    policyFocus: null,
    sourceUrl: "https://www.ecb.europa.eu/ecb/decisions/html/cvlagarde.en.html",
    sourceLabel: { en: "ECB curriculum vitae", zh: "欧洲央行简历" },
    gapNote: { en: `Policy focus: ${blank}`, zh: `政策重点：${blankZh}` },
  },
  {
    bankId: "boe",
    name: { en: "Andrew Bailey", zh: "Andrew Bailey" },
    title: { en: "Governor", zh: "行长" },
    photo: "/portraits/boe-andrew-bailey.jpg",
    photoCredit: "Bank of England",
    focal: { x: "50%", y: "30%", scale: 1.1 },
    term: {
      en: "Governor from 16 March 2020 to 15 March 2028. The appointment was announced on 20 December 2019. He chairs the Monetary Policy Committee, the Financial Policy Committee and the Prudential Regulation Committee, and is a member of Court.",
      zh: "行长任期自2020年3月16日至2028年3月15日。任命于2019年12月20日宣布。担任货币政策委员会、金融政策委员会和审慎监管委员会主席，并为 Court 成员。",
    },
    prior: {
      en: "Chief Executive of the Financial Conduct Authority from 1 July 2016 until becoming Governor; while there, a member of the PRC, the FPC and the FCA Board. Deputy Governor for Prudential Regulation and Chief Executive of the Prudential Regulation Authority from 1 April 2013. At the FSA from April 2011: Deputy Head of the Prudential Business Unit and Director of UK Banks and Building Societies; Managing Director of that unit from July 2012; voting member of the interim FPC from June 2012. Earlier at the Bank: Executive Director for Banking Services and Chief Cashier, Head of the Special Resolution Unit, Governor’s Private Secretary, and Head of International Economic Analysis in Monetary Analysis.",
      zh: "2016年7月1日起任金融行为监管局首席执行官，直至出任行长；任内为审慎监管委员会、金融政策委员会和金融行为监管局董事会成员。2013年4月1日起任负责审慎监管的副行长及审慎监管局首席执行官。2011年4月起在金融服务局任职：审慎业务部副主管、英国银行与建房互助协会主任；2012年7月起任该部常务董事；2012年6月起为临时金融政策委员会有表决权成员。此前在英格兰银行曾任银行服务执行董事兼首席出纳、特别处置部主管、行长私人秘书，以及货币分析中国际经济分析主管。",
    },
    education: null,
    policyFocus: null,
    sourceUrl: "https://www.bankofengland.co.uk/about/people/andrew-bailey/biography",
    sourceLabel: { en: "Bank of England biography", zh: "英格兰银行简历" },
    gapNote: {
      en: `Education and policy focus: ${blank}`,
      zh: `学历与政策重点：${blankZh}`,
    },
  },
  {
    bankId: "boj",
    name: { en: "Kazuo Ueda", zh: "植田和男" },
    title: { en: "Governor", zh: "总裁" },
    photo: "/portraits/boj-kazuo-ueda.jpg",
    photoCredit: "Bank of Japan",
    focal: { x: "50%", y: "20%", scale: 1 },
    term: {
      en: "Governor from 9 April 2023 to 8 April 2028. Born 20 September 1951.",
      zh: "总裁任期自2023年4月9日至2028年4月8日。1951年9月20日出生。",
    },
    prior: {
      en: "Assistant professor, University of British Columbia, July 1980. Associate professor, Osaka University, April 1982. Associate professor, University of Tokyo, April 1989; professor, March 1993. Member of the Policy Board, April 1998, reappointed April 2000, retired April 2005. Professor, University of Tokyo graduate school, April 2005. Professor, Kyoritsu Women’s University, April 2017.",
      zh: "1980年7月不列颠哥伦比亚大学助理教授。1982年4月大阪大学副教授。1989年4月东京大学副教授，1993年3月教授。1998年4月任政策委员会委员，2000年4月连任，2005年4月离任。2005年4月任东京大学研究生院教授。2017年4月任共立女子大学教授。",
    },
    education: {
      en: "BS in mathematics, University of Tokyo, 1974. Entered the Faculty of Economics in 1974 and the graduate school in 1975. PhD programme at MIT from 1976. PhD in economics, MIT, 1980.",
      zh: "1974年东京大学数学理学士。1974年进入经济学部，1975年进入研究生院。1976年起在麻省理工学院攻读博士。1980年获麻省理工学院经济学博士。",
    },
    policyFocus: null,
    sourceUrl: "https://www.boj.or.jp/en/about/organization/policyboard/gv_ueda.htm",
    sourceLabel: { en: "Bank of Japan biography", zh: "日本银行简历" },
    gapNote: { en: `Policy focus: ${blank}`, zh: `政策重点：${blankZh}` },
  },
  {
    bankId: "boc",
    name: { en: "Tiff Macklem", zh: "Tiff Macklem" },
    title: { en: "Governor", zh: "行长" },
    photo: "/portraits/boc-tiff-macklem.jpg",
    photoCredit: "Bank of Canada",
    focal: { x: "49%", y: "28%", scale: 1.15 },
    term: {
      en: "Appointed Governor effective 3 June 2020 for a seven-year term. The profile does not print a calendar end date. Born in Montréal. Chair of the Bank’s Board of Directors. Member of the BIS Board. Chair of the Group of Governors and Heads of Supervision. Chair of the FSB Standing Committee for the Assessment of Vulnerabilities. Co-chair of the FSB Regional Consultative Group for the Americas. Chair of the BIS Consultative Council for the Americas.",
      zh: "2020年6月3日起任行长，任期七年。简历没有印出日历上的结束日。生于蒙特利尔。担任加拿大银行董事会主席、国际清算银行董事会成员、央行行长与监管机构负责人小组主席、金融稳定理事会脆弱性评估常设委员会主席、金融稳定理事会美洲区域协商组联合主席，以及国际清算银行美洲咨询委员会主席。",
    },
    prior: {
      en: "Joined the Bank in 1984 and returned in 1989. Managing Director of Canadian Economic Analysis, January 2000. Advisor to Governor Dodge, August 2003. Deputy Governor, December 2004. Associate Deputy Minister at Finance Canada during 2008–09, representing Canada at the G7, G20 and FSB. Senior Deputy Governor, July 2010. Dean of the Rotman School of Management, July 2014. Before becoming Governor: director of the Bank of Nova Scotia and chair of its board risk committee; chair of Ontario’s Panel on Economic Growth and Prosperity, the federal Expert Panel on Sustainable Finance, and the Global Risk Institute.",
      zh: "1984年进入加拿大银行，1989年回到该行。2000年1月任加拿大经济分析部常务董事。2003年8月任行长 Dodge 的顾问。2004年12月任副行长。2008–09年任财政部副部长，代表加拿大参加 G7、G20 和金融稳定理事会。2010年7月任高级副行长。2014年7月任罗特曼管理学院院长。出任行长之前：丰业银行董事及董事会风险委员会主席；安大略经济增长与繁荣委员会、联邦可持续金融专家委员会和全球风险研究所主席。",
    },
    education: {
      en: "BA in economics, Queen’s University, 1983. MA, 1984, and PhD in economics, 1989, University of Western Ontario.",
      zh: "1983年女王大学经济学学士。1984年西安大略大学硕士，1989年经济学博士。",
    },
    policyFocus: null,
    sourceUrl: "https://www.bankofcanada.ca/profile/tiff-macklem/",
    sourceLabel: { en: "Bank of Canada profile", zh: "加拿大银行简介" },
    gapNote: { en: `Policy focus: ${blank}`, zh: `政策重点：${blankZh}` },
  },
  {
    bankId: "pboc",
    name: { en: "Pan Gongsheng", zh: "潘功胜" },
    title: { en: "Governor", zh: "行长" },
    photo: "/portraits/pboc-pan-gongsheng.jpg",
    photoCredit: "People's Bank of China",
    focal: { x: "50%", y: "22%", scale: 1 },
    term: null,
    prior: null,
    education: {
      en: "The leadership page states: male, Han, born July 1963, postgraduate education, PhD in economics, member of the Communist Party of China, currently Party Secretary and Governor.",
      zh: "行领导页写明：男，汉族，1963年7月出生，研究生学历，经济学博士，中共党员，现任党委书记、行长。",
    },
    policyFocus: null,
    sourceUrl: "https://www.pbc.gov.cn/hanglingdao/128697/128734/index.html",
    sourceLabel: { en: "PBoC leadership page", zh: "人民银行行领导页" },
    gapNote: {
      en: "Term dates, prior roles and policy focus are not on that page.",
      zh: "该页没有任期、此前职务和政策重点。",
    },
  },
  {
    bankId: "rbi",
    name: { en: "Sanjay Malhotra", zh: "Sanjay Malhotra" },
    title: { en: "Governor", zh: "行长" },
    photo: "/portraits/rbi-sanjay-malhotra.jpg",
    photoCredit: "Reserve Bank of India",
    focal: { x: "50%", y: "16%", scale: 2.25 },
    term: {
      en: "26th Governor. Indian Administrative Service, 1990 batch, Rajasthan cadre. Three-year term with effect from 11 December 2024. The page does not print a calendar end date.",
      zh: "第26任行长。印度行政服务，1990年批次，拉贾斯坦邦cadre。三年任期自2024年12月11日起生效。该页没有印出日历上的结束日。",
    },
    prior: {
      en: "Immediately before this appointment: Secretary, Department of Revenue. Before that: Secretary, Department of Financial Services. Also Chairman and Managing Director of Rural Electrification Corporation, and a government nominee director on the RBI Central Board from 16 February 2022 to 14 November 2022. The page says his work has covered power, finance, taxation and information technology, in the state government and the central government, including a stint at the United Nations.",
      zh: "此次任命之前任税务部秘书。再之前任金融服务部秘书。曾任农村电气化公司董事长兼董事总经理，并于2022年2月16日至2022年11月14日任印度储备银行中央董事会的政府提名董事。该页写明其工作涉及电力、金融、税收和信息技术，包括邦政府、中央政府以及在联合国的一段任职。",
    },
    education: {
      en: "Graduate in computer science and engineering, Indian Institute of Technology Kanpur. Master’s in public policy, Princeton University.",
      zh: "印度理工学院坎普尔分校计算机科学与工程本科。普林斯顿大学公共政策硕士。",
    },
    policyFocus: null,
    sourceUrl: "https://www.rbi.org.in/scripts/governors.aspx",
    sourceLabel: { en: "RBI governors page", zh: "印度储备银行行长页" },
    gapNote: { en: `Policy focus: ${blank}`, zh: `政策重点：${blankZh}` },
  },
  {
    bankId: "mas",
    name: { en: "Chia Der Jiun", zh: "Chia Der Jiun" },
    title: { en: "Managing Director", zh: "总裁" },
    photo: "/portraits/mas-chia-der-jiun.png",
    photoCredit: "Monetary Authority of Singapore",
    focal: { x: "50%", y: "22%", scale: 1 },
    term: null,
    prior: null,
    education: null,
    policyFocus: null,
    sourceUrl: "https://www.mas.gov.sg/who-we-are/management-team",
    sourceLabel: { en: "MAS management team", zh: "金管局管理层" },
    gapNote: {
      en: "On 10 October 2026 the management-team page did not return a readable biography, so term, prior roles, education and policy focus are left blank.",
      zh: "2026年10月10日管理层页面没有返回可读简历，因此任期、此前职务、学历和政策重点留空。",
    },
  },
  {
    bankId: "rba",
    name: { en: "Michele Bullock", zh: "Michele Bullock" },
    title: { en: "Governor", zh: "行长" },
    photo: "/portraits/rba-michele-bullock.jpg",
    photoCredit: "Reserve Bank of Australia",
    focal: { x: "50%", y: "32%", scale: 1.65 },
    term: {
      en: "Commenced as Governor on 18 September 2023. The present term ends on 17 September 2030 under section 24(1) of the Reserve Bank Act 1959, as listed on the statutory appointments table. Chair of the Governance Board, the Monetary Policy Board, the Payments System Board and the Council of Financial Regulators. Deputy Chair of the Reserve Bank Board from 2 April 2022, and Chair from 18 September 2023 until 28 February 2025.",
      zh: "2023年9月18日起任行长。法定任命表载明，依据《1959年储备银行法》第24条第(1)款，本届任期至2030年9月17日。担任治理委员会、货币政策委员会、支付系统委员会和金融监管者理事会主席。2022年4月2日起任储备银行理事会副主席，2023年9月18日至2025年2月28日任主席。",
    },
    prior: {
      en: "Deputy Governor. Assistant Governor (Financial System), 2016–2022; Assistant Governor (Business Services), 2015–2016; Assistant Governor (Currency), 2010–2015. Adviser, Currency Group, 2010. Head of Payments Policy, 2007–2010. Chief Manager, Payments Policy, 1998–2007. Roles in the Economic Group and the International Department, 1985–1998. Also a member of Chief Executive Women, a signatory to the Banking and Finance Oath, co-chair of the FSB Regional Consultative Group for Asia, and a member of the Melbourne Institute Advisory Board.",
      zh: "曾任副行长。2016–2022年助理行长（金融体系）；2015–2016年助理行长（商业服务）；2010–2015年助理行长（货币）。2010年货币组顾问。2007–2010年支付政策主管。1998–2007年支付政策首席经理。1985–1998年在经济组和国际部任职。另为 Chief Executive Women 成员、银行业与金融业誓言签署人、金融稳定理事会亚洲区域协商组联合主席，以及墨尔本研究所咨询委员会成员。",
    },
    education: {
      en: "BEc (Hons), University of New England, 1984. MSc in economics, London School of Economics, 1989.",
      zh: "1984年新英格兰大学经济学荣誉学士。1989年伦敦政治经济学院经济学理学硕士。",
    },
    policyFocus: null,
    sourceUrl: "https://www.rba.gov.au/about-rba/people/gov.html",
    sourceLabel: { en: "RBA biography", zh: "澳大利亚储备银行简历" },
    gapNote: {
      en: "The term end date is on the statutory appointments table, not the biography. Policy focus is not stated on the biography.",
      zh: "任期结束日在法定任命表，不在简历页。简历没有写政策重点。",
    },
  },
]

export const rbaTermSource = "https://www.rba.gov.au/about-rba/statutory-appointments.html"
