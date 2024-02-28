import { createTranslation } from '@/i18n/server'
import { ParamsLng } from '@/i18n/types'
import FormSignIn from './form'

export default async function SignInPage({ params: { locale } }: ParamsLng) {
  // Make sure to use the correct namespace here.
  const { t } = await createTranslation(locale, 'form')

  return (
    <div className='container mx-auto flex h-screen items-center justify-center'>
      <FormSignIn />
    </div>
  )
}

export async function generateMetadata({ params: { locale } }: ParamsLng) {
  const { t } = await createTranslation(locale)

  return {
    title: t('site.title-sign-in'),
  }
}
