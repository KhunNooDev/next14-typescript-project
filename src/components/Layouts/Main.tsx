'use client'
import { usePathname, useParams } from 'next/navigation'
import type { LocaleTypes } from '@/i18n/settings'

export default function Main({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  const locale = useParams()?.locale as LocaleTypes

  const authPaths = [`/${locale}/sign-in`, `/${locale}/sign-up`]
  const isAuthPaths = authPaths.includes(pathName)

  return <main className={`${isAuthPaths ? '' : 'mt-20'}`}>{children}</main>
}
