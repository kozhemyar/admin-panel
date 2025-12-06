'use client'

import { Check, Search, X } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/shared/badge'
import { Button } from '@/components/shared/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared/dropdown-menu'
import { Input } from '@/components/shared/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/table'

import { WasteActions } from './waste-actions'
import type { WasteCategory, WasteItem } from '@/services/waste-mocks'

interface WasteTableProps {
  items: WasteItem[]
}

const categoryColors: Record<WasteCategory, string> = {
  Пластик: 'bg-brand-yellow/20 text-brand-black dark:bg-brand-yellow/30 dark:text-brand-yellow',
  Бумага: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Металл: 'bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground',
  Стекло: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Смешанный: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
}

export function WasteTable({ items }: WasteTableProps) {
  const [tableItems, setTableItems] = useState(items)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory | 'Все'>('Все')

  const handleDelete = (id: string) => {
    setTableItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const filteredItems = tableItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories: Array<WasteCategory | 'Все'> = [
    'Все',
    'Пластик',
    'Бумага',
    'Металл',
    'Стекло',
    'Смешанный',
  ]

  return (
    <div className='space-y-4'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='relative flex-1 sm:max-w-sm'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
          <Input
            placeholder='Поиск по названию...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='pl-9'
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Категория: {selectedCategory}
              <span className='text-muted-foreground ml-2'>▼</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {categories.map(category => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead className='w-[120px] text-center'>Статус</TableHead>
              <TableHead>Инструкция</TableHead>
              <TableHead className='w-[100px] text-right'>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  Ничего не найдено
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className='font-medium'>{item.name}</TableCell>
                  <TableCell>
                    <Badge className={categoryColors[item.category]} variant='secondary'>
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-center'>
                    {item.recyclable ? (
                      <div className='flex items-center justify-center gap-1 text-green-600 dark:text-green-500'>
                        <Check className='h-4 w-4' />
                        <span className='text-xs'>Да</span>
                      </div>
                    ) : (
                      <div className='flex items-center justify-center gap-1 text-red-600 dark:text-red-500'>
                        <X className='h-4 w-4' />
                        <span className='text-xs'>Нет</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className='text-muted-foreground max-w-md truncate text-sm'>
                      {item.instruction}
                    </p>
                  </TableCell>
                  <TableCell className='text-right'>
                    <WasteActions item={item} onDelete={handleDelete} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='text-muted-foreground text-sm'>
        Показано {filteredItems.length} из {tableItems.length} предметов
      </div>
    </div>
  )
}
