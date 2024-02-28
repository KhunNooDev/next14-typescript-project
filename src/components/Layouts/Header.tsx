'use client'
import { usePathname, useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ChangeLocale from '@/components/UI/ChangeLocale'
import { createTranslation } from '@/i18n/client'
import type { LocaleTypes } from '@/i18n/settings'
import Button from '@/components/Buttons/Button'
import ChangeTheme from '../UI/ChangeTheme'
import { twMerge } from 'tailwind-merge'

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
      <header className='fixed left-0 right-0 top-0 z-50 bg-zinc-100 py-4 text-zinc-900  dark:bg-zinc-900 dark:text-zinc-100'>
        <div className='container mx-auto flex items-center justify-around'>
          <div>
            <Link href={`/${locale}`}>
              <div className='cursor-pointer text-xl font-bold text-blue-500'>{t('site.title')}</div>
            </Link>
          </div>
          <div>
            <nav className='flex gap-6'>
              {menuItems.map(item => (
                <Link key={item.path} href={`/${locale}${item.path === '/' ? '' : item.path}`}>
                  <div
                    // className={`text-zinc-900 hover:text-yellow-500 dark:text-zinc-100 ${pathName === `/${locale}${item.path}` ? 'text-yellow-500 dark:text-blue-400' : ''} cursor-pointer`}
                    className={twMerge(
                      'cursor-pointer text-zinc-900 hover:text-blue-600 dark:text-zinc-100',
                      pathName === `/${locale}${item.path}` && 'text-blue-700 dark:text-blue-700',
                    )}
                  >
                    {t(item.label)}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <div className='flex items-center gap-2'>
            <ChangeTheme />
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
