import { auth } from '@/auth'
import StudentsSummary from '@/components/StudentsSummary'
import { getAllStudentsWithParent } from '@/dal/student'
import { notFound } from 'next/navigation'
import React from 'react'
import { EnrollmentStatus } from '../../../generated/prisma'
import Barchart from './Barchart'
import Piechart from './Piechart'
import Areachart from './Areachart'
import Barchart2 from './Barchart2'

export const revalidate = 300
type Barchart1 = {
  name: string,
  studentsAprroved: number,
  studentsRejected: number,
  studentsPending: number
}[]

type Barchart2 = {
  name: string,
  noOfProcesses: number
}[]

type Piechart1 =
  {
    name: string,
    value: number
  }[]

export default async function AdminHomePage() {
  const session = await auth()
  if (!session?.user.id)
    return notFound()
  const data = await getAllStudentsWithParent()
  if (!data || data.length === 0)
    return <div className='flex items-center justify-center flex-col py-8 h-full gap-7'>
      <h1 className='text-center text-xl '>No students were enrolled <span className='font-bold'>yet</span></h1>
      <p>Come back later</p>

    </div>
  const students = data
  let approved = 0
  let pending = 0

  let parentByStudents: Barchart1 = []
  let processByEmployee: Barchart2 = []
  let parentBySex: Piechart1 = []
  let classByNoStudents: Piechart1 = []
  function getObjectWithKey<T, K extends keyof T>(
    array: T[],
    key: K,
    value: T[K]
  ): T | undefined {
    for (const obj of array) {
      if (obj[key] === value) {
        return obj;
      }
    }
    return undefined;
  }
  function updateOrInsert<T, K extends keyof T>(
    array: T[],
    key: K,
    value: T[K],
    newObject: T
  ): void {
    const index = array.findIndex(obj => obj[key] === value);
    if (index !== -1) {
      array[index] = newObject; // sobrescreve totalmente
    } else {
      array.push(newObject); // insere
    }
  }

  function getClassname(clas: number) {
    const classes = ['First', 'Second', 'Third', 'Forth', "Fifth"]
    return classes[clas - 1]
  }
  for (let student of students) {
    const parentName = student.parent.name as string
    let pByStudent = getObjectWithKey(parentByStudents, 'name', parentName)
    if (!pByStudent) {
      pByStudent = {
        'name': parentName,
        studentsAprroved: 0,
        studentsPending: 0,
        studentsRejected: 0
      }
    }

    let genderName = 'Not specified'
    if (student.parent.image === '/images/male.jpg')
      genderName = 'Masculine'
    else if (student.parent.image === '/images/female.jpg')
      genderName = 'Feminine'

    let initialGender = getObjectWithKey(parentBySex, 'name', genderName)
    if (!initialGender)
      initialGender = {
        name: genderName,
        value: 1
      }
    else
      initialGender.value++

    if (student.enrollment?.processedBy?.name) {
      const enrollmentName = student.enrollment.processedBy.name
      let initialEmployee = getObjectWithKey(processByEmployee, 'name', enrollmentName)
      if (!initialEmployee)
        initialEmployee = {
          name: enrollmentName,
          noOfProcesses: 1
        }
      else
        initialEmployee.noOfProcesses++
      updateOrInsert(processByEmployee, 'name', enrollmentName, initialEmployee)
      if (student.enrollment.appeal?.processedBy?.name) {
        const enrollmentName = student.enrollment.appeal.processedBy.name
        let initialEmployee = getObjectWithKey(processByEmployee, 'name', enrollmentName)
        if (!initialEmployee)
          initialEmployee = {
            name: enrollmentName,
            noOfProcesses: 1
          }
        else
          initialEmployee.noOfProcesses++
        updateOrInsert(processByEmployee, 'name', enrollmentName, initialEmployee)
      }

    }



    if (student.enrollment?.status === EnrollmentStatus.APPROVED ||
      student.enrollment?.appeal?.status === EnrollmentStatus.APPROVED) {

      approved++
      pByStudent['studentsAprroved']++
      const className = getClassname(student.enrollment?.class as number)
      let initialClassBySex = getObjectWithKey(classByNoStudents, 'name', className)
      if (!initialClassBySex)
        initialClassBySex = {
          name: className,
          value: 1
        }
      else
        initialClassBySex.value++
      updateOrInsert(classByNoStudents, 'name', className, initialClassBySex)
    }
    else if (student.enrollment?.status === EnrollmentStatus.PENDING ||
      student.enrollment?.appeal?.status === EnrollmentStatus.PENDING) {
      pending++
      pByStudent['studentsPending']++
    } else {
      pByStudent['studentsRejected']++
    }

    updateOrInsert(parentByStudents, 'name', parentName, pByStudent)
    updateOrInsert(parentBySex, 'name', genderName, initialGender)
  }

  return (
    <div className='flex flex-col gap-8 w-full h-full pb-11'>
      <section>
        <h1 className='text-2xl py-3'>Overview</h1>
        <StudentsSummary
          totalStudents={students.length}
          totalPending={pending}
          totalApproved={approved}
        />
      </section>


      <section className='grid grid-rows-[400px_300px_300px_300px] md:grid-rows-[400px_300px] grid-cols-1 gap-8 md:grid-cols-10 w-full h-full'>
        <div className='md:col-span-10 mx-auto'>
          <p className='text-center text-xl mb-2'>Parent by no of childrens</p>
          <Barchart data={parentByStudents} />
        </div>
        <div className='md:col-span-2'>
          <p className='text-center text-xl'>Distribution of gender by parents</p>
          <Piechart data={parentBySex} />
        </div>
        <div className='md:col-span-4 mx-auto'>
          <p className='text-center text-xl mb-2'>Distribution of students by enrolled year</p>
          <Areachart data={classByNoStudents} />
        </div>
        <div className='md:col-span-4 mx-auto'>
          <p className='text-center text-xl mb-2'>No of processes dealt by Employee</p>
          <Barchart2 data={processByEmployee} />
        </div>

      </section >

    </div >
  )
}

