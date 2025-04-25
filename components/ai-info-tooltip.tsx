"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

export function AIInfoTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className="h-4 w-4 text-gray-400 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <p>
            Click the &quot;AI Rewrite & Translate&quot; button to have Grok AI rewrite your English description in a
            witty, Apple-like marketing style and automatically translate it to German, Italian, and French.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
