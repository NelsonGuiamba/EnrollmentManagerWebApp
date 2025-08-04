'use client'
import { capitalizeFirstLetter } from '@/lib/utils'
import { StudentWithEnrollment } from '@/types'
import { Button } from '@heroui/button'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { Link } from '@heroui/link'
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@heroui/modal'
import { Alert, Image } from '@heroui/react'
import React, { ReactNode, useState } from 'react'
import { IconType } from 'react-icons'
type Props = {
  student: StudentWithEnrollment,
  footer: ReactNode,
  enrollComponent: ReactNode
}

export default function StudentDetail({ student, footer, enrollComponent }: Props) {
  const day = student.dateOfBirth.getUTCDate()
  const month = student.dateOfBirth.getUTCMonth()
  const year = student.dateOfBirth.getUTCFullYear()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState<'certificate' | 'idcard'>('idcard')

  const openWithCertificate = () => {
    setModalType('certificate')
    onOpen()
  }
  const openWithIdCard = () => {
    setModalType('idcard')
    onOpen()
  }


  return (
    <Card className='w-full sm:w-4/5 sm:mx-auto  px-4 py-4'>
      <CardHeader>
        <p className='text-center text-xl w-full'>{student.name}</p>
      </CardHeader>
      <CardBody>
        <div className='flex flex-col sm:flex-row justify-around gap-1'>
          <div className='flex-1 flex flex-col gap-2'>
            <h2 className='text-bold'>Personal Details</h2>
            <p>Sex : {student.sex}</p>
            <p>Date of Birth : {day}/{month}/{year}</p>


          </div>
          <div className='shrink-0 bg-divider border-none w-divider h-full'></div>
          <div className='flex-1 flex flex-col justify-around gap-3'>
            <h2 className='text-bold'>Academic information</h2>
            <p>Academic year: {student.enrollment?.class}</p>
            <p>Shift {student.enrollment?.shift === 'DAYTIME' ? 'Morning' : 'Afternoon'}</p>
            <div className='flex flex-row gap-3'>
              <Button color='secondary' onPress={openWithCertificate}>See certificate</Button>
              <Button color='secondary' onPress={openWithIdCard}>See national id Card</Button>
            </div>
            {enrollComponent}

          </div>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
          <ModalContent>
            <ModalHeader>
              {modalType === 'certificate' ? 'Certificate' : "National id card"}
            </ModalHeader>
            <ModalBody>
              <Image
                src={modalType === 'certificate' ?
                  student.enrollment?.certificate as string :
                  student.enrollment?.nationalIdCard as string
                }
                alt='w of student'
                className='w-full h-full'
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </CardBody>
      <CardFooter>
        {footer}

      </CardFooter>

    </Card>
  )
}

