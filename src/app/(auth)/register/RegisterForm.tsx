'use client'
import { Button } from '@heroui/button'
import { Card, CardHeader, CardBody, addToast } from '@heroui/react'
import { Input } from '@heroui/react'
import React from 'react'
import { GiPadlock } from 'react-icons/gi'
import { RegisterSchema, registerSchema } from '@/lib/schema/registerSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/actions/authActions'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const { register, handleSubmit, setError, formState: { isValid, errors, isSubmitting } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched"
  });
  const router = useRouter()

  async function onSubmit(data: RegisterSchema) {
    const result = await registerUser(data)
    if (result.status === 'success')
      router.push('/')
    else {
      addToast({
        title: "Register",
        variant: "flat",
        color: "danger",
        description: result.error as string,
        timeout: 3000,
        shouldShowTimeoutProgress: true
      })
    }

  }

  return (
    <Card className='w-full sm:w-3/5 mt-6' >
      < CardHeader className='flex flex-col justify-center items-center' >
        <div className='flex flex-col gap-4 items-center text-secondary'>
          <div className='flex flex-row items-center gap-3'>
            <GiPadlock size={30} />
            <h1 className='text-2xl font-semibold'>Registro</h1>
          </div>
        </div>

        <p className='text-neutral'>Welcome to  ESJM</p>
      </CardHeader >

      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} >

          <div className='space-y-4 flex flex-col gap-4'>
            <Input
              label="Name"
              variant='bordered'
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              label="Email"
              variant='bordered'
              isInvalid={!!errors.email}
              {...register('email')}
              errorMessage={errors.email?.message}
            />
            <Input
              label="Password"
              variant='bordered'
              isInvalid={!!errors.password}
              type='password'
              {...register('password')}
              errorMessage={errors.password?.message}
            />
            <Button
              isDisabled={!isValid}
              isLoading={isSubmitting}
              type='submit' fullWidth color='secondary'>
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card >
  )
}

