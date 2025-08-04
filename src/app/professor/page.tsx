import { notFound } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import Classroom from "@/components/Classroom";
import { getClassromByTeacherId } from "@/dal/schoolclass";

export default async function ProfessorHomePage() {
  const session = await auth();

  if (!session?.user.id) return notFound();
  const data = await getClassromByTeacherId(session.user.id);

  if (!data || !data.teacher)
    return (
      <div className="flex items-center justify-center flex-col py-8 h-full gap-7">
        <h1 className="text-center text-xl ">
          No students were enrolled <span className="font-bold">yet</span>
        </h1>
        <p>Come back later</p>
      </div>
    );

  return (
    <Classroom
      classs={data.class}
      students={data.students}
      teacher={data.teacher}
    />
  );
}
