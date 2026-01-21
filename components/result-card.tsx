"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AnalysisResult {
  verdict: "true" | "fake" | "uncertain"
  confidence: number
  reasoning: string
  sources?: {
    credible: number
    questionable: number
    unknown: number
  }
  keyPoints?: string[]
}

interface ResultCardProps {
  result: AnalysisResult
}

export function ResultCard({ result }: ResultCardProps) {
  const getVerdictConfig = () => {
    switch (result.verdict) {
      case "true":
        return {
          icon: CheckCircle2,
          label: "Likely True",
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/20",
        }
      case "fake":
        return {
          icon: XCircle,
          label: "Likely Fake",
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/20",
        }
      case "uncertain":
        return {
          icon: AlertTriangle,
          label: "Uncertain",
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/20",
        }
    }
  }

  const config = getVerdictConfig()
  const Icon = config.icon

  return (
    <Card className="p-6 glass-card space-y-6">
      {/* Verdict Header */}
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-lg border", config.bgColor, config.borderColor)}>
          <Icon className={cn("h-8 w-8", config.color)} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold">{config.label}</h3>
          <p className="text-muted-foreground">Analysis complete</p>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Confidence Score</span>
          <span className="text-sm font-mono font-semibold">{result.confidence}%</span>
        </div>
        <Progress value={result.confidence} className="h-2" />
      </div>

      {/* Reasoning */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="leading-relaxed">{result.reasoning}</AlertDescription>
      </Alert>

      {/* Source Credibility */}
      {result.sources && (
        <div className="space-y-3">
          <h4 className="font-semibold">Source Credibility</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
              <div className="text-2xl font-bold text-success">{result.sources.credible}</div>
              <div className="text-xs text-muted-foreground">Credible</div>
            </div>
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-center">
              <div className="text-2xl font-bold text-warning">{result.sources.questionable}</div>
              <div className="text-xs text-muted-foreground">Questionable</div>
            </div>
            <div className="p-3 rounded-lg bg-muted border border-border text-center">
              <div className="text-2xl font-bold">{result.sources.unknown}</div>
              <div className="text-xs text-muted-foreground">Unknown</div>
            </div>
          </div>
        </div>
      )}

      {/* Key Points */}
      {result.keyPoints && result.keyPoints.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold">Key Findings</h4>
          <ul className="space-y-2">
            {result.keyPoints.map((point, index) => (
              <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
