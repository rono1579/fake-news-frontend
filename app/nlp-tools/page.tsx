import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Scale, ArrowLeft } from "lucide-react"
import Link from "next/link"

const upcomingTools = [
  {
    icon: BarChart3,
    title: "Sentiment Analysis",
    description: "Analyze the emotional tone and sentiment of any text using deep learning models.",
  },
  {
    icon: Scale,
    title: "Bias Detection",
    description: "Identify political, cultural, and ideological biases in articles and content.",
  },
]

export default function NLPToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      <div className="space-y-8">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Additional NLP Tools</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            More powerful text analysis tools are on the way. Stay tuned for sentiment analysis, bias detection, and
            more.
          </p>
        </div>

        <div className="grid gap-6">
          {upcomingTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Card key={tool.title} className="p-8 glass-card">
                <div className="flex items-start gap-6">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{tool.title}</h3>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
