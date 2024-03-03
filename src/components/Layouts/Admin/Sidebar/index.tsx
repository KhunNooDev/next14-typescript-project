import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { RiHomeLine, RiUserLine, RiContactsLine, RiDashboardLine } from 'react-icons/ri'
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
    name: 'About',
    href: '/about',
    icon: RiUserLine,
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: RiDashboardLine,
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: RiContactsLine,
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
          'bg-color text-color h-full w-64 overflow-hidden bg-gray-900 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.1)]',
          {
            'w-20': isCollapsed,
          },
        )}
      >
        <div className='flex h-16 w-full items-center justify-center gap-4 border-b border-gray-300 p-4'>
          <Image width={40} height={40} className='rounded-full' src={'https://via.placeholder.com/40x40'} alt='logo' />
          <p className={cn('whitespace-nowrap text-lg font-semibold', { hidden: isCollapsed })}>The Brave Coders</p>
        </div>
        <div className='p-4 '>
          <ul className={cn({ 'justify-center': isCollapsed })}>
            {sidebarItems.map(({ name, href, icon: Icon }) => {
              return (
                <li key={name}>
                  <Link
                    className={cn('mb-4 flex items-center rounded-lg bg-gray-200 px-4 py-2 text-base text-black', {
                      'bg-green-500 text-white': pathname === `/${locale}${href}`,
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
