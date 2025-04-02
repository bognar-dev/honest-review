"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitReview } from "@/app/actions"
import { toast } from "@/components/ui/use-toast"

export default function SubmitReviewPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    rating: "4",
    summary: "",
    pros: "",
    cons: "",
    fullReview: "",
    name: "",
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!formData.category) throw new Error("Please select a category")
      if (!formData.productName) throw new Error("Please enter a product name")
      if (!formData.summary) throw new Error("Please enter a summary")
      if (!formData.fullReview) throw new Error("Please enter your review")
      if (!formData.name) throw new Error("Please enter your name")
      if (!formData.email) throw new Error("Please enter your email")

      // Submit the review
      await submitReview(formData)

      // Redirect to success page
      router.push("/submit-review/success")
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6 mb-12">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">SUBMIT YOUR REVIEW</h1>
        <p className="text-xl">Share your honest opinion to help others make informed decisions.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white rounded-2xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="space-y-4">
          <Label htmlFor="category" className="text-xl font-bold">
            CATEGORY
          </Label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange(value, "category")}>
            <SelectTrigger className="border-2 border-black rounded-lg h-14 text-lg">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="cars">Cars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label htmlFor="productName" className="text-xl font-bold">
            PRODUCT NAME
          </Label>
          <Input
            id="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter the full product name"
            className="border-2 border-black rounded-lg h-14 text-lg"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-xl font-bold">RATING</Label>
          <RadioGroup
            value={formData.rating}
            onValueChange={(value) => handleSelectChange(value, "rating")}
            className="flex space-x-4"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="flex flex-col items-center">
                <Label
                  htmlFor={`rating-${rating}`}
                  className={`w-14 h-14 rounded-full border-2 border-black flex items-center justify-center text-xl font-bold cursor-pointer transition-colors ${formData.rating === rating.toString() ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
                >
                  {rating}
                </Label>
                <RadioGroupItem id={`rating-${rating}`} value={rating.toString()} className="sr-only" />
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label htmlFor="summary" className="text-xl font-bold">
            SUMMARY
          </Label>
          <Input
            id="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Brief summary of your review (1-2 sentences)"
            className="border-2 border-black rounded-lg h-14 text-lg"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="pros" className="text-xl font-bold">
            PROS
          </Label>
          <Textarea
            id="pros"
            value={formData.pros}
            onChange={handleChange}
            placeholder="List the positives (one per line)"
            className="border-2 border-black rounded-lg text-lg min-h-[120px]"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="cons" className="text-xl font-bold">
            CONS
          </Label>
          <Textarea
            id="cons"
            value={formData.cons}
            onChange={handleChange}
            placeholder="List the negatives (one per line)"
            className="border-2 border-black rounded-lg text-lg min-h-[120px]"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="fullReview" className="text-xl font-bold">
            FULL REVIEW
          </Label>
          <Textarea
            id="fullReview"
            value={formData.fullReview}
            onChange={handleChange}
            placeholder="Share your detailed experience with this product"
            className="border-2 border-black rounded-lg text-lg min-h-[240px]"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="name" className="text-xl font-bold">
            YOUR NAME
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="How you want to be identified"
            className="border-2 border-black rounded-lg h-14 text-lg"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="email" className="text-xl font-bold">
            EMAIL
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email (not published)"
            className="border-2 border-black rounded-lg h-14 text-lg"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-xl font-bold rounded-none border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors h-16"
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
        </Button>
      </form>
    </div>
  )
}

