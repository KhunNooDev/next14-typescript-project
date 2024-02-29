'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme()

  // const [loaded, setLoaded] = useState(false)
  // useEffect(() => {
  //   setLoaded(true)
  // }, [setLoaded])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    // loaded && (
    <button onClick={toggleTheme} aria-label='Toggle Dark Mode'>
      {theme === 'dark' ? <RiSunLine size={24} /> : <RiMoonLine size={24} />}
    </button>
    // )
  )
}
