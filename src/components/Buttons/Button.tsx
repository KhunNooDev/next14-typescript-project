import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type PropsButton<T = HTMLButtonElement> = {} & ButtonHTMLAttributes<T>

export default function Button(props: PropsButton) {
  const { type = 'button', onClick, className, children } = props

  const mergedClassName = twMerge(
    'rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2',
    className,
  )

  return (
    <button type={type} onClick={onClick} className={mergedClassName}>
      {children}
    </button>
  )
}
