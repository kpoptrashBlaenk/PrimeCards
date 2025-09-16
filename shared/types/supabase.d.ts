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

  interface SupabaseProject {
    project_id: number
    user_id: string
    created_at: string
    name: string
    description?: string
    dev_version: number
    dev_date: string
    prod_version?: number
    prod_date?: string
  }
}
