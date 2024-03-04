// components/Table.tsx
import React, { ReactNode } from 'react'
import { Button } from '.'

interface ColumnProps {
  header: ReactNode
  className?: string
}

interface TableRow {
  [key: string]: any
}

interface TableProps {
  children: ReactNode
  data: TableRow[]
  onEdit?: (row: TableRow) => void // Edit event handler
  onDelete?: (row: TableRow) => void // Delete event handler
}

export function Column({ header, className }: ColumnProps) {
  return <th className={`border border-gray-300 px-4 py-2 ${className}`}>{header}</th>
}

export default function Table({ children, data, onEdit, onDelete }: TableProps) {
  // Ensure that all children are Column components
  React.Children.forEach(children, child => {
    if (!React.isValidElement(child) || (child.type as any).name !== 'Column') {
      throw new Error('Table component only accepts Column components as children.')
    }
  })

  return (
    <div className='overflow-x-auto'>
      <table className='w-full table-auto border-collapse'>
        <thead>
          <tr className='bg-gray-100'>
            {React.Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { key: index })
              }
              return null
            })}
            <th className='border border-gray-300 px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
              {React.Children.map(children, (child, colIndex) => {
                if (React.isValidElement(child)) {
                  return (
                    <td key={colIndex} className='border border-gray-300 px-4 py-2'>
                      {row[Object.keys(row)[colIndex]]}
                    </td>
                  )
                }
                return null
              })}
              <td className='border border-gray-300 px-4 py-2'>
                <div className='flex items-center justify-center gap-2'>
                  {onEdit && (
                    <Button className='mr-2 text-blue-500 shadow-blue-900/50' onClick={() => onEdit(row)}>
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button className='text-red-500 shadow-red-900/50' onClick={() => onDelete(row)}>
                      Delete
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
