import { useQuery } from '@tanstack/react-query'

import { getPoints } from '../requests'
import { GetPointsRequest, GetPointsResponse } from '../types'

export const useGetPoints = (params: GetPointsRequest) => {
  return useQuery<GetPointsResponse>({
    queryKey: ['points', params],
    queryFn: () => getPoints(params),
    enabled: !!params,
  })
}
