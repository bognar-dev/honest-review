"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { ReviewFormData } from "@/lib/types"

// This would typically connect to a database
// For now, we'll just simulate storing the review
export async function submitReview(formData: ReviewFormData) {
  // Validate form data
  if (!formData.category) throw new Error("Please select a category")
  if (!formData.productName) throw new Error("Please enter a product name")
  if (!formData.summary) throw new Error("Please enter a summary")
  if (!formData.fullReview) throw new Error("Please enter your review")
  if (!formData.name) throw new Error("Please enter your name")
  if (!formData.email) throw new Error("Please enter your email")

  const supabase = getSupabaseServerClient()

  try {
    // Check if the product exists
    let productId: number | null = null

    // Create a slug from the product name
    const slug = formData.productName
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    // Get category ID
    const { data: categoryData } = await supabase.from("categories").select("id").eq("slug", formData.category).single()

    if (!categoryData) {
      throw new Error("Category not found")
    }

    // Check if product exists
    const { data: existingProduct } = await supabase.from("products").select("id").eq("slug", slug).single()

    if (existingProduct) {
      productId = existingProduct.id
    } else {
      // Create new product
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          name: formData.productName,
          slug,
          category_id: categoryData.id,
          price: "",
          summary: formData.summary,
          full_review: formData.fullReview,
          rating: Number.parseInt(formData.rating),
        })
        .select("id")
        .single()

      if (error) throw error
      productId = newProduct.id

      // Add pros
      if (formData.pros) {
        const prosArray = formData.pros.split("\n").filter((pro) => pro.trim() !== "")
        for (const pro of prosArray) {
          await supabase.from("product_pros").insert({
            product_id: productId,
            content: pro.trim(),
          })
        }
      }

      // Add cons
      if (formData.cons) {
        const consArray = formData.cons.split("\n").filter((con) => con.trim() !== "")
        for (const con of consArray) {
          await supabase.from("product_cons").insert({
            product_id: productId,
            content: con.trim(),
          })
        }
      }
    }

    // Add review
    const { error: reviewError } = await supabase.from("reviews").insert({
      product_id: productId,
      name: formData.name,
      email: formData.email,
      rating: Number.parseInt(formData.rating),
      comment: formData.summary,
    })

    if (reviewError) throw reviewError

    // Revalidate the category page to show the new review
    revalidatePath(`/categories/${formData.category}`)
    revalidatePath(`/products/${slug}`)

    return { success: true }
  } catch (error) {
    console.error("Error submitting review:", error)
    throw error
  }
}

