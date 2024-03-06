'use client'
import React from 'react'
import Breadcrumbs from '@/components/UI/Breadcrumbs'
import Button from '@/components/UI/Button'
import Table, { Column } from '@/components/UI/Table'
import Toolbar from '@/components/UI/Toolbar'
import { RiArrowRightLine, RiDashboardLine } from 'react-icons/ri'
import Divider from '@/components/UI/Divider'

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
  return (
    <div className='p-2' style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <section>
        <Toolbar left={<Breadcrumbs />} right={<Button>Create</Button>} />
        <Divider />
        {/* <div className='grid grid-cols-12 gap-2'>
          <Card title='User'>Test</Card>
        </div> */}
        <br />
        <div>
          <TableEx />
        </div>
        {/* <div className='mt-8'>
          <Button>Test</Button>
        </div> */}
      </section>
    </div>
  )
}

const TableEx = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', profession: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', profession: 'Data Analyst' },
    { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com', profession: 'Project Manager' },
    { id: 4, name: 'Alice Johnson', age: 35, email: 'alice@example.com', profession: 'Product Designer' },
    { id: 5, name: 'Michael Brown', age: 28, email: 'michael@example.com', profession: 'Marketing Specialist' },
    { id: 6, name: 'Emily Davis', age: 33, email: 'emily@example.com', profession: 'Financial Analyst' },
    { id: 7, name: 'Daniel Wilson', age: 45, email: 'daniel@example.com', profession: 'Business Consultant' },
    { id: 8, name: 'Sarah Taylor', age: 29, email: 'sarah@example.com', profession: 'HR Manager' },
    { id: 9, name: 'Chris Anderson', age: 32, email: 'chris@example.com', profession: 'Sales Executive' },
    { id: 10, name: 'Jessica Clark', age: 27, email: 'jessica@example.com', profession: 'Graphic Designer' },
  ]
  return (
    <Table
      data={data}
      totalRecords={20}
      onEdit={row => console.log('Edit:', row)}
      onDelete={row => console.log('Delete:', row)}
    >
      <Column field='id' header='ID' width='20px' sortable />
      <Column field='name' header='Name' filterable sortable />
      <Column field='age' header='Age' width='20px' sortable />
    </Table>
  )
}
