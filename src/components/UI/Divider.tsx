import { cn } from '@/utils/cn'

type DividerAlignType = 'center' | 'left' | 'right' | 'bottom' | 'top'

type DividerLayoutType = 'vertical' | 'horizontal'

type DividerBorderType = 'solid' | 'dashed' | 'dotted'

type DividerProps = {
  align?: DividerAlignType
  layout?: DividerLayoutType
  type?: DividerBorderType
  // children?: React.ReactNode
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'>

export default function Divider({ align = 'center', layout = 'horizontal', type = 'solid', children }: DividerProps) {
  // const dividerClass = cn(
  //   'inline-flex',
  //   'w-full',
  //   `items-${align}`,
  //   `justify-${align}`,
  //   layout === 'horizontal' ? 'flex-col' : 'flex-row',
  // )

  // const hrClass = cn('my-8', 'h-px', 'w-64', 'border-0', `border-${type}`, 'bg-gray-200', 'dark:bg-gray-800')

  // const spanClass = cn(
  //   'absolute',
  //   'left-1/2',
  //   '-translate-x-1/2',
  //   'bg-white',
  //   'px-3',
  //   'text-gray-900',
  //   'dark:bg-gray-900',
  //   'dark:text-white',
  // )

  return (
    <div className='inline-flex w-full items-center justify-center'>
      <hr className='h-px w-full border-0 bg-gray-200 dark:bg-gray-800' />
      <span className='absolute left-1/2 -translate-x-1/2 bg-white px-3 text-gray-900 dark:bg-gray-900 dark:text-white'>
        {children}
      </span>
    </div>
  )
  // return (
  //   <div className={dividerClass}>
  //     <hr className={hrClass} />
  //     <span className={spanClass}>{children}</span>
  //   </div>
  // )
}
