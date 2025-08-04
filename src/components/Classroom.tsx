"use client";
import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@heroui/table";
import clsx from "clsx";
import { useAsyncList } from "@react-stately/data";

import { Student, User } from "../../generated/prisma";

type Props = {
  teacher: User;
  students: Student[];
  classs: number;
  highlight?: string;
};
export default function Classroom({
  teacher,
  classs,
  students,
  highlight,
}: Props) {
  console.log(students);
  let list = useAsyncList({
    async load({ signal }) {
      return {
        items: students,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a: any, b: any) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp;

          if (typeof first === "string" && typeof second === "string") {
            cmp =
              first.toLocaleLowerCase() > second.toLocaleLowerCase() ? -1 : 1;
          } else {
            cmp = first > second ? -1 : 1;
          }

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          console.log(cmp, "dort");

          return cmp;
        }),
      };
    },
  });

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${day}-${month}-${date.getFullYear()}`;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <p>
            Teacher&apos;s name:{" "}
            <span className="font-bold">{teacher.name}</span>
          </p>
          <p>
            Academic Year: <span className="font-bold">{classs}</span>
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          <h1 className=" text-center font-bold text-xl space-y-3">
            List of students
          </h1>
          <Table
            aria-label="List of students"
            defaultSelectedKeys={highlight && [highlight]}
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
          >
            <TableHeader>
              <TableColumn key={"name"} allowsSorting>
                Name
              </TableColumn>
              <TableColumn key={"sex"} allowsSorting>
                Gender
              </TableColumn>
              <TableColumn key={"dateOfBirth"} allowsSorting>
                Date of birth
                <br /> (dd-mm-yyyy)
              </TableColumn>
            </TableHeader>
            <TableBody items={list.items as unknown as Student[]}>
              {(item) => {
                return (
                  <TableRow
                    key={item.id}
                    className={clsx(
                      item.id === highlight && "bg-default-100 rounded-lg",
                    )}
                  >
                    {(columnkey) => {
                      let value;

                      if (columnkey != "dateOfBirth")
                        value = getKeyValue(item, columnkey);
                      else value = formatDate(getKeyValue(item, columnkey));

                      return <TableCell>{value}</TableCell>;
                    }}
                  </TableRow>
                );
              }}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}
