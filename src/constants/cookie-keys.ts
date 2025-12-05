export const CookieKeys = {
  ACCESS_TOKEN: 'accessToken',
} as const

export type CookieKey = (typeof CookieKeys)[keyof typeof CookieKeys]
