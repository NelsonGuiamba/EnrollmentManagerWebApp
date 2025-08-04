import { Card, CardBody } from '@heroui/card'
import React from 'react'

type Props = {
  totalStudents: number,
  totalApproved: number,
  totalPending: number
}
export default function StudentsSummary(props: Props) {
  const cardStyles = 'w-fit min-w'
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 '>
      <Card className='min-w-56'>
        <CardBody className='flex flex-col justify-between gap-12 px-3 py-4'>
          <p className='text-xl text-start'>Number of  students enrolled</p>
          <p className='text-2xl text-end'>{props.totalStudents}</p>
        </CardBody>
      </Card>
      <Card className='min-w-56'>
        <CardBody className='flex flex-col justify-between gap-12 px-3 py-4'>
          <p className='text-xl text-start'>Number of pending  processes</p>
          <p className='text-2xl text-end'>{props.totalPending}</p>
        </CardBody>
      </Card>
      <Card className='min-w-56'>
        <CardBody className='flex flex-col justify-between gap-12 px-3 py-4'>
          <p className='text-xl text-start'>Number of aproved processes</p>
          <p className='text-2xl text-end'>{props.totalApproved}</p>
        </CardBody>
      </Card>
      <Card className='min-w-56'>
        <CardBody className='flex flex-col justify-between gap-12 px-3 py-4'>
          <p className='text-xl text-start'>Number of rejected processes</p>
          <p className='text-2xl text-end'>{props.totalStudents - props.totalApproved - props.totalPending}</p>
        </CardBody>
      </Card>

    </div>
  )
}

