import z from 'zod'

const emailSchema = z.object({
  email: z.email('Email not valid'),
})

export default emailSchema
