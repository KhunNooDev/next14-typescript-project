'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Badge } from '.'
import { UserRole } from '@/types/next-auth'

interface MenuItem {
  label: string
  href: string
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '#' },
  { label: 'Settings', href: '#' },
  { label: 'Earnings', href: '#' },
]

type AvatarProps = {
  info?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role: UserRole
  }
}
export default function Avatar(props: AvatarProps) {
  const infoUser = props.info || {
    name: 'Jese Leos',
    email: 'name@email.com',
    role: 'user',
  }
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setIsOpen(!isOpen)
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = rect.width / 2
    const offsetY = rect.height

    // Calculate potential overflow on the right and bottom
    const rightOverflow = rect.right + 100 - window.innerWidth
    const bottomOverflow = rect.bottom + 100 - window.innerHeight

    let left = offsetX
    let top = offsetY

    // Adjust position if overflow exists
    if (rightOverflow > 0) {
      left -= rightOverflow
    }
    if (bottomOverflow > 0) {
      top -= bottomOverflow
    }

    setDropdownPosition({ top, left })
  }

  return (
    <div className='relative right-0 flex items-center gap-4'>
      <div className='font-medium dark:text-white'>
        <div>{infoUser.name}</div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>{infoUser.email}</div>
      </div>
      <Badge style={{ width: 40, height: 40 }}>
        <Image
          width={40}
          height={40}
          src={infoUser.image || 'https://via.placeholder.com/40x40'}
          alt='user profile'
          onClick={handleClick}
          className='cursor-pointer rounded-full'
        />
        {/* <span className='absolute bottom-0 left-7 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800'></span> */}

        {isOpen && (
          <div
            ref={dropdownRef}
            id='userDropdown'
            className='absolute z-20 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700'
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          >
            <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='avatarButton'>
              {menuItems.map((item: MenuItem, index: number) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className='py-1'>
              <a
                href='#'
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </Badge>
    </div>
  )
}
