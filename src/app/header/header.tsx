"use client"

import { Moon, Sun } from "lucide-react"
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
    <header className="h-14 px-12 py-4 text-xl font-bold flex flex-none items-center justify-center md:justify-between border-b w-full">
        <h1>n-queens</h1>
        <button
          onClick={() => setDark(prev => !prev)}
          className="p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    </header>
  )
}