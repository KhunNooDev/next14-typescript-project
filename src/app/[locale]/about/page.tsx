import Form, {
  InputCheckbox,
  InputEmail,
  InputGroup,
  InputNum,
  InputPass,
  InputSelect,
  InputText,
} from '@/components/FormControls/Form'
import { createTranslation } from '@/i18n/server'
import { ParamsLng } from '@/i18n/types'

export default async function AboutPage({ params: { locale } }: ParamsLng) {
  // Make sure to use the correct namespace here.
  const { t } = await createTranslation(locale, 'about')

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  return (
    <div>
      <h1>{t('aboutThisPage')}</h1>
      <Form action='/submit-form' method='GET' defaultValues={{ cb_1: false }} showReset>
        <InputGroup>
          <InputText id='input1' label='Label1' labelCol={2} inputCol={4} max={3} noContainer required />
          <InputNum id='input2' label='Label2' labelCol={2} inputCol={4} min={0} max={5} noContainer required />
        </InputGroup>
        {/* <InputText id='input3' label='Label3' labelCol={2} required />
        <InputGroup>
          <InputText id='input4' label='Label4' inputCol={4} noContainer noLabel required />
          <InputNum id='input5' label='Label5' inputCol={4} noContainer noLabel required />
          <InputEmail id='email' label='Label6' inputCol={4} noContainer noLabel required />
        </InputGroup>
        <InputPass id='password' label='Password' required />
        <InputNum id='number' label='Number' />
        <InputCheckbox id='cb_1' label='Checkbox' required />
        <InputCheckbox id='cb_2' label='Checkbox' labelContext='labelContext' /> */}
        {/* <InputEmail id='email' label='Email' labelCol={1} required /> */}
        {/* <InputPass id='password' label='Password' required labelCol={2} /> */}

        <InputSelect id='mySelect' label='Select an option' options={options} required labelCol={3} inputCol={2} />
      </Form>
    </div>
  )
}

export async function generateMetadata({ params: { locale } }: ParamsLng) {
  const { t } = await createTranslation(locale)

  return {
    title: t('site.title-about'),
  }
}
