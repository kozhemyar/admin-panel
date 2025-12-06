import { AchievementCard } from '@/components/dashboard/achievement-card'
import { ActivityChart } from '@/components/dashboard/activity-chart'
import { Leaderboard } from '@/components/dashboard/leaderboard'
import { PointSelect } from '@/components/dashboard/point-select'
import { ProblemItems } from '@/components/dashboard/problem-items'
import { StatsCards } from '@/components/dashboard/stats-cards'

import { getDashboardData } from '@/services/analytics-mocks'

export default async function Home() {
  const data = await getDashboardData()

  return (
    <div className='bg-background flex min-h-screen flex-col gap-8 p-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Панель управления отходами</h1>
        <p className='text-muted-foreground'>
          Мониторинг эффективности переработки и выявление возможностей для обучения
        </p>
      </div>
      <div className='flex gap-5'>
        <AchievementCard />
        <Leaderboard />
      </div>

      <PointSelect />
      <StatsCards
        totalWasteCollected={data.kpis.totalWasteCollected}
        sortingAccuracy={data.kpis.sortingAccuracy}
        activeTablets={data.kpis.activeTablets}
      />

      <div className='grid gap-8 lg:grid-cols-2'>
        <ActivityChart data={data.dailyTrends} />
        <ProblemItems items={data.problematicItems} />
      </div>
    </div>
  )
}
