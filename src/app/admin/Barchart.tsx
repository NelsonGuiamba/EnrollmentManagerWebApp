'use client'

import React from 'react'
type Props = {
  data: {
    name: string,
    studentsAprroved: number,
    studentsRejected: number,
    studentsPending: number
  }[]
}
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Barchart({ data }: Props) {
  const calculateBarchartWidth = (numberOfItems: number) => {
    return numberOfItems > 4 ? numberOfItems * 100 : '100%';
  };

  return (
    <div className='w-full overflow-x-auto h-full'>
      <ResponsiveContainer
        width={calculateBarchartWidth(data.length)}
        height={'100%'}
      >
        <BarChart data={data} >
          <XAxis dataKey='name' tickFormatter={(value) => {
            if (typeof value === 'string') {
              return value.split(' ')[0]
            }
            return value
          }
          } tick={{ fill: '#bfb5d3' }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={'studentsAprroved'} fill='#4ae0a1' animationDuration={1000} />
          <Bar dataKey={'studentsPending'} fill='#ffd35c' animationDuration={1000} />
          <Bar dataKey={'studentsRejected'} fill='#ff6b6b' animationDuration={1000} />
        </BarChart>

      </ResponsiveContainer>
    </div>


  )
}

