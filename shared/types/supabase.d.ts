import type { SupabaseClient, EmailOtpType as SupabaseEmailOtpType } from '@supabase/supabase-js'

declare module '#app' {
  interface NuxtApp {
    $supabase: { client: SupabaseClient }
  }
}

declare global {
  type EmailOtpType = SupabaseEmailOtpType

  interface SupabaseProfile {
    user_id: string
    created_at: string
    email: string
    name: string
    avatar_path: string | undefined
    active: boolean
  }
}
