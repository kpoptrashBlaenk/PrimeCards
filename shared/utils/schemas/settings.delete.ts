import z from 'zod'

const settingsDeleteSchema = (name: string) =>
  z.object({
    confirmation: z
      .string('Confirmation text empty')
      .refine((value) => value === name, { message: 'Confirmation text not valid' }),
  })

export default settingsDeleteSchema
