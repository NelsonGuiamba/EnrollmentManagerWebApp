"use client";

import React from "react";
type Props = {
  data: {
    name: string;
    noOfProcesses: number;
  }[];
};
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export default function Barchart({ data }: Props) {
  const calculateBarchartWidth = (numberOfItems: number) => {
    return numberOfItems > 4 ? numberOfItems * 100 : "100%";
  };

  console.log(data);

  return (
    <div className="w-full overflow-x-auto h-full">
      <ResponsiveContainer
        height={"100%"}
        width={calculateBarchartWidth(data.length)}
      >
        <BarChart barGap={32} data={data}>
          <XAxis
            dataKey="name"
            tick={{ fill: "#bfb5d3" }}
            tickFormatter={(value) => {
              if (typeof value === "string") {
                return value.split(" ")[0];
              }

              return value;
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            animationDuration={1000}
            dataKey={"noOfProcesses"}
            fill="#93b9ba"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
