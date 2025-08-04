import { auth } from '@/auth'
import React from 'react'
import { getStudentsByUserId } from '@/actions/memberActions'
import StudentsSummary from '@/components/StudentsSummary'
import { Enrollment, EnrollmentStatus } from '@/../generated/prisma'
import StudentDetail from '@/components/StudentDetail'
import LandingPage from '@/components/LandingPage'
import { Link } from '@heroui/link'
import { StudentDetailEnrollment } from './StudentDetailEnrollment'

export default async function Home() {
  const session = await auth()

  if (session)
    if (session.user) {
      const data = await getStudentsByUserId()

      if (data.status === 'error')
        return <NoStudents />

      const students = data.data
      if (students.length === 0)
        return <NoStudents />

      let approved = 0
      let pedding = 0


      for (let student of students) {
        if (student.enrollment?.status === EnrollmentStatus.APPROVED ||
          student.enrollment?.appeal?.status === EnrollmentStatus.APPROVED)
          approved++
        else if (student.enrollment?.status === EnrollmentStatus.PENDING ||
          student.enrollment?.appeal?.status === EnrollmentStatus.PENDING)
          pedding++
      }


      return <div className='flex flex-col  h-full gap-4'>
        <section>
          <h1 className='text-2xl py-3'>Overview</h1>
          <StudentsSummary
            totalApproved={approved} totalPending={pedding} totalStudents={students.length} />
        </section>

        <section>

          <h1 className='text-2xl py-3'>Detailed students</h1>
          <div className='flex flex-col gap-8'>
            {students.map((student) => {
              let footer = <></>
              if (student.enrollment?.status === 'PENDING' ||
                student.enrollment?.appeal?.status === 'PENDING')
                footer = (<Link className='hover:underline' href={`/student/edit/${student.id}`}>
                  Edit profile
                </Link>)
              if (student.enrollment?.status === 'APPROVED' ||
                student.enrollment?.appeal?.status === 'APPROVED')
                footer = (<Link className='hover:underline' href={`/student/classroom/${student.id}`}>
                  See classroom
                </Link>)
              return <StudentDetail key={student.id} student={student}
                enrollComponent={<StudentDetailEnrollment key={student.id} student={student} />}
                footer={footer}
              />
            }
            )}
          </div>

        </section >

        <section className='py-4 flex flex-col items-center gap-4 '>
          <p className="text-xl font-semibold ">
            Want to enroll more students?
          </p>


          <div className="relative inline-flex  group">
            <div
              className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
            </div>
            <Link href="/enroll" title="Get quote now"
              className="relative inline-flex items-center justify-center px-7 py-3 text-lg font-bold dark:text-white transition-all duration-200 bg-[#f9f7fd] dark:bg-gray-900 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              role="button">Enroll now
            </Link>
          </div>
        </section>

      </div >
    }

  return <LandingPage />
}

function NoStudents() {
  return <div className='flex items-center justify-center flex-col py-8 h-full gap-7'>
    <p className="text-2xl font-semibold text-center flex flex-col gap-1">
      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        You’ve made the best decision by choosing our school.
      </span><br />
      <span>
        Now you’re just one <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent font-bold">click</span> away from enrolling your student.
      </span>
    </p>


    <div className="relative inline-flex  group">
      <div
        className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
      </div>
      <Link href="/enroll" title="Get quote now"
        className="relative inline-flex items-center justify-center px-7 py-3 text-lg font-bold dark:text-white transition-all duration-200 bg-[#f9f7fd] dark:bg-gray-900 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        role="button">Enroll now
      </Link>
    </div>




  </div >

}

