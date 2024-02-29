import { createTranslation } from '@/i18n/server'
import { ParamsLng } from '@/i18n/types'

// Make the page async cause we need to use await for createTranslation
export default async function IndexPage({ params: { locale } }: ParamsLng) {
  // Make sure to use the correct namespace here.
  // const { t } = await createTranslation(locale, 'home')
  const { t } = await createTranslation(locale, 'home')

  return (
    <>
      <section className='flex items-center justify-center border p-2' style={{ minHeight: `calc(100vh - 4rem)` }}>
        <h1>{t('greeting')}</h1>
      </section>
      {/* <div className='flex h-52 w-36 flex-col rounded-md border'>
        <div className='flex justify-between'>
          <div>EN</div>
          <div>gp</div>
        </div>
        <div className='flex h-full w-full items-center justify-center bg-gray-200'>
          <img src='https://via.placeholder.com/200' alt='Your Image' className='max-h-full max-w-full' />
        </div>
        <div className='self-center'>
          word <span className='text-sm text-gray-500'>(pos)</span>
        </div>
      </div> */}
    </>
  )
}

export async function generateMetadata({ params: { locale } }: ParamsLng) {
  const { t } = await createTranslation(locale)

  return {
    title: t('site.title-home'),
  }
}
