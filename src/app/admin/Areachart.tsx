"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
type Props = {
  data: {
    name: string;
    value: number;
  }[];
};
export default function Areachart({ data }: Props) {
  const calculateBarchartWidth = (numberOfItems: number) => {
    return numberOfItems > 3 ? numberOfItems * 100 : "100%";
  };

  return (
    <div className="w-full overflow-x-auto h-full">
      <ResponsiveContainer
        height={"100%"}
        width={calculateBarchartWidth(data.length)}
      >
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={"name"} />
          <YAxis />
          <Area
            animationDuration={1000}
            dataKey={"value"}
            fill="#8994ff"
            stroke="#8884d8"
            type={"monotone"}
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
