'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { RiHeartFill, RiShareForwardLine } from 'react-icons/ri'
import { cn } from '@/utils/cn'

type CardProps = {
  className?: string
  title: string
  description: string
}

export default function Card({ className, title, description }: CardProps) {
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    fetch('https://source.unsplash.com/random')
      .then(response => {
        if (response.ok) {
          setImageUrl(response.url)
        } else {
          throw new Error('Failed to fetch image')
        }
      })
      .catch(error => {
        console.error('Error fetching image:', error)
      })
  }, [])
  return (
    <div className={cn('bg-color text-color overflow-hidden rounded-lg shadow-lg', className)}>
      <div className='aspect-h-9 aspect-w-16'>
        {imageUrl && <Image className='object-cover' src={imageUrl} alt='card' width={640} height={360} />}
      </div>
      <div className='p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{title}</h2>
        <p className='text-gray-600'>{description}</p>
        <div className='mt-4 flex items-center justify-between'>
          <button className='flex items-center text-gray-600 hover:text-red-500'>
            <RiHeartFill className='mr-1 h-5 w-5' />
            Like
          </button>
          <button className='flex items-center text-gray-600 hover:text-blue-500'>
            <RiShareForwardLine className='mr-1 h-5 w-5' />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
