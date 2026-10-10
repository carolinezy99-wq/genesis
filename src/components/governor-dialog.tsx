"use client"

import { useEffect, useRef } from "react"
import { banks } from "@/lib/banks"
import { presentBank, type Locale } from "@/lib/copy"
import { governors } from "@/lib/governors"

const frame: Record<string, { position: string; zoom: number }> = {
  boc: { position: "49% 30%", zoom: 1.15 },
  rba: { position: "49% 38%", zoom: 1.7 },
  rbi: { position: "50% 20%", zoom: 2.3 },
  boe: { position: "50% 30%", zoom: 1.1 },
}

export function GovernorDialog({ bankId, locale, onClose }: { bankId: string | null; locale: Locale; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const bank = banks.find((item) => item.id === bankId)
  const profile = bankId ? governors[bankId] : undefined

  useEffect(() => {
    if (!bankId) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [bankId, onClose])

  if (!bank || !profile) return null
  const view = presentBank(bank, locale)
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const crop = frame[bank.id] ?? { position: "50% 25%", zoom: 1 }
  const fields = [
    profile.term ? { label: label("任期", "Term"), text: profile.term[locale] } : null,
    profile.prior ? { label: label("此前职务", "Prior roles"), text: profile.prior[locale] } : null,
    profile.education ? { label: label("教育", "Education"), text: profile.education[locale] } : null,
  ].filter((field): field is { label: string; text: string } => field != null)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6" role="presentation">
      <button type="button" aria-label={label("关闭", "Close")} className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="governor-dialog-title"
        className="craft-card relative max-h-[min(90vh,40rem)] w-full max-w-lg overflow-y-auto p-5 shadow-[0_24px_60px_-24px_rgba(30,58,82,0.55)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-medium tracking-wider text-slate-500 uppercase">{label("行长简介", "Governor")}</p>
          <button ref={closeRef} type="button" onClick={onClose} className="rounded-md px-2 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-900">
            {label("关闭", "Close")}
          </button>
        </div>
        <div className="mt-3 flex gap-4">
          <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md bg-slate-100 ring-1 ring-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${bank.head.photo}`}
              alt={view.photoAlt}
              className="h-full w-full object-cover"
              style={{ objectPosition: crop.position, transform: `scale(${crop.zoom})`, transformOrigin: crop.position }}
            />
          </div>
          <div className="min-w-0">
            <h2 id="governor-dialog-title" className="text-xl font-semibold tracking-tight text-[#1e3a52]">{view.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{view.title}{locale === "zh" ? "，" : ", "}{view.institution}</p>
          </div>
        </div>
        <dl className="mt-4 grid gap-3 text-sm">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="text-[11px] font-medium text-slate-500">{field.label}</dt>
              <dd className="mt-0.5 leading-relaxed text-slate-800">{field.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 flex flex-col gap-1 text-sm">
          <a href={profile.bioUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1e3a52] underline decoration-slate-300 underline-offset-2">
            {profile.bioLabel[locale]}
          </a>
          {profile.termSource ? (
            <a href={profile.termSource.url} target="_blank" rel="noopener noreferrer" className="text-slate-600 underline decoration-slate-300 underline-offset-2">
              {profile.termSource.label[locale]}
            </a>
          ) : null}
        </p>
      </div>
    </div>
  )
}
