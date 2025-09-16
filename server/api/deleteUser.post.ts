import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const client = serverSupabaseServiceRole(event)

  const user = await client.auth.admin.deleteUser(body.id)

  if (user.error) throw createError({ statusCode: Number(user.error.code), statusMessage: user.error.message })
})
