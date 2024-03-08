'use client'
import Breadcrumbs from '@/components/UI/Breadcrumbs'
import Button from '@/components/UI/Button'
import Toolbar from '@/components/UI/Toolbar'
import Divider from '@/components/UI/Divider'
import Card from '@/components/UI/Card'

export default function DashboardPage() {
  return (
    <div className='p-2' style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <section>
        <Toolbar left={<Breadcrumbs />} right={<Button>Create</Button>} />
        <Divider />
        <br />
        <div className='grid-responsive gap-2'>
          {Array.from({ length: 12 }).map((_, index) => (
            <Card
              key={index}
              className='cols-responsive'
              // className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 2xl:col-span-1'
              title='Beautiful Sunset'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.'
            />
          ))}
        </div>
        {/* <div className='mt-8'>
          <Button>Test</Button>
        </div> */}
      </section>
    </div>
  )
}
