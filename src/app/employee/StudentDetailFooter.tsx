"use client";
import React, { useState, useTransition } from "react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { addToast, Alert } from "@heroui/react";

import { updateEnrollment } from "@/actions/employeeActions";
import { StudentWithEnrollment } from "@/types";

export default function StudentDetailFooter({
  student,
}: {
  student: StudentWithEnrollment;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalTitle, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  if (
    student.enrollment?.appeal?.status !== "PENDING" &&
    student.enrollment?.status !== "PENDING"
  )
    return <p>Empty footer</p>;

  if (student.enrollment?.appeal?.status === "REJECTED")
    return (
      <Alert
        className="max-w-fit px-2 py-2 sm:px-3 sm:py-2"
        color="success"
        variant="flat"
      >
        {" "}
        Status : Rejected
      </Alert>
    );
  const isEnrollment = student.enrollment.status === "PENDING";
  const formTitle = isEnrollment ? "enrollment" : "appeal";
  const { name, id } = student;

  const handleOpen = (title: string) => {
    setTitle(title);
    onOpen();
  };

  const handleConfirmation = async () => {
    const status = modalTitle.includes("approve");

    startTransition(async () => {
      const result = await updateEnrollment(isEnrollment, status, id);

      if (result.status === "success") {
        addToast({
          title: result.data,
          variant: "flat",
          color: "success",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      } else {
        addToast({
          title: result.error as string,
          variant: "flat",
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-8">
        <Button
          className="hover:underline hover:bg-primary-100 hover:text-success-500"
          color="success"
          variant="solid"
          onPress={() =>
            handleOpen(`Do you really want to approve ${name}'s ${formTitle}?`)
          }
        >
          Approve {formTitle}
        </Button>
        <Button
          className="hover:underline hover:bg-danger-500 hover:text-black transition-colors duration-200"
          color="danger"
          variant="faded"
          onPress={() =>
            handleOpen(`Do you really want to reject ${name}'s ${formTitle}?`)
          }
        >
          Reject {formTitle}
        </Button>
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalBody>{modalTitle}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                isLoading={isPending}
                onPress={handleConfirmation}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      {!isEnrollment && <p>APPEAL TEXT:{student.enrollment.appeal?.text}</p>}
    </div>
  );
}
