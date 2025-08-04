import { Spinner } from '@heroui/spinner'
import React from 'react'

export default function LoadingPage() {
  return (
    <div className='flex flex-col w-full h-full justify-center'>
      <Spinner label='Loading' size='md' color='secondary' />
    </div>
  )
}

