import { ServerRoutes } from '@/constants/server-routes'

import { instance } from '../api-instance'

import { Quest } from './types'

export const getQuests = async () => {
  const response = (await instance.get<Quest>(ServerRoutes.QUESTS)).data
  return response
}
