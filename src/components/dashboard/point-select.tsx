'use client'

import { Building2, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../shared/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shared/select'

import { ConfirmDeleteModal } from './confirm-delete-modal'
import { CreatePointModal } from './create-point-modal'
import { useGetPoints } from '@/api/points/queries/use-get-points'
import { usePointStore } from '@/store/point-store'
import { cn } from '@/utils/class-names'

export function PointSelect() {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { data, isLoading } = useGetPoints({
    page: 1,
    limit: 100,
  })

  const points = data?.data ?? []
  const { setSelectedPoint } = usePointStore()

  const [value, setValue] = useState<string | null>(null)

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
    const point = points.find(p => p.login === newValue)
    if (point) {
      setSelectedPoint(point)
    }
  }

  return (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col gap-1.5'>
        <label className='text-brand-black text-sm font-medium'>Текущая точка</label>
        <Select
          value={value ?? undefined}
          onValueChange={handleValueChange}
          disabled={isLoading}
        >
          <SelectTrigger
            className={cn(
              'w-[280px] border-gray-300 bg-white shadow-sm transition-all',
              'hover:border-gray-400 focus:border-brand-black focus:ring-brand-yellow/20',
              'disabled:cursor-not-allowed disabled:opacity-60'
            )}
          >
            <div className='flex items-center gap-2.5'>
              <Building2 className='text-brand-black h-4 w-4 shrink-0' />
              <SelectValue
                placeholder={isLoading ? 'Загрузка точек...' : 'Выберите офис...'}
                className='text-brand-black font-medium'
              />
            </div>
          </SelectTrigger>

          <SelectContent className='border-gray-100 bg-white shadow-xl'>
            {points.length === 0 ? (
              <div className='text-muted-foreground px-2 py-6 text-center text-sm'>
                Точки не найдены
              </div>
            ) : (
              points.map(point => (
                <SelectItem
                  key={point.login}
                  value={point.login}
                  className={cn(
                    'cursor-pointer text-zinc-600 transition-colors',
                    'hover:bg-gray-50',
                    'data-[state=checked]:bg-brand-yellow data-[state=checked]:text-brand-black data-[state=checked]:font-bold',
                    'focus:bg-brand-yellow/10'
                  )}
                >
                  <div className='flex items-center gap-2'>
                    <Building2 className='h-3.5 w-3.5' />
                    <span>{point.name}</span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className='flex gap-3 pt-6'>
        <Button
          onClick={() => setOpenCreateModal(true)}
          className='bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 gap-2 font-semibold shadow-sm transition-all hover:shadow-md'
        >
          <Plus className='h-4 w-4' />
          Создать точку
        </Button>

        <Button
          onClick={() => setOpenDeleteModal(true)}
          variant='destructive'
          disabled={!value}
          className='gap-2 shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed'
        >
          <Trash2 className='h-4 w-4' />
          Удалить точку
        </Button>
      </div>

      <CreatePointModal open={openCreateModal} setOpen={setOpenCreateModal} />
      <ConfirmDeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} />
    </div>
  )
}
