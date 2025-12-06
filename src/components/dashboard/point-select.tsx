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
import { cn } from '@/utils/class-names'

const POINTS = [
  { value: '0', label: 'All' },
  { value: '1', label: 'Point 1' },
  { value: '2', label: 'Point 2' },
  { value: '3', label: 'Point 3' },
  { value: '4', label: 'Point 4' },
  { value: '5', label: 'Point 5' },
]

export function PointSelect() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('0')
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

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
            {POINTS.find(p => p.value === value)?.label ?? 'Select point'}
            <ChevronDown />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='h-40 w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search point...' />
            <CommandList>
              <CommandEmpty>No point found.</CommandEmpty>
              <CommandGroup>
                {POINTS.map(point => (
                  <CommandItem
                    key={point.value}
                    value={point.label}
                    onSelect={() => {
                      setValue(point.value)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === point.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {point.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button onClick={() => setOpenCreateModal(true)}>Создать точку</Button>
      <Button onClick={() => setOpenDeleteModal(true)} variant='destructive'>
        Удалить текущую точку
      </Button>
      <CreatePointModal open={openCreateModal} setOpen={setOpenCreateModal} />
      <ConfirmDeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} id={value} />
    </div>
  )
}
