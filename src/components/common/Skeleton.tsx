'use client'

import { cn } from '@/utils/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
}

export const Skeleton = ({ className, variant = 'rectangular', ...props }: SkeletonProps) => {
  const variants = {
    text: 'rounded-lg',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  }

  return (
    <div
      className={cn('bg-gray-200 dark:bg-gray-800 animate-pulse', variants[variant], className)}
      {...props}
    />
  )
}