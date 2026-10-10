export function Sparkline({
  points,
  label,
}: {
  points: { date: string; value: number }[]
  label: string
}) {
  if (points.length < 2) return null
  const width = 160
  const height = 40
  const pad = 3
  const times = points.map((point) => Date.parse(point.date))
  const minT = times[0]
  const maxT = times[times.length - 1]
  const values = points.map((point) => point.value)
  const minV = Math.min(...values)
  const maxV = Math.max(...values)
  const spanV = maxV - minV || 1
  const spanT = maxT - minT || 1
  const coords = points.map((point, index) => {
    const x = pad + ((times[index] - minT) / spanT) * (width - pad * 2)
    const y = pad + (1 - (point.value - minV) / spanV) * (height - pad * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const last = coords[coords.length - 1].split(",")
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 h-10 w-full" role="img" aria-label={label}>
      <polyline fill="none" stroke="#1a3a5c" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" points={coords.join(" ")} />
      <circle cx={last[0]} cy={last[1]} r="2.4" fill="#1a3a5c" />
    </svg>
  )
}
