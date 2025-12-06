import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreatePointRequest } from "../types"
import { createPoint } from "../requests"

export const useCreatePoint = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePointRequest) => createPoint(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['points'] })
    },
  })
}
