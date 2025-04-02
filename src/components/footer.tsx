import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-beige py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">HONEST REVIEWS</h3>
            <p className="text-lg">Brutally honest product reviews you can trust.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">CATEGORIES</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/beauty" className="text-lg hover:underline">
                  Beauty
                </Link>
              </li>
              <li>
                <Link href="/categories/cars" className="text-lg hover:underline">
                  Cars
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">CONTACT</h4>
            <p className="text-lg">info@honestreviews.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-black">
          <p className="text-center">© {new Date().getFullYear()} HONEST REVIEWS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

