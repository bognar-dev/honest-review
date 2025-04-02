import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Create a Supabase client for server components
export function getSupabaseServerClient() {
  const cookieStore = cookies()

  return createClient(process.env.SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string, {
    cookies: {
      async get(name: string) {
        return (await cookieStore).get(name)?.value
      },
    },
  })
}

