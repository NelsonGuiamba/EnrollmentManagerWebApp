import { Prisma } from "../../generated/prisma/"
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

import { ZodIssue } from 'zod';

export type ActionResult<T> =
  { status: 'success', data: T } | { status: 'error', error: string | ZodIssue[] }


export type StudentWithEnrollment = Prisma.StudentGetPayload<{
  include: {
    enrollment: {
      include: {
        appeal: true
      }
    }
  }
}>

