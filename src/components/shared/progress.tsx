'use client'

import * as React from 'react'
import { cn } from '@/utils/class-names'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  showLabel?: boolean
}

function Progress({ className, value = 0, max = 100, showLabel = false, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className='relative w-full'>
      {showLabel && (
        <div className='mb-1 flex justify-between text-xs font-medium'>
          <span className='text-muted-foreground'>
            {value} / {max}
          </span>
          <span className='text-muted-foreground'>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-gray-100', className)}
        {...props}
      >
        <div
          className='bg-brand-yellow h-full transition-all duration-300 ease-in-out'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export { Progress }
