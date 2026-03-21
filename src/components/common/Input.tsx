'use client'

import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  icon?: 'search' | 'none'
  onClear?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon = 'none', onClear, value, onChange, ...props }, ref) => {
    return (
      <div className="relative">
        {icon === 'search' && (
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 bg-white dark:bg-gray-900 border rounded-xl',
            'text-gray-900 dark:text-white placeholder:text-gray-400',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            error
              ? 'border-red-500 dark:border-red-500'
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400',
            icon === 'search' && 'pl-10',
            className
          )}
          value={value}
          onChange={onChange}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'