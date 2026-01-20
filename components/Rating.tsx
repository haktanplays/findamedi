import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  value: number
  count?: number
  showCount?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export function Rating({ value, count, showCount = true, size = 'md', className }: RatingProps) {
  const fullStars = Math.floor(value)
  const hasHalfStar = value % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={i}
            className={cn('fill-amber-500 text-amber-500 flex-shrink-0', sizeClasses[size])}
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className={cn('fill-amber-500 text-amber-500 flex-shrink-0', sizeClasses[size])}
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={i}
            className={cn('text-amber-300 flex-shrink-0', sizeClasses[size])}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-sm text-muted-foreground ml-1">
          ({count})
        </span>
      )}
    </div>
  )
}
