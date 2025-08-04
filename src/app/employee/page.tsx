import { auth } from '@/auth'
import React, { ReactNode } from 'react'
import Link from 'next/link'
import StudentsSummary from '@/components/StudentsSummary'
import { EnrollmentStatus } from '@/../generated/prisma'
import StudentDetail from '@/components/StudentDetail'
import LandingPage from '@/components/LandingPage'
import { getAllStudents } from '@/dal/student'
import StudentDetailFooter from './StudentDetailFooter'
import { Alert } from '@heroui/alert'

export default async function Home() {
  const session = await auth()

  if (session)
    if (session.user) {

      const data = await getAllStudents()

      if (data.length === 0)
        return <NoStudents />

      const students = data
      const approved: Set<string> = new Set()
      const pedding: Set<string> = new Set()


      for (let student of students) {
        if (student.enrollment?.status === EnrollmentStatus.APPROVED ||
          student.enrollment?.appeal?.status === EnrollmentStatus.APPROVED)
          approved.add(student.id)
        else if (student.enrollment?.status === EnrollmentStatus.PENDING ||
          student.enrollment?.appeal?.status === EnrollmentStatus.PENDING)
          pedding.add(student.id)
      }

      // TODO : decide if approved students should appear or not
      //   //.filter((student) =>
      //  student.enrollment?.status == EnrollmentStatus.PENDING ||
      //  student.enrollment?.appeal?.status === EnrollmentStatus.PENDING
      // )
      return <div className='flex flex-col  h-full gap-4'>
        <section>
          <h1 className='text-2xl py-3'>Overview</h1>
          <StudentsSummary
            totalApproved={approved.size} totalPending={pedding.size} totalStudents={students.length} />
        </section>

        <section>

          <h1 className='text-2xl py-3'>Detailed students</h1>
          <div className='flex flex-col gap-8'>

            {students.map((student) => {
              let footer: ReactNode
              if (approved.has(student.id)) {
                footer = <Alert
                  className='max-w-fit px-2 py-2 sm:px-3 sm:py-2'
                  variant='flat'
                  color='success'
                > Status : Approved</Alert >
              }
              else if (student.enrollment?.appeal?.status === 'REJECTED')
                footer = <Alert
                  className='max-w-fit px-2 py-2 sm:px-3 sm:py-2'
                  variant='flat'
                  color='danger'
                > Status : Rejected</Alert >
              else if (student.enrollment?.processedById === session.user.id &&
                student.enrollment?.appeal?.status === 'PENDING')
                footer = <Alert
                  className='max-w-fit px-2 py-2 sm:px-3 sm:py-2'
                  variant='flat'
                  color='default'
                > Status : waiting for response</Alert >
              else
                footer = <StudentDetailFooter student={student} />
              return <StudentDetail key={student.id} student={student}
                footer={footer}
                enrollComponent={<></>}
              />
            }
            )}
          </div>

        </section >

      </div >
    }

  return <LandingPage />
}

function NoStudents() {
  return <div className='flex items-center justify-center flex-col py-8 h-full gap-7'>
    <h1 className='text-center text-xl '>No students were enrolled <span className='font-bold'>yet</span></h1>
    <p>Come back later</p>

  </div>
}


