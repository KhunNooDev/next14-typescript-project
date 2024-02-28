import { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri' // Importing the arrow icon
import { LocaleTypes } from '@/i18n/settings'

interface MenuItem {
  label: JSX.Element
  locale?: LocaleTypes
}

interface ButtonDropdownProps {
  menuItems: MenuItem[]
  showIcon?: boolean
  defaultLabel: JSX.Element // Define defaultLabel prop
  onSelect?: (locale: LocaleTypes) => void
}

export default function ButtonDropdown({ menuItems, showIcon = false, defaultLabel, onSelect }: ButtonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuItemClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem)
    setIsOpen(false)
    if (onSelect && menuItem.locale) {
      onSelect(menuItem.locale)
    }
  }

  return (
    <div className='relative inline-block text-left'>
      <button
        id='dropdownDefaultButton'
        onClick={toggleDropdown}
        className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        type='button'
      >
        <span className='flex-grow'>{selectedMenuItem ? selectedMenuItem.label : defaultLabel}</span>
        {showIcon && (
          <RiArrowDownSLine className={`ml-1 h-5 w-5 ${isOpen ? 'rotate-180 transform' : ''}`} /> // Using the arrow icon
        )}
      </button>
      {/* Dropdown menu */}
      {isOpen && (
        <div
          className='absolute z-10 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700'
          style={{ width: 'fit-content' }}
        >
          <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefaultButton'>
            {menuItems.map((menuItem, index) => (
              <li key={index}>
                <button
                  onClick={() => handleMenuItemClick(menuItem)}
                  className='block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  {menuItem.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
