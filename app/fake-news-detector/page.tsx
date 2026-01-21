"use client"
import { useState } from "react"
import { TextInputCard } from "@/components/text-input-card"
import { ResultCard, type AnalysisResult } from "@/components/result-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Shield, Link, Eye, FileText } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function FakeNewsDetectorPage() {
  const [text, setText] = useState("")
  const [blogUrl, setBlogUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingBlog, setIsLoadingBlog] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previewContent, setPreviewContent] = useState("")
  const [contentMetadata, setContentMetadata] = useState<{title?: string, charCount?: number}>({})
  const [activeTab, setActiveTab] = useState("text")

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error("Error", {
        description: "Please enter some text to analyze",
      })
      return
    }

    if(text.trim().length < 10){
      toast.error("Error")
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await axios.post("http://localhost:5000/api/detect-fake-news", {
        "text": text
      })
      
      if (!response.data.status) {
        throw new Error("Analysis failed. Please try again.")
      }
      
      const analysisData = response.data.data
      
      if (!analysisData) {
        throw new Error("Invalid response from server")
      }

      const mappedResult: AnalysisResult = {
        verdict: analysisData.readable_label === "real" ? "true" : analysisData.readable_label === "fake" ? "fake" : "uncertain",
        confidence: Math.round(analysisData.confidence * 100),
        reasoning: analysisData.reasoning?.prediction_explanation || "No detailed reasoning available",
        sources: analysisData.pattern_analysis?.credibility_score !== undefined ? {
          credible: analysisData.pattern_analysis.credibility_score,
          questionable: analysisData.pattern_analysis.risk_score || 0,
          unknown: 0
        } : undefined,
        keyPoints: [
          ...(analysisData.reasoning?.key_insights || []),
          ...(analysisData.reasoning?.verification_suggestions || [])
        ].filter(Boolean)
      }

      setResult(mappedResult)
      toast.success("Analysis Complete", {
        description: "Content has been analyzed successfully",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      toast.error("Analysis Error", {
        description: errorMessage,
      })
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadBlog = async () => {
    if (!blogUrl.trim()) {
      toast.error("Error", {
        description: "Please enter a valid URL",
      })
      return
    }

    // Basic URL validation
    try {
      new URL(blogUrl)
    } catch {
      toast.error("Invalid URL", {
        description: "Please enter a valid URL including http:// or https://",
      })
      return
    }

    setIsLoadingBlog(true)
    setError(null)
    setPreviewContent("")
    setContentMetadata({})

    try {
      const response = await axios.post("http://localhost:5000/api/fetch-blog-content", {
        url: blogUrl
      })

      if (!response.data.status) {
        throw new Error(response.data.error || "Failed to load blog content")
      }

      if (response.data.content) {
        setPreviewContent(response.data.content)
        setText(response.data.content)
        setContentMetadata({
          title: response.data.title,
          charCount: response.data.char_count
        })
        setActiveTab("url")
        toast.success("Content Loaded", {
          description: `Blog content loaded successfully${response.data.char_count ? ` (${response.data.char_count} chars)` : ''}`,
        })
      } else {
        throw new Error("No content found in the response")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load blog content"
      toast.error("Loading Error", {
        description: errorMessage,
      })
      setError(errorMessage)
    } finally {
      setIsLoadingBlog(false)
    }
  }

  const handleClearBlog = () => {
    setBlogUrl("")
    setPreviewContent("")
    setContentMetadata({})
    setText("")
    setActiveTab("text")
  }

  const handleUsePreviewContent = () => {
    setText(previewContent)
    setActiveTab("text")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
            <Shield className="h-4 w-4" />
            <span>Fake News Detection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Verify Text <span className="gradient-text">Authenticity</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            Paste any article, claim, or text to analyze its credibility using advanced AI models trained on millions of
            verified sources.
          </p>
        </div>

        {/* Blog URL Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Load Blog from URL
            </CardTitle>
            <CardDescription>
              Enter a blog URL to automatically fetch and analyze its content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com/blog/article"
                value={blogUrl}
                onChange={(e) => setBlogUrl(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLoadBlog()
                  }
                }}
              />
              <Button 
                onClick={handleLoadBlog} 
                disabled={isLoadingBlog || !blogUrl.trim()}
                className="flex items-center gap-2"
              >
                <Link className="h-4 w-4" />
                {isLoadingBlog ? "Loading..." : "Load Blog"}
              </Button>
              {previewContent && (
                <Button 
                  variant="outline" 
                  onClick={handleClearBlog}
                >
                  Clear
                </Button>
              )}
            </div>
            
            {previewContent && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Eye className="h-4 w-4" />
                    Content Preview
                  </div>
                  <div className="flex items-center gap-2">
                    {contentMetadata.title && (
                      <Badge variant="secondary" className="text-xs">
                        {contentMetadata.title}
                      </Badge>
                    )}
                    {contentMetadata.charCount && (
                      <Badge variant="outline" className="text-xs">
                        {contentMetadata.charCount} chars
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-muted/50 max-h-60 overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{previewContent}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    This content is ready for analysis
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleUsePreviewContent}
                    className="flex items-center gap-1"
                  >
                    <FileText className="h-3 w-3" />
                    Use in Manual Editor
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Input Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Manual Input</TabsTrigger>
            <TabsTrigger value="url" disabled={!previewContent}>
              Blog Content
              {previewContent && <Badge variant="secondary" className="ml-2 h-4 w-4 p-0 text-xs">✓</Badge>}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text">
            <TextInputCard
              value={text}
              onChange={setText}
              onSubmit={handleAnalyze}
              isLoading={isLoading}
              placeholder="Paste the article or text you want to verify here..."
              buttonText="Check Authenticity"
            />
          </TabsContent>
          
          <TabsContent value="url">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Analyze Blog Content
                </CardTitle>
                <CardDescription>
                  Ready to analyze the content loaded from {blogUrl}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50 max-h-60 overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{previewContent}</p>
                </div>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isLoading || !previewContent}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing Content...
                    </>
                  ) : (
                    "Analyze Blog Content"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {result && <ResultCard result={result} />}
      </div>
    </div>
  )
}