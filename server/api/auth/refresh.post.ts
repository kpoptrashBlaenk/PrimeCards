import { serverSupabaseClient } from '#supabase/server'
import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const body: RefreshBody = await readBody(event)

  if (!body.refresh_token) {
    throw createError({ statusCode: 422, statusMessage: 'No refresh token provided.' })
  }

  const supabase = (await serverSupabaseClient(event)).auth
  const { data, error } = await supabase.refreshSession(body)

  if (error) {
    throw createError({ statusCode: error.status, statusMessage: error.message })
  }

  return data as AuthResponse
})
