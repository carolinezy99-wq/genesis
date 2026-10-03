"use client"

import Image from "next/image"
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react"
import { banks } from "@/lib/banks"
import { policyContext } from "@/lib/analysis"
import { bankTabLabel, presentBank, type Locale } from "@/lib/copy"

const tone = {
  tightening: {
    card: "border-[#ec694c]/30 bg-[#fff5f1]",
    pill: "bg-[#ec694c] text-white",
    icon: ArrowUpRight,
  },
  holding: {
    card: "border-[#477694]/25 bg-[#f2f7f9]",
    pill: "bg-[#477694] text-white",
    icon: ArrowRight,
  },
  easing: {
    card: "border-[#2b9c78]/25 bg-[#effaf5]",
    pill: "bg-[#2b9c78] text-white",
    icon: ArrowDownRight,
  },
  unclear: {
    card: "border-border bg-card",
    pill: "bg-muted text-foreground",
    icon: ArrowRight,
  },
}

export function BankGallery({ locale, onSelect }: { locale: Locale; onSelect: (id: string) => void }) {
  return (
    <section aria-label={locale === "zh" ? "央行一览" : "Central bank gallery"}>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-[#d86545] uppercase">
            {locale === "zh" ? "决策者与政策脉搏" : "Decision makers & policy pulse"}
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            {locale === "zh" ? "九家央行，一屏速览" : "Nine banks at a glance"}
          </h2>
        </div>
        <p className="hidden max-w-md text-right text-xs text-muted-foreground sm:block">
          {locale === "zh" ? "颜色表示最近一次决定的方向；点击进入央行档案。" : "Action shows what changed; bias shows the broader policy direction. Select a card for the full profile."}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {banks.map((bank) => {
          const view = presentBank(bank, locale)
          const style = tone[view.stance]
          const context = policyContext[bank.id]
          const Direction = style.icon
          return (
            <button
              key={bank.id}
              type="button"
              onClick={() => onSelect(bank.id)}
              className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${style.card}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
                  <Image src={bank.head.photo} alt={view.photoAlt} fill sizes="64px" className="object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-muted-foreground">{bankTabLabel[bank.id][locale]}</p>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.pill}`}>
                        <Direction className="h-3 w-3" />Action · {view.stanceLabel}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ring-1 ${bank.id === "pboc" ? "bg-[#dff4ea] text-[#1f7658] ring-[#2b9c78]/25" : "bg-white/70 text-[#52616b] ring-black/10"}`}>
                        Bias · {context.biasTag}
                      </span>
                    </div>
                  </div>
                  <p className="mt-0.5 truncate text-sm font-semibold">{view.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{view.bodyName}</p>
                </div>
              </div>
              <div className="mt-3 flex items-end justify-between border-t border-black/8 pt-2.5">
                <div>
                  <p className="text-[10px] tracking-wide text-muted-foreground uppercase">{view.policyName}</p>
                  <p className="mt-0.5 text-xl font-semibold tabular-nums tracking-tight">{view.policyDisplay}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] tracking-wide text-muted-foreground uppercase">{locale === "zh" ? "通胀 / 目标" : "Inflation / target"}</p>
                  <p className="mt-0.5 text-sm font-semibold tabular-nums">{view.latestValue} <span className="font-normal text-muted-foreground">/ {view.targetDisplay}</span></p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
