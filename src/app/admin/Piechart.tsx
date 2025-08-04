"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
type Props = {
  data: {
    name: string;
    value: number;
  }[];
};
export default function Piechart({ data }: Props) {
  const COLORS = ["#5271ff", "#c6005c"];

  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <PieChart>
        <Pie
          label
          data={data}
          dataKey={"value"}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={10}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
