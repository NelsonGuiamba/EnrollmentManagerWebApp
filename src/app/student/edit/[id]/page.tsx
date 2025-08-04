import { getStudentById } from '@/actions/memberActions'
import React from 'react'
import UpdateStudentForm from './UpdateStudentForm'
import { StudentWithEnrollment } from '@/types'
import { auth } from '@/auth'
import { notFound } from 'next/navigation'

export default async function StudentPage({ params }:
  { params: Promise<{ id: string }> }) {
  const { id } = await params

  const student = await getStudentById(id) as StudentWithEnrollment
  const session = await auth()
  if (!session?.user.id)
    return notFound()
  if (student.parentId !== session.user.id)
    return notFound()

  return (
    <div className=' flex items-center justify-center flex-col py-8 h-full vertical-center'>
      <UpdateStudentForm initialData={student} />
    </div>

  )
}

