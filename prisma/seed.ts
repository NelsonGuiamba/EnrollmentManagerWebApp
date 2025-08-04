import { hash } from "bcryptjs";
import { PrismaClient, Role, Sex, Shift } from "../generated/prisma";
import { teacherData } from "./teachers";
import { employeeData } from "./employees";
import { parentData } from "./parents";
import { studentsData } from "./students";

const prisma = new PrismaClient({ log: ['query'] })
const idBoy = process.env.ID_BOY_PHOTO
const idGirl = process.env.ID_GIRL_PHOTO
const certificate = process.env.CERTIFICATE
type empType = {
  name: string,
  email: string,
  image: string,

}
async function main() {
  const teacherHash = await hash('teacherpass1', 10)

  teacherData.map(async ({ name, email, image }) => {
    await prisma.user.upsert({
      where: {
        email
      },
      update: {},
      create: {
        email,
        name,
        image,
        passwordHash: teacherHash,
        emailVerified: new Date(),
        profileComplete: true,
        role: Role.PROFESSOR
      }
    })
  })

  const employeeHash = await hash('employeepass1', 10)

  employeeData.map(async ({ name, email, image }) => {
    await prisma.user.upsert({
      where: {
        email
      },
      update: {},
      create: {
        email,
        name,
        image,
        passwordHash: employeeHash,
        emailVerified: new Date(),
        profileComplete: true,
        role: Role.EMPLOYEE
      }
    })
  })
  const adminHash = await hash('adminpass1', 10)

  await prisma.user.upsert({
    where: {
      email: 'admin@esjm.com'
    },
    update: {},
    create: {
      email: 'admin@esjm.com',
      name: 'Admin',
      image: '/images/male.jpg',
      passwordHash: adminHash,
      emailVerified: new Date(),
      profileComplete: true,
      role: Role.ADMIN
    }
  })
  const parentHash = await hash('parentpass1', 10)
  let remainingStudents = studentsData.length
  let currStudent = 0
  for (let index = 0; index < parentData.length; index++) {
    const element = parentData[index];

    const parentId = await prisma.user.upsert({
      where: {
        email: element.email
      },
      update: {},
      create: {
        email: element.email,
        name: element.name,
        image: element.image,
        passwordHash: parentHash,
        emailVerified: new Date(),
        profileComplete: true,
        role: Role.MEMBER
      },
      select: {
        id: true
      }
    })

    if (remainingStudents > 0) {
      let noOfStudents
      if (index === parentData.length - 1)
        noOfStudents = remainingStudents
      else
        noOfStudents = getRandomInt(1, Math.min(remainingStudents, 4))
      for (let idx = 0; idx < noOfStudents; idx++) {
        const student = studentsData[currStudent]
        const studentId = await prisma.student.create({
          data: {
            parentId: parentId.id,
            dateOfBirth: new Date(student.dateOfBirth),
            name: student.name,
            sex: student.sex as Sex,
            enrollment: {
              create: {
                certificate: student.enrollment.certificate,
                class: student.enrollment.class,
                shift: student.enrollment.shift as Shift,
                nationalIdCard: student.enrollment.nationalIdCard,
              }
            }
          },
          select: {
            id: true,
            enrollment: {
              select: {
                id: true
              }
            }
          }
        })

        const randomEmployee = randomElement(employeeData)
        const employeeId = await prisma.user.findFirst({
          where: {
            email: randomEmployee?.email as string
          },
          select: {
            id: true
          }
        })

        const shouldBeAcepted = Math.random() < 0.7
        const atFirstTime = Math.random() < 0.5
        await prisma.enrollment.update({
          where: { id: studentId.enrollment?.id },
          data: {
            processedById: employeeId?.id,
            status: atFirstTime ? 'APPROVED' : 'REJECTED'
          }
        })
        if (!atFirstTime) {
          const randomEmployee2 = randomElement(
            employeeData.filter(t => t.email !== randomEmployee.email)) as empType
          const employeeId = await prisma.user.findFirst({
            where: {
              email: randomEmployee2?.email as string
            },
            select: {
              id: true
            }
          })
          await prisma.enrollment.update({
            where: { id: studentId.enrollment?.id },
            data: {
              appeal: {
                create: {
                  text: 'Random appeal text',
                  processedById: employeeId?.id,
                  status: shouldBeAcepted ? 'APPROVED' : 'REJECTED'
                }
              }
            }
          })

        }
        if (shouldBeAcepted)
          addToSchoolClass(studentId.id)

        currStudent++

      }
      remainingStudents -= noOfStudents

    }


  }
  parentData.map(async ({ name, email, image }) => {
    await prisma.user.upsert({
      where: {
        email
      },
      update: {},
      create: {
        email,
        name,
        image,
        passwordHash: parentHash,
        emailVerified: new Date(),
        profileComplete: true,
        role: Role.EMPLOYEE
      }
    })
  })



}
function randomElement<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
