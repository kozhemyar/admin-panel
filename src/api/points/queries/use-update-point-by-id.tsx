import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updatePointById } from '../requests'
import { ByIdRequest } from '../types'

export const useUpdatePointById = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ByIdRequest) => updatePointById(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['points'] })
      queryClient.invalidateQueries({ queryKey: ['point', variables.id] })
    },
  })
}
