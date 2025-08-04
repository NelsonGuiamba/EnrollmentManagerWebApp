import { z } from "zod"

export const appealSchema = z.object({
  text: z.string().min(1, {
    message: 'Content is required'
  })
})

export type AppealSchema = z.infer<typeof appealSchema>
