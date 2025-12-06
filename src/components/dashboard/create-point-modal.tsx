'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import { Button } from '../shared/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../shared/dialog'
import { Input } from '../shared/input'

interface CreatePointModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const CreatePointModal = ({ open, setOpen }: CreatePointModalProps) => {
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleCreate = () => {
    const data = { name, login, password }
    console.log('Create point:', data)

    // логика создания точки

    setOpen(false)
    setName('')
    setLogin('')
    setPassword('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Создание новой точки</DialogTitle>
        </DialogHeader>

        <div className='mt-4 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div>Название</div>
            <Input
              placeholder='Введите название точки'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div>Логин</div>
            <Input
              placeholder='Введите логин точки'
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div>Пароль</div>
            <Input
              type='password'
              placeholder='Введите пароль точки'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className='mt-6'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button onClick={handleCreate}>Создать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
