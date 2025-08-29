import { serverSupabaseClient } from '#supabase/server'
import type { User } from '@supabase/auth-js'
import { createError, defineEventHandler, H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const supabase = (await serverSupabaseClient(event)).auth

  const session = (await supabase.getSession()).data.session

  if (!session) {
    throw createError({ statusCode: 422, statusMessage: 'Session not found.' })
  }

  return session.user as User
})
