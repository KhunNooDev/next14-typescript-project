import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
  RiHomeLine,
  RiDashboardLine,
  RiUserLine,
  RiFileTextLine,
  RiBook2Line,
  RiBarChart2Line,
  RiGamepadLine,
  RiQuestionLine,
  RiSettings4Line,
} from 'react-icons/ri'
import { useSidebarStore } from '../store'
import { cn } from '@/utils/cn'
import { LocaleTypes } from '@/i18n/settings'

const sidebarItems = [
  {
    name: 'Home',
    href: '/',
    icon: RiHomeLine,
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: RiDashboardLine,
  },
  {
    name: 'Accounts',
    href: '/accounts-management',
    icon: RiUserLine,
    group: 'Management',
  },
  {
    name: 'Word',
    href: '/word-management',
    icon: RiFileTextLine,
    group: 'Management',
  },
  {
    name: 'Dictionary',
    href: '/dictionary-management',
    icon: RiBook2Line,
    group: 'Management',
  },
  {
    name: 'Game Settings',
    href: '/game-settings',
    icon: RiGamepadLine,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: RiBarChart2Line,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: RiSettings4Line,
  },
  {
    name: 'Help/Support',
    href: '/help-support',
    icon: RiQuestionLine,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const locale = useParams()?.locale as LocaleTypes

  const { isCollapsed, toggleSidebarcollapse } = useSidebarStore()

  return (
    <div className='relative'>
      <aside
        className={cn(
          'bg-color text-color flex h-full w-64 flex-col overflow-hidden bg-gray-900 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.1)]',
          {
            'w-20': isCollapsed,
          },
        )}
      >
        <div className='flex h-14 w-full items-center justify-center gap-4 border-b border-gray-300 p-4'>
          <Image width={40} height={40} className='rounded-full' src={'https://via.placeholder.com/40x40'} alt='logo' />
          <p className={cn('whitespace-nowrap text-lg font-semibold', { hidden: isCollapsed })}>The Brave Coders</p>
        </div>
        <div className='overflow-y-auto p-4'>
          <ul>
            {sidebarItems.map(({ name, href, icon: Icon }) => {
              return (
                <li key={name}>
                  <Link
                    className={cn('mb-4 flex items-center rounded-lg bg-gray-200 px-4 py-2 text-base text-black', {
                      'bg-green-500 text-white': pathname === `/${locale}${href}`,
                      'justify-center': isCollapsed,
                    })}
                    href={href}
                  >
                    <span className='inline-block text-lg'>
                      <Icon />
                    </span>
                    <span
                      className={cn('ml-2', {
                        hidden: isCollapsed,
                      })}
                    >
                      {name}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>
    </div>
  )
}
