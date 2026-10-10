export type Headquarters = {
  image: string
  width: number
  height: number
  alt: { en: string; zh: string }
  address: { en: string; zh: string }
  addressUrl: string
  note?: { en: string; zh: string }
  credit: {
    author: string
    licence: string
    licenceUrl?: string
    sourceUrl: string
  }
}

// Building photographs are stored in the repo. Licences were read from Wikimedia Commons file pages on 2026-10-10.
export const headquarters: Record<string, Headquarters> = {
  fed: {
    image: "/buildings/fed.jpg",
    width: 1100,
    height: 748,
    alt: { en: "Marriner S. Eccles Building, headquarters of the Federal Reserve Board", zh: "美国联邦储备委员会总部埃克尔斯大楼" },
    address: { en: "20th Street and Constitution Avenue N.W., Washington, DC 20551", zh: "20th Street and Constitution Avenue N.W., Washington, DC 20551" },
    addressUrl: "https://www.federalreserve.gov/aboutthefed/contact-us-topics.htm",
    credit: {
      author: "Board of Governors of the Federal Reserve System",
      licence: "Public domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Eccles_Building_(26088200676).jpg",
    },
  },
  ecb: {
    image: "/buildings/ecb.jpg",
    width: 1100,
    height: 710,
    alt: { en: "European Central Bank main building, Frankfurt", zh: "位于法兰克福的欧洲央行主楼" },
    address: { en: "Sonnemannstrasse 20 (Main Building), 60314 Frankfurt am Main, Germany", zh: "Sonnemannstrasse 20（主楼），60314 Frankfurt am Main, Germany" },
    addressUrl: "https://www.ecb.europa.eu/ecb/contacts/address/html/index.en.html",
    credit: {
      author: "Hartmut Schmidt",
      licence: "CC BY-SA 4.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:European_Central_Bank_(EZB),_Frankfurt,_Germany.jpg",
    },
  },
  boe: {
    image: "/buildings/boe.jpg",
    width: 640,
    height: 480,
    alt: { en: "Bank of England on Threadneedle Street, London", zh: "伦敦针线街的英格兰银行" },
    address: { en: "Threadneedle Street, London EC2R 8AH", zh: "Threadneedle Street, London EC2R 8AH" },
    addressUrl: "https://www.bankofengland.co.uk/contact",
    credit: {
      author: "Robin Sones",
      licence: "CC BY-SA 2.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bank_of_England,_Threadneedle_Street_-_geograph.org.uk_-_6558813.jpg",
    },
  },
  boj: {
    image: "/buildings/boj.jpg",
    width: 1100,
    height: 825,
    alt: { en: "Bank of Japan head office, main building, Tokyo", zh: "日本银行总行主楼" },
    address: { en: "2-1-1 Nihonbashi-Hongokucho, Chuo-ku, Tokyo 103-0021, Japan", zh: "〒103-0021 东京都中央区日本桥本石町 2-1-1" },
    addressUrl: "https://www.boj.or.jp/en/about/outline/location/index.htm",
    credit: {
      author: "Hohoho",
      licence: "CC BY-SA 3.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bank_of_Japan_Head_Office_-_Main_building_from_south.jpg",
    },
  },
  boc: {
    image: "/buildings/boc.jpg",
    width: 1100,
    height: 753,
    alt: { en: "Bank of Canada head office, Ottawa", zh: "渥太华的加拿大银行总部" },
    address: { en: "234 Wellington Street, Ottawa, ON K1A 0G9", zh: "234 Wellington Street, Ottawa, ON K1A 0G9" },
    addressUrl: "https://www.bankofcanada.ca/about/contact-information/",
    credit: {
      author: "Wladyslaw",
      licence: "CC BY-SA 3.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ottawa_-_ON_-_Bank_of_Canada.jpg",
    },
  },
  pboc: {
    image: "/buildings/pboc-flag.jpg",
    width: 1100,
    height: 825,
    alt: { en: "People's Bank of China headquarters, Beijing", zh: "中国人民银行总行，北京" },
    address: { en: "No. 32 Chengfang Street, Xicheng District, Beijing 100800", zh: "北京市西城区成方街32号，邮编 100800" },
    addressUrl: "https://www.pbc.gov.cn/bangongting/135485/3310241/index.html",
    credit: {
      author: "Max12Max",
      licence: "CC BY-SA 4.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:People%27s_Bank_of_China_Headquarter,_Beijing.jpg",
    },
  },
  rbi: {
    image: "/buildings/rbi.jpg",
    width: 825,
    height: 1100,
    alt: { en: "Reserve Bank of India central office building, Mumbai", zh: "印度储备银行中央办公楼，孟买" },
    address: { en: "Central Office Building, Shahid Bhagat Singh Road, Mumbai 400 001", zh: "Central Office Building, Shahid Bhagat Singh Road, Mumbai 400 001" },
    addressUrl: "https://www.rbi.org.in/Scripts/AboutusDisplay.aspx?pg=Departments.htm",
    credit: {
      author: "Pinakpani",
      licence: "CC BY-SA 4.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tower_and_building_of_Reserve_Bank_of_India,_Mumbai_02.jpg",
    },
  },
  mas: {
    image: "/buildings/mas.jpg",
    width: 733,
    height: 1100,
    alt: { en: "MAS Building, 10 Shenton Way, Singapore", zh: "新加坡金管局大厦，珊顿道 10 号" },
    address: { en: "10 Shenton Way, MAS Building, Singapore 079117", zh: "10 Shenton Way, MAS Building, Singapore 079117" },
    addressUrl: "https://www.mas.gov.sg/contact-us",
    credit: {
      author: "Nicolas Lannuzel",
      licence: "CC BY-SA 2.0",
      licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:MASBuilding-Singapore-20090914.jpg",
    },
  },
  rba: {
    image: "/buildings/rba.jpg",
    width: 825,
    height: 1100,
    alt: { en: "Reserve Bank building, 65 Martin Place, Sydney", zh: "澳大利亚储备银行大楼，悉尼 65 Martin Place" },
    address: { en: "8 Chifley Square, Sydney NSW 2000", zh: "8 Chifley Square, Sydney NSW 2000" },
    addressUrl: "https://www.rba.gov.au/contact/locations.html",
    note: { en: "65 Martin Place is currently closed for refurbishment of the Reserve Bank building.", zh: "65 Martin Place 因储备银行大楼翻修，目前关闭。" },
    credit: {
      author: "Danausi",
      licence: "Public domain",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:RBA_Building.jpg",
    },
  },
}
