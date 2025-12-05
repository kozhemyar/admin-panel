'use client'

import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/shared/badge'
import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/sheet'

import type { WasteItem } from '@/services/waste-mocks'

interface WasteActionsProps {
  item: WasteItem
  onDelete: (id: string) => void
}

export function WasteActions({ item, onDelete }: WasteActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = () => {
    onDelete(item.id)
  }

  return (
    <div className='flex items-center gap-2'>
      <Button variant='ghost' size='icon' onClick={() => setIsEditOpen(true)}>
        <Edit className='h-4 w-4' />
        <span className='sr-only'>Редактировать</span>
      </Button>
      <Button variant='ghost' size='icon' onClick={handleDelete}>
        <Trash2 className='text-destructive h-4 w-4' />
        <span className='sr-only'>Удалить</span>
      </Button>

      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Редактировать предмет</SheetTitle>
            <SheetDescription>
              Изменение информации о предмете в справочнике
            </SheetDescription>
          </SheetHeader>
          <div className='mt-6 space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Название</label>
              <Input defaultValue={item.name} />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Категория</label>
              <Badge variant='outline'>{item.category}</Badge>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Инструкция по подготовке</label>
              <textarea
                className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                defaultValue={item.instruction}
              />
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Перерабатывается</label>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  defaultChecked={item.recyclable}
                  className='h-4 w-4 rounded border-gray-300'
                />
                <span className='text-muted-foreground text-sm'>
                  {item.recyclable ? 'Да' : 'Нет'}
                </span>
              </div>
            </div>
            <div className='flex justify-end gap-2 pt-4'>
              <Button variant='outline' onClick={() => setIsEditOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsEditOpen(false)}>Сохранить</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
