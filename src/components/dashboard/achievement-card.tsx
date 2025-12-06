'use client'

import {
  Boxes,
  CheckCircle2,
  Coins,
  GlassWater,
  Newspaper,
  Recycle,
  Sparkles,
  Trophy,
  Wine,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { GARBAGE } from '@/constants/garbage'

import { Badge } from '../shared/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../shared/card'
import { Progress } from '../shared/progress'

import { useGetQuests } from '@/api/quests/queries/use-get-quests'
import type { GarbageType } from '@/api/quests/types'
import { cn } from '@/utils/class-names'

const getWasteIcon = (type: GarbageType | undefined): LucideIcon => {
  const iconMap: Record<GarbageType, LucideIcon> = {
    Plastic: GlassWater,
    Paper: Newspaper,
    Cardboard: Boxes,
    Glass: Wine,
    Metal: Recycle,
    Trash: Recycle,
  }

  return type ? iconMap[type] : Recycle
}

interface WasteIconProps {
  type: GarbageType | undefined
  className?: string
}

function WasteIcon({ type, className }: WasteIconProps) {
  const Icon = getWasteIcon(type)
  // eslint-disable-next-line react-hooks/static-components
  return <Icon className={className} />
}

export const AchievementCard = () => {
  const { data, isLoading } = useGetQuests()

  if (isLoading) {
    return (
      <div className='w-1/2 rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
        <div className='text-brand-black'>Загрузка заданий...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='w-1/2 rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
        <div className='text-brand-black'>Не удалось загрузить задания</div>
      </div>
    )
  }

  const { daily, weekly } = data

  const tType = (type: keyof typeof GARBAGE.type | undefined) =>
    type ? GARBAGE.type[type] : undefined

  const tSubtype = (sub: keyof typeof GARBAGE.subtype | undefined) =>
    sub ? GARBAGE.subtype[sub] : undefined

  const w = weekly.quest
  const isWeeklyCompleted = weekly.completed

  return (
    <div className='w-1/2 space-y-6'>
      <Card
        className={cn(
          'border-brand-yellow relative overflow-hidden border-l-4 shadow-md transition-all hover:shadow-lg',
          isWeeklyCompleted && 'bg-linear-to-r from-green-50 to-white',
        )}
      >
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='bg-brand-yellow/10 flex h-12 w-12 items-center justify-center rounded-lg'>
                <Trophy className='text-brand-yellow h-7 w-7' />
              </div>
              <CardTitle className='text-brand-black text-xl font-bold'>
                Недельный челлендж
              </CardTitle>
            </div>
            {isWeeklyCompleted && <CheckCircle2 className='h-8 w-8 text-green-600' />}
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='flex items-start gap-3'>
            <div className='bg-brand-yellow/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg'>
              <WasteIcon type={w?.subject?.type} className='text-brand-yellow h-6 w-6' />
            </div>
            <div className='flex-1'>
              <h3 className='text-brand-black text-lg font-semibold'>
                {tType(w?.subject?.type) || tSubtype(w?.subject?.subtype)}
              </h3>
              <p className='text-muted-foreground text-sm'>
                Цель: {w?.goal} {w?.subject?.type ? 'кг' : 'шт'}
              </p>
            </div>
            <Badge className='bg-brand-yellow text-brand-black flex items-center gap-1.5 border-yellow-600 px-3 py-1.5 text-base font-bold shadow-sm'>
              <Coins className='h-4 w-4' />
              500
            </Badge>
          </div>

          {!isWeeklyCompleted ? (
            <Progress
              value={weekly.progress}
              max={w.goal}
              showLabel
              className='h-3 bg-gray-200'
            />
          ) : (
            <div className='flex items-center gap-2 rounded-lg bg-green-100 p-3'>
              <CheckCircle2 className='h-5 w-5 text-green-700' />
              <span className='font-semibold text-green-800'>Задание выполнено!</span>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <div className='mb-4 flex items-center gap-2'>
          <Sparkles className='text-brand-yellow h-5 w-5' />
          <h3 className='text-brand-black text-lg font-semibold'>Ежедневные задания</h3>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {daily?.map(d => {
            const q = d.quest
            const isCompleted = d.completed

            return (
              <Card
                key={q.id}
                className={cn(
                  'group cursor-pointer border-gray-100 transition-all hover:-translate-y-1 hover:shadow-md',
                  isCompleted && 'bg-linear-to-br from-green-50 to-white opacity-90',
                )}
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-2'>
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                          isCompleted
                            ? 'bg-green-100'
                            : 'bg-brand-yellow/10 group-hover:bg-brand-yellow/20',
                        )}
                      >
                        <WasteIcon
                          type={q.subject?.type}
                          className={cn(
                            'h-5 w-5',
                            isCompleted ? 'text-green-700' : 'text-brand-yellow',
                          )}
                        />
                      </div>
                      <CardTitle className='text-brand-black text-base font-semibold'>
                        {tType(q.subject?.type) || tSubtype(q.subject?.subtype)}
                      </CardTitle>
                    </div>
                    {isCompleted && <CheckCircle2 className='h-5 w-5 text-green-600' />}
                  </div>
                </CardHeader>

                <CardContent className='space-y-3'>
                  <div className='text-muted-foreground text-sm'>
                    Цель: {q.goal} {q.subject?.type ? 'кг' : 'шт'}
                  </div>

                  {!isCompleted ? (
                    <Progress value={d.progress} max={q.goal} showLabel className='h-2' />
                  ) : (
                    <div className='flex items-center gap-1.5 text-sm font-medium text-green-700'>
                      <CheckCircle2 className='h-4 w-4' />
                      Выполнено
                    </div>
                  )}

                  <div className='pt-2'>
                    <Badge
                      variant={isCompleted ? 'secondary' : 'default'}
                      className={cn(
                        'flex w-fit items-center gap-1.5 px-2.5 py-1',
                        !isCompleted &&
                          'bg-brand-yellow text-brand-black border-yellow-600',
                      )}
                    >
                      <Coins className='h-3.5 w-3.5' />
                      <span className='font-bold'>100</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
