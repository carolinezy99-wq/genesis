"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { Locale } from "@/lib/copy"

const LocaleContext = createContext<{
  locale: Locale
  setLocale: (locale: Locale) => void
}>({ locale: "en", setLocale: () => {} })

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const saved = window.localStorage.getItem("cb-locale")
    if (saved === "en" || saved === "zh") setLocaleState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en"
  }, [locale])

  function setLocale(next: Locale) {
    setLocaleState(next)
    window.localStorage.setItem("cb-locale", next)
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}
