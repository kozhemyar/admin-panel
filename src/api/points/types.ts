type sortBy = 'asc|desc'
type periodOfTime = 'daily' | 'week' | 'month'

export interface GetPointsRequest {
  page?: number
  limit?: number
  sortByName?: sortBy
  sortByScore?: sortBy
  score?: periodOfTime
}

export interface Point {
  name: string
  login: string
  isAdmin: boolean
  balance: number
  score: number
  id: string
}

export interface GetPointsResponse {
  data: Point[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CreatePointRequest {
  name: string
  login: string
  password: string
}

export interface ByIdRequest {
  id: string
}
