'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shared/card'

interface ActivityChartProps {
  data: Array<{
    date: string
    correct: number
    incorrect: number
  }>
}

export function ActivityChart({ data }: ActivityChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('ru-RU', {
      month: 'short',
      day: 'numeric',
    }),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ежедневная активность сортировки</CardTitle>
        <CardDescription>Верная и ошибочная сортировка отходов за последние 7 дней</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='date'
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={value => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Bar dataKey='correct' fill='#22c55e' name='Верно' stackId='a' />
            <Bar dataKey='incorrect' fill='#ef4444' name='Ошибка' stackId='a' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
