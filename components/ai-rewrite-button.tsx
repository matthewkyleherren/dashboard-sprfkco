"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { rewriteAndTranslateDescription } from "@/app/actions/ai-actions"

interface AIRewriteButtonProps {
  originalText: string
  onRewriteComplete: (results: {
    english: string
    german: string
    italian: string
    french: string
  }) => void
}

export function AIRewriteButton({ originalText, onRewriteComplete }: AIRewriteButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleRewrite = async () => {
    if (!originalText.trim()) {
      toast({
        title: "Empty description",
        description: "Please enter some text in the English description field first.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    toast({
      title: "AI processing started",
      description: "Rewriting and translating your description. This may take a moment...",
    })

    try {
      const results = await rewriteAndTranslateDescription(originalText)

      if (results) {
        onRewriteComplete(results)
        toast({
          title: "AI processing complete",
          description: "Your description has been rewritten and translated successfully.",
        })
      } else {
        throw new Error("Failed to process text")
      }
    } catch (error) {
      console.error("Error processing text:", error)
      toast({
        title: "Processing failed",
        description: "There was an error rewriting and translating your description. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="gap-1.5"
      onClick={handleRewrite}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Rewrite & Translate</span>
        </>
      )}
    </Button>
  )
}
