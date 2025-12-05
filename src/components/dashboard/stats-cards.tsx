'use client'

import { Activity, Recycle, Tablet } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card'

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
  const stats = [
    {
      title: 'Всего собрано',
      value: `${totalWasteCollected.toLocaleString()} кг`,
      icon: Recycle,
      description: 'За последние 7 дней',
    },
    {
      title: 'Точность сортировки',
      value: `${sortingAccuracy}%`,
      icon: Activity,
      description: 'Цель: Снизить ошибки',
      variant: sortingAccuracy >= 90 ? 'success' : sortingAccuracy >= 80 ? 'warning' : 'danger',
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
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
              <Icon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-xs text-muted-foreground'>{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
