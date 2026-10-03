import { DATA_AS_OF, type Source } from "@/lib/banks"

export type PolicyEvidence = {
  label: string
  headline: string
  detail: string
  source: Source
}

export type PolicyProfile = {
  phase: PolicyEvidence
  outlook: PolicyEvidence
  guidance: PolicyEvidence
  toolkit: PolicyEvidence
  transparency: PolicyEvidence
  architectureSource: Source
}

const official = (institution: string, title: string, url: string): Source => ({
  kind: "official",
  institution,
  title,
  url,
  readOn: DATA_AS_OF,
})

const fedDecision = official("Federal Reserve", "FOMC statement — 16 September 2026", "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm")
const fedImplementation = official("Federal Reserve", "Implementation Note — 16 September 2026", "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a1.htm")
const ecbDecision = official("European Central Bank", "Monetary policy decisions — 10 September 2026", "https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.mp260910~314e508016.en.html")
const boeDecision = official("Bank of England", "MPC Summary and Minutes — September 2026", "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/september-2026")
const bojDecision = official("Bank of Japan", "Change in the Guideline for Money Market Operations — September 2026", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260918b.pdf")
const bojFullDecision = official("Bank of Japan", "Monetary Policy Meeting decision and outlook — September 2026", "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260918a.pdf")
const bocDecision = official("Bank of Canada", "Policy-rate decision — 2 September 2026", "https://www.bankofcanada.ca/2026/09/fad-press-release-2026-09-02/")
const bocFramework = official("Bank of Canada", "Understanding our policy interest rate", "https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/")
const pbocMeeting = official("People's Bank of China", "Monetary Policy Committee Q3 2026 meeting", "https://www.pbc.gov.cn/goutongjiaoliu/113456/113469/2026092416074632670/index.html")
const pbocRate = official("People's Bank of China", "Open-market operation announcement No. 189 of 2026", "https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125431/125475/2026092408454713496/index.html")
const pbocDepartment = official("People's Bank of China", "Monetary Policy Department", "https://www.pbc.gov.cn/zhengcehuobisi/125207/index.html")
const rbiDecision = official("Reserve Bank of India", "Monetary Policy Statement — 3 to 5 August 2026", "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63287")
const masDecision = official("Monetary Authority of Singapore", "MAS Monetary Policy Statement — July 2026", "https://www.mas.gov.sg/news/monetary-policy-statements/2026/mas-monetary-policy-statement-27jul26")
const masFramework = official("Monetary Authority of Singapore", "Singapore's monetary policy framework — FAQ section 4", "https://www.mas.gov.sg/monetary-policy/singapores-monetary-policy-framework/faqs/section-4")
const rbaDecision = official("Reserve Bank of Australia", "Monetary Policy Decision — 29 September 2026", "https://www.rba.gov.au/media-releases/2026/mr-26-27.html")
const rbaRole = official("Reserve Bank of Australia", "Our role", "https://www.rba.gov.au/about-rba/our-role.html")

export const policyProfiles: Record<string, PolicyProfile> = {
  fed: {
    phase: { label: "Policy cycle", headline: "Renewed tightening", detail: "Five holds were followed by a 25 bp increase in September.", source: fedDecision },
    outlook: { label: "Official assessment", headline: "Solid activity; inflation elevated", detail: "The FOMC described activity as expanding at a solid pace, job gains as keeping pace with labour-force growth, and inflation as elevated.", source: fedDecision },
    guidance: { label: "Forward guidance", headline: "No numerical path was signalled", detail: "The statement commits to price stability and says the increase supports a timelier return to 2%, but it does not specify the next rate move.", source: fedDecision },
    toolkit: { label: "Policy toolkit", headline: "Target range plus administered rates", detail: "The 3.75–4.00% target range is implemented with a 3.75% ON RRP rate and a 4.00% standing repo rate.", source: fedImplementation },
    transparency: { label: "Decision signal", headline: "12–0", detail: "All voting FOMC members supported the September increase.", source: fedDecision },
    architectureSource: fedDecision,
  },
  ecb: {
    phase: { label: "Policy cycle", headline: "Renewed tightening", detail: "The deposit rate rose in June and again in September after a July pause.", source: ecbDecision },
    outlook: { label: "Official projections", headline: "3.0% inflation in 2026", detail: "Staff projected headline inflation at 3.0% in 2026, 2.5% in 2027 and 2.1% in 2028; growth at 0.9%, 1.4% and 1.5%.", source: ecbDecision },
    guidance: { label: "Forward guidance", headline: "Meeting by meeting", detail: "Decisions remain data-dependent, with no pre-commitment to a particular rate path.", source: ecbDecision },
    toolkit: { label: "Policy toolkit", headline: "Three rates plus balance-sheet runoff", detail: "The deposit, refinancing and marginal-lending rates set the corridor while APP and PEPP portfolios decline as securities mature.", source: ecbDecision },
    transparency: { label: "Decision signal", headline: "No vote tally in the release", detail: "The published decision explains the collective Governing Council assessment but does not list an individual vote count.", source: ecbDecision },
    architectureSource: ecbDecision,
  },
  boe: {
    phase: { label: "Policy cycle", headline: "Restrictive hold", detail: "Bank Rate has stayed at 3.75% while the internal pressure to tighten has increased.", source: boeDecision },
    outlook: { label: "Official projection", headline: "Inflation slightly above 4% in 2027 Q1", detail: "The September minutes put CPI near 3.75% in 2026 Q4 and slightly above 4% in 2027 Q1, largely because of energy.", source: boeDecision },
    guidance: { label: "Forward guidance", headline: "Ready to act if needed", detail: "The MPC judged inflation risks tilted further to the upside and said it stands ready to act to keep inflation on track for 2%.", source: boeDecision },
    toolkit: { label: "Policy toolkit", headline: "Bank Rate plus a fixed QT plan", detail: "Alongside Bank Rate, the MPC plans to unwind the remaining monetary-policy gilt stock at an average £46bn a year through September 2034.", source: boeDecision },
    transparency: { label: "Decision signal", headline: "6–3 hold", detail: "Six members voted to hold; three preferred a 25 bp rise to 4.00%.", source: boeDecision },
    architectureSource: boeDecision,
  },
  boj: {
    phase: { label: "Policy cycle", headline: "Gradual normalisation", detail: "The overnight-rate guideline increased in June and again in September.", source: bojDecision },
    outlook: { label: "Official assessment", headline: "Underlying inflation moving toward 2%", detail: "The Board expects underlying CPI to gradually increase and sees upside risks to prices.", source: bojFullDecision },
    guidance: { label: "Forward guidance", headline: "Further adjustment if the outlook is realised", detail: "The Bank said it would continue to raise the policy rate and adjust accommodation as the outlook materialises.", source: bojFullDecision },
    toolkit: { label: "Policy toolkit", headline: "Call-rate target plus administered facilities", detail: "The overnight call-rate guideline is around 1.25%; the complementary deposit rate is 1.25% and the basic loan rate is 1.50%.", source: bojFullDecision },
    transparency: { label: "Decision signal", headline: "7–2", detail: "Seven Policy Board members supported the September rate guideline; two dissented.", source: bojFullDecision },
    architectureSource: bojFullDecision,
  },
  boc: {
    phase: { label: "Policy cycle", headline: "Extended hold", detail: "The overnight-rate target has remained at 2.25% through all six 2026 decisions shown.", source: bocFramework },
    outlook: { label: "Official assessment", headline: "Recovery broadening; inflation risks higher", detail: "The Bank saw a broader recovery and continued excess supply, while energy and tariffs increased upside risks to inflation.", source: bocDecision },
    guidance: { label: "Forward guidance", headline: "Prepared to adjust as needed", detail: "Governing Council will assess the durability of the recovery and the inflation outlook rather than commit to a rate path.", source: bocDecision },
    toolkit: { label: "Policy toolkit", headline: "Overnight target and operating band", detail: "The target for the overnight rate anchors short-term rates; Bank Rate and the deposit rate form the operating setup.", source: bocFramework },
    transparency: { label: "Decision signal", headline: "Collective decision", detail: "The release reports that Governing Council agreed to hold, without publishing an individual member tally.", source: bocDecision },
    architectureSource: bocFramework,
  },
  pboc: {
    phase: { label: "Policy cycle", headline: "Supportive hold", detail: "The 7-day reverse-repo policy rate remained 1.40% at the latest operation; policy support is delivered through several tools.", source: pbocRate },
    outlook: { label: "Official assessment", headline: "Support growth and a reasonable price recovery", detail: "The Q3 meeting called for balancing stable growth, employment, price recovery and financial stability.", source: pbocMeeting },
    guidance: { label: "Policy guidance", headline: "Appropriately accommodative", detail: "The committee called for stronger counter-cyclical adjustment and ample liquidity.", source: pbocMeeting },
    toolkit: { label: "Policy toolkit", headline: "Rates, reserves and structural tools", detail: "Open-market operations, reserve requirements, structural instruments and credit guidance work together; the 7-day repo is not the whole stance.", source: pbocDepartment },
    transparency: { label: "Decision signal", headline: "No policy-rate vote disclosed", detail: "The Monetary Policy Committee is consultative; operational rate decisions are not presented as MPC vote tallies.", source: pbocDepartment },
    architectureSource: pbocDepartment,
  },
  rbi: {
    phase: { label: "Policy cycle", headline: "Neutral hold", detail: "The repo rate has stayed at 5.25% through four 2026 meetings after the December 2025 cut.", source: rbiDecision },
    outlook: { label: "Official assessment", headline: "Inflation and growth assessed together", detail: "The August statement kept the flexible inflation-targeting framework at the centre of the growth-inflation assessment.", source: rbiDecision },
    guidance: { label: "Policy guidance", headline: "Neutral stance", detail: "The neutral stance preserves flexibility to respond to the incoming inflation and growth outlook.", source: rbiDecision },
    toolkit: { label: "Policy toolkit", headline: "Repo-led liquidity corridor", detail: "The policy repo rate under the liquidity adjustment facility anchors short-term funding conditions.", source: rbiDecision },
    transparency: { label: "Decision signal", headline: "Unanimous hold", detail: "All MPC members voted to keep the repo rate unchanged at 5.25%.", source: rbiDecision },
    architectureSource: rbiDecision,
  },
  mas: {
    phase: { label: "Policy cycle", headline: "Measured FX tightening", detail: "MAS increased the S$NEER slope in April and very slightly again in July.", source: masDecision },
    outlook: { label: "Official forecast", headline: "1.5–2.5% inflation in 2026", detail: "MAS projected both core and all-items inflation at 1.5–2.5%, with the economy expanding at a firm pace.", source: masDecision },
    guidance: { label: "Policy guidance", headline: "Close monitoring, no rate path", detail: "MAS will monitor growth and inflation risks within an exchange-rate framework rather than signal an interest-rate path.", source: masDecision },
    toolkit: { label: "Policy toolkit", headline: "Slope, width and centre of the S$NEER band", detail: "The July move increased the slope very slightly while leaving the band width and centre unchanged.", source: masDecision },
    transparency: { label: "Decision signal", headline: "No public vote tally", detail: "The policy statement publishes the authority's decision, not individual committee votes.", source: masFramework },
    architectureSource: masFramework,
  },
  rba: {
    phase: { label: "Policy cycle", headline: "Active tightening", detail: "September delivered the fourth 25 bp increase of 2026, taking the cash rate to 4.60%.", source: rbaDecision },
    outlook: { label: "Official assessment", headline: "Inflation risks are materialising", detail: "The Board said inflation was elevated and some upside risks had materialised, while labour-market conditions remained tight.", source: rbaDecision },
    guidance: { label: "Forward guidance", headline: "Further tightening remains possible", detail: "The Board said it would do what is necessary to return inflation to target and did not rule out further rate increases.", source: rbaDecision },
    toolkit: { label: "Policy toolkit", headline: "Cash-rate target as the active instrument", detail: "The cash-rate target influences funding costs, credit, demand and the exchange rate.", source: rbaRole },
    transparency: { label: "Decision signal", headline: "Unanimous increase", detail: "The Monetary Policy Board voted unanimously for the September 25 bp rise.", source: rbaDecision },
    architectureSource: rbaRole,
  },
}
