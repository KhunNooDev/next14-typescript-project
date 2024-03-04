'use client'
import { cn } from '@/utils/cn'

type BadgeProps = {
  placement?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
} & React.HTMLAttributes<HTMLDivElement>

export default function Badge({ children, style, placement }: BadgeProps) {
  return (
    <div className='relative' style={style}>
      {children}
      <span
        className={cn(
          'absolute bottom-0 left-7 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800',
          {
            'bottom-0': placement === 'bottom-right' || placement === 'bottom-left',
            'top-0': placement === 'top-right' || placement === 'top-left',
            'left-0': placement === 'top-left' || placement === 'bottom-left',
            'right-0': placement === 'top-right' || placement === 'bottom-right',
          },
        )}
      />
    </div>
  )
}
