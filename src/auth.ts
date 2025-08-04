import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Role } from "../generated/prisma"


export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ user, token }) {
      if (user)
        token.role = user.role
      return token
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as Role
      }
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
