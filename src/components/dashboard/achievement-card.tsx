'use client'

import { GARBAGE } from '@/constants/garbage'

import { Card } from '../shared/card'

import { useGetQuests } from '@/api/quests/queries/use-get-quests'

export const AchievementCard = () => {
  const { data, isLoading } = useGetQuests()

  if (isLoading) {
    return <Card className='flex w-1/2 p-6'>Загрузка заданий...</Card>
  }

  if (!data) {
    return <Card className='flex w-1/2 p-6'>Не удалось загрузить задания</Card>
  }

  const { daily, weekly } = data

  const tType = (type: keyof typeof GARBAGE.type | undefined) =>
    type ? GARBAGE.type[type] : undefined

  const tSubtype = (sub: keyof typeof GARBAGE.subtype | undefined) =>
    sub ? GARBAGE.subtype[sub] : undefined

  const w = weekly.quest

  return (
    <Card className='flex w-1/2 flex-col gap-6 p-6'>
      <div className='flex flex-col gap-2'>
        <div className='text-sm font-medium'>Еженедельное задание</div>

        <div className='bg-muted flex flex-col gap-2 rounded-md p-3'>
          <div className='font-semibold'>Тип: {tType(w?.subject?.type)}</div>
          <div>Подтип: {tSubtype(w?.subject?.subtype)}</div>
          <div>Цель: {w?.goal}</div>

          <div className='text-muted-foreground text-xs'>
            Прогресс: {weekly.progress}/{w.goal}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='text-sm font-medium'>Ежедневные задания</div>

        <div className='flex flex-col gap-3'>
          {daily?.map(d => {
            const q = d.quest

            return (
              <div
                key={q.id}
                className='bg-muted flex flex-col gap-2 rounded-md border p-3'
              >
                {q.subject?.type ? (
                  <div className='font-semibold'>Тип: {tType(q.subject.type)}</div>
                ) : (
                  <div className='font-semibold'>
                    Подтип: {tSubtype(q.subject?.subtype)}
                  </div>
                )}

                <div>Цель: {q.goal}</div>

                <div className='text-muted-foreground text-xs'>
                  Прогресс: {d.progress}/{q.goal}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
