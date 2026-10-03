import Image from "next/image"
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Eye,
  Landmark,
  ShieldCheck,
  Telescope,
  Vote,
  Wrench,
} from "lucide-react"
import { DecisionStrip } from "@/components/decision-strip"
import { SourceLink } from "@/components/source-link"
import { policyContext } from "@/lib/analysis"
import type { Bank, Source } from "@/lib/banks"
import { kindLabel, presentBank, sourceTitle, ui, type Locale } from "@/lib/copy"
import { history, HISTORY_CHECKED_ON } from "@/lib/history"
import { metricsFor, signed, stanceColor } from "@/lib/metrics"
import { policyProfiles, type PolicyEvidence } from "@/lib/policy-profile"

const portraitFrame: Record<string, { position: string; zoom: number }> = {
  boc: { position: "49% 30%", zoom: 1.15 },
  rba: { position: "49% 38%", zoom: 1.7 },
  rbi: { position: "50% 20%", zoom: 2.3 },
  boe: { position: "50% 30%", zoom: 1.1 },
}

function Portrait({ bank, alt }: { bank: Bank; alt: string }) {
  const frame = portraitFrame[bank.id] ?? { position: "50% 25%", zoom: 1 }
  return (
    <div className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-2xl ring-1 ring-white/25 sm:h-52 sm:w-40">
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${bank.head.photo}`}
        alt={alt}
        fill
        sizes="160px"
        priority
        className="object-cover"
        style={{ objectPosition: frame.position, transform: `scale(${frame.zoom})`, transformOrigin: frame.position }}
      />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/50 to-transparent" />
    </div>
  )
}

function Checked({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase ${dark ? "text-white/60" : "text-emerald-700"}`}>
      <ShieldCheck className="h-3 w-3" /> Cross-checked · {HISTORY_CHECKED_ON}
    </span>
  )
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div>
        <p className="text-[10px] font-bold tracking-[0.2em] text-[#b4532a] uppercase">{eyebrow}</p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#17364a]">{title}</h3>
      </div>
      {copy ? <p className="max-w-xl text-xs leading-relaxed text-slate-500 sm:text-right">{copy}</p> : null}
    </div>
  )
}

function EvidenceCard({ item, icon, accent }: { item: PolicyEvidence; icon: React.ReactNode; accent: string }) {
  return (
    <a
      href={item.source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-52 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_-26px_rgba(15,23,42,0.65)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_-24px_rgba(15,23,42,0.55)]"
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm" style={{ backgroundColor: accent }}>{icon}</span>
        <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-600" />
      </div>
      <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase">{item.label}</p>
      <h4 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-slate-900">{item.headline}</h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.detail}</p>
      <p className="mt-4 border-t border-slate-100 pt-3 text-[10px] font-medium text-slate-400 group-hover:text-slate-600">
        Original source · {item.source.institution}
      </p>
    </a>
  )
}

function SourceLine({ source, locale }: { source: Source; locale: Locale }) {
  const copy = ui[locale]
  return (
    <p className="break-words">
      <span className="mr-1 inline-block rounded bg-slate-100 px-1 py-px text-[10px] text-slate-600">{kindLabel(source.kind, locale)}</span>
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2 hover:decoration-slate-700">
        {sourceTitle(source, locale)}
      </a>
      <span className="text-slate-400"> · {copy.readOn} {source.readOn}</span>
    </p>
  )
}

function LinkedArchitectureFact({ label, value, url }: { label: string; value: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-slate-200/80 bg-white/85 p-4 transition hover:border-[#477694]/40 hover:bg-white">
      <span className="flex items-center justify-between gap-2 text-[10px] font-bold tracking-[0.14em] text-slate-400 uppercase">
        {label}<ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-slate-700">{value}</span>
    </a>
  )
}

export function BankPanel({ bank, locale }: { bank: Bank; locale: Locale }) {
  const copy = ui[locale]
  const view = presentBank(bank, locale)
  const m = metricsFor(bank, locale)
  const h = history[bank.id]
  const context = policyContext[bank.id]
  const profile = policyProfiles[bank.id]
  const noRate = m.policyRate == null
  const daysToMeeting = h?.nextMeeting
    ? Math.max(0, Math.ceil((new Date(`${h.nextMeeting.date}T00:00:00Z`).getTime() - new Date(`${HISTORY_CHECKED_ON}T00:00:00Z`).getTime()) / 86_400_000))
    : null
  const headlineValue = h?.headline ? Number.parseFloat(h.headline.value) : null
  const coreValue = h?.core ? Number.parseFloat(h.core.value) : null
  const inflationSpread = headlineValue != null && coreValue != null ? headlineValue - coreValue : null
  const spreadPosition = inflationSpread == null ? 50 : Math.max(4, Math.min(96, ((inflationSpread + 1.5) / 3) * 100))
  const spreadReading = inflationSpread == null
    ? null
    : inflationSpread >= 0.3
      ? { tag: "Headline running higher", text: "Volatile components are adding more to current inflation than the underlying basket.", tone: "bg-[#f7ead4] text-[#8a5d20]" }
      : inflationSpread <= -0.3
        ? { tag: "Core running higher", text: "Underlying price pressure is firmer than the headline rate suggests.", tone: "bg-[#f8e3dd] text-[#a44832]" }
        : { tag: "Broadly aligned", text: "Headline and core inflation are sending a similar price-pressure signal.", tone: "bg-[#e8f1f5] text-[#356079]" }

  const sourceRegister = Array.from(new Map([
    bank.primarySource,
    bank.inflationActual.source,
    m.targetSource,
    ...bank.sources,
    profile.phase.source,
    profile.outlook.source,
    profile.guidance.source,
    profile.toolkit.source,
    profile.transparency.source,
    profile.architectureSource,
  ].map((source) => [source.url, source])).values())

  return (
    <article className="grid gap-5">
      <section className="relative overflow-hidden rounded-3xl bg-[#17364a] p-5 text-white shadow-[0_24px_70px_-38px_rgba(15,23,42,0.9)] sm:p-7">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#477694]/30 blur-2xl" />
        <div className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-[#b4532a]/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <a href={bank.head.photoPageUrl} target="_blank" rel="noopener noreferrer" className="group relative w-fit">
            <Portrait bank={bank} alt={view.photoAlt} />
            <span className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#17364a] opacity-90 shadow transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold tracking-[0.16em] text-white/55 uppercase"><Checked dark /></div>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{view.name}</h2>
            <a href={bank.head.photoPageUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-white">
              {view.title} of the {view.institution}<ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={bank.primarySource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#17364a] transition hover:-translate-y-0.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stanceColor[m.stance] }} />Latest action · {view.stanceLabel}<ArrowUpRight className="h-3 w-3" />
              </a>
              <a href={profile.phase.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15">
                Policy bias · {context.biasTag}<ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
          <a href={profile.phase.source.url} target="_blank" rel="noopener noreferrer" className="group w-full rounded-2xl bg-white/8 p-4 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-white/12 sm:w-64 sm:shrink-0">
            <span className="flex items-center justify-between text-[10px] font-bold tracking-[0.14em] text-white/55 uppercase">Policy cycle <ArrowUpRight className="h-3.5 w-3.5" /></span>
            <strong className="mt-2 block text-xl tracking-tight">{profile.phase.headline}</strong>
            <span className="mt-1 block text-xs leading-relaxed text-white/65">{profile.phase.detail}</span>
          </a>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="01 · Policy snapshot" title="The decision in one screen" copy="Each fact appears once. Select any source icon or card to open the underlying release." />
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.35fr_0.9fr]">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#edf4f7]" />
            <div className="relative">
              <a href={m.policySource.url} target="_blank" rel="noopener noreferrer" className="group block">
                <span className="flex items-center justify-between text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase">Current setting <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                <p className={`mt-5 font-semibold tracking-[-0.04em] tabular-nums ${noRate ? "text-2xl text-slate-500" : "text-5xl text-[#17364a]"}`}>{noRate ? "No policy rate" : view.policyDisplay}</p>
                <p className="mt-2 text-sm font-medium text-slate-700">{view.policyName}</p>
                <p className="mt-1 text-xs text-slate-500">{view.policyAsOf}</p>
                {view.secondary.length > 0 ? (
                  <div className="mt-5 grid gap-2 border-t border-slate-100 pt-4">
                    {view.secondary.map((rate) => (
                      <div key={rate.key} className="flex items-baseline justify-between gap-3 text-xs">
                        <span className="text-slate-500">{rate.name}</span>
                        <strong className="tabular-nums text-slate-800">{rate.display}</strong>
                      </div>
                    ))}
                  </div>
                ) : null}
              </a>
              <a href={profile.transparency.source.url} target="_blank" rel="noopener noreferrer" className="group mt-5 block rounded-xl bg-[#f7f2e9] p-3 ring-1 ring-[#c79543]/15 transition hover:bg-[#f3eadb]">
                <span className="flex items-center justify-between text-[10px] font-bold tracking-[0.14em] text-[#8a6633] uppercase"><span className="inline-flex items-center gap-1.5"><Vote className="h-3.5 w-3.5" />{profile.transparency.label}</span><ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                <strong className="mt-2 block text-xl tracking-tight text-slate-900">{profile.transparency.headline}</strong>
                <span className="mt-1 block text-[11px] leading-relaxed text-slate-600">{profile.transparency.detail}</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-[#b4532a]" /><span className="text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase">Inflation pulse</span></div>
              <Checked />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <a href={m.inflationSource.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-[#f8fafb] p-3 transition hover:bg-[#edf4f7]">
                <span className="flex items-center justify-between text-[10px] text-slate-500">Latest <ArrowUpRight className="h-3 w-3" /></span>
                <strong className="mt-1 block text-2xl tabular-nums text-slate-900">{bank.inflationActual.display}</strong>
                <span className="mt-1 block text-[10px] leading-snug text-slate-500">{h?.headline?.measure ?? view.latestGauge} · {h?.headline?.period ?? view.latestPeriod}</span>
              </a>
              <a href={h?.core?.url ?? m.inflationSource.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-[#f8fafb] p-3 transition hover:bg-[#edf4f7]">
                <span className="flex items-center justify-between text-[10px] text-slate-500">Core <ArrowUpRight className="h-3 w-3" /></span>
                <strong className={`mt-1 block text-2xl tabular-nums ${h?.core ? "text-slate-900" : "text-slate-300"}`}>{h?.core?.value ?? "—"}</strong>
                <span className="mt-1 block text-[10px] leading-snug text-slate-500">{h?.core?.measure ?? "No official series"}</span>
              </a>
              <a href={m.targetSource.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl bg-[#f8fafb] p-3 transition hover:bg-[#edf4f7]">
                <span className="flex items-center justify-between text-[10px] text-slate-500">Target <ArrowUpRight className="h-3 w-3" /></span>
                <strong className={`mt-1 block text-2xl tabular-nums ${m.target == null ? "text-slate-400" : "text-slate-900"}`}>{view.targetDisplay}</strong>
                <span className="mt-1 block text-[10px] leading-snug text-slate-500">{m.targetBasis}</span>
              </a>
            </div>
            <div className="mt-4 grid items-end gap-3 sm:grid-cols-[1fr_auto]">
              <div>
                <div className="relative h-2 rounded-full bg-gradient-to-r from-[#d86545]/35 via-slate-200 to-[#e6a24b]/45">
                  <span className="absolute inset-y-[-3px] left-1/2 w-px bg-slate-500/50" />
                  {inflationSpread != null ? <span className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#17364a] ring-2 ring-white" style={{ left: `${spreadPosition}%` }} /> : null}
                </div>
                <div className="mt-1 flex justify-between text-[9px] text-slate-400"><span>Core higher</span><span>Headline higher</span></div>
              </div>
              {spreadReading ? <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${spreadReading.tone}`}>{spreadReading.tag} · {inflationSpread! > 0 ? "+" : ""}{inflationSpread!.toFixed(1)} pp</span> : <span className="text-[10px] text-slate-400">Spread unavailable</span>}
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-slate-500">{spreadReading?.text ?? h?.coreNote ?? "No official core series is available."} Dashboard interpretation, not an official policy signal.</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-[10px] text-slate-500">
              <span>Inflation gap: <strong className="tabular-nums text-slate-700">{signed(m.gap, " pp")}</strong></span><span>·</span><span>latest inflation minus target</span>
              <SourceLink source={m.inflationSource} locale={locale} label="inflation source" />
              <SourceLink source={m.targetSource} locale={locale} label="target source" />
            </div>
          </div>

          <div className="grid">
            {h?.nextMeeting ? (
              <a href={h.nextMeeting.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#477694]/35 hover:shadow-md">
                <span className="flex items-center justify-between text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#477694]" />Next meeting</span><ArrowUpRight className="h-4 w-4" /></span>
                <strong className="mt-4 block text-2xl tabular-nums tracking-tight text-[#17364a]">{h.nextMeeting.date}</strong>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">{h.nextMeetingNote}</span>
                <div className="mt-5 grid gap-2 border-t border-slate-100 pt-4">
                  <div className="rounded-xl bg-[#f8fafb] p-3">
                    <span className="text-[9px] font-bold tracking-[0.12em] text-slate-400 uppercase">Decision body</span>
                    <strong className="mt-1 block text-xs leading-snug text-slate-700">{view.bodyName}</strong>
                  </div>
                  <div className="rounded-xl bg-[#edf4f7] p-3">
                    <span className="text-[9px] font-bold tracking-[0.12em] text-[#477694] uppercase">Time to decision</span>
                    <strong className="mt-1 block text-lg tabular-nums text-[#17364a]">{daysToMeeting} days</strong>
                    <span className="text-[9px] text-slate-500">from the Dashboard data date</span>
                  </div>
                </div>
                <span className="mt-auto pt-4 text-[10px] font-medium text-slate-400">Open the official meeting calendar</span>
              </a>
            ) : (
              <a href={profile.transparency.source.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#477694]/35 hover:shadow-md">
                <span className="flex items-center justify-between text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#477694]" />Next meeting</span><ArrowUpRight className="h-4 w-4" /></span>
                <strong className="mt-4 block text-xl tracking-tight text-[#17364a]">Not scheduled</strong>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">{h?.nextMeetingNote}</span>
                <div className="mt-5 grid gap-2 border-t border-slate-100 pt-4">
                  <div className="rounded-xl bg-[#f8fafb] p-3">
                    <span className="text-[9px] font-bold tracking-[0.12em] text-slate-400 uppercase">Policy body</span>
                    <strong className="mt-1 block text-xs leading-snug text-slate-700">{view.bodyName}</strong>
                  </div>
                  <div className="rounded-xl bg-[#edf4f7] p-3">
                    <span className="text-[9px] font-bold tracking-[0.12em] text-[#477694] uppercase">Calendar format</span>
                    <strong className="mt-1 block text-sm leading-snug text-[#17364a]">Action is not tied to fixed rate-decision dates</strong>
                  </div>
                </div>
                <span className="mt-auto border-t border-slate-100 pt-4 text-[10px] font-medium text-slate-400">Open the official policy page</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeading eyebrow="02 · Direction of travel" title={bank.id === "pboc" ? "Six policy-rate checkpoints" : "Recent policy decisions"} copy="Oldest to latest. Every date opens the matching original release." />
        <div className="overflow-x-auto pb-1"><DecisionStrip bankId={bank.id} locale={locale} size="lg" /></div>
        <p className="mt-4 border-t border-slate-100 pt-3 text-[10px] leading-relaxed text-slate-500">
          {bank.id === "pboc" ? "Cross-checked using PBoC releases plus dated Reuters/MNI checkpoints. These are observations, not six rate changes or MPC votes." : "Cross-checked against the central bank's official decision archive."}
          {h?.historyNote ? ` ${h.historyNote}` : ""}
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-[#edf4f7] p-5 sm:p-6">
        <SectionHeading eyebrow="03 · Policy framework" title="How to interpret the policy" copy="This section explains the policy objective, how the main tool works, which data matters, and the main caveat when comparing this bank with others." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <LinkedArchitectureFact label="Main objective" value={context.mandate} url={profile.architectureSource.url} />
          <LinkedArchitectureFact label="How its policy tool works" value={context.transmission} url={profile.architectureSource.url} />
          <LinkedArchitectureFact label="Comparison note" value={context.comparability} url={profile.architectureSource.url} />
          <LinkedArchitectureFact label="Data watched" value={view.indicators} url={profile.architectureSource.url} />
        </div>
        {view.framework ? (
          <a href={profile.architectureSource.url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-start justify-between gap-3 rounded-xl bg-[#17364a] p-4 text-sm leading-relaxed text-white/80 transition hover:bg-[#1f465e]">
            <span><strong className="mr-2 text-white">Framework:</strong>{view.framework}</span><ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" />
          </a>
        ) : null}
      </section>

      <section>
        <SectionHeading eyebrow="04 · Policy intelligence" title="What may shape the next move" copy="Official assessment, forward guidance and available policy tools help explain what the bank may do next." />
        <div className="grid gap-4 md:grid-cols-3">
          <EvidenceCard item={profile.outlook} icon={<Telescope className="h-4 w-4" />} accent="#477694" />
          <EvidenceCard item={profile.guidance} icon={<Eye className="h-4 w-4" />} accent="#b4532a" />
          <EvidenceCard item={profile.toolkit} icon={<Wrench className="h-4 w-4" />} accent="#2f7d6b" />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="05 · Fresh context" title={copy.latestNews} copy="Every headline opens the original publisher page." />
        {view.news.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {view.news.map((item, index) => (
              <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={`group flex min-h-48 flex-col rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${index === 0 ? "border-[#477694]/25 bg-[#17364a] text-white" : "border-slate-200 bg-white text-slate-900"}`}>
                <div className="flex items-center justify-between gap-3"><span className={`text-[10px] font-bold tracking-[0.14em] uppercase ${index === 0 ? "text-white/55" : "text-slate-400"}`}>{item.date}</span><ArrowUpRight className={`h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${index === 0 ? "text-white/60" : "text-slate-300"}`} /></div>
                {item.sourceLabel ? <span className={`mt-3 w-fit rounded-full px-2 py-1 text-[9px] font-semibold ${index === 0 ? "bg-white/10 text-white/70" : "bg-[#edf4f7] text-[#477694]"}`}>{item.sourceLabel}</span> : null}
                <h4 className="mt-3 text-base font-semibold leading-snug">{item.title}</h4>
                {item.line ? <p className={`mt-2 text-xs leading-relaxed ${index === 0 ? "text-white/65" : "text-slate-500"}`}>{item.line}</p> : null}
                <span className={`mt-auto pt-4 text-[10px] font-medium ${index === 0 ? "text-white/50" : "text-slate-400"}`}>Open original page</span>
              </a>
            ))}
          </div>
        ) : <p className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">{view.newsMissing}</p>}
      </section>

      <details className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 text-[11px] leading-relaxed text-slate-500">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-slate-800">
          <span className="inline-flex items-center gap-2"><Landmark className="h-4 w-4 text-[#477694]" />Source register · {sourceRegister.length} original pages</span>
          <span className="text-[10px] font-medium text-slate-400 group-open:hidden">Open</span>
          <span className="hidden text-[10px] font-medium text-slate-400 group-open:inline">Close</span>
        </summary>
        <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-2">
          {sourceRegister.map((source) => <SourceLine key={source.url} source={source} locale={locale} />)}
        </div>
      </details>
    </article>
  )
}
