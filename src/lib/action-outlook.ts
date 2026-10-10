export type LocalizedPoint = { en: string; zh: string }

export type ActionOutlook = {
  recent: LocalizedPoint[]
  forecast: LocalizedPoint[]
}

const p = (en: string, zh: string): LocalizedPoint => ({ en, zh })

export const actionOutlooks: Record<string, ActionOutlook> = {
  fed: {
    recent: [
      p("Raised the federal funds target range by 25 bp to 3.75–4.00% in September.", "9 月将联邦基金目标区间上调 25 个基点至 3.75%–4.00%。"),
      p("The increase followed five consecutive holds and was approved unanimously.", "此次加息结束了连续五次维持，且获全体一致通过。"),
      p("Officials still describe inflation as elevated while activity remains solid.", "官员仍认为通胀偏高，同时经济活动保持稳健。"),
    ],
    forecast: [
      p("Base case: hold or tighten again; near-term easing looks unlikely.", "基准情景：维持或再次加息，近期降息可能性较低。"),
      p("Another 25 bp increase becomes more likely if inflation stays sticky.", "若通胀继续具有黏性，再加息 25 个基点的概率将上升。"),
      p("A softer labour market would favour a longer pause rather than an immediate cut.", "若劳动力市场走弱，更可能延长暂停期，而非立即降息。"),
    ],
  },
  ecb: {
    recent: [
      p("Raised the deposit facility rate by 25 bp to 2.50% in September.", "9 月将存款便利利率上调 25 个基点至 2.50%。"),
      p("The move followed a July pause and a previous increase in June.", "此次行动发生在 7 月暂停之后，6 月也曾加息。"),
      p("APP and PEPP portfolios continue to decline as securities mature.", "APP 与 PEPP 资产组合继续随到期而缩减。"),
    ],
    forecast: [
      p("Base case: a meeting-by-meeting tightening bias, with pauses between moves.", "基准情景：保持逐次会议决定的收紧倾向，并可能在行动之间暂停。"),
      p("Persistent services or energy inflation would support another increase.", "若服务或能源通胀持续偏高，将支持再次加息。"),
      p("A clearer inflation slowdown would shift the next decision toward a hold.", "若通胀明显回落，下一次决定将更倾向于维持。"),
    ],
  },
  boe: {
    recent: [
      p("Held Bank Rate at 3.75% in September by a 6–3 vote.", "9 月以 6 比 3 的投票结果将银行利率维持在 3.75%。"),
      p("Three MPC members preferred a 25 bp increase to 4.00%.", "三名货币政策委员会成员倾向加息 25 个基点至 4.00%。"),
      p("The MPC judged inflation risks to have shifted further to the upside.", "货币政策委员会认为通胀风险进一步偏向上行。"),
    ],
    forecast: [
      p("Base case: hold near term, but with a meaningful risk of a hike.", "基准情景：近期维持，但加息风险已不可忽视。"),
      p("Energy-driven inflation or stronger second-round effects could trigger tightening.", "能源推动的通胀或更强的二轮效应可能触发收紧。"),
      p("Rate cuts look unlikely until inflation shows a durable return toward 2%.", "在通胀持续回到 2% 附近之前，降息可能性较低。"),
    ],
  },
  boj: {
    recent: [
      p("Raised the overnight call-rate guideline to around 1.25% in September.", "9 月将隔夜拆借利率指引上调至约 1.25%。"),
      p("The decision passed 7–2 and followed an earlier increase in June.", "该决定以 7 比 2 通过，此前 6 月已加息一次。"),
      p("The Bank continues to frame policy as gradual normalisation.", "日本银行继续将政策描述为渐进式正常化。"),
    ],
    forecast: [
      p("Base case: further gradual increases if wages and underlying inflation evolve as projected.", "基准情景：若工资和基础通胀符合预测，将继续渐进加息。"),
      p("The pace is likely to remain slower than at other tightening central banks.", "加息节奏可能继续慢于其他处于收紧周期的央行。"),
      p("Weaker growth or sharp market volatility would favour a pause.", "若增长走弱或市场剧烈波动，更可能选择暂停。"),
    ],
  },
  boc: {
    recent: [
      p("Held the overnight-rate target at 2.25% in September.", "9 月将隔夜利率目标维持在 2.25%。"),
      p("The target has been unchanged through all six 2026 decisions shown.", "本页面所列 2026 年六次决定均维持不变。"),
      p("The Bank sees a broader recovery but still notes excess supply and inflation risks.", "加拿大银行认为复苏范围扩大，但仍存在过剩供给和通胀风险。"),
    ],
    forecast: [
      p("Base case: another hold while the Bank tests the durability of the recovery.", "基准情景：继续维持，以观察复苏是否具有持续性。"),
      p("Energy and tariff pressure create an upside risk to rates.", "能源与关税压力构成利率上行风险。"),
      p("Clearer disinflation alongside weak demand would reopen the easing discussion.", "若需求疲弱且通胀更明显回落，宽松讨论可能重启。"),
    ],
  },
  pboc: {
    recent: [
      p("Kept the 7-day reverse-repo operation rate at 1.40% in late September.", "9 月下旬将 7 天期逆回购操作利率维持在 1.40%。"),
      p("The Q3 policy meeting retained an appropriately accommodative stance.", "第三季度货币政策委员会例会继续保持适度宽松立场。"),
      p("Support has also come through targeted and structural instruments, not only the headline rate.", "政策支持也通过定向与结构性工具实施，并非只依赖主要利率。"),
    ],
    forecast: [
      p("Base case: targeted liquidity and credit support before a broad policy-rate move.", "基准情景：在全面调整政策利率前，优先使用定向流动性和信贷支持。"),
      p("A 7-day rate cut becomes more likely if growth or price recovery weakens materially.", "若增长或价格回升明显走弱，7 天期利率下调的可能性将上升。"),
      p("There is no scheduled rate-meeting calendar, so operational changes can arrive between meetings.", "中国人民银行没有固定利率会议日程，操作调整可能随时发生。"),
    ],
  },
  rbi: {
    recent: [
      p("Raised the policy repo rate by 25 bp to 5.50% on 7 October.", "10 月 7 日将政策回购利率上调 25 个基点至 5.50%。"),
      p("The six-member MPC approved the increase unanimously.", "六名货币政策委员会成员全体一致支持加息。"),
      p("The stance changed from neutral to calibrated tightening.", "政策立场由中性转为校准式收紧。"),
    ],
    forecast: [
      p("Base case for December: hike or hold; a near-term cut is off the table.", "12 月基准情景：加息或维持，近期降息基本不在考虑范围内。"),
      p("Another increase becomes more likely if underlying inflation remains firm.", "若基础通胀保持强劲，再次加息的可能性将上升。"),
      p("A pause would require clearer evidence that price pressure is stabilising.", "暂停加息需要更明确的价格压力趋稳证据。"),
    ],
  },
  mas: {
    recent: [
      p("Raised the S$NEER policy-band slope very slightly in July.", "7 月非常小幅地提高新元名义有效汇率政策区间斜率。"),
      p("The move followed a slight slope increase in April.", "此前 4 月已小幅提高斜率。"),
      p("The width and centre of the policy band were left unchanged.", "政策区间宽度和中心位置保持不变。"),
    ],
    forecast: [
      p("Base case: maintain the current slope or tighten only incrementally.", "基准情景：维持当前斜率，或仅进行渐进式收紧。"),
      p("Persistent imported inflation would favour another slight steepening.", "若输入性通胀持续，将更支持再次小幅提高斜率。"),
      p("Easing would require a material deterioration in growth and inflation prospects.", "只有增长与通胀前景明显恶化，才更可能转向宽松。"),
    ],
  },
  rba: {
    recent: [
      p("Raised the cash-rate target by 25 bp to 4.60% in September.", "9 月将现金利率目标上调 25 个基点至 4.60%。"),
      p("That was the fourth 25 bp increase of 2026 and was approved unanimously.", "这是 2026 年第四次加息 25 个基点，并获全体一致通过。"),
      p("The Board says inflation remains elevated and the labour market is tight.", "董事会认为通胀仍然偏高，劳动力市场依然紧张。"),
    ],
    forecast: [
      p("Base case: retain a tightening bias, with another 25 bp move possible.", "基准情景：继续保持收紧倾向，并可能再次加息 25 个基点。"),
      p("A renewed upside inflation surprise would strengthen the case for a hike.", "若通胀再次意外上行，加息理由将进一步增强。"),
      p("A sharper slowdown in demand or employment would favour a pause.", "若需求或就业明显放缓，则更可能暂停。"),
    ],
  },
}
