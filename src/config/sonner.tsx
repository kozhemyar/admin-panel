'use client'

import { Toaster } from 'sonner'

export function Sonner() {
  return (
    <Toaster
      theme='light'
      className='toaster group tracking-wide'
      style={{ fontFamily: 'var(--font-sans)' }}
      richColors
    />
  )
}
