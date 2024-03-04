'use client'
import Breadcrumbs from '@/components/UI/Breadcrumbs'
import Button from '@/components/UI/Button'
import Table, { Column } from '@/components/UI/Table'

type CardProps = {
  title?: string
  other?: string
  children: React.ReactNode
}
function Card({ title, other, children }: CardProps) {
  return (
    <div className='col-span-3 border p-2'>
      <div className='flex justify-between'>
        <div>{title}</div>
        <div>{other}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default function DashboardPage() {
  const data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 },
  ]
  return (
    <div className='p-2' style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <section>
        <Breadcrumbs />
        <h1 className='mb-4 text-2xl font-bold'>Dashboard</h1>
        <div className='grid grid-cols-12 gap-2'>
          <Card title='user'>test</Card>
        </div>
        <br />
        <div>
          <Table data={data} onEdit={row => console.log('Edit:', row)} onDelete={row => console.log('Delete:', row)}>
            <Column header='ID' className='border border-gray-300 px-4 py-2' />
            <Column header='Name' className='border border-gray-300 px-4 py-2' />
            <Column header='Age' className='border border-gray-300 px-4 py-2' />
          </Table>
        </div>
        <div className='mt-8'>
          <Button>test</Button>
        </div>
      </section>
    </div>
  )
}
