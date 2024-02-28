'use client'
import { RiGoogleFill, RiGithubFill } from 'react-icons/ri'
import Form, { DividerWithText, InputEmail, InputPass, InputText } from '@/components/FormControls/Form'
import { createTranslation } from '@/i18n/client'
import { useParams } from 'next/navigation'
import { LocaleTypes } from '@/i18n/settings'
import Link from 'next/link'
import Button from '@/components/Buttons/Button'

export default function FormSignUp() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = createTranslation(locale, 'form-auth')

  const signUpWith = (provider: string) => {
    // Implement sign-up logic with the specified provider
    console.log(`Signing up with ${provider}`)
  }

  return (
    <Form action='/submit-form' method='GET' width='300px' noSubmit vertical>
      <InputEmail id='email' label={t('email')} labelCol={3} required />
      <InputText id='username' label={t('username')} labelCol={3} required />
      <InputPass id='password' label={t('password')} labelCol={3} required />
      <br />
      <Button type='submit' className='text-sm font-medium'>
        {t('btn.sign-up')}
      </Button>
      <DividerWithText text={t('divider.or')} />
      <div className='flex flex-col gap-2'>
        <Button
          onClick={() => signUpWith('google')}
          className='flex items-center justify-center rounded bg-red-500 font-bold hover:bg-red-600 focus:ring-red-400'
        >
          <RiGoogleFill className='mr-2' />
          {t('btn.google')}
        </Button>
        <Button
          onClick={() => signUpWith('github')}
          className='flex items-center justify-center rounded bg-gray-500 font-bold hover:bg-gray-600 focus:ring-gray-400'
        >
          <RiGithubFill className='mr-2' />
          {t('btn.github')}
        </Button>
      </div>
      <div>
        <p>
          {t('text.already-have-account')}{' '}
          <Link href={`/${locale}/sign-in`} className='text-blue-500 hover:underline'>
            {t('link.sign-in')}
          </Link>
          .
        </p>
      </div>
    </Form>
  )
}
