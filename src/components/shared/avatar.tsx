'use client'

import * as React from 'react'

import { cn } from '@/utils/class-names'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return <img className={cn('aspect-square h-full w-full', className)} {...props} />
}

type AvatarFallbackProps = React.HTMLAttributes<HTMLDivElement>

function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        'bg-muted flex h-full w-full items-center justify-center rounded-full text-sm font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
