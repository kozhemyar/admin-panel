type periodOfTime = 'daily' | 'week' | 'month'

export interface GetLeaderboardResponse {
  data: LeaderboardPoint[]
  total: number
  page: number
  limit: number
  totalPages: number
  period: periodOfTime
}

export interface LeaderboardPoint {
  userId: string
  name: string
  coins: number
  rank: number
}

export interface GetLeaderboardRequests {
  period: periodOfTime
  page?: number
  limit?: number
}
