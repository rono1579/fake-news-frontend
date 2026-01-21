import { type NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Invalid text input" }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock analysis result - Replace with actual AI model integration
    const mockResult = generateMockAnalysis(text)

    return NextResponse.json(mockResult)
  } catch (error) {
    console.error("[v0] Fake news detection error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}

function generateMockAnalysis(text: string) {
  const wordCount = text.trim().split(/\s+/).length
  const hasExclamations = (text.match(/!/g) || []).length > 3
  const hasAllCaps = /[A-Z]{5,}/.test(text)
  const hasSensationalWords = /shocking|unbelievable|secret|they don't want you to know/i.test(text)

  let confidence = 75
  let verdict: "true" | "fake" | "uncertain" = "true"

  if (hasExclamations) confidence -= 15
  if (hasAllCaps) confidence -= 10
  if (hasSensationalWords) confidence -= 20
  if (wordCount < 50) confidence -= 10

  if (confidence < 50) {
    verdict = "fake"
  } else if (confidence < 70) {
    verdict = "uncertain"
  }

  const reasoning =
    verdict === "fake"
      ? "The text contains multiple indicators of misinformation including sensational language, excessive punctuation, and lack of credible source citations. The writing style and claims suggest potential bias or fabrication."
      : verdict === "uncertain"
        ? "The analysis shows mixed signals. While some elements appear credible, there are concerns about source verification and potential bias. Additional fact-checking is recommended."
        : "The text demonstrates characteristics of credible information including balanced language, factual presentation, and verifiable claims. The content aligns with known reliable sources."

  return {
    verdict,
    confidence: Math.max(30, Math.min(95, confidence)),
    reasoning,
    sources: {
      credible: verdict === "true" ? 8 : verdict === "uncertain" ? 4 : 2,
      questionable: verdict === "true" ? 1 : verdict === "uncertain" ? 3 : 5,
      unknown: verdict === "true" ? 2 : verdict === "uncertain" ? 4 : 6,
    },
    keyPoints: [
      verdict === "fake" ? "High use of sensational language detected" : "Language tone appears balanced and factual",
      verdict === "fake" ? "Limited source credibility indicators" : "Multiple credible source indicators found",
      wordCount > 200 ? "Comprehensive content with detailed information" : "Brief content may lack full context",
      verdict === "uncertain" ? "Mixed signals require additional verification" : "Analysis confidence is high",
    ],
  }
}
