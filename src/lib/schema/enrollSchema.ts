import { z } from "zod/v4"
import { Sex, Shift } from "../../../generated/prisma"

export const enrollSchema = z.object({
  name: z.string().min(4, {
    message: "Student name must have at least 4 characters"
  }),
  sex: z.enum(Sex),
  dateOfBirth: z.date(),
  class: z.number(),
  shift: z.enum(Shift),
  certificate: z.string(),
  nationalIdCard: z.string()

})

export type EnrollSchema = z.infer<typeof enrollSchema>
