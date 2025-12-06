'use client'

import { Activity, Recycle, Tablet, TrendingDown, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-names'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: 'up' | 'down'
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant,
}: StatCardProps) {
  return (
    <div className='group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md'>
      <div
        className={cn(
          'flex h-14 w-14 shrink-0 items-center justify-center rounded-lg transition-all',
          variant === 'success' && 'bg-green-100 text-green-700',
          variant === 'warning' && 'bg-orange-100 text-orange-700',
          variant === 'danger' && 'bg-red-100 text-red-700',
          !variant && 'bg-brand-yellow text-brand-black group-hover:bg-brand-yellow/90',
        )}
      >
        <Icon className='h-7 w-7' />
      </div>

      <div className='flex-1 space-y-1'>
        <p className='text-sm font-medium tracking-wide text-zinc-500 uppercase'>{title}</p>
        <div className='flex items-baseline gap-2'>
          <h3 className='text-brand-black text-3xl font-bold'>{value}</h3>
          {trend && (
            <span
              className={cn(
                'flex items-center text-xs font-medium',
                trend === 'up' && 'text-green-600',
                trend === 'down' && 'text-red-600',
              )}
            >
              {trend === 'up' ? (
                <TrendingUp className='h-3 w-3' />
              ) : (
                <TrendingDown className='h-3 w-3' />
              )}
            </span>
          )}
        </div>
        {description && <p className='text-xs text-zinc-400'>{description}</p>}
      </div>
    </div>
  )
}

interface StatsCardsProps {
  totalWasteCollected: number
  sortingAccuracy: number
  activeTablets: {
    online: number
    total: number
  }
}

export function StatsCards({
  totalWasteCollected,
  sortingAccuracy,
  activeTablets,
}: StatsCardsProps) {
  const stats: StatCardProps[] = [
    {
      title: 'Всего собрано',
      value: `${totalWasteCollected.toLocaleString()} кг`,
      icon: Recycle,
      description: 'За последние 7 дней',
      trend: totalWasteCollected > 0 ? 'up' : undefined,
    },
    {
      title: 'Точность сортировки',
      value: `${sortingAccuracy}%`,
      icon: Activity,
      description: 'Цель: Снизить ошибки',
      variant:
        sortingAccuracy >= 90 ? 'success' : sortingAccuracy >= 80 ? 'warning' : 'danger',
    },
    {
      title: 'Активные устройства',
      value: `${activeTablets.online}/${activeTablets.total}`,
      icon: Tablet,
      description: 'Устройства онлайн',
    },
  ]

  return (
    <div className='grid gap-4 md:grid-cols-3'>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
