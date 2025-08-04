
'use client'

import React from 'react'
type Props = {
  data: {
    name: string,
    noOfProcesses: number
  }[]
}
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Barchart({ data }: Props) {
  const calculateBarchartWidth = (numberOfItems: number) => {
    return numberOfItems > 4 ? numberOfItems * 100 : '100%';
  };

  console.log(data)

  return (
    <div className='w-full overflow-x-auto h-full'>
      <ResponsiveContainer
        width={calculateBarchartWidth(data.length)}
        height={'100%'}
      >
        <BarChart data={data} barGap={32}>
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
          <Bar dataKey={'noOfProcesses'} fill='#93b9ba' animationDuration={1000} />
        </BarChart>

      </ResponsiveContainer>
    </div>


  )
}
