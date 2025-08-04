"use server"
import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schema/registerSchema";
import { ActionResult } from "@/types";
import { ZodIssue } from "zod";
import bcrypt from "bcryptjs";
import { LoginSchema, loginSchema } from "@/lib/schema/loginSchema";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { Role, User } from "../../generated/prisma";

export async function signInUser(data: LoginSchema): Promise<ActionResult<String>> {
  const validated = loginSchema.safeParse(data)

  if (!validated.success) {
    return {
      status: "error",
      error: validated.error.issues as ZodIssue[]
    }
  }

  try {
    const existingUser = await getUserByEmail(validated.data.email)
    if (!existingUser)
      return {
        status: "error",
        error: "User with this email was not found please sign up"

      }

    const result = await signIn('credentials', {
      email: validated.data.email,
      password: validated.data.password,
      redirect: false
    })


    return {
      status: "success",
      data: "User logged in successfully"
    }

  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: "error", error: "Invalid credentials" }
        default:
          return { status: "error", error: "Something went wrong" }
      }
    }
    else {
      return { status: "error", error: "Something else went wrong" }
    }
  }
}
export async function signOutUser() {
  await signOut({
    redirectTo: '/',
    redirect: true
  })
}
export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
  const validated = registerSchema.safeParse(data)

  if (!validated.success) {
    return {
      status: 'error',
      error: validated.error.issues as ZodIssue[]
    }
  }

  try {
    const { name, email, password } = validated.data
    const existsUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existsUser) {
      return {
        status: "error",
        error: "User with this email already exists"
      }

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: hashedPassword
      }
    })

    await signInUser({
      email: email,
      password: password
    })

    return {
      status: "success",
      data: user
    }
  } catch (error) {
    console.error(error)
    return {
      status: "error",
      error: "Ocorreu um problema"
    }
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  })
}

export async function getAuthUserId() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error("Unauthorised")

  return userId
}

export async function getAuthUser(assertRole: Role) {
  const session = await auth()
  if (!session?.user)
    throw new Error("Unauthorised")
  const userId = session?.user?.id
  const role = session?.user.role

  if (!userId || !role) throw new Error("Unauthorised")

  if (role != assertRole) throw new Error("Unauthorised")
  return session
}
