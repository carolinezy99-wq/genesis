"use client"

import { CalendarDays, ChevronRight } from "lucide-react"
import { banks, DATA_AS_OF } from "@/lib/banks"
import { bankTabLabel, type Locale } from "@/lib/copy"
import { history } from "@/lib/history"

export function MeetingWatch({ locale, onSelect }: { locale: Locale; onSelect: (id: string) => void }) {
  const label = (zh: string, en: string) => (locale === "zh" ? zh : en)
  const calendar = banks
    .map((bank) => ({ bank, meeting: history[bank.id]?.nextMeeting, note: history[bank.id]?.nextMeetingNote }))
    .filter((item): item is typeof item & { meeting: NonNullable<typeof item.meeting> } => Boolean(item.meeting))
    .sort((a, b) => a.meeting.date.localeCompare(b.meeting.date))

  return (
    <aside className="craft-card overflow-hidden">
      <div className="bg-[#102b42] px-5 py-5 text-white sm:px-6">
        <div className="flex items-center gap-2 text-[#e0bd75]">
          <CalendarDays className="h-5 w-5" />
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase">{label("会议提醒", "Meeting watch")}</p>
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-tight">{label("下一轮政策会议", "Next policy meetings")}</h2>
        <p className="mt-1 text-[11px] text-slate-300">{label(`截至 ${DATA_AS_OF} 的已核实日程`, `Verified schedule as of ${DATA_AS_OF}`)}</p>
      </div>
      <div className="divide-y divide-slate-100">
        {calendar.slice(0, 6).map(({ bank, meeting, note }, index) => (
          <button key={bank.id} type="button" onClick={() => onSelect(bank.id)} className={`group flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-[#f7fafb] sm:px-6 ${index === 0 ? "bg-[#fff7f3]" : ""}`}>
            <span className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl ${index === 0 ? "bg-[#b4532a] text-white shadow-sm" : "bg-[#edf2f5] text-[#15344d]"}`}>
              <span className="text-[9px] font-medium tracking-wide">{meeting.date.slice(5, 7)}</span>
              <span className="-mt-0.5 text-base font-semibold tabular-nums">{meeting.date.slice(8)}</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-slate-800">{bankTabLabel[bank.id][locale]}</span>
              <span className="mt-0.5 block truncate text-[10px] text-slate-500">{note ?? meeting.date}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#b4532a]" />
          </button>
        ))}
      </div>
    </aside>
  )
}
