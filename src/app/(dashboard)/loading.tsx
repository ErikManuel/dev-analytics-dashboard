import { Skeleton } from '@/components/common/Skeleton'

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="max-w-md mx-auto">
        <Skeleton className="h-12 rounded-xl" />
      </div>
      <Skeleton className="h-64 rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-96 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
      <Skeleton className="h-96 rounded-2xl" />
    </div>
  )
}