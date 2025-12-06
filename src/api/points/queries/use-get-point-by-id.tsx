import { useQuery } from '@tanstack/react-query'

import { getPointById } from '../requests'
import { ByIdRequest, Point } from '../types'

export const useGetPointById = (params: ByIdRequest) => {
  return useQuery<Point>({
    queryKey: ['point', params.id],
    queryFn: () => getPointById(params),
    enabled: !!params.id,
  })
}
