export interface DailyQuest {
  id: string
  goal: number
  subject: {
    type: GarbageType
    subtype: GarbageSubtype
    state: GarbageState
  }
  createdAt: string
}
export interface WeeklyQuest {
  id: string
  goal: number
  subject: {
    type: GarbageType
    subtype: GarbageSubtype
    state: GarbageState
  }
  createdAt: string
}

export interface Quest {
  daily: DailyQuest[]
  weekly: WeeklyQuest
}

export type GarbageType = 'Cardboard' | 'Glass' | 'Metal' | 'Paper' | 'Plastic' | 'Trash'

export type GarbageSubtype =
  | 'pet_bottle'
  | 'pet_bottle_white'
  | 'pet_container'
  | 'hdpe_container'
  | 'hdpe_film'
  | 'hdpe_bag'
  | 'pp_container'
  | 'pp_large'
  | 'pp_bag'
  | 'foam_packaging'
  | 'foam_egg'
  | 'foam_building'
  | 'foam_food'
  | 'blister_pack'
  | 'toothbrush'
  | 'plastic_card'
  | 'tube'
  | 'receipt'
  | 'unknown'

export type GarbageState =
  | 'clean'
  | 'dirty'
  | 'heavily_dirty'
  | 'food_contaminated'
  | 'with_labels'
  | 'no_labels'
  | 'compressed'
  | 'damaged'
  | 'unknown'
