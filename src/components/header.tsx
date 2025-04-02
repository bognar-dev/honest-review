import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b-4 border-black bg-beige">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-4xl md:text-5xl font-black tracking-tighter">
            HONEST REVIEWS
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/categories/beauty" className="text-xl font-bold hover:underline underline-offset-4">
              BEAUTY
            </Link>
            <Link href="/categories/cars" className="text-xl font-bold hover:underline underline-offset-4">
              CARS
            </Link>

            <Button asChild className="text-lg font-bold rounded-none border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors">
              <Link href="/submit-review">
                SUBMIT REVIEW
              </Link>
            </Button>

          </nav>
        </div>
      </div>
    </header>
  )
}

