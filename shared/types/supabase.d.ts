import type { SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js'

declare module '#app' {
  interface NuxtApp {
    $supabase: { client: SupabaseClient }
  }
}

declare global {
  interface User extends SupabaseUser {}
}
