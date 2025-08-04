import { z } from "zod/v4"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, {
    message: "The password must have at least 6 characters"
  }).regex(/[a-zA-z]/, {
    message: "The password must have at least 1 letter"
  }).regex(/[0-9]/, {
    message: "The password must have at least 1 number"
  })
})

export type LoginSchema = z.infer<typeof loginSchema>
