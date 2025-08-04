"use server";
import { revalidatePath } from "next/cache";

import { Role } from "../../generated/prisma";

import { getAuthUser } from "./authActions";

import { cloudinary } from "@/lib/cloudinary";
import { enrollSchema, EnrollSchema } from "@/lib/schema/enrollSchema";
import { ActionResult, StudentWithEnrollment } from "@/types";
import { prisma } from "@/lib/prisma";
import { appealSchema, AppealSchema } from "@/lib/schema/appealSchema";

export async function deleteImage(publicId: string) {
  return cloudinary.v2.uploader.destroy(publicId);
}
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function createStudent(
  data: EnrollSchema,
): Promise<ActionResult<null>> {
  try {
    const user = await getAuthUser(Role.MEMBER);
    const userId = user.user.id as string;

    const validated = enrollSchema.safeParse(data);

    if (!validated.success)
      return {
        status: "error",
        error: validated.error.message,
      };

    await prisma.student.create({
      data: {
        name: capitalizeFirstLetter(validated.data.name),
        dateOfBirth: validated.data.dateOfBirth,
        sex: validated.data.sex,
        parentId: userId,
        enrollment: {
          create: {
            certificate: validated.data.certificate,
            nationalIdCard: validated.data.nationalIdCard,
            class: validated.data.class,
            shift: validated.data.shift,
          },
        },
      },
    });

    return {
      status: "success",
      data: null,
    };
  } catch (err) {
    console.log(err);

    return {
      status: "error",
      error: "Something went wrong please try again",
    };
  }
}

export async function getStudentById(id: string) {
  try {
    const user = await getAuthUser(Role.MEMBER);
    const userId = user.user.id;

    return await prisma.student.findUnique({
      where: {
        id: id,
        parentId: userId,
      },
      include: {
        enrollment: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getStudentsByUserId(): Promise<
  ActionResult<StudentWithEnrollment[]>
> {
  try {
    const user = await getAuthUser(Role.MEMBER);
    const userId = user.user.id;

    const students = (await prisma.student.findMany({
      where: {
        parentId: userId,
      },
      include: {
        enrollment: {
          include: {
            appeal: true,
          },
        },
      },
    })) as unknown as StudentWithEnrollment[];

    return {
      status: "success",
      data: students,
    };
  } catch (err) {
    console.error(err);

    return {
      status: "error",
      error: "Something went wrong",
    };
  }
}
export async function updateStudent(
  data: EnrollSchema,
  id: string,
): Promise<ActionResult<null>> {
  try {
    const user = await getAuthUser(Role.MEMBER);
    const userId = user.user.id;
    const validated = enrollSchema.safeParse(data);

    if (!validated.success)
      return {
        status: "error",
        error: validated.error.message,
      };

    await prisma.student.update({
      where: {
        id: id,
        parentId: userId,
      },
      data: {
        name: capitalizeFirstLetter(validated.data.name),
        dateOfBirth: validated.data.dateOfBirth,
        sex: validated.data.sex,
        parentId: userId,
        enrollment: {
          update: {
            certificate: validated.data.certificate,
            nationalIdCard: validated.data.nationalIdCard,
            class: validated.data.class,
            shift: validated.data.shift,
          },
        },
      },
    });

    return {
      status: "success",
      data: null,
    };
  } catch (err) {
    console.log(err);

    return {
      error: "something went wrong",
      status: "error",
    };
  }
}

export async function createAppeal(
  data: AppealSchema,
  enrollmentId: string,
): Promise<ActionResult<null>> {
  try {
    await getAuthUser(Role.MEMBER);

    const validated = appealSchema.safeParse(data);

    if (!validated.success)
      return {
        status: "error",
        error: validated.error.message,
      };

    await prisma.appeal.create({
      data: {
        text: validated.data.text,
        enrollmentId,
      },
    });
    revalidatePath("/student");

    return {
      status: "success",
      data: null,
    };
  } catch (err) {
    console.log(err);

    return {
      error: "something went wrong",
      status: "error",
    };
  }
}
