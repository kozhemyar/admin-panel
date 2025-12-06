export interface QuestSubject {
  type?: GarbageType
  subtype?: GarbageSubtype
  state?: GarbageState
}

export interface QuestBase {
  id: string
  goal: number
  subject: QuestSubject
  createdAt: string
}

export interface DailyQuest {
  quest: QuestBase
  progress: number
  completed: boolean
}

export interface WeeklyQuest {
  quest: QuestBase
  progress: number
  completed: boolean
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
