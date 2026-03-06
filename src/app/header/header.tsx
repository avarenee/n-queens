"use client"

import { DarkModeSwitch } from "@/components/ui/darkModeSwitch"
import React, { useEffect, useState } from "react"

export const Header = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDark(prefersDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <header className="h-14 px-8 md:px-12 py-4 text-xl font-bold flex flex-none items-center justify-between border-b w-full">
        <h1>n-queens</h1>
        <DarkModeSwitch 
          checked={dark}
          onCheckedChange={setDark}
          aria-label="Toggle dark mode"
        />
    </header>
  )
}