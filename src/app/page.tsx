import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = getSupabaseServerClient()

  // Fetch categories
  const { data: categories } = await supabase.from("categories").select("*")

  // Fetch featured products (3 highest rated)
  const { data: featuredProducts } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .order("rating", { ascending: false })
    .limit(3)

  // Card colors for featured products
  const cardColors = ["card-green", "card-yellow", "card-pink"]

  return (
    <div className="space-y-16">
      <section className="py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">BRUTALLY HONEST PRODUCT REVIEWS</h1>
          <p className="text-xl md:text-2xl">No fluff. No sponsored content. Just the truth about products.</p>
        </div>
      </section>

      <section>
        <h2 className="text-4xl md:text-5xl font-black mb-8">CATEGORIES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories?.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={`${index % 2 === 0 ? "card-pink" : "card-blue"} rounded-2xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all`}
            >
              <div className="flex flex-col h-full">
                <h3 className="text-4xl font-black mb-4">{category.name.toUpperCase()}</h3>
                <p className="text-xl mb-6">
                  {category.slug === "beauty"
                    ? "Skincare, makeup, haircare, and more. Find out what's worth your money."
                    : "From economy to luxury, we test drive and review the latest models."}
                </p>
                <div className="mt-auto flex items-center gap-2 font-bold text-xl">
                  EXPLORE <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-4xl md:text-5xl font-black mb-8">FEATURED REVIEWS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts?.map((product, index) => (
            <div
              key={product.id}
              className={`${cardColors[index % cardColors.length]} rounded-2xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="inline-block bg-black text-white px-3 py-1 text-sm font-bold">
                    {product.category?.name.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-2">{product.name}</h3>
                <div className="flex items-center mb-4">
                  <div className="text-3xl font-black">{product.rating}/5</div>
                </div>
                <p className="mb-4">{product.summary}</p>
                <Link href={`/products/${product.slug}`} className="mt-auto inline-flex items-center gap-2 font-bold">
                  READ REVIEW <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white p-8 rounded-2xl border-4 border-black">
        <div className="text-center max-w-3xl mx-auto py-8">
          <h2 className="text-4xl md:text-5xl font-black mb-6">SUBMIT YOUR OWN REVIEW</h2>
          <p className="text-xl mb-8">Share your honest opinion and help others make informed decisions.</p>
          <Link
            href="/submit-review"
            className="inline-block bg-white text-black px-8 py-4 text-xl font-bold border-2 border-white hover:bg-black hover:text-white transition-colors"
          >
            START WRITING
          </Link>
        </div>
      </section>
    </div>
  )
}

