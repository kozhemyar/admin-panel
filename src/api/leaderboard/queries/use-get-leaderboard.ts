import { useQuery } from '@tanstack/react-query'

import { getLeaderboard } from '../requests'
import { GetLeaderboardRequests, GetLeaderboardResponse } from '../types'

export const useGetLeaderboard = (params: GetLeaderboardRequests) => {
  return useQuery<GetLeaderboardResponse>({
    queryKey: ['leaderboard', params],
    queryFn: () => getLeaderboard(params),
    enabled: !!params,
  })
}
