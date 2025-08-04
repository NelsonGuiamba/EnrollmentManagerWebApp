import React from "react";
import { redirect } from "next/navigation";

import { Role } from "../../generated/prisma";

import { auth } from "@/auth";
import LandingPage from "@/components/LandingPage";

export default async function HomePage() {
  const session = await auth();

  if (session)
    if (session.user) {
      const role = session.user.role as Role;

      switch (role) {
        case "MEMBER":
          return redirect("/student");
        case "EMPLOYEE":
          return redirect("/employee");
        case "PROFESSOR":
          return redirect("/professor");
        case "ADMIN":
          return redirect("/admin");
        default:
          return <LandingPage />;
      }
    }

  return <LandingPage />;
}
