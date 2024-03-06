'use client'
import { Breadcrumbs, Button, Divider, Toolbar } from '@/components/UI'

export default function AccountsManagementPage() {
  return (
    <div className='p-2' style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <section>
        <Toolbar left={<Breadcrumbs />} />
        <Divider />
        <div>Form</div>
      </section>
    </div>
  )
}
