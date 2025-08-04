import { prisma } from '@/lib/prisma'
import 'server-only'
import tr from 'zod/v4/locales/tr.cjs'

export async function getAllStudents() {
  try {
    return prisma.student.findMany({ include: { enrollment: { include: { appeal: true } } } })
  }
  catch (err) {
    console.log(err)
    return []
  }
}
export async function getAllStudentsWithParent() {
  try {
    return prisma.student.findMany({
      include:
      {
        enrollment: {
          include:
          {
            appeal: {
              include: {
                processedBy: {
                  select: {
                    name: true
                  }
                }
              }
            },
            processedBy: { select: { name: true } }
          }
        },
        parent: true,
      }
    })
  }
  catch (err) {
    console.log(err)
    return []
  }
}

