export interface DashboardData {
  kpis: {
    totalWasteCollected: number
    sortingAccuracy: number
    activeTablets: {
      online: number
      total: number
    }
  }
  dailyTrends: Array<{
    date: string
    correct: number
    incorrect: number
  }>
  problematicItems: Array<{
    name: string
    description: string
    errorRate: number
    occurrences: number
  }>
}

export async function getDashboardData(): Promise<DashboardData> {
  return {
    kpis: {
      totalWasteCollected: 1240, // kg
      sortingAccuracy: 87, // percentage
      activeTablets: {
        online: 12,
        total: 15,
      },
    },
    dailyTrends: [
      { date: '2024-11-29', correct: 142, incorrect: 23 },
      { date: '2024-11-30', correct: 156, incorrect: 19 },
      { date: '2024-12-01', correct: 138, incorrect: 28 },
      { date: '2024-12-02', correct: 165, incorrect: 15 },
      { date: '2024-12-03', correct: 171, incorrect: 22 },
      { date: '2024-12-04', correct: 148, incorrect: 31 },
      { date: '2024-12-05', correct: 159, incorrect: 18 },
    ],
    problematicItems: [
      {
        name: 'Контейнер с остатками жира',
        description: 'Пользователи часто забывают помыть перед утилизацией',
        errorRate: 68,
        occurrences: 127,
      },
      {
        name: 'Кофейный стакан с обмоткой',
        description: 'Смешанные материалы вызывают путаницу',
        errorRate: 54,
        occurrences: 89,
      },
      {
        name: 'Пластиковая бутылка',
        description: 'Проблемы с отделением крышки',
        errorRate: 42,
        occurrences: 156,
      },
      {
        name: 'Пластиковый стакан с трубочкой',
        description: 'Неопределенность с загрязнением жиром',
        errorRate: 39,
        occurrences: 73,
      },
      {
        name: 'Пузырчатая пленка',
        description: 'Путаница между мягким и жестким пластиком',
        errorRate: 35,
        occurrences: 45,
      },
    ],
  }
}
