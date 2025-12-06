import { ServerRoutes } from '@/constants/server-routes'

import { instance } from '../api-instance'

import {
  ByIdRequest,
  CreatePointRequest,
  GetPointsRequest,
  GetPointsResponse,
  Point,
} from './types'

export const getPoints = async (data: GetPointsRequest) => {
  const response = (
    await instance.get<GetPointsResponse>(ServerRoutes.POINTS, { params: data })
  ).data
  return response
}

export const createPoint = async (data: CreatePointRequest) => {
  const response = (await instance.post<Point>(ServerRoutes.POINTS, data)).data
  return response
}

export const getPointById = async (data: ByIdRequest) => {
  const response = (await instance.get<Point>(`${ServerRoutes.POINTS}/${data.id}`)).data
  return response
}

export const deletePointById = async (data: ByIdRequest) => {
  const response = (await instance.delete<Point>(`${ServerRoutes.POINTS}/${data.id}`)).data
  return response
}

export const updatePointById = async (data: ByIdRequest) => {
  const response = (await instance.patch<Point>(`${ServerRoutes.POINTS}/${data.id}`)).data
  return response
}
