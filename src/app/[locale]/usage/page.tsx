import { createTranslation } from '@/i18n/server'
import { LocaleTypes } from '@/i18n/settings'
import { ParamsLng } from '@/i18n/types'

export default async function UsagePage({ params: { locale } }: ParamsLng) {
  const { t } = await createTranslation(locale, 'usage')

  return (
    <div>
      <br />
      <div>
        <b>{`"number": "Number: {{val, number}}"`}</b>
        <p>
          {t('number', {
            val: 123456789.0123,
          })}
        </p>
      </div>
      <br />
      <div>
        <b>{`"currency": "Currency: {{val, currency}}"`}</b>
        <p>
          {t('currency', {
            val: 123456789.0123,
            style: 'currency',
            currency: 'USD',
          })}
        </p>
      </div>
      <br />
      <div>
        <b>{`"dateTime": "Date/Time: {{val, datetime}}"`}</b>
        <p>
          {t('dateTime', {
            val: new Date(1234567890123),
            formatParams: {
              val: {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              },
            },
          })}
        </p>
      </div>
      <br />
      <div>
        <b>{`"relativeTime": "Relative Time: {{val, relativetime}}"`}</b>
        <p>
          {t('relativeTime', {
            val: 12,
            style: 'long',
          })}
        </p>
      </div>
      <br />
      <div>
        <b>{`"list": "List: {{val, list}}"`}</b>
        <p>
          {t('list', {
            // https://www.i18next.com/translation-function/objects-and-arrays#objects
            // Check the link for more details on `returnObjects`
            val: t('weekdays', { returnObjects: true }),
          })}
        </p>
      </div>
      <br />
      <SubscribeForm locale={locale} />
    </div>
  )
}

async function SubscribeForm({ locale }: { locale: LocaleTypes }) {
  const { t } = await createTranslation(locale, 'newsletter')
  return (
    <section className='w-[350px]'>
      <h3>{t('title')}</h3>
      <h4>{t('subtitle')}</h4>

      <form className='flex flex-col items-start'>
        <input name='firstName' placeholder={t('form.firstName')} className='form-field' />
        <input name='email' placeholder={t('form.email')} className='form-field' autoComplete='email' />
        <button className='form-field'>{t('form.action.signUp')}</button>
        <button className='form-field'>{t('form.action.cancel')}</button>
      </form>
    </section>
  )
}

export async function generateMetadata({ params: { locale } }: ParamsLng) {
  const { t } = await createTranslation(locale)

  return {
    title: t('site.title-usage'),
  }
}
