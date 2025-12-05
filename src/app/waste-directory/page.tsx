import { Plus } from 'lucide-react'

import { Button } from '@/components/shared/button'
import { WasteTable } from '@/components/waste-directory/waste-table'

import { getWasteItems } from '@/services/waste-mocks'

export default async function WasteDirectoryPage() {
  const items = await getWasteItems()

  return (
    <div className='bg-background flex min-h-screen flex-col gap-8 p-8'>
      <div className='flex items-start justify-between'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>Справочник отходов</h1>
          <p className='text-muted-foreground'>
            Управление базой данных отходов и инструкциями по подготовке
          </p>
        </div>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Добавить предмет
        </Button>
      </div>

      <WasteTable items={items} />
    </div>
  )
}
