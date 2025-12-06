'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../shared/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../shared/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shared/form'
import { Input } from '../shared/input'

import { useCreatePoint } from '@/api/points/queries/use-create-point'
import { CreatePointRequest } from '@/api/points/types'

const createPointSchema = z.object({
  name: z.string().min(3, 'Минимальная длина имени — 3 символа'),
  login: z.string().min(6, 'Минимальная длина логина — 6 символов'),
  password: z.string().min(6, 'Минимальная длина пароля — 6 символов'),
})

type CreatePointForm = z.infer<typeof createPointSchema>

interface CreatePointModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const CreatePointModal = ({ open, setOpen }: CreatePointModalProps) => {
  const { mutate: createPoint, isPending } = useCreatePoint()

  const form = useForm<CreatePointForm>({
    resolver: zodResolver(createPointSchema),
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  })

  const onSubmit = (values: CreatePointForm) => {
    const payload: CreatePointRequest = values

    createPoint(payload, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Создание новой точки</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder='Введите название точки' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='login'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input placeholder='Введите логин точки' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Введите пароль точки' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='mt-6'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                Отмена
              </Button>

              <Button type='submit' disabled={isPending}>
                {isPending ? 'Создание...' : 'Создать'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
