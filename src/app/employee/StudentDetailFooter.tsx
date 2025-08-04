'use client'
import React, { useState, useTransition } from 'react'
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@heroui/modal'
import { Button } from '@heroui/button';
import { updateEnrollment } from '@/actions/employeeActions';
import { addToast, Alert } from '@heroui/react';
import { StudentWithEnrollment } from '@/types';

export default function StudentDetailFooter({ student }: { student: StudentWithEnrollment }) {

  if (student.enrollment?.appeal?.status !== 'PENDING' &&
    student.enrollment?.status !== 'PENDING')
    return <p>Empty footer</p>

  if (student.enrollment?.appeal?.status === 'REJECTED')
    return <Alert
      className='max-w-fit px-2 py-2 sm:px-3 sm:py-2'
      variant='flat'
      color='success'
    > Status : Rejected</Alert >
  const isEnrollment = student.enrollment.status === 'PENDING'
  const formTitle = isEnrollment ? 'enrollment' : 'appeal'
  const { name, id } = student
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalTitle, setTitle] = useState('')
  const [isPending, startTransition] = useTransition()
  const handleOpen = (title: string) => {
    setTitle(title)
    onOpen()
  }


  const handleConfirmation = async () => {
    const status = modalTitle.includes('approve')
    startTransition(async () => {
      const result = await updateEnrollment(isEnrollment, status, id)
      if (result.status === 'success') {
        addToast({
          title: result.data,
          variant: "flat",
          color: "success",
          timeout: 3000,
          shouldShowTimeoutProgress: true,

        })
      }
      else {
        addToast(({
          title: result.error as string,
          variant: 'flat',
          color: 'danger',
          timeout: 3000,
          shouldShowTimeoutProgress: true
        }))
      }
    })

  }


  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-row gap-8'>
        <Button
          color='success'
          variant='solid'
          className='hover:underline hover:bg-primary-100 hover:text-success-500'
          onPress={() => handleOpen(`Do you really want to approve ${name}'s ${formTitle}?`)}
        >Approve {formTitle}</Button>
        <Button
          onPress={() => handleOpen(`Do you really want to reject ${name}'s ${formTitle}?`)}
          color='danger'
          variant='faded'
          className='hover:underline hover:bg-danger-500 hover:text-black transition-colors duration-200'
        >Reject {formTitle}</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
          <ModalContent>
            <ModalHeader>
              Are you sure?
            </ModalHeader>
            <ModalBody>
              {modalTitle}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleConfirmation} isLoading={isPending}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      {!isEnrollment && <p>APPEAL TEXT:{student.enrollment.appeal?.text}</p>}
    </div>
  )
}

