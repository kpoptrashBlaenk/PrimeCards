import { serverSupabaseClient } from '#supabase/server'
import { defineEventHandler, H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const supabase = (await serverSupabaseClient(event)).auth

  await supabase.signOut()
})
