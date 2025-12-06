'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Award, Crown, Medal, Trophy } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Avatar, AvatarFallback } from '../shared/avatar'
import { Badge } from '../shared/badge'
import { Card, CardContent } from '../shared/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../shared/table'
import { Tabs, TabsList, TabsTrigger } from '../shared/tabs'

import { useGetLeaderboard } from '@/api/leaderboard/queries/use-get-leaderboard'
import { cn } from '@/utils/class-names'

// Helper to get user initials from name
const getInitials = (name: string) => {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

// Helper to get avatar color based on rank
const getAvatarColor = (index: number) => {
  const colors = [
    'bg-yellow-500',
    'bg-gray-400',
    'bg-orange-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ]
  return colors[index % colors.length]
}

export const Leaderboard = () => {
  const [period, setPeriod] = useState<'daily' | 'week' | 'month'>('daily')

  const { data, isLoading, isError } = useGetLeaderboard({ period })

  const sortedData = useMemo(() => {
    const dataset = data?.data ?? []
    return [...dataset].sort((a, b) => b.coins - a.coins)
  }, [data?.data])

  const topThree = sortedData.slice(0, 3)
  const rest = sortedData.slice(3)

  if (isLoading) {
    return (
      <div className='w-1/2 rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
        <div className='text-brand-black'>Загрузка рейтинга...</div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='w-1/2 rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
        <div className='text-brand-black'>Не удалось загрузить рейтинг</div>
      </div>
    )
  }

  return (
    <div className='w-1/2 space-y-6'>
      <div className='rounded-xl border border-gray-100 bg-white p-6 shadow-sm'>
        <div className='mb-4 flex items-center gap-2'>
          <Trophy className='text-brand-yellow h-6 w-6' />
          <h2 className='text-brand-black text-xl font-semibold'>Таблица лидеров</h2>
        </div>
        <Tabs value={period} onValueChange={(v: any) => setPeriod(v)}>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='daily'>День</TabsTrigger>
            <TabsTrigger value='week'>Неделя</TabsTrigger>
            <TabsTrigger value='month'>Месяц</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={period}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className='grid grid-cols-3 gap-4'
        >
          {topThree[1] && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='mt-8'
            >
              <Card className='relative overflow-hidden border-gray-200 transition-all hover:shadow-md'>
                <CardContent className='flex flex-col items-center gap-3 pt-6'>
                  <Badge
                    variant='secondary'
                    className='absolute top-2 right-2 bg-gray-100 font-mono text-gray-700'
                  >
                    #2
                  </Badge>
                  <Medal className='h-8 w-8 text-gray-400' />
                  <Avatar className='h-16 w-16 border-2 border-gray-300'>
                    <AvatarFallback className={cn('text-lg text-white', getAvatarColor(1))}>
                      {getInitials(topThree[1].name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='text-center'>
                    <h3 className='text-brand-black font-medium'>{topThree[1].name}</h3>
                    <p className='text-brand-black mt-1 text-2xl font-bold'>
                      {topThree[1].coins.toLocaleString()}
                    </p>
                    <p className='text-muted-foreground text-xs'>очков</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {topThree[0] && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <Card className='relative overflow-hidden border-[#f59e0b] bg-linear-to-br from-yellow-50 to-white shadow-lg transition-all hover:shadow-xl'>
                <CardContent className='flex flex-col items-center gap-4 pt-6'>
                  <Badge className='bg-brand-yellow text-brand-black absolute top-2 right-2 border-yellow-600 font-mono shadow-sm'>
                    #1
                  </Badge>
                  <Crown className='text-brand-yellow h-10 w-10 drop-shadow-md' />
                  <Avatar className='border-brand-yellow h-20 w-20 border-4 shadow-lg'>
                    <AvatarFallback className={cn('text-xl text-white', getAvatarColor(0))}>
                      {getInitials(topThree[0].name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='text-center'>
                    <h3 className='text-brand-black text-lg font-semibold'>
                      {topThree[0].name}
                    </h3>
                    <p className='text-brand-black mt-2 text-3xl font-bold'>
                      {topThree[0].coins.toLocaleString()}
                    </p>
                    <p className='text-muted-foreground text-sm'>очков</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {topThree[2] && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='mt-8'
            >
              <Card className='relative overflow-hidden border-orange-200 transition-all hover:shadow-md'>
                <CardContent className='flex flex-col items-center gap-3 pt-6'>
                  <Badge
                    variant='secondary'
                    className='absolute top-2 right-2 bg-orange-100 font-mono text-orange-700'
                  >
                    #3
                  </Badge>
                  <Award className='h-8 w-8 text-orange-500' />
                  <Avatar className='h-16 w-16 border-2 border-orange-300'>
                    <AvatarFallback className={cn('text-lg text-white', getAvatarColor(2))}>
                      {getInitials(topThree[2].name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='text-center'>
                    <h3 className='text-brand-black font-medium'>{topThree[2].name}</h3>
                    <p className='text-brand-black mt-1 text-2xl font-bold'>
                      {topThree[2].coins.toLocaleString()}
                    </p>
                    <p className='text-muted-foreground text-xs'>очков</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {rest.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='rounded-xl border border-gray-100 bg-white shadow-sm'
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[80px] font-mono'>Ранг</TableHead>
                <TableHead>Участник</TableHead>
                <TableHead className='text-right'>Очки</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rest.map((user, index) => (
                <TableRow key={user.userId} className='group'>
                  <TableCell className='text-muted-foreground font-mono'>
                    <Badge variant='outline' className='font-mono'>
                      #{index + 4}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-9 w-9'>
                        <AvatarFallback
                          className={cn('text-sm text-white', getAvatarColor(index + 3))}
                        >
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-brand-black font-medium'>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <span className='text-brand-black text-lg font-bold tabular-nums'>
                      {user.coins.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </div>
  )
}
