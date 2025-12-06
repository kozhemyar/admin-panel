'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuthGuard = () => {
  const router = useRouter()

  useEffect(() => {
    const login = localStorage.getItem('login')
    const password = localStorage.getItem('password')

    if (!login || !password) {
      router.replace('/auth')
    }
  }, [router])
}
