import Link from "next/link"
import { ArrowLeft, Star, StarHalf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { ProductWithDetails } from "@/lib/types"

export default async function ProductPage(params: Promise<{ slug: string }>) {
  const { slug } = await params
  const supabase = getSupabaseServerClient()

  // Get product with all related data
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      pros:product_pros(*),
      cons:product_cons(*),
      reviews(*)
    `)
    .eq("slug", slug)
    .single()

  if (!product) {
    notFound()
  }

  const typedProduct = product as unknown as ProductWithDetails

  // Generate full stars based on rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-8 h-8 fill-black" />
        ))}
        {hasHalfStar && <StarHalf className="w-8 h-8 fill-black" />}
        <span className="ml-2 text-3xl font-black">{rating}/5</span>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div>
        <Link
          href={`/categories/${typedProduct.category.slug}`}
          className="inline-flex items-center gap-2 text-lg font-bold mb-6 hover:underline"
        >
          <ArrowLeft className="h-5 w-5" /> Back to {typedProduct.category.name}
        </Link>

        <div className="space-y-6">
          <div>
            <span className="inline-block bg-black text-white px-3 py-1 text-sm font-bold mb-4">
              {typedProduct.category.name.toUpperCase()}
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">{typedProduct.name}</h1>
            <p className="text-2xl font-bold mb-2">{typedProduct.price}</p>
            {renderRating(typedProduct.rating)}
          </div>

          <p className="text-xl font-medium border-l-4 border-black pl-4 py-2">{typedProduct.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-yellow rounded-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black mb-4">PROS</h2>
          <ul className="space-y-2">
            {typedProduct.pros.map((pro) => (
              <li key={`pro-${pro.id}`} className="flex items-start gap-2">
                <span className="font-bold text-lg">+</span>
                <span>{pro.content}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-pink rounded-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black mb-4">CONS</h2>
          <ul className="space-y-2">
            {typedProduct.cons.map((con) => (
              <li key={`con-${con.id}`} className="flex items-start gap-2">
                <span className="font-bold text-lg">-</span>
                <span>{con.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black mb-6">FULL REVIEW</h2>
        <div className="prose prose-lg max-w-none">
          {typedProduct.full_review.split("\n\n").map((paragraph, index) => (
            <p key={`p-${index}`} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-black mb-6">USER REVIEWS</h2>
        {typedProduct.reviews.length > 0 ? (
          <div className="space-y-6">
            {typedProduct.reviews.map((review) => (
              <div key={`review-${review.id}`} className="bg-white rounded-2xl p-6 border-4 border-black">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{review.name}</h3>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={`star-${i}`} className="w-5 h-5 fill-black" />
                    ))}
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border-4 border-black text-center">
            <p className="text-xl mb-4">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>

      <Separator className="border-t-2 border-black" />

      <div className="text-center">
        <h2 className="text-3xl font-black mb-6">SHARE YOUR EXPERIENCE</h2>
        <Button
          asChild
          className="text-lg font-bold rounded-none border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors px-8 py-6"
        >
          <Link href="/submit-review">WRITE A REVIEW</Link>
        </Button>
      </div>
    </div>
  )
}

