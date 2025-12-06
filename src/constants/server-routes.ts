export const ServerRoutes = {
  POINTS: '/points',
  QUESTS: '/quests'
} as const

export type ServerRoute = (typeof ServerRoutes)[keyof typeof ServerRoutes]
