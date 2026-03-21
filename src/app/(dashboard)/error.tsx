'use client'

import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="p-8 text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Algo salió mal
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || 'Ocurrió un error inesperado'}
        </p>
        <Button onClick={reset} variant="primary">
          Intentar de nuevo
        </Button>
      </Card>
    </div>
  )
}