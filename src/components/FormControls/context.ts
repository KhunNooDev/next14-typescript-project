import { createContext } from 'react'

type FormContextType = {
  defaultLayout: 'vertical' | 'horizontal'
}

export const FormContext = createContext<FormContextType>({
  defaultLayout: 'horizontal',
})
