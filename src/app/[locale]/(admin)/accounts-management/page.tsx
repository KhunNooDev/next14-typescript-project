'use client'
import { UserData } from '@/app/api/accounts/route'
import { Breadcrumbs, Button, Divider, Toolbar } from '@/components/UI'
import Table, { Column } from '@/components/UI/Table'
import { useAxiosSWR } from '@/utils/useAxiosSWR'
import { usePathname, useRouter } from 'next/navigation'

export type dataType = {
  accounts: UserData[]
  totalRecords: number
}
export default function AccountsManagementPage() {
  const router = useRouter()
  const pathname = usePathname()

  const { data, error, isLoading } = useAxiosSWR<dataType>('accounts')
  if (isLoading) return

  return (
    <div className='p-2' style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <section className='bg-color rounded-md p-2'>
        <Breadcrumbs />
        <Toolbar
          left={<h1>Account</h1>}
          right={<Button onClick={() => router.push(`${pathname}/create`)}>Create</Button>}
        />
        <Divider />
        <Table
          data={data.accounts}
          totalRecords={data.totalRecords}
          onEdit={row => {
            router.push(`${pathname}/update/${row.id}`)
            console.log('Edit:', row)
          }}
          onDelete={row => console.log('Delete:', row)}
        >
          <Column field='name' header='Name' filterable sortable />
          <Column field='age' header='Age' width='20px' sortable />
          <Column field='profession' header='Profession' width='20px' sortable />
        </Table>
      </section>
    </div>
  )
}
