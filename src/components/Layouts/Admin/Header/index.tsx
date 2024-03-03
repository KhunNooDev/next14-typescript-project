import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { useSidebarStore } from '../store'
import ChangeTheme from '@/components/UI/ChangeTheme'
import Avatar from '@/components/UI/Avatar'

export default function Header() {
  const { isCollapsed, toggleSidebarcollapse } = useSidebarStore()

  return (
    <header className='bg-color text-color flex h-16 items-center justify-between p-4'>
      <button onClick={() => toggleSidebarcollapse()}>
        {isCollapsed ? <RiArrowRightLine /> : <RiArrowLeftLine />}
      </button>

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2'>
          <ChangeTheme />
        </div>
        <Avatar />
      </div>
    </header>
  )
}
