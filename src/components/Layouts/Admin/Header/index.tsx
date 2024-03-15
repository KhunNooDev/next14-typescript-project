import { useSession } from 'next-auth/react'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { useSidebarStore } from '../store'
import { Avatar, ChangeTheme } from '@/components/UI'

export default function Header() {
  const { data: session } = useSession()
  const { isCollapsed, toggleSidebarcollapse } = useSidebarStore()

  return (
    <header className='bg-color text-color flex h-14 items-center justify-between p-4'>
      <button onClick={() => toggleSidebarcollapse()}>
        {isCollapsed ? <RiArrowRightLine /> : <RiArrowLeftLine />}
      </button>

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2'>
          <ChangeTheme />
        </div>
        <Avatar info={session?.user} />
      </div>
    </header>
  )
}
