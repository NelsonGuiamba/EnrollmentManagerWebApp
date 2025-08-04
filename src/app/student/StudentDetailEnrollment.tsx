"use client";
import React, { ReactNode } from "react";
import { addToast, Alert, Button } from "@heroui/react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Textarea } from "@heroui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiPaperAirplane } from "react-icons/hi2";

import { EnrollmentStatus } from "../../../generated/prisma";

import { AppealSchema, appealSchema } from "@/lib/schema/appealSchema";
import { StudentWithEnrollment } from "@/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { createAppeal } from "@/actions/memberActions";
export const StudentDetailEnrollment = ({
  student,
}: {
  student: StudentWithEnrollment;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const status = student.enrollment?.status as EnrollmentStatus;
  const getColorByStatus = (status: EnrollmentStatus) => {
    switch (status) {
      case "REJECTED":
        return "danger";
      case "APPROVED":
        return "success";
      default:
        return "default";
    }
  };
  let color = "";

  const onSubmit = async (data: AppealSchema) => {
    const result = await createAppeal(data, student.enrollment?.id as string);

    if (result.status === "success") {
      addToast({
        title: "Appeal created successfully",
        description: "Please wait for response",
        variant: "flat",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      onClose();
    } else {
      addToast({
        title: result.error as string,
        variant: "flat",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
  };
  const {
    register,
    reset,
    handleSubmit,
    setError,
    setFocus,
    formState: { isSubmitting, isValid, errors },
  } = useForm<AppealSchema>({
    resolver: zodResolver(appealSchema),
  });

  let renderElement: ReactNode;

  if (status === "REJECTED") {
    if (!student.enrollment?.appeal)
      renderElement = (
        <>
          <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
            <ModalContent>
              <ModalHeader>Appeal Form</ModalHeader>
              <ModalBody>
                <h1 className="text-xl text-center">
                  Reason for Enrollment rejection
                </h1>
                <p>{student.enrollment?.reason}</p>
              </ModalBody>
              <ModalFooter>
                <form
                  autoComplete="off"
                  className="w-full "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex items-center gap-2">
                    <Textarea
                      fullWidth
                      placeholder="Type a message"
                      variant="faded"
                      {...register("text")}
                      aria-autocomplete="none"
                      autoComplete="nope"
                      errorMessage={errors.text?.message}
                      isInvalid={!!errors.text}
                    />
                    <Button
                      isIconOnly
                      color="secondary"
                      isDisabled={isSubmitting}
                      isLoading={isSubmitting}
                      radius="full"
                      type="submit"
                    >
                      <HiPaperAirplane size={18} />
                    </Button>
                  </div>
                </form>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Button color="secondary" onPress={onOpen}>
            Appeal decision
          </Button>
        </>
      );
    else {
      renderElement = (
        <Alert
          className="max-w-fit px-2 py-2 sm:px-3 sm:py-2"
          color={getColorByStatus(student.enrollment.appeal.status)}
          variant="flat"
        >
          {" "}
          Appeal status:{" "}
          {capitalizeFirstLetter(student.enrollment.appeal.status)}
        </Alert>
      );
    }
  }

  return (
    <div className="flex flex-row justify-between items-center gap-8">
      <Alert
        className="max-w-fit px-2 py-2 sm:px-3 sm:py-2"
        color={getColorByStatus(status)}
        variant="flat"
      >
        Enrollment status: {capitalizeFirstLetter(status)}
      </Alert>
      {renderElement}
    </div>
  );
};
