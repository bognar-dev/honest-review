import { createClient, SupabaseClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return createClient<any, "public", any>(supabaseUrl, supabaseAnonKey)
}

// Singleton pattern to avoid multiple instances
let browserClient: SupabaseClient<any, "public", any> | null = null

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}