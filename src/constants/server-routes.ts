export const ServerRoutes = {
  POINTS: '/points',
  QUESTS: '/quests',
  LEADERBOARD: '/leaderboard',
} as const

export type ServerRoute = (typeof ServerRoutes)[keyof typeof ServerRoutes]
