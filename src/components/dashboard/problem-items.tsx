'use client'

import { AlertCircle, AlertTriangle, TrendingUp } from 'lucide-react'

import { cn } from '@/utils/class-names'

interface ProblemItemsProps {
  items: Array<{
    name: string
    description: string
    errorRate: number
    occurrences: number
  }>
}

export function ProblemItems({ items }: ProblemItemsProps) {
  const maxOccurrences = Math.max(...items.map(item => item.occurrences), 1)

  return (
    <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm'>
      <div className='flex items-center justify-between border-b border-gray-100 p-6'>
        <div className='flex items-center gap-3'>
          <div className='bg-brand-yellow/10 flex h-10 w-10 items-center justify-center rounded-lg'>
            <AlertTriangle className='text-brand-yellow h-5 w-5' />
          </div>
          <div>
            <h3 className='text-brand-black text-lg font-bold'>Проблемные предметы</h3>
            <p className='text-xs text-zinc-400'>Высокий процент ошибок сортировки</p>
          </div>
        </div>
      </div>

      <div className='divide-y divide-gray-50'>
        {items.map((item, index) => {
          const barWidth = (item.occurrences / maxOccurrences) * 100

          return (
            <div
              key={index}
              className='group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-gray-50'
            >
              <div className='flex min-w-0 flex-1 items-center gap-4'>
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
                    item.errorRate >= 50
                      ? 'bg-red-50 text-red-600'
                      : item.errorRate >= 30
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-yellow-50 text-yellow-600',
                  )}
                >
                  <AlertCircle className='h-5 w-5' />
                </div>

                <div className='min-w-0 flex-1'>
                  <p className='text-brand-black truncate font-medium'>{item.name}</p>
                  <p className='truncate text-xs text-zinc-500'>{item.description}</p>
                </div>
              </div>

              <div className='flex min-w-[140px] flex-col items-end gap-1.5'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-brand-black text-lg font-bold'>
                    {item.occurrences}
                  </span>
                  <span className='text-xs text-zinc-500'>ошибок</span>
                </div>

                <div className='h-1.5 w-full overflow-hidden rounded-full bg-gray-100'>
                  <div
                    className='bg-brand-yellow h-full rounded-full transition-all duration-300'
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                <div className='flex items-center gap-1'>
                  <TrendingUp className='h-3 w-3 text-red-600' />
                  <span
                    className={cn(
                      'text-xs font-semibold',
                      item.errorRate >= 50
                        ? 'text-red-600'
                        : item.errorRate >= 30
                          ? 'text-orange-600'
                          : 'text-yellow-600',
                    )}
                  >
                    {item.errorRate}% ошибок
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {items.length === 0 && (
        <div className='flex flex-col items-center justify-center p-12 text-center'>
          <div className='bg-brand-yellow/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
            <AlertTriangle className='text-brand-yellow h-8 w-8' />
          </div>
          <p className='text-brand-black font-medium'>Проблемные предметы не найдены</p>
          <p className='text-muted-foreground mt-1 text-sm'>
            Отличная работа! Нет предметов с высоким процентом ошибок
          </p>
        </div>
      )}
    </div>
  )
}
