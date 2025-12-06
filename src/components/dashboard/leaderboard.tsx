/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { Button } from '../shared/button'
import { Tabs, TabsList, TabsTrigger } from '../shared/tabs'

import { useGetLeaderboard } from '@/api/leaderboard/queries/use-get-leaderboard'
import { cn } from '@/utils/class-names'

export const Leaderboard = () => {
  const [period, setPeriod] = useState<'daily' | 'week' | 'month'>('daily')
  const [showAll, setShowAll] = useState(false)

  const [sortDesc, setSortDesc] = useState(true)
  const [sortField, setSortField] = useState<'coins' | 'name'>('coins')

  const { data, isLoading, isError } = useGetLeaderboard({ period })

  const dataset = data?.data ?? []

  const sortedData = useMemo(() => {
    const sorted = [...dataset].sort((a, b) => {
      if (sortField === 'coins') {
        return sortDesc ? b.coins - a.coins : a.coins - b.coins
      }
      if (sortField === 'name') {
        return sortDesc ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
      }
      return 0
    })

    return sorted
  }, [dataset, sortDesc, sortField])

  const top3 = sortedData.slice(0, 3)

  if (isLoading) {
    return (
      <div className='w-1/2 rounded-xl border bg-white p-6 shadow-sm'>
        Загрузка рейтинга...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='w-1/2 rounded-xl border bg-white p-6 shadow-sm'>
        Не удалось загрузить рейтинг
      </div>
    )
  }

  return (
    <div className='w-1/2 rounded-xl border bg-white p-6 shadow-sm'>
      <Tabs value={period} onValueChange={(v: any) => setPeriod(v)} className='mb-6'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='daily'>День</TabsTrigger>
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
                key={user.userId}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn('flex w-32 flex-col items-center rounded-xl p-4 shadow')}
              >
                <div className='text-lg font-bold'>{user.name}</div>
                <div className='text-sm opacity-70'>{user.coins} pts</div>
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
              setSortField('coins')
              setSortDesc(prev => !prev)
            }}
          >
            Очки {sortField === 'coins' && (sortDesc ? '↓' : '↑')}
          </Button>

          <Button
            variant='outline'
            onClick={() => {
              setSortField('name')
              setSortDesc(prev => !prev)
            }}
          >
            Имя {sortField === 'name' && (sortDesc ? '↓' : '↑')}
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
                    <th className='p-3'>Участник</th>
                    <th className='p-3'>Очки</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((user, i) => (
                    <motion.tr
                      key={user.userId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className='border-t'
                    >
                      <td className='p-3'>{user.name}</td>
                      <td className='p-3 font-semibold'>{user.coins}</td>
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
