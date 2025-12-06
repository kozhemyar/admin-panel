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

  const tType = (type: keyof typeof GARBAGE.type) => GARBAGE.type[type]
  const tSubtype = (sub: keyof typeof GARBAGE.subtype) => GARBAGE.subtype[sub]
  const tState = (state: keyof typeof GARBAGE.state) => GARBAGE.state[state]

  return (
    <Card className='flex w-1/2 flex-col gap-6 p-6'>
      {/* Еженедельное задание */}
      <div className='flex flex-col gap-2'>
        <div className='text-sm font-medium'>Еженедельное задание</div>
        <div className='bg-muted rounded-md p-3'>
          <div className='font-semibold'>Тип: {tType(weekly.subject.type)}</div>
          <div>Подтип: {tSubtype(weekly.subject.subtype)}</div>
          <div>Состояние: {tState(weekly.subject.state)}</div>
          <div>Цель: {weekly.goal}</div>
        </div>
      </div>

      {/* Ежедневные задания */}
      <div className='flex flex-col gap-2'>
        <div className='text-sm font-medium'>Ежедневные задания</div>

        <div className='flex flex-col gap-3'>
          {daily.map(q => (
            <div key={q.id} className='bg-muted rounded-md border p-3'>
              <div className='font-semibold'>Тип: {tType(q.subject.type)}</div>
              <div>Подтип: {tSubtype(q.subject.subtype)}</div>
              <div>Состояние: {tState(q.subject.state)}</div>
              <div>Цель: {q.goal}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
