import { z } from "zod"

export const SignUpSchema = z.object({
  email: z.string()
    .email({ message: 'Invalid email address' }).max(32),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
});

export const LogInSchema = z.object({
  email: z.string()
    .email({ message: 'Invalid email address' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
});

export const PostSchema = z.object({
  title: z.string()
    .min(1, { message: "Title is required" })
    .max(128, { message: "Title cannot exceed 128 characters" }),
  content: z.string()
    .min(1, { message: "Content is required" })
    .max(4096, { message: "Content cannot exceed 4096 characters" }),
  imageUrl: z.string().optional()
})

export const ProfileSchema = z.object({
  name: z.string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name cannot exceed 20 characters" }),
})
