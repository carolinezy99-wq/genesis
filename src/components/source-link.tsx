import { ExternalLink } from "lucide-react"
import type { Source } from "@/lib/banks"
import { sourceTitle, type Locale } from "@/lib/copy"

export function SourceLink({ source, locale, label }: { source: Source; locale: Locale; label?: string }) {
  const title = `${source.institution}: ${sourceTitle(source, locale)} · ${locale === "zh" ? "阅读于" : "read on"} ${source.readOn}`
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      aria-label={`${locale === "zh" ? "来源" : "Source"}: ${title}`}
      className="inline-flex items-center gap-1 align-middle text-[10px] text-slate-400 hover:text-slate-700"
    >
      <ExternalLink className="h-3 w-3 shrink-0" />
      {label ? <span className="underline decoration-slate-300 underline-offset-2">{label}</span> : null}
    </a>
  )
}
