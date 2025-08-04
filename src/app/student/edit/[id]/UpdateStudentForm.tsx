"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Card,
  CardHeader,
  CardBody,
  DatePicker,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  addToast,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { GiPadlock } from "react-icons/gi";
import { CalendarDate } from "@heroui/system/dist/types";
import { getLocalTimeZone, today } from "@internationalized/date";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { IoImage } from "react-icons/io5";

import { dateToDateValue, dateValueToDate } from "@/lib/utils";
import { EnrollSchema } from "@/lib/schema/enrollSchema";
import { StudentWithEnrollment } from "@/types";
import { updateStudent } from "@/actions/memberActions";
import { Sex, Shift } from "@/../generated/prisma";

export default function UpdateStudentForm({
  initialData,
}: {
  initialData: StudentWithEnrollment;
}) {
  const router = useRouter();
  const [errors, setErrors] = useState({
    name: true,
    dateOfBirth: true,
    sex: true,
    class: true,
    shift: true,
    certificate: true,
    nationalId: true,
  });
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [formData, setFormData] = useState<EnrollSchema>({
    name: initialData.name,
    certificate: initialData.enrollment?.certificate as string,
    class: initialData.enrollment?.class as number,
    dateOfBirth: initialData.dateOfBirth,
    nationalIdCard: initialData.enrollment?.nationalIdCard as string,
    sex: initialData.sex,
    shift: initialData.enrollment?.shift as Shift,
  });

  function nationalChange(result: CloudinaryUploadWidgetResults) {
    if (result.info && typeof result.info === "object") {
      const public_id = result.info.secure_url;

      setFormData((prev) => ({
        ...prev,
        nationalIdCard: public_id,
      }));
    }
  }
  function certificateChange(result: CloudinaryUploadWidgetResults) {
    if (result.info && typeof result.info === "object") {
      const public_id = result.info.secure_url;

      setFormData((prev) => ({
        ...prev,
        certificate: public_id,
      }));
    }
  }

  function validate() {
    setErrors({
      name: formData.name == undefined || formData.name?.length < 3,
      dateOfBirth: formData.dateOfBirth == undefined,
      sex: formData.sex == undefined,
      class: formData.class == undefined,
      shift: formData.shift == undefined,
      certificate: formData.shift == undefined,
      nationalId: formData.nationalIdCard == undefined,
    });

    return Object.values(errors).some((value) => value === false);
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWasSubmitted(true);
    if (validate()) {
      const result = await updateStudent(
        formData as EnrollSchema,
        initialData.id,
      );

      if (result.status === "success") {
        router.push("/");
      } else {
        console.log(result.error);
        addToast({
          title: "Something went wrong please try again",
          shouldShowTimeoutProgress: true,
          color: "danger",
          timeout: 3000,
        });
      }
    } else console.log("invalido");
  }

  return (
    <Card className="w-full sm:w-[80%] mt-6">
      <CardHeader className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-2xl font-semibold">Update Student</h1>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 flex flex-col gap-3 px-4 py-3">
            <div className="flex  gap-2 flex-col">
              <div className="pb-2">
                <p className="text-xl mb-1 py-3">Student personal details</p>
                <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row pb-2">
                  <Input
                    className=""
                    errorMessage="The name must have at least 4 characters"
                    isInvalid={wasSubmitted && errors.name}
                    label="Student's Name: "
                    value={formData.name}
                    variant="bordered"
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                      validate();
                    }}
                  />

                  <DatePicker
                    showMonthAndYearPickers
                    isInvalid={wasSubmitted && errors.dateOfBirth}
                    label="Student's date of birth"
                    maxValue={today(getLocalTimeZone()).subtract({ years: 6 })}
                    value={dateToDateValue(formData.dateOfBirth)}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        dateOfBirth: dateValueToDate(e as CalendarDate),
                      }));
                    }}
                  />
                </div>
                <RadioGroup
                  defaultValue={formData.sex}
                  label="Sex"
                  orientation="horizontal"
                  onValueChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      sex: e as Sex,
                    }));
                  }}
                >
                  <Radio value={Sex.MASCULINE}>Masculine</Radio>
                  <Radio value={Sex.FEMININE}>Feminine</Radio>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl mt-3 ">Academic details</p>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  <Select
                    isInvalid={wasSubmitted && errors.class}
                    label="Academic year"
                    selectedKeys={formData.class.toString()}
                    onSelectionChange={(keys) => {
                      if (keys.anchorKey !== undefined) {
                        setFormData((prev) => ({
                          ...prev,
                          class: parseInt(keys.anchorKey as string),
                        }));
                        validate();
                      }
                    }}
                  >
                    <SelectItem key={"1"}>First year</SelectItem>
                    <SelectItem key={"2"}>Second year</SelectItem>
                    <SelectItem key={"3"}>Third year</SelectItem>
                    <SelectItem key={"4"}>Forth year</SelectItem>
                    <SelectItem key={"5"}>Fifth year</SelectItem>
                  </Select>
                  <Select
                    isInvalid={wasSubmitted && errors.shift}
                    label="Shift"
                    selectedKeys={new Set([formData.shift])}
                    onSelectionChange={(keys) => {
                      if (keys.anchorKey !== undefined) {
                        setFormData((prev) => ({
                          ...prev,
                          shift: keys.anchorKey as Shift,
                        }));
                      }
                    }}
                  >
                    <SelectItem key={Shift.DAYTIME}>
                      Morning (6h-13h)
                    </SelectItem>
                    <SelectItem key={Shift.NIGHTTIME}>
                      Afternoon (10h-17h)
                    </SelectItem>
                  </Select>
                </div>

                <div className="flex  gap-2 flex-col">
                  <p className="text-xl mt-3 pb-3 ">Documentation</p>

                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                    <div className="flex-1">
                      <CldUploadButton
                        className="flex  items-center gap-2 bg-secondary-500 text-white py-2 px-4 rounded-lg hover:bg-secondary/70"
                        options={{ maxFiles: 1 }}
                        signatureEndpoint={"/api/sign-image"}
                        uploadPreset="nm-testing"
                        onSuccess={nationalChange}
                      >
                        <IoImage size={24} />
                        {formData.nationalIdCard === undefined
                          ? "Upload "
                          : "Change "}
                        National ID Card
                      </CldUploadButton>
                      {wasSubmitted && errors.nationalId && (
                        <p className="text-sm text-red-500">
                          A national id card is required
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      {(formData.class != 1 ||
                        formData.class === undefined) && (
                        <>
                          <CldUploadButton
                            className="flex  items-center gap-2 bg-secondary-500 text-white py-2 px-4 rounded-lg hover:bg-secondary/70"
                            options={{ maxFiles: 1 }}
                            signatureEndpoint={"/api/sign-image"}
                            uploadPreset="nm-testing"
                            onSuccess={certificateChange}
                          >
                            <IoImage size={24} />
                            {formData.certificate === undefined
                              ? "Upload "
                              : "Change "}
                            Certificate
                          </CldUploadButton>

                          {wasSubmitted && errors.certificate && (
                            <p className="text-sm text-red-500">
                              A certificate is required
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button className="mt-4" color="secondary" type="submit">
                Update
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
