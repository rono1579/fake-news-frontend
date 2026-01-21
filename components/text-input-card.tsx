"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface TextInputCardProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
  placeholder?: string
  buttonText?: string
  maxLength?: number
}

export function TextInputCard({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = "Paste your text here...",
  buttonText = "Analyze",
  maxLength = 10000,
}: TextInputCardProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && !isLoading) {
      onSubmit()
    }
  }

  return (
    <Card className="p-6 glass-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[300px] resize-none bg-background/50 text-base leading-relaxed"
            maxLength={maxLength}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              {value.length} / {maxLength} characters
            </span>
            <span>{value.trim().split(/\s+/).filter(Boolean).length} words</span>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={!value.trim() || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>
    </Card>
  )
}
