import { Dispatch, SetStateAction } from 'react'

import { Button } from '../shared/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../shared/dialog'

interface ConfirmDeleteModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  id: string
}

export const ConfirmDeleteModal = ({ open, setOpen, id }: ConfirmDeleteModalProps) => {
  const handleDelete = () => {
    console.log(`Удалена точка ${id}`)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Удаление точки {id}</DialogTitle>
        </DialogHeader>

        <div></div>

        <DialogFooter className='mt-6'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button onClick={handleDelete}>Подтвердить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
