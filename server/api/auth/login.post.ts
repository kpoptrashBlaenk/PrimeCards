import { serverSupabaseClient } from '#supabase/server'
import { User } from '@supabase/auth-js'
import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const body: LoginBody = await readBody(event)

  const supabase = (await serverSupabaseClient(event)).auth

  // sign in
  const { data, error } = await supabase.signInWithPassword({
    email: body.email,
    password: body.password,
  })

  if (error) {
    throw createError({ statusCode: error.status, statusMessage: error.message })
  }

  return data.user as User
})
