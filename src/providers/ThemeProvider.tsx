'use client'

import { ThemeProvider } from 'next-themes'
import { IconContext } from 'react-icons'

export default function ThemePvd({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <IconContext.Provider value={{ /*color: 'blue',*/ className: 'react-icons' }}>{children}</IconContext.Provider>
    </ThemeProvider>
  )
}
