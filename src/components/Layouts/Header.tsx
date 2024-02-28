'use client'
import { usePathname, useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ChangeLocale from '../ChangeLocale'
import { createTranslation } from '@/i18n/client'
import type { LocaleTypes } from '@/i18n/settings'
import Button from '../Buttons/Button'

export default function Header() {
  const router = useRouter()
  const pathName = usePathname()
  const locale = useParams()?.locale as LocaleTypes
  const { t } = createTranslation(locale)

  const menuItems = [
    { label: t('menus.home'), path: '/' },
    { label: t('menus.usage'), path: '/usage' },
    { label: t('menus.about'), path: '/about' },
  ]

  const btnAuthItems = [
    { label: t('btn.sign-in'), path: '/sign-in' },
    { label: t('btn.sign-up'), path: '/sign-up' },
  ]

  const authPaths = [`/${locale}/sign-in`, `/${locale}/sign-up`]
  const isAuthPaths = authPaths.includes(pathName)

  return (
    !isAuthPaths && (
      <header className='fixed left-0 right-0 top-0 z-50 bg-blue-800 py-4 text-white dark:bg-gray-800 dark:text-gray-200'>
        <div className='container mx-auto flex items-center justify-around'>
          <div>
            <Link href={`/${locale}`}>
              <div className='cursor-pointer text-xl font-bold'>{t('site.title')}</div>
            </Link>
          </div>
          <div>
            <nav className='flex gap-6'>
              {menuItems.map(item => (
                <Link key={item.path} href={`/${locale}${item.path === '/' ? '' : item.path}`}>
                  <div
                    className={`text-base hover:text-blue-400 dark:hover:text-blue-200 ${pathName === `/${locale}${item.path}` ? 'text-yellow-400 dark:text-blue-200' : ''} cursor-pointer`}
                  >
                    {t(item.label)}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <div className='flex items-center gap-2'>
            <ChangeLocale />
            {btnAuthItems.map(item => (
              <Button key={item.path} className='font-bold' onClick={() => router.push(`/${locale}${item.path}`)}>
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </header>
    )
  )
}
