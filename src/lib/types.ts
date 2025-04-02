export type Category = {
  id: number
  name: string
  slug: string
  created_at: string
}

export type Product = {
  id: number
  name: string
  slug: string
  category_id: number
  price: string
  summary: string
  full_review: string
  rating: number
  created_at: string
  updated_at: string
}

export type ProductPro = {
  id: number
  product_id: number
  content: string
}

export type ProductCon = {
  id: number
  product_id: number
  content: string
}

export type Review = {
  id: number
  product_id: number
  name: string
  email: string
  rating: number
  comment: string
  created_at: string
}

export type ProductWithDetails = Product & {
  pros: ProductPro[]
  cons: ProductCon[]
  reviews: Review[]
  category: Category
}

export type ReviewFormData = {
  category: string
  productName: string
  rating: string
  summary: string
  pros: string
  cons: string
  fullReview: string
  name: string
  email: string
}

