'use client'
import Sidebar from './Sidebar'
import Header from './Header'

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex h-screen'>
      <Sidebar />
      <div id='content' className='flex flex-1 flex-col'>
        <Header />
        <main className='flex-1 overflow-y-auto bg-gray-200'>{children}</main>
      </div>
    </div>
  )
}
