import React from 'react'

export default function ErrorScreen({errorMsg}: {errorMsg: string}) {
  return (
    <div className='h-full flex justify-center items-center text-heading-lg text-primary-heading-color dark:text-white uppercase'>
        {errorMsg}
    </div>
  )
}
