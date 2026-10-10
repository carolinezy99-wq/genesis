"use client"

import Image from "next/image"
import { Landmark } from "lucide-react"
import { banks, DATA_AS_OF } from "@/lib/banks"
import { chartName, type Locale } from "@/lib/copy"
import { stanceColor, summary } from "@/lib/metrics"
import { headquarters } from "@/lib/places"

const featured = [
  { id: "fed", layout: "col-span-6" },
  { id: "ecb", layout: "col-span-6" },
  { id: "boe", layout: "col-span-4" },
  { id: "boj", layout: "col-span-4" },
  { id: "boc", layout: "col-span-4" },
  { id: "pboc", layout: "col-span-3" },
  { id: "rbi", layout: "col-span-3" },
  { id: "mas", layout: "col-span-3" },
  { id: "rba", layout: "col-span-3" },
]

export function OverviewHero({ locale }: { locale: Locale }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const s = summary(locale)
  return (
    <section className="hero-shell relative overflow-hidden rounded-[1.75rem] bg-[#0b2034] text-white shadow-[0_28px_70px_-38px_rgba(8,30,49,0.9)]">
        <div className="overview-collage-enter absolute inset-y-0 right-0 hidden w-[53%] grid-cols-12 grid-rows-3 gap-px bg-white/20 md:grid">
          {featured.map(({ id, layout }) => {
            const place = headquarters[id]
            const bank = banks.find((item) => item.id === id)
            return place ? (
              <div key={id} className={`group relative overflow-hidden bg-[#17344b] ${layout}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${place.image}`}
                  alt=""
                  aria-hidden="true"
                  fill
                  priority
                  sizes="360px"
                  className="scale-110 object-cover opacity-35 blur-lg saturate-75"
                />
                <div className="absolute inset-1.5 overflow-hidden rounded-[4px] bg-[#e6ecef]/15 shadow-[0_10px_24px_-14px_rgba(0,0,0,.8)]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${place.image}`}
                    alt={place.alt[locale]}
                    fill
                    priority
                    sizes="360px"
                    className="object-contain saturate-[.82] contrast-[1.04] transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#071725]/90 to-transparent" />
                {bank ? (
                  <span className="absolute right-2 bottom-1.5 left-2 block truncate text-[8px] font-semibold tracking-[0.13em] text-white/90 uppercase">
                    {chartName(bank, locale)}
                  </span>
                ) : null}
              </div>
            ) : null
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[43%] hero-grid opacity-20" />

        <div className="overview-copy-enter relative z-10 px-5 py-7 sm:px-8 sm:py-9 md:w-[40%] lg:py-11">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase backdrop-blur">
            <Landmark className="h-3.5 w-3.5" /> {label("全球货币政策观察", "Global monetary policy monitor")}
          </div>
          <h2 className="mt-5 max-w-2xl text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-4xl">
            {label("九家央行，一张政策全景图。", "Nine central banks. One policy picture.")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            {label("对照政策利率、通胀缺口、最近决策与下一次会议。", "Compare policy rates, inflation gaps, latest decisions and the next meeting on a single research surface.")}
          </p>
          <div className="mt-7 grid max-w-2xl grid-cols-2 gap-2 xl:grid-cols-4">
            {[
              { label: label("收紧", "Tightening"), value: s.tightening, color: stanceColor.tightening },
              { label: label("维持", "Holding"), value: s.holding, color: stanceColor.holding },
              { label: label("放松", "Easing"), value: s.easing, color: stanceColor.easing },
              { label: label("数据截至", "Data as of"), value: DATA_AS_OF.slice(5), color: "#d7b46a" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/[.075] px-3 py-3 backdrop-blur-md">
                <p className="flex items-center gap-1.5 text-[10px] tracking-wide text-white/55 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />{item.label}
                </p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}
