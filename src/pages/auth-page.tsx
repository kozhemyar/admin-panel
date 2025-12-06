'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/shared/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shared/card'
import { Input } from '@/components/shared/input'

import { LOCAL_STORAGE } from '@/constants/local-storage'

export const AuthPage = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem(LOCAL_STORAGE.LOGIN, login)
    localStorage.setItem(LOCAL_STORAGE.PASSWORD, password)
    router.replace('/')
  }

  return (
    <div className='bg-muted/30 flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-sm shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-semibold'>Авторизация</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <div>Логин</div>
              <Input
                id='login'
                placeholder='Введите логин'
                value={login}
                onChange={e => setLogin(e.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <div>Пароль</div>
              <Input
                id='password'
                type='password'
                placeholder='Введите пароль'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <Button type='submit' className='w-full'>
              Войти
            </Button>
          </form>
        </CardContent>

        <CardFooter className='text-muted-foreground text-center text-sm'>
          Добро пожаловать в систему
        </CardFooter>
      </Card>
    </div>
  )
}
