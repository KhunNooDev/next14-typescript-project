import { createTranslation } from '@/i18n/server'
import { ParamsLng } from '@/i18n/types'

// Make the page async cause we need to use await for createTranslation
export default async function IndexPage({ params: { locale } }: ParamsLng) {
  // Make sure to use the correct namespace here.
  // const { t } = await createTranslation(locale, 'home')
  const { t } = await createTranslation(locale, 'home')

  return (
    <div>
      <h1>{t('greeting')}</h1>
    </div>
  )
}

export async function generateMetadata({ params: { locale } }: ParamsLng) {
  const { t } = await createTranslation(locale)

  return {
    title: t('site.title-home'),
  }
}
