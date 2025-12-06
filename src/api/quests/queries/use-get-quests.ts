import { useQuery } from '@tanstack/react-query'

import { getQuests } from '../requests'
import { Quest } from '../types'

export const useGetQuests = () => {
  return useQuery<Quest>({
    queryKey: ['quests'],
    queryFn: () => getQuests(),
  })
}
