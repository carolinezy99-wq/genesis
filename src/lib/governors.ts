export type Bilingual = { en: string; zh: string }

export type GovernorProfile = {
  term?: Bilingual
  prior?: Bilingual
  education?: Bilingual
  bioUrl: string
  bioLabel: Bilingual
  termSource?: { url: string; label: Bilingual }
}

// Facts taken from the official biography linked on each card. Empty fields are omitted in the dialog.
export const governors: Record<string, GovernorProfile> = {
  fed: {
    term: {
      en: "Chair from 22 May 2026, four-year term ending 21 May 2030. Board term ends 31 January 2040.",
      zh: "2026年5月22日起任主席，四年任期至2030年5月21日。理事任期至2040年1月31日。",
    },
    prior: {
      en: "Board member, 2006–2011. Later a Hoover Institution fellow and Stanford GSB lecturer, and a partner at Duquesne Family Office. Special assistant to the president for economic policy and executive secretary of the National Economic Council, 2002–2006. Morgan Stanley vice president and executive director, 1995–2002.",
      zh: "2006–2011年任理事。其后任胡佛研究所研究员、斯坦福商学院讲师，以及杜肯家族办公室合伙人。2002–2006年任总统经济政策特别助理兼国家经济委员会执行秘书。1995–2002年任摩根士丹利副总裁及执行董事。",
    },
    education: { en: "AB, Stanford, 1992. JD, Harvard Law School, 1995.", zh: "1992年斯坦福大学文学士。1995年哈佛法学院法律博士。" },
    bioUrl: "https://www.federalreserve.gov/aboutthefed/bios/board/warsh.htm",
    bioLabel: { en: "Federal Reserve biography", zh: "美联储简历" },
  },
  ecb: {
    term: { en: "President since November 2019.", zh: "2019年11月起任行长。" },
    prior: {
      en: "Managing Director of the IMF, 2011–2019. French minister of economy and finance, 2007–2011, and earlier minister for agriculture and fisheries and for trade. Global chairman of Baker McKenzie, 1999–2005.",
      zh: "2011–2019年任国际货币基金组织总裁。2007–2011年任法国经济与财政部长，此前任农业渔业部长及贸易部长。1999–2005年任贝克·麦坚时全球主席。",
    },
    education: {
      en: "Master in commercial law and DESS, Paris X, 1980. Master in economics and finance, Sciences Po Aix, 1977. Master in American literature, Avignon, 1977.",
      zh: "1980年巴黎第十大学商法硕士及 DESS。1977年艾克斯政治学院经济与金融硕士。1977年阿维尼翁美国文学硕士。",
    },
    bioUrl: "https://www.ecb.europa.eu/ecb/decisions/html/cvlagarde.en.html",
    bioLabel: { en: "ECB curriculum vitae", zh: "欧洲央行简历" },
  },
  boe: {
    term: { en: "Governor from 16 March 2020 to 15 March 2028.", zh: "2020年3月16日至2028年3月15日任行长。" },
    prior: {
      en: "Chief Executive of the Financial Conduct Authority until becoming Governor. Deputy Governor for Prudential Regulation and Chief Executive of the PRA from 1 April 2013. Earlier Bank roles included Executive Director for Banking Services and Chief Cashier.",
      zh: "任行长前为金融行为监管局首席执行官。2013年4月1日起任审慎监管副行长及审慎监管局首席执行官。更早在英伦银行任银行服务执行董事兼首席出纳。",
    },
    bioUrl: "https://www.bankofengland.co.uk/about/people/andrew-bailey/biography",
    bioLabel: { en: "Bank of England biography", zh: "英格兰银行简历" },
  },
  boj: {
    term: { en: "Governor from 9 April 2023 to 8 April 2028.", zh: "2023年4月9日至2028年4月8日任行长。" },
    prior: {
      en: "Policy Board member, April 1998 to April 2005. Professor at the University of Tokyo, and later at Kyoritsu Women’s University. Earlier academic posts at the University of British Columbia and Osaka University.",
      zh: "1998年4月至2005年4月任政策委员会委员。曾任东京大学教授，后任共立女子大学教授。更早在不列颠哥伦比亚大学和大阪大学任教。",
    },
    education: {
      en: "BS in mathematics, University of Tokyo, 1974. PhD in economics, MIT, 1980.",
      zh: "1974年东京大学数学理学士。1980年麻省理工学院经济学博士。",
    },
    bioUrl: "https://www.boj.or.jp/en/about/organization/policyboard/gv_ueda.htm",
    bioLabel: { en: "Bank of Japan biography", zh: "日本银行简历" },
  },
  boc: {
    term: { en: "Appointed effective 3 June 2020 for a seven-year term.", zh: "2020年6月3日起任职，任期七年。" },
    prior: {
      en: "Senior Deputy Governor from July 2010, then Dean of the Rotman School of Management from July 2014. Joined the Bank in 1984. Associate Deputy Minister at Finance Canada, 2008–09.",
      zh: "2010年7月起任高级副行长，2014年7月起任罗特曼管理学院院长。1984年加入加拿大银行。2008–09年任加拿大财政部副部长。",
    },
    education: {
      en: "BA in economics, Queen’s University, 1983. MA (1984) and PhD (1989) in economics, University of Western Ontario.",
      zh: "1983年女王大学经济学学士。西安大略大学经济学硕士（1984）及博士（1989）。",
    },
    bioUrl: "https://www.bankofcanada.ca/profile/tiff-macklem/",
    bioLabel: { en: "Bank of Canada profile", zh: "加拿大银行简介" },
  },
  pboc: {
    education: { en: "Postgraduate, PhD in economics.", zh: "研究生，经济学博士。" },
    bioUrl: "https://www.pbc.gov.cn/hanglingdao/128697/128734/index.html",
    bioLabel: { en: "PBoC leadership page", zh: "人民银行领导简历" },
  },
  rbi: {
    term: { en: "26th Governor. Three-year term effective 11 December 2024.", zh: "第26任行长。2024年12月11日起三年任期。" },
    prior: {
      en: "Indian Administrative Service, 1990, Rajasthan cadre. Immediately before the Bank: Secretary, Department of Revenue, and before that Secretary, Department of Financial Services. Chairman and Managing Director of Rural Electrification Corporation.",
      zh: "1990年印度行政服务团，拉贾斯坦邦职系。任行长前为税务部秘书，更早为金融服务部秘书。曾任农村电气化公司董事长兼总经理。",
    },
    education: {
      en: "Graduate in computer science and engineering, IIT Kanpur. Master in public policy, Princeton.",
      zh: "印度理工学院坎普尔分校计算机科学与工程学士。普林斯顿大学公共政策硕士。",
    },
    bioUrl: "https://www.rbi.org.in/scripts/governors.aspx",
    bioLabel: { en: "Reserve Bank of India governors", zh: "印度储备银行行长页" },
  },
  mas: {
    term: { en: "Managing Director from 1 January 2024.", zh: "2024年1月1日起任总裁。" },
    prior: {
      en: "Previously Permanent Secretary (Development) at the Ministry of Manpower. Before that, 18 years at MAS, last as Deputy Managing Director (Corporate Development). Executive Director for Southeast Asia at the IMF, 2011–2013.",
      zh: "此前任人力部常任秘书（发展）。更早在金管局任职18年，最后一职为副总裁（机构发展）。2011–2013年任国际货币基金组织东南亚执行董事。",
    },
    education: { en: "BA (Hons) in politics and economics, Oxford. MBA, INSEAD.", zh: "牛津大学政治与经济学荣誉文学士。欧洲工商管理学院工商管理硕士。" },
    bioUrl: "https://www.mas.gov.sg/who-we-are/management-team",
    bioLabel: { en: "MAS management team", zh: "新加坡金管局管理层" },
  },
  rba: {
    term: { en: "Governor from 18 September 2023. Term ends 17 September 2030.", zh: "2023年9月18日起任行长。任期至2030年9月17日。" },
    prior: {
      en: "Deputy Governor, then Governor. Assistant Governor (Financial System) 2016–2022, (Business Services) 2015–2016, and (Currency) 2010–2015. Earlier roles in payments policy and the Economic Group.",
      zh: "曾任副行长，后任行长。2016–2022年任助理行长（金融体系），2015–2016年任助理行长（商业服务），2010–2015年任助理行长（货币）。更早任职于支付政策及经济部门。",
    },
    education: { en: "BEc (Hons), University of New England, 1984. MSc in economics, London School of Economics, 1989.", zh: "1984年新英格兰大学经济学荣誉学士。1989年伦敦政治经济学院经济学理学硕士。" },
    bioUrl: "https://www.rba.gov.au/about-rba/people/gov.html",
    bioLabel: { en: "Reserve Bank biography", zh: "澳大利亚储备银行简历" },
    termSource: {
      url: "https://www.rba.gov.au/about-rba/statutory-appointments.html",
      label: { en: "Term end: statutory appointments", zh: "任期结束日：法定任命" },
    },
  },
}
