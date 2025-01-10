import React from 'react'
import Toggle from '@/components/toggle'
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className='h-[3rem] flex justify-between items-center m-2'>
     <Image
        className="dark:invert w-auto h-full object-contain"
        src="/logo.svg"
        alt="Logo"
        width={1000}
        height={1000}
        unoptimized={true}
        />
      <Toggle />
    </div>
  )
}
