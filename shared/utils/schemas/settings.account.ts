import z from 'zod'

const settingsAccountSchema = z.object({
  name: z.string('Name must not be empty').min(1, 'Name must not be empty'),
})

export default settingsAccountSchema
