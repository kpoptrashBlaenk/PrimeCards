import type { SupabaseClient } from '@supabase/supabase-js'

declare module '#app' {
  interface NuxtApp {
    $supabase: { client: SupabaseClient }
  }
}

// declare module 'vue' {
//   interface ComponentCustomProperties {
//     $supabase: SupabaseClient
//   }
// }
