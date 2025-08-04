import 'server-only'

import { prisma } from "@/lib/prisma"

export async function getClassromByStudentId(id: string, parentId: string) {
  try {
    return prisma.schoolClass.findFirst({
      where: {
        students: {
          some: {
            id,
            parentId
          }
        }
      },
      include: {
        students: true,
        teacher: true
      }
    })
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getClassromByTeacherId(id: string) {
  try {
    return prisma.schoolClass.findFirst({
      where: {
        teacherId: id
      },
      include: {
        students: true,
        teacher: true
      }
    })
  } catch (err) {
    console.log(err)
    return null

  }

}
