import { notFound } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import Classroom from "@/components/Classroom";
import { getClassromByStudentId } from "@/dal/schoolclass";

export default async function ClassroomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user.id) return notFound();
  const data = await getClassromByStudentId(id, session.user.id);

  if (!data || !data.teacher) return notFound();

  return (
    <div className="mt-6">
      <Classroom
        classs={data.class}
        highlight={id}
        students={data.students}
        teacher={data.teacher}
      />
    </div>
  );
}
