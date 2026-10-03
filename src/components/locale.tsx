"use client"

import { createContext, useContext } from "react"
import type { Locale } from "@/lib/copy"

const LocaleContext = createContext<{
  locale: Locale
  setLocale: (locale: Locale) => void
}>({ locale: "en", setLocale: () => {} })

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  return <LocaleContext.Provider value={{ locale: "en", setLocale: () => {} }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}
