import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="max-w-3xl mx-auto text-center py-12">
      <div className="bg-green-200 rounded-2xl p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CheckCircle className="w-24 h-24 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">REVIEW SUBMITTED!</h1>
        <p className="text-xl mb-8">
          Thank you for sharing your honest opinion. Your review will help others make informed decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="text-lg font-bold rounded-none border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors px-8 py-6"
          >
            <Link href="/">BACK TO HOME</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-lg font-bold rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors px-8 py-6"
          >
            <Link href="/submit-review">WRITE ANOTHER REVIEW</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

