export type WasteCategory = 'Пластик' | 'Бумага' | 'Металл' | 'Стекло' | 'Смешанный'

export interface WasteItem {
  id: string
  name: string
  category: WasteCategory
  recyclable: boolean
  instruction: string
}

export async function getWasteItems(): Promise<WasteItem[]> {
  return [
    {
      id: '1',
      name: 'Пластиковая бутылка',
      category: 'Пластик',
      recyclable: true,
      instruction: 'Снять крышку, сполоснуть и смять',
    },
    {
      id: '2',
      name: 'Контейнер из-под еды',
      category: 'Пластик',
      recyclable: true,
      instruction: 'Тщательно вымыть от остатков жира и еды',
    },
    {
      id: '3',
      name: 'Кофейный стаканчик',
      category: 'Смешанный',
      recyclable: false,
      instruction: 'Выбросить в общий мусор - смешанные материалы не перерабатываются',
    },
    {
      id: '4',
      name: 'Коробка от пиццы',
      category: 'Бумага',
      recyclable: false,
      instruction: 'Выбросить в общий мусор если загрязнена жиром',
    },
    {
      id: '5',
      name: 'Алюминиевая банка',
      category: 'Металл',
      recyclable: true,
      instruction: 'Сполоснуть и смять для экономии места',
    },
    {
      id: '6',
      name: 'Чеки из магазина',
      category: 'Бумага',
      recyclable: false,
      instruction: 'Выбросить в общий мусор - термобумага не перерабатывается',
    },
    {
      id: '7',
      name: 'Стеклянная бутылка',
      category: 'Стекло',
      recyclable: true,
      instruction: 'Сполоснуть, снять крышку и этикетку',
    },
    {
      id: '8',
      name: 'Газета',
      category: 'Бумага',
      recyclable: true,
      instruction: 'Сложить и поместить в контейнер для бумаги',
    },
    {
      id: '9',
      name: 'Пластиковый пакет',
      category: 'Пластик',
      recyclable: true,
      instruction: 'Очистить от мусора, можно сдать в специальные пункты приема',
    },
    {
      id: '10',
      name: 'Жестяная консервная банка',
      category: 'Металл',
      recyclable: true,
      instruction: 'Вымыть, снять этикетку и смять',
    },
    {
      id: '11',
      name: 'Картонная коробка',
      category: 'Бумага',
      recyclable: true,
      instruction: 'Разобрать и сложить плоско',
    },
    {
      id: '12',
      name: 'Пузырчатая пленка',
      category: 'Пластик',
      recyclable: false,
      instruction: 'Выбросить в общий мусор - мягкий пластик не перерабатывается',
    },
    {
      id: '13',
      name: 'Тетрапак (молочная упаковка)',
      category: 'Смешанный',
      recyclable: true,
      instruction: 'Сполоснуть, сложить плоско',
    },
    {
      id: '14',
      name: 'Пластиковый стакан с трубочкой',
      category: 'Смешанный',
      recyclable: false,
      instruction: 'Разделить элементы сложно - выбросить в общий мусор',
    },
    {
      id: '15',
      name: 'Алюминиевая фольга',
      category: 'Металл',
      recyclable: true,
      instruction: 'Очистить от остатков пищи и скомкать в шар',
    },
  ]
}
