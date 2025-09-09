import z from 'zod'

const registerSchema = z.object({
  name: z.string('Name must not be empty').min(1, 'Name must not be empty'),
  email: z.email('Email not valid'),
  password: z
    .string('Password must not be empty')
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be no more than 128 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .refine((val) => !/\s/.test(val), 'Password must not contain spaces'),
})

export default registerSchema
