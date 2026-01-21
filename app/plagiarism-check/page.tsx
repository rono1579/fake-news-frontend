import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileSearch, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PlagiarismCheckPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      <div className="space-y-8">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Card className="p-12 glass-card text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-primary/10 border border-primary/20">
            <FileSearch className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Plagiarism Detection</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            This feature is coming soon. We're building advanced plagiarism detection powered by AI to compare your text
            against millions of sources.
          </p>
          <div className="pt-4">
            <span className="inline-block px-4 py-2 rounded-full bg-muted text-sm font-medium">Coming Soon</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
