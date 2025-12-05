export const ClientRoutes = {
  HOME: '/',

  // Auth
  LOGIN: '/login',
} as const

export type ClientRoute = (typeof ClientRoutes)[keyof typeof ClientRoutes]
