import { Dashboard } from "@/components/dashboard"
import { LocaleProvider } from "@/components/locale"

export default function HomePage() {
  return (
    <LocaleProvider>
      <Dashboard />
    </LocaleProvider>
  )
}
