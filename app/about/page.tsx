import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Shield,
    title: "Accuracy First",
    description:
      "Our AI models are trained on millions of verified sources to ensure the highest accuracy in text verification.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant analysis results powered by optimized machine learning infrastructure.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Your text is analyzed securely and never stored or shared with third parties.",
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      <div className="space-y-12">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="gradient-text">TruthLens</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            TruthLens is an advanced AI-powered platform designed to help you verify the authenticity of text content.
            In an era of information overload and misinformation, we provide the tools you need to distinguish fact from
            fiction.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <Card className="p-6 glass-card">
            <p className="text-muted-foreground leading-relaxed">
              We believe everyone deserves access to reliable information. Our mission is to democratize access to
              advanced NLP technology, making it easy for anyone to verify text authenticity, detect plagiarism, and
              understand the sentiment and bias in content they consume.
            </p>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Why Choose TruthLens</h2>
          <div className="grid gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.title} className="p-6 glass-card">
                  <div className="flex gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 h-fit">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <Card className="p-8 glass-card text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground">
            Try our fake news detector and experience the power of AI-driven text verification.
          </p>
          <Button asChild size="lg">
            <Link href="/fake-news-detector">Try Fake News Detector</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
