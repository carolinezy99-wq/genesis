"use client"

import { useState } from "react"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function monthLabel(date: string) {
  const [year, month] = date.split("-")
  return `${months[Number(month) - 1]} ${year.slice(2)}`
}

function fmt(value: number) {
  return `${value.toFixed(1)}%`
}

export function Sparkline({ points, label }: { points: { date: string; value: number }[]; label: string }) {
  const [active, setActive] = useState<number | null>(null)
  const width = 640
  const height = 220
  const pad = { l: 12, r: 56, t: 26, b: 34 }
  const times = points.map((point) => new Date(point.date).getTime())
  const values = points.map((point) => point.value)
  const minX = Math.min(...times)
  const maxX = Math.max(...times)
  const minV = Math.min(...values)
  const maxV = Math.max(...values)
  const spanX = maxX - minX || 1
  const spanY = (maxV - minV || 1) * 1.7
  const mid = (minV + maxV) / 2
  const y0 = mid - spanY / 2
  const y1 = mid + spanY / 2
  const innerW = width - pad.l - pad.r
  const innerH = height - pad.t - pad.b
  const xOf = (time: number) => pad.l + ((time - minX) / spanX) * innerW
  const yOf = (value: number) => pad.t + (1 - (value - y0) / (y1 - y0)) * innerH
  const coords = points.map((point) => ({
    ...point,
    x: xOf(new Date(point.date).getTime()),
    y: yOf(point.value),
  }))
  const path = coords.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ")
  const minIndex = values.indexOf(minV)
  const maxIndex = values.indexOf(maxV)
  const last = points.length - 1
  const tickIndexes = [...new Set([0, Math.round(last / 2), last])]
  const marked = [...new Set([0, last, minIndex, maxIndex])]

  const nearest = (clientX: number, svg: SVGSVGElement) => {
    const rect = svg.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * width
    let best = 0
    let bestDistance = Infinity
    coords.forEach((point, index) => {
      const distance = Math.abs(point.x - x)
      if (distance < bestDistance) {
        bestDistance = distance
        best = index
      }
    })
    return best
  }

  const placed: { index: number; x: number; y: number }[] = []
  for (const index of marked) {
    const point = coords[index]
    const anchorShift = index === 0 ? 8 : index === last ? -8 : 0
    const x = point.x + anchorShift
    let y = point.y - 10
    const crowded = placed.some((other) => Math.abs(other.x - x) < 52 && Math.abs(other.y - y) < 16)
    if (crowded || y < 14) y = point.y + 18
    if (placed.some((other) => Math.abs(other.x - x) < 52 && Math.abs(other.y - y) < 16)) y = point.y - 24
    placed.push({ index, x, y })
  }
  const valueLabel = (item: { index: number; x: number; y: number }) => {
    const anchor = item.index === 0 ? "start" : item.index === last ? "end" : "middle"
    return (
      <text key={`v-${item.index}`} x={item.x} y={item.y} textAnchor={anchor} fontSize="12" fontWeight="600" fill="#1e293b">
        {fmt(points[item.index].value)}
      </text>
    )
  }

  const hover = active == null ? null : coords[active]

  return (
    <div className="relative mt-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-52 w-full touch-none"
        role="img"
        aria-label={`${label}. ${monthLabel(points[0].date)} ${fmt(points[0].value)} to ${monthLabel(points[last].date)} ${fmt(points[last].value)}. Low ${fmt(minV)}, high ${fmt(maxV)}.`}
        onPointerMove={(event) => setActive(nearest(event.clientX, event.currentTarget))}
        onPointerDown={(event) => setActive(nearest(event.clientX, event.currentTarget))}
        onPointerLeave={() => setActive(null)}
      >
        <path d={path} fill="none" stroke="#1e3a52" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" />
        {tickIndexes.map((index) => (
          <text key={`t-${index}`} x={coords[index].x} y={height - 8} textAnchor={index === 0 ? "start" : index === last ? "end" : "middle"} fontSize="12" fill="#64748b">
            {monthLabel(points[index].date)}
          </text>
        ))}
        {marked.map((index) => (
          <circle key={`c-${index}`} cx={coords[index].x} cy={coords[index].y} r={index === minIndex || index === maxIndex ? 3.5 : 2.5} fill="#1e3a52" />
        ))}
        {placed.map(valueLabel)}
        {hover ? (
          <line x1={hover.x} x2={hover.x} y1={pad.t} y2={height - pad.b} stroke="#94a3b8" strokeDasharray="3 3" />
        ) : null}
      </svg>
      {hover ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-[#1e3a52]/10 bg-white px-2 py-1 text-[11px] font-medium text-slate-800 shadow-[0_8px_20px_-12px_rgba(30,58,82,0.6)]"
          style={{ left: `${(hover.x / width) * 100}%`, top: `${(hover.y / height) * 100}%` }}
        >
          {monthLabel(hover.date)} · {fmt(hover.value)}
        </div>
      ) : null}
    </div>
  )
}
