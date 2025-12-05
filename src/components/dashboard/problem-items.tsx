'use client'

import { AlertTriangle } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shared/card'

interface ProblemItemsProps {
  items: Array<{
    name: string
    description: string
    errorRate: number
    occurrences: number
  }>
}

export function ProblemItems({ items }: ProblemItemsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Проблемные предметы</CardTitle>
        <CardDescription>
          Предметы с высоким процентом ошибок - области для обучения пользователей
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {items.map((item, index) => (
            <div key={index} className='space-y-2'>
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-3'>
                  <AlertTriangle
                    className='mt-0.5 h-4 w-4 text-yellow-600 dark:text-yellow-500'
                    aria-hidden='true'
                  />
                  <div>
                    <p className='text-sm leading-none font-medium'>{item.name}</p>
                    <p className='text-muted-foreground mt-1 text-xs'>{item.description}</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-bold text-red-600 dark:text-red-500'>
                    {item.errorRate}%
                  </p>
                  <p className='text-muted-foreground text-xs'>
                    {item.occurrences} случаев
                  </p>
                </div>
              </div>
              <div className='bg-secondary h-2 w-full overflow-hidden rounded-full'>
                <div
                  className='h-full bg-red-600 transition-all dark:bg-red-500'
                  style={{ width: `${item.errorRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
