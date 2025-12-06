'use client'

import { Dispatch, SetStateAction } from 'react'

import { Button } from '../shared/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../shared/dialog'

import { useDeletePoint } from '@/api/points/queries/use-delete-point-by-id'
import { usePointStore } from '@/store/point-store'

interface ConfirmDeleteModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const ConfirmDeleteModal = ({ open, setOpen }: ConfirmDeleteModalProps) => {
  const { selectedPoint, clearSelectedPoint } = usePointStore()
  const { mutate: deletePoint, isPending } = useDeletePoint()

  const id = selectedPoint?.id

  const handleDelete = () => {
    if (!id) return

    deletePoint(
      { id },
      {
        onSuccess: () => {
          clearSelectedPoint()
          setOpen(false)
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>
            Удаление точки {selectedPoint?.name ? `«${selectedPoint.name}»` : ''}
          </DialogTitle>
        </DialogHeader>

        <div className='text-muted-foreground text-sm'>
          Вы уверены, что хотите удалить эту точку? Это действие необратимо.
        </div>

        <DialogFooter className='mt-6'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Отмена
          </Button>

          <Button variant='destructive' onClick={handleDelete} disabled={isPending || !id}>
            {isPending ? 'Удаление...' : 'Подтвердить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
