import { z } from "zod";

export const LogInSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
})

export type SignInSchemaType = z.infer<typeof LogInSchema>

export const SignUpSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }).max(32),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>
