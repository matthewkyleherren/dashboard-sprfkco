"use server"

import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

export async function rewriteAndTranslateDescription(originalText: string): Promise<{
  english: string
  german: string
  italian: string
  french: string
} | null> {
  try {
    // Step 1: Rewrite the English text in a witty, Apple-like marketing style
    const { text: rewrittenEnglish } = await generateText({
      model: xai("grok"),
      prompt: `Rewrite the following text in a witty, clever, marketing style similar to Apple's marketing copy. Make it engaging, sophisticated, and slightly playful while maintaining the original information:

Original text:
${originalText}

Rewritten text:`,
      maxTokens: 1000,
    })

    // Step 2: Translate the rewritten English text to German
    const { text: germanTranslation } = await generateText({
      model: xai("grok"),
      prompt: `Translate the following English text into German. Maintain the witty, marketing style:

English text:
${rewrittenEnglish}

German translation:`,
      maxTokens: 1000,
    })

    // Step 3: Translate the rewritten English text to Italian
    const { text: italianTranslation } = await generateText({
      model: xai("grok"),
      prompt: `Translate the following English text into Italian. Maintain the witty, marketing style:

English text:
${rewrittenEnglish}

Italian translation:`,
      maxTokens: 1000,
    })

    // Step 4: Translate the rewritten English text to French
    const { text: frenchTranslation } = await generateText({
      model: xai("grok"),
      prompt: `Translate the following English text into French. Maintain the witty, marketing style:

English text:
${rewrittenEnglish}

French translation:`,
      maxTokens: 1000,
    })

    return {
      english: rewrittenEnglish.trim(),
      german: germanTranslation.trim(),
      italian: italianTranslation.trim(),
      french: frenchTranslation.trim(),
    }
  } catch (error) {
    console.error("Error in AI processing:", error)
    return null
  }
}
