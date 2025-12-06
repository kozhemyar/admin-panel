import { ServerRoutes } from '@/constants/server-routes'

import { instance } from '../api-instance'

import { GetLeaderboardRequests, GetLeaderboardResponse } from './types'

export const getLeaderboard = async (data: GetLeaderboardRequests) => {
  const response = (
    await instance.get<GetLeaderboardResponse>(ServerRoutes.LEADERBOARD, {
      params: data,
    })
  ).data
  return response
}
