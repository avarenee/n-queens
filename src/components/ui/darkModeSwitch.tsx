"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

function DarkModeSwitch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 h-[1.625rem] w-10 data-[state=checked]:bg-toggle data-[state=unchecked]:bg-toggle",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none flex justify-center items-center text-foreground rounded-full bg-background ring-0 transition-transform size-5 data-[state=checked]:translate-x-[calc(100%-4px)] data-[state=unchecked]:translate-x-[2px]"
        )}
      >
        {props.checked ? <Moon size={16} /> : <Sun size={16} />}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { DarkModeSwitch }
