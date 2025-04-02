import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function CategoryPage({ params }: { params: { category: string } | Promise<{ category: string }> }) {
  const { category } = await params
  const categoryLower = category.toLowerCase()
  const supabase = getSupabaseServerClient()
  // Get category
  const { data: categoryData } = await supabase.from("categories").select("*").eq("slug", categoryLower).single()

  if (!categoryData) {
    notFound()
  }

  // Get products for this category
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryData.id)
    .order("rating", { ascending: false })

  if (!products || products.length === 0) {
    // No products found, but category exists
    return (
      <div className="space-y-12">
        <section className="py-8">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            {categoryData.name.toUpperCase()} REVIEWS
          </h1>
          <p className="text-xl md:text-2xl">No products found in this category yet.</p>
        </section>

        <div className="text-center">
          <Link
            href="/submit-review"
            className="inline-block bg-black text-white px-8 py-4 text-xl font-bold border-2 border-black hover:bg-white hover:text-black transition-colors"
          >
            SUBMIT THE FIRST REVIEW
          </Link>
        </div>
      </div>
    )
  }

  // Card colors for products
  const cardColors = ["card-yellow", "card-blue", "card-pink", "card-green"]

  return (
    <div className="space-y-12">
      <section className="py-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          {categoryData.name.toUpperCase()} REVIEWS
        <p className="text-xl md:text-2xl  tracking-tight">
          {categoryLower === "beauty"
            ? "Honest reviews of skincare, makeup, haircare, and more."
            : "Honest reviews of the latest models from economy to luxury."}
        </p>
        </h1>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className={`${cardColors[index % cardColors.length]} rounded-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all`}
            >
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-black mb-2">{product.name}</h3>
                <div className="flex items-center mb-4">
                  <div className="text-3xl font-black">{product.rating}/5</div>
                </div>
                <p className="mb-4">{product.summary}</p>
                <div className="mt-auto inline-flex items-center gap-2 font-bold">
                  READ REVIEW <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

