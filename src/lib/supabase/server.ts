import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

// Create a Supabase client for server components
export function getSupabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient(process.env.SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string, {
    cookies: {
      async get(name: string) {
        return (await cookieStore).get(name)?.value
      },
      async set(name: string, value: string, options: any) {
        (await cookieStore).set({ name: name, value: value, ...options })
      },
      async remove(name: string, options: any) {
        (await cookieStore).delete({ name, ...options })
      },
    },
  })
}

