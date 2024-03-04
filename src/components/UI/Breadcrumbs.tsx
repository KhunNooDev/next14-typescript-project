'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RiHome2Line } from 'react-icons/ri'

interface BreadcrumbItem {
  name: string
  path: string
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    // Skip the first segment (i18n)
    const pathSegmentsToUse = pathSegments.slice(1)

    const breadcrumbsData: BreadcrumbItem[] = []
    let pathAccumulator = ''

    pathSegmentsToUse.forEach((segment, index) => {
      pathAccumulator += `/${segment}`
      breadcrumbsData.push({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: pathAccumulator,
      })
    })

    setBreadcrumbs(breadcrumbsData)
  }, [pathname])

  return (
    <div className='flex items-center'>
      <Link href='/' className='flex items-center'>
        <RiHome2Line className='mr-1' />
        Home
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          <span className='mx-1'>{'>'}</span>
          <Link href={breadcrumb.path}>{breadcrumb.name}</Link>
        </span>
      ))}
    </div>
  )
}
