'use client'
import { usePathname, useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { RiMenuLine } from 'react-icons/ri'
import ChangeLocale from '@/components/UI/ChangeLocale'
import { createTranslation } from '@/i18n/client'
import type { LocaleTypes } from '@/i18n/settings'
import Button from '@/components/Buttons/Button'
import ChangeTheme from '@/components/UI/ChangeTheme'

export default function LayoutUser({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathName = usePathname()
  const locale = useParams()?.locale as LocaleTypes
  const { t } = createTranslation(locale)

  const [isMenuOpen, setMenuOpen] = useState(false)

  const menuItems = [
    { label: t('menus.home'), path: '/' },
    { label: t('menus.usage'), path: '/usage' },
    { label: t('menus.about'), path: '/about' },
  ]

  const btnAuthItems = [
    { label: t('btn.sign-in'), path: '/sign-in' },
    // { label: t('btn.sign-up'), path: '/sign-up' },
  ]

  const authPaths = [`/${locale}/sign-in`, `/${locale}/sign-up`]
  const isAuthPaths = authPaths.includes(pathName)

  const menus = menuItems.map(item => (
    <Link
      key={item.path}
      href={`/${locale}${item.path === '/' ? '' : item.path}`}
      className={`cursor-pointer ${pathName === `/${locale}${item.path}` && 'text-color-p'}`}
    >
      {t(item.label)}
    </Link>
  ))

  return (
    <>
      {!isAuthPaths && (
        <header className='bg-color text-color fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-center py-4'>
          <div className='container relative mx-auto flex items-center justify-between px-3'>
            <div className='md:hidden'>
              <RiMenuLine className='cursor-pointer text-3xl' onClick={() => setMenuOpen(!isMenuOpen)} />
              {/* Sidebar */}
              <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setMenuOpen(false)}
              />
              <div
                className={`bg-color text-color fixed inset-y-0 left-0 z-50 w-64 transform shadow-lg transition-transform md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
              >
                <nav className='flex flex-col gap-4 p-4'>{menus}</nav>
              </div>
            </div>

            <div className='absolute-center'>
              <Link href={`/${locale}`}>
                <div className='cursor-pointer text-xl font-bold text-blue-500'>{t('site.title')}</div>
              </Link>
            </div>

            <div className='hidden md:flex'>
              <nav className='flex gap-6'>{menus}</nav>
            </div>

            <div className='flex items-center gap-2'>
              <ChangeTheme />
              {/* <ChangeLocale /> */}
              {btnAuthItems.map(item => (
                <Button key={item.path} className='font-bold' onClick={() => router.push(`/${locale}${item.path}`)}>
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </header>
      )}

      <main className={`${!isAuthPaths && 'mt-16'}`}>{children}</main>
    </>
  )
}
