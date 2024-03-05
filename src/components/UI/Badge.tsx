'use client'
import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'

type BadgeProps = {
  placement?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
} & React.HTMLAttributes<HTMLDivElement>

export default function Badge({ children, style, placement }: BadgeProps) {
  const [isAFK, setIsAFK] = useState(false)
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const timeAFK = 10 * 1000 // Set the timer again for 10 seconds
    const handleMovement = () => {
      // If user moves, reset the timer and set isAFK to false
      clearTimeout(timeout)
      setIsAFK(false)

      // Set the timer again for 10 seconds
      timeout = setTimeout(() => {
        setIsAFK(true)
      }, timeAFK)
    }

    // Add event listeners for mousemove and keydown to detect user activity
    window.addEventListener('mousemove', handleMovement)
    window.addEventListener('keydown', handleMovement)

    // Set initial timeout for AFK detection
    timeout = setTimeout(() => {
      setIsAFK(true)
    }, timeAFK)

    // Cleanup function to remove event listeners and clear the timeout
    return () => {
      window.removeEventListener('mousemove', handleMovement)
      window.removeEventListener('keydown', handleMovement)
      clearTimeout(timeout)
    }
  }, [])
  return (
    <div className='relative' style={style}>
      {children}
      <span
        className={cn('absolute bottom-0 left-7 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800', {
          'bg-green-400': !isAFK,
          'bg-yellow-400': isAFK,
          'bottom-0': placement === 'bottom-right' || placement === 'bottom-left',
          'top-0': placement === 'top-right' || placement === 'top-left',
          'left-0': placement === 'top-left' || placement === 'bottom-left',
          'right-0': placement === 'top-right' || placement === 'bottom-right',
        })}
      />
    </div>
  )
}
