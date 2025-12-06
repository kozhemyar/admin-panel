'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { Button } from '../shared/button'
import { Tabs, TabsList, TabsTrigger } from '../shared/tabs'

import { cn } from '@/utils/class-names'

type User = {
  id: number
  name: string
  score: number
}

const mockData = {
  day: [
    { id: 1, name: 'Alice', score: 130 },
    { id: 2, name: 'Bob', score: 120 },
    { id: 3, name: 'Charlie', score: 100 },
    { id: 4, name: 'Eiana', score: 90 },
    { id: 5, name: 'Dvan', score: 70 },
  ],
  week: [
    { id: 1, name: 'Bob', score: 700 },
    { id: 2, name: 'Charlie', score: 650 },
    { id: 3, name: 'Alice', score: 600 },
    { id: 4, name: 'Dvan', score: 500 },
    { id: 5, name: 'Eiana', score: 430 },
  ],
  month: [
    { id: 1, name: 'Charlie', score: 2500 },
    { id: 2, name: 'Alice', score: 2300 },
    { id: 3, name: 'Bob', score: 2100 },
    { id: 4, name: 'Eiana', score: 1800 },
    { id: 5, name: 'Dvan', score: 1600 },
  ],
}

export const Leaderboard = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day')
  const [showAll, setShowAll] = useState(false)

  const [sortDesc, setSortDesc] = useState(true)
  const [sortField, setSortField] = useState<'score' | 'name'>('score')

  const sortedData = useMemo(() => {
    const sorted = [...mockData[period]].sort((a, b) => {
      if (sortField === 'score') {
        return sortDesc ? b.score - a.score : a.score - b.score
      }
      if (sortField === 'name') {
        return sortDesc ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
      }
      return 0
    })

    return sorted
  }, [period, sortDesc, sortField])

  const top3 = sortedData.slice(0, 3)

  return (
    <div className='w-1/2 rounded-xl border bg-white p-6 shadow-sm'>
      <Tabs value={period} onValueChange={(v: any) => setPeriod(v as any)} className='mb-6'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='day'>День</TabsTrigger>
          <TabsTrigger value='week'>Неделя</TabsTrigger>
          <TabsTrigger value='month'>Месяц</TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence mode='wait'>
        <motion.div
          key={period}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <div className='mb-10 flex justify-center gap-6'>
            {top3.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn('flex w-32 flex-col items-center rounded-xl p-4 shadow')}
              >
                <div className='text-lg font-bold'>{user.name}</div>
                <div className='text-sm opacity-70'>{user.score} pts</div>
                <div className='mt-1 text-xs font-semibold'>
                  {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center justify-center gap-5'>
          <Button
            variant='outline'
            onClick={() => {
              setSortField('score')
              setSortDesc(p => !p)
            }}
          >
            Сортировка по очкам {sortDesc && sortField === 'score' ? '↓' : '↑'}
          </Button>

          <Button
            variant='outline'
            onClick={() => {
              setSortField('name')
              setSortDesc(p => !p)
            }}
          >
            Сортировка по имени {sortDesc && sortField === 'name' ? '↓' : '↑'}
          </Button>
        </div>

        <Button onClick={() => setShowAll(s => !s)}>
          {showAll ? 'Скрыть' : 'Смотреть все'}
        </Button>
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='overflow-hidden rounded-lg border'>
              <table className='w-full text-left'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='p-3'>Точка</th>
                    <th className='p-3'>Очки</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className='border-t'
                    >
                      <td className='p-3'>{user.name}</td>
                      <td className='p-3 font-semibold'>{user.score}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
