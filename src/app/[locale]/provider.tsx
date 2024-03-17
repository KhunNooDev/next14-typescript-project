'use client'

import { ThemeProvider } from 'next-themes'
import { IconContext } from 'react-icons'
import { SessionProvider, useSession } from 'next-auth/react'
import LayoutAdmin from '@/components/Layouts/Admin'
import LayoutUser from '@/components/Layouts/User'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <IconContext.Provider value={{ /*color: 'blue',*/ className: 'react-icons' }}>{children}</IconContext.Provider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export function ChildrenByRole({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  // if (session) {
  //   console.log(session?.user)

  //   debugger
  // }
  // if (session?.user?.role === 'user') {
  //   return <p>You are an user, welcome!</p>
  // }
  return session?.user?.role === 'admin' ? <LayoutAdmin>{children}</LayoutAdmin> : <LayoutUser>{children}</LayoutUser>
}
