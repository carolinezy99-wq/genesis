import type { RatePoint } from "@/lib/rate-path"

export function PolicyPathChart({ points, label }: { points: RatePoint[]; label: string }) {
  const width = 680
  const height = 300
  const pad = { l: 46, r: 18, t: 18, b: 32 }
  const times = points.map((point) => Date.parse(point.date))
  const minT = times[0]
  const maxT = times[times.length - 1] || minT + 1
  const maxV = Math.max(6, Math.ceil(Math.max(...points.map((point) => point.value)) * 2) / 2)
  const xOf = (time: number) => pad.l + ((time - minT) / (maxT - minT || 1)) * (width - pad.l - pad.r)
  const yOf = (value: number) => pad.t + (1 - value / maxV) * (height - pad.t - pad.b)
  let path = ""
  points.forEach((point, index) => {
    const x = xOf(times[index])
    const y = yOf(point.value)
    if (index === 0) path += `M ${x} ${y}`
    else path += ` L ${x} ${yOf(points[index - 1].value)} L ${x} ${y}`
  })
  const ticks = Array.from({ length: maxV + 1 }, (_, value) => value)
  const first = points[0]
  const last = points[points.length - 1]
  return (
    <figure className="min-w-0">
      <figcaption className="sr-only">{label}</figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={label}>
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={pad.l} x2={width - pad.r} y1={yOf(tick)} y2={yOf(tick)} stroke="#e3e7ec" />
            <text x={pad.l - 8} y={yOf(tick) + 4} textAnchor="end" fill="#5c6b7a" fontSize="12">
              {tick}%
            </text>
          </g>
        ))}
        <path d={path} fill="none" stroke="#1a3a5c" strokeWidth="2.25" />
        {points.map((point, index) => (
          <circle key={point.date + point.url} cx={xOf(times[index])} cy={yOf(point.value)} r="4" fill="#ffffff" stroke="#1a3a5c" strokeWidth="2">
            <title>{`${point.date}: ${point.label}`}</title>
          </circle>
        ))}
        <text x={xOf(times[0])} y={height - 8} fill="#5c6b7a" fontSize="12">
          {first.date}
        </text>
        <text x={xOf(times[times.length - 1])} y={height - 8} textAnchor="end" fill="#5c6b7a" fontSize="12">
          {last.date}
        </text>
      </svg>
    </figure>
  )
}
