'use client'
import Form, { InputEmail, InputPass, InputText } from '@/components/FormControls/Form'
import { Breadcrumbs, Button, Divider, Toolbar } from '@/components/UI'

export default function AccountsManagementPage() {
  return (
    <div className='flex flex-col gap-2 p-2' style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <section className='bg-color overflow-hidden rounded-md p-2'>
        <Toolbar left={<Breadcrumbs />} />
        <Divider />
        <h1>Create Account</h1>
        <Form action='/submit-form' method='GET' noSubmit>
          <InputEmail id='email' label={'Email'} labelCol={4} required />
          <InputText id='username' label={'Username'} labelCol={4} required />
          <InputPass id='password' label={'Password'} labelCol={4} required />
          <br />
          <Button type='submit' className='text-sm font-medium'>
            Create Account
          </Button>
        </Form>
      </section>
    </div>
  )
}
