import { getSupabaseServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = getSupabaseServerClient()

  try {
    // Sample data for beauty products
    const beautyProducts = [
      {
        name: "The Ordinary Niacinamide 10% + Zinc 1%",
        slug: "ordinary-niacinamide",
        price: "$5.90",
        summary: "A budget-friendly serum that actually delivers on its promises to reduce sebum and minimize pores.",
        full_review:
          "The Ordinary's Niacinamide 10% + Zinc 1% has gained cult status in the skincare community, and for good reason. At under $6, this serum packs a powerful punch with its high concentration of niacinamide (vitamin B3) and zinc PCA.\n\nAfter using this product for 8 weeks, I noticed a significant reduction in oil production and pore visibility. My skin looked more balanced, and breakouts were less frequent and less severe when they did occur.\n\nThe texture is slightly viscous but absorbs quickly if you use the right amount (2-3 drops is plenty). It layers well under moisturizer but can pill if you use too much or don't give it enough time to absorb.\n\nWhile the packaging is basic and the dropper can get a bit messy, at this price point, it's hard to complain. The formula itself is what matters, and it delivers results comparable to products 5-10 times its price.",
        rating: 4.5,
        pros: [
          "Affordable price point",
          "Effectively reduces oiliness",
          "Helps with acne and blemishes",
          "Minimal ingredient list",
        ],
        cons: ["Can pill under other products", "Some users report a sticky feeling", "Basic packaging"],
        reviews: [
          {
            name: "Sarah J.",
            email: "sarah@example.com",
            rating: 5,
            comment:
              "Game changer for my oily T-zone! I've been using this for 3 months and my skin is so much more balanced now.",
          },
          {
            name: "Michael T.",
            email: "michael@example.com",
            rating: 4,
            comment: "Works well but I find it pills under my sunscreen. I've started using it only at night.",
          },
        ],
      },
      {
        name: "Rare Beauty Liquid Blush",
        slug: "rare-beauty-blush",
        price: "$23.00",
        summary: "Highly pigmented, long-lasting, and a little goes a very long way. Worth the hype.",
        full_review:
          "Rare Beauty's Liquid Blush has taken the beauty world by storm, and after testing it for several weeks, I understand why. This blush is seriously pigmented - I'm talking one tiny dot for both cheeks kind of pigmented.\n\nThe formula applies smoothly and blends out easily with fingers or a brush, though you need to work quickly as it sets fairly fast. Once set, this blush doesn't budge. I've worn it through 10-hour workdays, workouts, and even got caught in the rain once, and it remained perfectly intact.\n\nThe finish is natural and skin-like - not too dewy but definitely not matte either. It looks like you're naturally flushed, which is exactly what a good blush should do.\n\nMy only complaint is the packaging. While the frosted glass bottle with the gold top looks beautiful, the pump dispenses way too much product. I've learned to barely press it to get just a tiny amount, but I wish they'd redesign this aspect.\n\nAt $23, it's not the cheapest blush on the market, but considering how little product you need per application, this bottle will likely last years. Seriously, I've been using it regularly for months and it still looks full.",
        rating: 4.8,
        pros: [
          "Extremely pigmented - one dot is enough",
          "Long-lasting wear (8+ hours)",
          "Natural, skin-like finish",
          "Inclusive shade range",
        ],
        cons: [
          "Can be easy to over-apply",
          "Sets quickly, requiring fast blending",
          "Pump dispenses more product than needed",
        ],
        reviews: [
          {
            name: "Jessica R.",
            email: "jessica@example.com",
            rating: 5,
            comment:
              "This blush is PIGMENTED! A little goes such a long way. I've had mine for a year and it's still almost full.",
          },
        ],
      },
    ]

    // Sample data for car products
    const carProducts = [
      {
        name: "Tesla Model 3 (2023)",
        slug: "tesla-model-3",
        price: "$40,240 - $53,240",
        summary: "Impressive range and performance, but build quality issues persist in this popular EV.",
        full_review:
          "The Tesla Model 3 continues to be one of the most compelling electric vehicles on the market, offering an impressive blend of range, performance, and technology at a relatively accessible price point (for an EV).\n\nDuring our two-week test period, the Long Range AWD model consistently delivered close to its EPA-estimated 358 miles of range, even with mixed highway and city driving. The acceleration is impressive – quick enough to pin you to your seat and make highway merging effortless.\n\nThe minimalist interior is either a pro or con depending on your preferences. The single 15-inch touchscreen controls virtually everything, which looks clean but can be distracting while driving. The lack of Apple CarPlay and Android Auto remains a frustrating omission in 2023.\n\nBuild quality, while improved from earlier years, still shows inconsistencies. Our test car had slightly misaligned panels and a few interior trim pieces that didn't feel securely attached. These issues don't affect functionality but are disappointing at this price point.\n\nThe Autopilot system works well for highway driving, maintaining speed and lane position effectively, though the Full Self-Driving package ($15,000) remains a costly add-on that doesn't deliver true autonomy.\n\nOverall, the Model 3 is an excellent electric car with some quirks and quality issues that prevent it from being perfect. It's still one of the best EVs for the money, especially when you factor in the Supercharger network advantage.",
        rating: 4.2,
        pros: [
          "Excellent range (272-358 miles)",
          "Quick acceleration (3.1-5.8s 0-60 mph)",
          "Minimalist interior design",
          "Advanced tech features",
          "Supercharger network access",
        ],
        cons: [
          "Inconsistent build quality",
          "No Apple CarPlay or Android Auto",
          "All controls through touchscreen can be distracting",
          "Firm ride quality",
        ],
        reviews: [
          {
            name: "David L.",
            email: "david@example.com",
            rating: 5,
            comment:
              "Love my Model 3! The range is great and it's so fun to drive. Software updates keep making it better.",
          },
          {
            name: "Jennifer P.",
            email: "jennifer@example.com",
            rating: 3,
            comment: "Performance is amazing but had to visit service center 3 times in first year for various issues.",
          },
        ],
      },
      {
        name: "Honda Civic (2023)",
        slug: "honda-civic",
        price: "$23,950 - $30,650",
        summary: "The perfect compact car for most people. Great fuel economy, tech, and driving dynamics.",
        full_review:
          "The 11th generation Honda Civic continues the model's tradition of excellence while addressing most of the shortcomings of previous versions. After spending two weeks with the Civic EX sedan, it's clear why this compact car remains a benchmark in its class.\n\nThe most noticeable improvement is the interior, which looks and feels a class above its price point. The horizontal dashboard design with honeycomb mesh concealing the air vents is both attractive and functional. Materials throughout the cabin are soft-touch where it matters, and everything is assembled with typical Honda precision.\n\nThe driving experience strikes an excellent balance between comfort and engagement. The steering is precise with good feedback, the suspension absorbs bumps well while maintaining body control, and the overall dynamics inspire confidence. The standard 2.0-liter engine (158 hp) provides adequate power, while the upgraded 1.5-liter turbo (180 hp) in the EX and Touring trims offers more satisfying acceleration.\n\nFuel economy is impressive - we averaged 36 mpg in mixed driving with the turbo engine, right in line with EPA estimates. The continuously variable transmission (CVT) is one of the better examples of this technology, mimicking traditional gear shifts under hard acceleration to avoid the droning common to many CVTs.\n\nThe Civic's technology package is comprehensive, with a 7-inch touchscreen (9-inch in Touring) that's responsive and intuitive. Wireless Apple CarPlay and Android Auto are included on all but the base trim. The Honda Sensing safety suite comes standard across the lineup and includes adaptive cruise control, lane-keeping assist, and automatic emergency braking.\n\nWith its combination of efficiency, quality, driving dynamics, and value, the 2023 Civic sets the standard for compact cars. It's not just a good choice in its segment - it's a good car by any measure.",
        rating: 4.6,
        pros: [
          "Excellent fuel economy (up to 42 mpg highway)",
          "Upscale interior design and materials",
          "Engaging driving dynamics",
          "Spacious cabin and trunk",
          "Comprehensive safety features",
        ],
        cons: [
          "Base engine is adequate but not exciting",
          "Some touch controls instead of physical buttons",
          "Road noise on coarse surfaces",
          "Higher trims get close to Accord pricing",
        ],
        reviews: [
          {
            name: "Kevin W.",
            email: "kevin@example.com",
            rating: 5,
            comment:
              "My third Civic and by far the best. The interior feels like it belongs in a much more expensive car.",
          },
        ],
      },
    ]

    // Get category IDs
    const { data: categories } = await supabase.from("categories").select("id, slug")

    if (!categories || categories.length < 2) {
      return NextResponse.json({ error: "Categories not found" }, { status: 404 })
    }

    const beautyCategory = categories.find((c) => c.slug === "beauty")
    const carsCategory = categories.find((c) => c.slug === "cars")

    if (!beautyCategory || !carsCategory) {
      return NextResponse.json({ error: "Categories not found" }, { status: 404 })
    }

    // Insert beauty products
    for (const product of beautyProducts) {
      // Insert product
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          name: product.name,
          slug: product.slug,
          category_id: beautyCategory.id,
          price: product.price,
          summary: product.summary,
          full_review: product.full_review,
          rating: product.rating,
        })
        .select("id")
        .single()

      if (error) {
        console.error("Error inserting product:", error)
        continue
      }

      // Insert pros
      for (const pro of product.pros) {
        await supabase.from("product_pros").insert({
          product_id: newProduct.id,
          content: pro,
        })
      }

      // Insert cons
      for (const con of product.cons) {
        await supabase.from("product_cons").insert({
          product_id: newProduct.id,
          content: con,
        })
      }

      // Insert reviews
      for (const review of product.reviews) {
        await supabase.from("reviews").insert({
          product_id: newProduct.id,
          name: review.name,
          email: review.email,
          rating: review.rating,
          comment: review.comment,
        })
      }
    }

    // Insert car products
    for (const product of carProducts) {
      // Insert product
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          name: product.name,
          slug: product.slug,
          category_id: carsCategory.id,
          price: product.price,
          summary: product.summary,
          full_review: product.full_review,
          rating: product.rating,
        })
        .select("id")
        .single()

      if (error) {
        console.error("Error inserting product:", error)
        continue
      }

      // Insert pros
      for (const pro of product.pros) {
        await supabase.from("product_pros").insert({
          product_id: newProduct.id,
          content: pro,
        })
      }

      // Insert cons
      for (const con of product.cons) {
        await supabase.from("product_cons").insert({
          product_id: newProduct.id,
          content: con,
        })
      }

      // Insert reviews
      for (const review of product.reviews) {
        await supabase.from("reviews").insert({
          product_id: newProduct.id,
          name: review.name,
          email: review.email,
          rating: review.rating,
          comment: review.comment,
        })
      }
    }

    return NextResponse.json({ success: true, message: "Sample data seeded successfully" })
  } catch (error) {
    console.error("Error seeding data:", error)
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 })
  }
}

