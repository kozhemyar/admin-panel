import { create } from 'zustand'

export interface Point {
  name: string
  login: string
  isAdmin: boolean
  balance: number
  score: number
  id: string
}

interface PointStore {
  selectedPoint: Point | null
  setSelectedPoint: (point: Point) => void
  clearSelectedPoint: () => void
}

export const usePointStore = create<PointStore>(set => ({
  selectedPoint: null,

  setSelectedPoint: (point: Point) =>
    set({
      selectedPoint: point,
    }),

  clearSelectedPoint: () =>
    set({
      selectedPoint: null,
    }),
}))
