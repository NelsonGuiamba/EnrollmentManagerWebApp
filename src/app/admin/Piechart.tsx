'use client'
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Sex } from '../../../generated/prisma'
type Props = {
  data: {
    name: string,
    value: number
  }[]
}
export default function Piechart({ data }: Props) {

  const COLORS = ['#5271ff', '#c6005c']
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <PieChart >
        <Pie data={data}
          innerRadius={60}
          outerRadius={80}
          dataKey={'value'}
          paddingAngle={10}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

  )
}

