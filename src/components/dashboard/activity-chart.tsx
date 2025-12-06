'use client'

import { BarChart3, CheckCircle2, XCircle } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface ActivityChartProps {
  data: Array<{
    date: string
    correct: number
    incorrect: number
  }>
}

// Custom Tooltip Component
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className='rounded-lg border border-gray-100 bg-white p-3 shadow-lg'>
      <p className='mb-2 text-xs font-medium text-zinc-500'>{label}</p>
      <div className='space-y-1'>
        <div className='flex items-center gap-2'>
          <CheckCircle2 className='h-3.5 w-3.5 text-green-600' />
          <span className='text-brand-black text-sm font-bold'>
            {payload[0]?.value || 0} верно
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <XCircle className='h-3.5 w-3.5 text-red-600' />
          <span className='text-brand-black text-sm font-bold'>
            {payload[1]?.value || 0} ошибок
          </span>
        </div>
      </div>
    </div>
  )
}

export function ActivityChart({ data }: ActivityChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('ru-RU', {
      month: 'short',
      day: 'numeric',
    }),
  }))

  const totalCorrect = data.reduce((sum, item) => sum + item.correct, 0)
  const totalIncorrect = data.reduce((sum, item) => sum + item.incorrect, 0)

  return (
    <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='bg-brand-yellow/10 flex h-10 w-10 items-center justify-center rounded-lg'>
            <BarChart3 className='text-brand-yellow h-5 w-5' />
          </div>
          <div>
            <h3 className='text-brand-black text-lg font-bold'>Ежедневная активность</h3>
            <p className='text-xs text-zinc-400'>Сортировка отходов за последние 7 дней</p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='h-3 w-3 rounded-sm bg-green-500' />
            <span className='text-xs font-medium text-zinc-600'>
              Верно ({totalCorrect})
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-3 w-3 rounded-sm bg-red-500' />
            <span className='text-xs font-medium text-zinc-600'>
              Ошибки ({totalIncorrect})
            </span>
          </div>
        </div>
      </div>

      <div className='h-[320px] w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#E5E7EB' />
            <XAxis
              dataKey='date'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 12 }}
              tickFormatter={value => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
            <Bar dataKey='correct' fill='#22c55e' radius={[4, 4, 0, 0]} stackId='a' />
            <Bar dataKey='incorrect' fill='#ef4444' radius={[4, 4, 0, 0]} stackId='a' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
