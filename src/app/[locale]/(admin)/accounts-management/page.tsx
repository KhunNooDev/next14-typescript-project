'use client'
import { Breadcrumbs, Button, Divider, Toolbar } from '@/components/UI'
import Table, { Column } from '@/components/UI/Table'
import { useEffect, useState } from 'react'

export default function AccountsManagementPage() {
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

  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      const element = document.getElementById('content')
      if (element) {
        const newWidth = element.offsetWidth
        setWidth(newWidth)
      }
    }

    // Update width when the component mounts
    updateWidth()

    // Update width when the screen size changes
    window.addEventListener('resize', updateWidth)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])
  if (width) console.log(width)

  return (
    <div className='w-full p-2' style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <section className='bg-color w-full rounded-md p-2'>
        <Toolbar left={<Breadcrumbs />} right={<Button subPath='/create'>Create</Button>} />
        <Divider />
        <div className='h-[100px] overflow-auto' style={{ width: width }}>
          <div className='w-full'>dssssssssssssssssssssssssssssssssssssssssssssssss</div>
        </div>
        {/* <Table
          data={data}
          totalRecords={20}
          onEdit={row => console.log('Edit:', row)}
          onDelete={row => console.log('Delete:', row)}
        >
          <Column field='id' header='ID' width='20px' sortable />
          <Column field='name' header='Name' filterable sortable />
          <Column field='age' header='Age' width='20px' sortable />
        </Table> */}
      </section>
    </div>
  )
}
