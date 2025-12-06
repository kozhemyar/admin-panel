'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../shared/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../shared/command'
import { Popover, PopoverContent, PopoverTrigger } from '../shared/popover'

import { ConfirmDeleteModal } from './confirm-delete-modal'
import { CreatePointModal } from './create-point-modal'
import { useCreatePoint } from '@/api/points/queries/use-create-point'
import { useGetPoints } from '@/api/points/queries/use-get-points'
import { usePointStore } from '@/store/point-store'
import { cn } from '@/utils/class-names'
import { useDeletePoint } from '@/api/points/queries/use-delete-point-by-id'

export function PointSelect() {
  const [open, setOpen] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)


  const { data, isLoading } = useGetPoints({
    page: 1,
    limit: 100,
  })

  const points = data?.data ?? []
  const { setSelectedPoint } = usePointStore()

  const [value, setValue] = useState<string | null>(null)
  const selectedPoint = points.find(p => p.login === value)

  return (
    <div className='flex gap-6'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[200px] justify-between'
          >
            {selectedPoint
              ? selectedPoint.name
              : isLoading
                ? 'Загрузка...'
                : 'Выберите точку'}
            <ChevronDown />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='h-40 w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Поиск точки...' />

            <CommandList>
              <CommandEmpty>Точки не найдены</CommandEmpty>

              <CommandGroup>
                {points.map(point => (
                  <CommandItem
                    key={point.login}
                    value={point.name}
                    onSelect={() => {
                      setValue(point.login)
                      setSelectedPoint(point) 
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === point.login ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {point.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button onClick={() => setOpenCreateModal(true)}>Создать точку</Button>

      <Button
        onClick={() => setOpenDeleteModal(true)}
        variant='destructive'
        disabled={!value}
      >
        Удалить текущую точку
      </Button>

      <CreatePointModal open={openCreateModal} setOpen={setOpenCreateModal} />
      <ConfirmDeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
    </div>
  )
}
