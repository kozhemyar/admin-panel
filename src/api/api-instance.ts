import axios from 'axios'

import { LOCAL_STORAGE } from '@/constants/local-storage'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(config => {
  const login = localStorage.getItem(LOCAL_STORAGE.LOGIN)
  const password = localStorage.getItem(LOCAL_STORAGE.PASSWORD)
  console.log(`${login}:${password}`)

  if (login && password) {
    const token = btoa(`${login}:${password}`)
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE.LOGIN)
      localStorage.removeItem(LOCAL_STORAGE.PASSWORD)

      if (typeof window !== 'undefined') {
        window.location.href = '/auth'
      }
    }

    return Promise.reject(error)
  },
)
