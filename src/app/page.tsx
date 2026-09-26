import { BankCard } from "@/components/bank-card"
import { RateChart } from "@/components/rate-chart"
import { banks, DATA_AS_OF } from "@/lib/banks"

export default function HomePage() {
  const hikes = banks.filter((bank) => bank.cycle.kind === "hike").length
  const holds = banks.filter((bank) => bank.cycle.kind === "hold").length
  const tightens = banks.filter((bank) => bank.cycle.kind === "tighten").length

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
            Monetary policy
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            全球央行货币政策
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            九家央行的政策立场对照。数字来自各机构官网或统计机构；官网打不开或没有写明的，用另一家权威来源印证，并标明来源类型。阅读日为{" "}
            {DATA_AS_OF}。德国、法国、意大利由欧洲央行代表，不单列政策利率。
          </p>
        </div>
        <p className="shrink-0 text-sm">
          <span className="text-muted-foreground">数据截至</span>{" "}
          <span className="font-semibold tabular-nums">{DATA_AS_OF}</span>
        </p>
      </header>

      <section className="mt-5 flex flex-wrap gap-2 text-sm" aria-label="周期分布">
        <span className="rounded-full bg-[#8c2f2b] px-3 py-1 text-white">加息 {hikes}</span>
        <span className="rounded-full bg-[#e6e0d4] px-3 py-1 text-[#3c3832]">维持 {holds}</span>
        <span className="rounded-full bg-[#8c2f2b] px-3 py-1 text-white">
          汇率带收紧 {tightens}
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">
          降息 0
        </span>
      </section>

      <section className="mt-6 min-w-0 rounded-xl bg-card px-3 py-4 ring-1 ring-foreground/10 sm:px-5">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-base font-semibold">政策利率对照</h2>
          <p className="text-xs text-muted-foreground">纵轴单位：百分比。柱顶为利率。</p>
        </div>
        <RateChart />
        <p className="mt-3 max-w-4xl text-xs leading-relaxed text-muted-foreground">
          柱从高到低排列。深红色是图中最高的政策利率（印度储备银行回购利率 5.25%）。美国柱高是联邦基金利率目标区间
          3.75%–4.00% 的中点，柱顶仍标区间。中国柱是政策利率，即 7天期逆回购操作利率
          1.40%（2025-05-08 起，2026-09-24 操作未变）；1年期 LPR 3.0% 与 5年期以上 LPR
          3.5% 写在卡片上，不并进这根柱。新加坡不设政策利率，不在图中；其工具是 S$NEER
          政策带，2026年7月27日非常轻微上调升值斜率，官方和媒体报道都没有公布基点。
        </p>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {banks.map((bank) => (
          <BankCard key={bank.id} bank={bank} />
        ))}
      </section>
    </main>
  )
}
