import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type PropsButton<T = HTMLButtonElement> = {} & ButtonHTMLAttributes<T>

export default function Button(props: PropsButton) {
  const { type = 'button', onClick, className, children } = props

  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        'bg-btn-color rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2',
        className,
      )}
    >
      {children}
    </button>
  )
}
