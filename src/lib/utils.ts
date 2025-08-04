import { FieldValues, UseFormSetError, Path } from "react-hook-form";
import { ZodIssue } from "zod";
import { CalendarDate as RCalendarDate } from '@internationalized/date'
import { CalendarDate } from '@heroui/system/dist/types'
export async function handleFormServerErrors<TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {

  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((e) => {
      const fieldname = e.path.join('.') as Path<TFieldValues>;
      setError(fieldname, { message: e.message });
    })
  } else {
    setError('root.serverError', { message: errorResponse.error })
  }
}

export function dateValueToDate(date: CalendarDate) {
  return new Date(date.year, date.month - 1, date.day)
}

export function dateToDateValue(date: Date) {
  return new RCalendarDate(date.getFullYear(),
    date.getMonth() + 1, // CalendarDate usa 1-based months
    date.getDate()
  )
}

export function capitalizeFirstLetter(inputString?: string | undefined) {
  if (!inputString)
    return ''
  return inputString.charAt(0).toUpperCase() +
    inputString.slice(1).toLowerCase();
}
