import type { RegisterBody } from '#shared/types/body'
import registerSchema from '#shared/utils/schemas/register'
import { serverSupabaseClient } from '#supabase/server'
import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const body: RegisterBody = await readBody(event)

  // validate
  const result = registerSchema.safeParse(body)
  if (!result.success) {
    throw createError({ statusMessage: result.error.message })
  }

  // database
  const { email, password } = result.data
  const supabase = (await serverSupabaseClient(event)).auth

  // sign up
  const { data, error } = await supabase.signUp({ email, password })

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data.user
})
