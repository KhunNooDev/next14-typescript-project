'use client'
import Sidebar from './Sidebar'
import Header from './Header'

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex h-screen'>
      <Sidebar />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <Header />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </div>
  )
}
