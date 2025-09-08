import type { SupabaseClient } from '@supabase/supabase-js'

declare module '#app' {
  interface NuxtApp {
    $supabase: { client: SupabaseClient }
  }
}

declare global {
  interface SupabaseProfile {
    user_id: string
    created_at: string
    email: string
    name: string
    avatar_url: string
    active: boolean
  }
}
