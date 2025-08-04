import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { loginSchema } from "./lib/schema/loginSchema";
import { getUserByEmail } from "./actions/authActions";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(cred) {
        const validated = loginSchema.safeParse(cred);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (!user || !(await compare(password, user?.passwordHash)))
            return null;

          return user;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
