import { getDashboardData } from '@/services/analytics-mocks'

import { ActivityChart } from '@/components/dashboard/activity-chart'
import { ProblemItems } from '@/components/dashboard/problem-items'
import { StatsCards } from '@/components/dashboard/stats-cards'

export default async function Home() {
  const data = await getDashboardData()

  return (
    <div className='flex min-h-screen flex-col gap-8 bg-background p-8'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Панель управления отходами</h1>
        <p className='text-muted-foreground'>
          Мониторинг эффективности переработки и выявление возможностей для обучения
        </p>
      </div>

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
