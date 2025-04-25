"use client"

import { Sparkles } from "lucide-react"

interface AIProcessingIndicatorProps {
  isProcessing: boolean
}

export function AIProcessingIndicator({ isProcessing }: AIProcessingIndicatorProps) {
  if (!isProcessing) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-50 animate-pulse">
      <Sparkles className="h-4 w-4" />
      <span className="text-sm font-medium">AI processing...</span>
    </div>
  )
}
