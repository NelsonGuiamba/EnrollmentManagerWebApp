'use server'

import { auth } from "@/auth";
import { ActionResult } from "@/types";
import { Role, EnrollmentStatus } from "../../generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAuthUser } from "./authActions";


export async function updateEnrollment(isEnrollment: boolean, status: boolean, id: string): Promise<ActionResult<string>> {
  try {
    const session = await getAuthUser(Role.EMPLOYEE)

    const newStatus = status ? EnrollmentStatus.APPROVED : EnrollmentStatus.REJECTED
    if (isEnrollment)
      await prisma.student.update({
        where: { id },
        data: {
          enrollment: {
            update: {
              status: newStatus,
              processedById: session.user.id
            }
          }
        }
      })
    else
      await prisma.student.update({
        where: {
          id: id
        },
        data: {
          enrollment: {
            update: {
              appeal: {
                update: {
                  status: newStatus,
                  processedById: session.user.id
                }
              }
            }
          }
        }
      })
    if (newStatus === 'APPROVED')
      await addToSchoolClass(id)
    revalidatePath('/employee')

    return {
      status: 'success',
      data: `${newStatus.toLocaleLowerCase()} successfully`
    }
  } catch (err) {
    console.log(err)
    return {
      status: 'error',
      error: 'Something went wrong'
    }
  }
}

async function addToSchoolClass(studentId: string) {
  try {
    const studentClass = await prisma.enrollment.findUnique({
      where: {
        studentId: studentId
      },
      select: {
        class: true
      }
    })
    if (!studentClass) {
      console.log('Trying to add student without enrollment error')
      return
    }

    const schoolClass = await prisma.schoolClass.findFirst({
      where: {
        class: studentClass.class
      },
      select: {
        id: true,
        _count: {
          select: {
            students: true
          }
        }
      }
    })
    const createNew = async () => {
      const professor = await prisma.user.findFirst({
        where: { role: 'PROFESSOR' },
        select: {
          id: true,
          name: true,
          _count: { select: { SchoolClass: true } },
        },
        orderBy: {
          SchoolClass: { _count: 'asc' },
        },
      });

      if (!professor) {
        console.log('PROFESSORs are not available please seed the professor data')
        return
      }

      await prisma.schoolClass.create({
        data: {
          class: studentClass.class,
          students: {
            connect: {
              id: studentId
            }
          },
          teacher: {
            connect: {
              id: professor.id
            }
          }
        }
      })
    }

    if (!schoolClass) {
      await createNew()
    } else {
      if (schoolClass._count.students <= 10) {
        await prisma.schoolClass.update({
          where: {
            id: schoolClass.id
          },
          data: {
            students: {
              connect: {
                id: studentId
              }
            }
          }
        })
      }
      else {
        await createNew()
      }
    }


  } catch (err) {
    console.log(err)

  }

}
