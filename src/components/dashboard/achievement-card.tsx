'use client'
import { useState } from 'react'

import { Button } from '../shared/button'
import { Card } from '../shared/card'
import { Textarea } from '../shared/textarea'

export const AchievementCard = () => {
  return (
    <Card className='flex w-1/2 flex-col items-end justify-between p-6'>
      <div className='flex flex-col gap-5'>
        <div className='text-sm font-medium'>Текущее задание:</div>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam cupiditate possimus,
          ducimus recusandae fuga fugit suscipit facere, dicta ratione magnam quaerat
          blanditiis nisi harum quidem amet rerum velit, provident necessitatibus?
        </div>
      </div>
    </Card>
  )
}
