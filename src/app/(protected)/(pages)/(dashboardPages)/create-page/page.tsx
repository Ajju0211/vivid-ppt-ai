import React, { Suspense } from 'react'
import CreatePageSkeleton from './_components/CreatePage/CreatePageSkeleton'
import RenderPage from './_components/RenderPage'

type Props = {}

function Page({}: Props) {
  return (
    <main className='w-full h-full pt-6  '>
        <Suspense fallback={<CreatePageSkeleton />} >
        <RenderPage />
        </Suspense>
    </main>
  )
}

export default Page