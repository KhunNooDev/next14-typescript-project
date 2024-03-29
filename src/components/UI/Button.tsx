'use client'
import { ButtonHTMLAttributes, useState } from 'react'
import { cn } from '@/utils/cn'

// disableRipple
type PropsButton = {
  icon?: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: PropsButton) {
  const [isShaking, setIsShaking] = useState(false)

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ripples = document.createElement('span')
    ripples.className = `absolute bg-white -translate-x-1/2 -translate-y-1/2 rounded-full animate-ripple`
    ripples.style.left = `${x}px`
    ripples.style.top = `${y}px`
    target.appendChild(ripples)
    setTimeout(() => ripples.remove(), 1000)

    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  return (
    <button
      {...props}
      id='button'
      className={cn(
        'relative flex items-center justify-center gap-2 overflow-hidden rounded-sm px-4 py-2 text-base font-medium tracking-wider text-gray-50 shadow-md shadow-gray-400/50',
        {
          'bg-gradient-to-r from-blue-400 to-cyan-400': !props.className?.includes('bg-'),
          'cursor-not-allowed opacity-50': props.disabled,
          'animate-shake': isShaking,
        },
        props.className,
      )}
      onClick={e => {
        handleButtonClick(e)
        if (props.onClick) props.onClick(e)
      }}
    >
      {props.icon && <span>{props.icon}</span>}
      {props.children && props.children}
    </button>
  )
}
