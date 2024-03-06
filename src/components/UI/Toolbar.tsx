import React, { ReactNode } from 'react'

type ToolbarTemplateType = ReactNode | ((props: ToolbarProps) => ReactNode)

type ToolbarProps = {
  left?: ToolbarTemplateType
  right?: ToolbarTemplateType
}

export default function Toolbar({ left, right }: ToolbarProps) {
  const renderLeft = typeof left === 'function' ? left({}) : left
  const renderRight = typeof right === 'function' ? right({}) : right

  return (
    <div className='flex items-center justify-between'>
      {/* <div className='flex items-center'> */}
      <div>{renderLeft}</div>
      {/* </div> */}
      <div>{renderRight}</div>
    </div>
  )
}
