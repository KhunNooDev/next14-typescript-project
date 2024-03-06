'use client'
import React, { ReactNode, useState } from 'react'
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiDeleteBinLine,
  RiMoreLine,
  RiPencilLine,
  RiSortAsc,
  RiSortDesc,
} from 'react-icons/ri'
import { Button } from '.'
import { cn } from '@/utils/cn'

type ColumnProps = {
  field: string
  header: ReactNode
  width?: string
  className?: string
  sortable?: boolean
  filterable?: boolean
}

type TableRow = {
  [key: string]: any
}

type TableProps = {
  children: ReactNode
  data: TableRow[]
  totalRecords?: number
  onEdit?: (row: TableRow) => void
  onDelete?: (row: TableRow) => void
}

export default function Table({ children, data, totalRecords, onEdit, onDelete }: TableProps) {
  // Ensure that all children are Column components
  React.Children.forEach(children, child => {
    if (!React.isValidElement(child) || (child.type as any).name !== 'Column') {
      throw new Error('Table component only accepts Column components as children.')
    }
  })

  const [filter, setFilter] = useState<Record<string, string>>({})
  const [sort, setSort] = useState<{ field: string; desc: boolean } | null>(null)
  const [selectedPageSize, setSelectedPageSize] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil((totalRecords || data.length) / selectedPageSize)
  const pageSizeOptions = [1, 2, 3, 5]

  // Handler function for selecting page size
  const handleSelectPageSize = (size: number) => {
    setSelectedPageSize(size)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  const handleFilterChange = (field: string, value: string) => {
    setFilter(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  const handleSortChange = (field: string) => {
    setSort(prevSort => {
      if (prevSort && prevSort.field === field) {
        return { field, desc: !prevSort.desc }
      }
      return { field, desc: false }
    })
  }

  const filteredData = data.filter(row => {
    for (const field in filter) {
      if (filter[field] && !row[field].toLowerCase().includes(filter[field].toLowerCase())) {
        return false
      }
    }
    return true
  })

  const sortedData = sort
    ? filteredData.sort((a, b) => {
        const aValue = typeof a[sort.field] === 'number' ? a[sort.field] : String(a[sort.field]).toLowerCase()
        const bValue = typeof b[sort.field] === 'number' ? b[sort.field] : String(b[sort.field]).toLowerCase()
        if (sort.desc) {
          return bValue < aValue ? -1 : bValue > aValue ? 1 : 0
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        }
      })
    : filteredData

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Logic to slice sortedData based on pagination for the current page
  const startIndex = (currentPage - 1) * selectedPageSize
  const endIndex = startIndex + selectedPageSize
  const slicedData = sortedData.slice(startIndex, endIndex)

  return (
    <div className='relative'>
      <div style={{ minWidth: '500px', overflowX: 'scroll' }}>
        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr className='bg-gray-100'>
              {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                  const columnProps = child.props as ColumnProps
                  return (
                    <th
                      key={index}
                      className={cn('border border-gray-300 px-4 py-2 ', columnProps.className)}
                      style={{ flexBasis: columnProps.width, width: columnProps.width }}
                      onClick={() => columnProps.sortable && handleSortChange(columnProps.field)}
                    >
                      <div className='flex items-center justify-between'>
                        <span>{columnProps.header}</span>
                        {(columnProps.filterable || columnProps.sortable) && (
                          <div className='flex items-center justify-between gap-2'>
                            {columnProps.filterable && (
                              <input
                                type='text'
                                value={filter[columnProps.field] || ''}
                                onChange={e => handleFilterChange(columnProps.field, e.target.value)}
                                className='ml-2 rounded-md border border-gray-300 px-2 py-1'
                                placeholder={`Filter ${columnProps.header}`}
                              />
                            )}
                            {columnProps.sortable && sort && sort.field === columnProps.field && (
                              <span>{sort.desc ? <RiSortDesc /> : <RiSortAsc />}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  )
                }
                return null
              })}
              {(onEdit || onDelete) && (
                <th className='border border-gray-300 px-4 py-2' style={{ flexBasis: '25px', width: '25px' }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {slicedData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                {React.Children.map(children, (child, colIndex) => {
                  if (React.isValidElement(child)) {
                    const columnProps = child.props as ColumnProps
                    return (
                      <td
                        key={colIndex}
                        className='border border-gray-300 px-4 py-2'
                        style={{ flexBasis: columnProps.width, width: columnProps.width }}
                      >
                        {row[columnProps.field]}
                      </td>
                    )
                  }
                  return null
                })}
                {(onEdit || onDelete) && (
                  <td className='border border-gray-300 px-4 py-2' style={{ flexBasis: '25px', width: '25px' }}>
                    <div className='flex items-center justify-center gap-2'>
                      {onEdit && <Button className='' onClick={() => onEdit(row)} icon={<RiPencilLine />} />}
                      {onDelete && (
                        <Button className='bg-red-500' onClick={() => onDelete(row)} icon={<RiDeleteBinLine />} />
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-4 flex items-center justify-end gap-2'>
        {/* Pagination controls */}
        <div className='flex items-center'>
          <button onClick={handlePrevPage} disabled={currentPage === 1} className='text-gray-500 hover:text-gray-800'>
            <RiArrowLeftSLine className='h-5 w-5' />
          </button>
          <div className='flex items-center justify-center space-x-2'>
            {totalPages > 5 && currentPage > 3 && (
              <>
                <button onClick={() => goToPage(1)} className='text-gray-500 hover:text-gray-800'>
                  1
                </button>
                <RiMoreLine className='h-5 w-5 text-gray-500' />
              </>
            )}
            {[...Array(totalPages)].map((_, index) => {
              if (
                (currentPage <= 3 && index < 5) ||
                (currentPage > 3 &&
                  currentPage <= totalPages - 2 &&
                  index >= currentPage - 3 &&
                  index <= currentPage + 1) ||
                (currentPage > totalPages - 2 && index > totalPages - 5)
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={cn('mx-2', currentPage === index + 1 && 'font-bold text-blue-500')}
                  >
                    {index + 1}
                  </button>
                )
              }
              return null
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <RiMoreLine className='h-5 w-5 text-gray-500' />
                <button onClick={() => goToPage(totalPages)} className='text-gray-500 hover:text-gray-800'>
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='text-gray-500 hover:text-gray-800'
          >
            <RiArrowRightSLine className='h-5 w-5' />
          </button>
        </div>
        {/* Display text for entries */}
        <div className='flex items-center'>
          <span className='text-gray-500'>
            Showing {(currentPage - 1) * selectedPageSize + 1} to{' '}
            {Math.min(currentPage * selectedPageSize, totalRecords || data.length)} of {totalRecords || data.length}
          </span>
        </div>
        {/* Dropdown to select rows per page */}
        <div className='flex items-center'>
          <RowsPerPageDropdown
            pageSizeOptions={pageSizeOptions}
            selectedPageSize={selectedPageSize}
            onSelectPageSize={handleSelectPageSize}
          />
        </div>
      </div>
    </div>
  )
}

// Component for defining table columns
// Placeholder, will be replaced with actual implementation
export const Column = (props: ColumnProps) => <>{props}</>

type RowsPerPageDropdownProps = {
  pageSizeOptions: number[]
  selectedPageSize: number
  onSelectPageSize: (size: number) => void
}

const RowsPerPageDropdown = ({ pageSizeOptions, selectedPageSize, onSelectPageSize }: RowsPerPageDropdownProps) => {
  return (
    <select
      value={selectedPageSize}
      onChange={e => onSelectPageSize(Number(e.target.value))}
      className='rounded-md border border-gray-300 px-4 py-1 pr-8'
    >
      {pageSizeOptions.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
