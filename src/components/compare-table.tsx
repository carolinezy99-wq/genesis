"use client"

import { comparisonRows, ui, type Locale } from "@/lib/copy"

export function CompareTable({ locale }: { locale: Locale }) {
  const copy = ui[locale]
  const rows = comparisonRows(locale)
  const columns = [
    copy.colBank,
    copy.colInstrument,
    copy.colSetting,
    copy.colTarget,
    copy.colLatest,
    copy.colGauge,
    copy.colMove,
    copy.colDate,
  ]

  return (
    <div className="min-w-0 overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <caption className="sr-only">{copy.tableTitle}</caption>
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            {columns.map((column) => (
              <th key={column} scope="col" className="px-2 py-2 font-medium whitespace-nowrap">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border/70 last:border-0">
              <th scope="row" className="px-2 py-2.5 font-medium whitespace-nowrap">
                {row.bank}
              </th>
              <td className="px-2 py-2.5 whitespace-nowrap">{row.instrument}</td>
              <td className="px-2 py-2.5 font-semibold tabular-nums whitespace-nowrap">{row.setting}</td>
              <td className="px-2 py-2.5 font-semibold tabular-nums whitespace-nowrap">{row.target}</td>
              <td className="px-2 py-2.5 font-semibold tabular-nums whitespace-nowrap">{row.latest}</td>
              <td className="px-2 py-2.5 text-muted-foreground whitespace-nowrap">{row.gauge}</td>
              <td className="px-2 py-2.5 whitespace-nowrap">{row.move}</td>
              <td className="px-2 py-2.5 tabular-nums whitespace-nowrap">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
