export function Sparkline({ points, label }: { points: { date: string; value: number }[]; label: string }) {
  const width = 240
  const height = 56
  const pad = 4
  const times = points.map((point) => new Date(point.date).getTime())
  const values = points.map((point) => point.value)
  const minX = Math.min(...times)
  const maxX = Math.max(...times)
  const minY = Math.min(...values)
  const maxY = Math.max(...values)
  const spanX = maxX - minX || 1
  const spanY = maxY - minY || 1
  const path = points
    .map((point, index) => {
      const x = pad + ((times[index] - minX) / spanX) * (width - pad * 2)
      const y = height - pad - ((point.value - minY) / spanY) * (height - pad * 2)
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 h-14 w-full" role="img" aria-label={label}>
      <path d={path} fill="none" stroke="#1e3a52" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
