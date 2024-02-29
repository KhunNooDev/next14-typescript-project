'use client'
import Sidebar from './Sidebar'
import Header from './Header'

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />

      {/* <!-- ===== Content Area Start ===== --> */}
      <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
        {/* <!-- ===== Header Start ===== --> */}
        <Header />
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Main Content Start ===== --> */}
        <main>
          <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>{children}</div>
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
      </div>
      {/* <!-- ===== Content Area End ===== --> */}
    </div>
  )
}
