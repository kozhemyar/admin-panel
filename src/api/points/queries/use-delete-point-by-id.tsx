import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deletePointById } from '../requests'
import { ByIdRequest } from '../types'

export const useDeletePoint = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ByIdRequest) => deletePointById(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['points'] })
    },
  })
}
