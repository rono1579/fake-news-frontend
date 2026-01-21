import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, FileSearch, BarChart3, Scale, ArrowRight, Sparkles } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Fake News Detection",
    description:
      "Advanced AI models analyze text credibility, source reliability, and factual accuracy to identify misinformation.",
    status: "Available",
    href: "/fake-news-detector",
  },
  {
    icon: FileSearch,
    title: "Plagiarism Detection",
    description: "Compare text against millions of sources to detect copied content and ensure originality.",
    status: "Coming Soon",
    href: "/plagiarism-check",
  },
  {
    icon: BarChart3,
    title: "Sentiment Analysis",
    description: "Understand the emotional tone and sentiment behind any text with deep learning models.",
    status: "Coming Soon",
    href: "/nlp-tools",
  },
  {
    icon: Scale,
    title: "Bias Detection",
    description: "Identify political, cultural, and ideological biases in articles and content.",
    status: "Coming Soon",
    href: "/nlp-tools",
  },
]

export default function HomePage() {
  return (
    <div className="home-container max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Text Verification Suite</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-4xl text-balance">
          Verify Truth with <span className="gradient-text">Advanced NLP</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
          Harness cutting-edge natural language processing to detect fake news, check plagiarism, analyze sentiment, and
          identify bias in any text.
        </p>

        <div className="flex gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/fake-news-detector">
              Try Fake News Detector
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Comprehensive NLP Tools</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            A complete suite of AI-powered tools to analyze, verify, and understand text content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="p-6 glass-card hover:bg-card/70 transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium px-3 py-1 rounded-full",
                        feature.status === "Available"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-muted text-muted-foreground border border-border",
                      )}
                    >
                      {feature.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>

                  {feature.status === "Available" && (
                    <Button asChild variant="ghost" className="gap-2 -ml-4">
                      <Link href={feature.href}>
                        Try it now
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-accent/5 to-background p-12 text-center">
        <div className="relative z-10 space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Ready to verify the truth?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start analyzing text with our AI-powered fake news detector today.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/fake-news-detector">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
