'use client'
import Form, { InputEmail, InputNum, InputPass, InputText } from '@/components/FormControls/Form'
import { Breadcrumbs, Button, Divider, Toolbar } from '@/components/UI'
import { useAxiosSWR } from '@/utils/useAxiosSWR'
import { dataType } from '../../page'

export default function AccountsManagementPage({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useAxiosSWR<dataType>(`accounts/${params?.id}`)
  if (!data) return

  return (
    <div className='flex flex-col gap-2 p-2' style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <section className='bg-color overflow-hidden rounded-md p-2'>
        <Toolbar left={<Breadcrumbs />} />
        <Divider />
        <h1>Update Account</h1>
        <Form action='/submit-form' method='GET' defaultValues={data.accounts} noSubmit>
          <InputEmail id='email' label={'Email'} labelCol={4} required />
          <InputText id='name' label={'Name'} labelCol={4} required />
          <InputNum id='age' label={'Age'} labelCol={4} required />
          <InputText id='profession' label={'Profession'} labelCol={4} required />
          {/* <InputPass id='password' label={'Password'} labelCol={4} required /> */}
          <br />
          <Button type='submit' className='text-sm font-medium'>
            Update Account
          </Button>
        </Form>
      </section>
    </div>
  )
}
