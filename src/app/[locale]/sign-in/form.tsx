'use client'
import { RiGoogleFill, RiGithubFill } from 'react-icons/ri'
import Form, { DividerWithText, InputPass, InputText } from '@/components/FormControls/Form'
import { createTranslation } from '@/i18n/client'
import { useParams, useRouter } from 'next/navigation'
import { LocaleTypes } from '@/i18n/settings'
import Link from 'next/link'
import Button from '@/components/Buttons/Button'

export default function FormSignIn() {
  const router = useRouter()
  const locale = useParams()?.locale as LocaleTypes
  const { t } = createTranslation(locale, 'form-auth')

  const signInWith = (provider: string) => {
    // Implement sign-in logic with the specified provider
    console.log(`Signing in with ${provider}`)
  }

  const callbackForm = (data: any) => {
    // if(success)
    router.push(`/${locale}/`)
  }
  return (
    <Form action='/submit-form' method='GET' callback={callbackForm} width='300px' noSubmit vertical>
      <InputText id='username' label={t('username')} labelCol={3} required />
      <InputPass id='password' label={t('password')} labelCol={3} required />
      <br />
      <Button type='submit' className='text-sm font-medium'>
        {t('btn.sign-in')}
      </Button>
      <DividerWithText text={t('divider.or')} />
      <div className='flex flex-col gap-2'>
        <Button
          onClick={() => signInWith('google')}
          className='flex items-center justify-center rounded bg-red-500 font-bold hover:bg-red-600 focus:ring-red-400'
        >
          <RiGoogleFill className='mr-2' />
          {t('btn.google')}
        </Button>
        <Button
          onClick={() => signInWith('github')}
          className='flex items-center justify-center rounded bg-gray-500 font-bold hover:bg-gray-600 focus:ring-gray-400'
        >
          <RiGithubFill className='mr-2' />
          {t('btn.github')}
        </Button>
      </div>
      <div>
        <p>
          {t('text.new-account')}{' '}
          <Link href={`/${locale}/sign-up`} className='text-blue-500 hover:underline'>
            {t('link.sign-up')}
          </Link>
          .
        </p>
      </div>
    </Form>
  )
}
