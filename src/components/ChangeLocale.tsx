'use client'
import { useRouter, useParams, useSelectedLayoutSegments } from 'next/navigation'
import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { LocaleTypes } from '@/i18n/settings'
import ButtonDropdown from './Buttons/ButtonDropdown'

export default function ChangeLocale() {
  const router = useRouter()
  const params = useParams()
  const urlSegments = useSelectedLayoutSegments()
  const locale = params.locale as LocaleTypes

  const [selectedLocale, setSelectedLocale] = useState(locale)

  const handleLocaleChange = (newLocale: LocaleTypes) => {
    // Update the state with the new locale
    setSelectedLocale(newLocale)

    // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
    // urlSegments will contain the segments after the locale.
    // We replace the URL with the new locale and the rest of the segments.
    router.push(`/${newLocale}/${urlSegments.join('/')}`)
  }
  const defaultLabel =
    selectedLocale === 'en' ? (
      <ReactCountryFlag countryCode='US' className='mr-1 text-3xl' svg />
    ) : (
      <ReactCountryFlag countryCode='TH' className='mr-1 text-3xl' svg />
    )

  const dropdownMenuItems = [
    { label: <ReactCountryFlag countryCode='US' className='mr-1 text-3xl' svg />, locale: 'en' as LocaleTypes },
    { label: <ReactCountryFlag countryCode='TH' className='mr-1 text-3xl' svg />, locale: 'th' as LocaleTypes },
  ]
  const filteredMenuItems = dropdownMenuItems.filter(item => item.locale !== selectedLocale)
  return (
    <div>
      {/* Language toggle button */}
      {/* <button
        className='flex items-center text-white'
        onClick={() => handleLocaleChange(selectedLocale === 'en' ? 'th' : 'en')}
      >
        <ReactCountryFlag countryCode={selectedLocale === 'en' ? 'US' : 'TH'} className='mr-1 text-3xl' svg />
      </button> */}
      <ButtonDropdown
        menuItems={filteredMenuItems}
        defaultLabel={defaultLabel}
        onSelect={(locale: LocaleTypes) => handleLocaleChange(locale)}
      />
    </div>
  )
}
