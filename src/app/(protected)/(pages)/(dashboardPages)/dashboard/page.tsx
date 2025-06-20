import React from 'react'
import { getAllProjects } from '@/actions/projects'
import NotFound from '@/components/global/not-found'
import Projects from '@/components/global/projects'

async function DashboardPage() {
    const allProjects = await getAllProjects()
  return (
    <div className='w-full flex flex-col gap-6 relative md:p-4 p-4 '>
      <div className='flex
      flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center'>
        <div className='flex flex-col items-start'>
          <h1 className='text-2xl font-semibold dark:text-primary'>Projects</h1>
          <p className='text-base font-normal'>All your work in one place</p>
        </div>
      </div>

      {/* {"Projects"} */}
      {allProjects.data && allProjects.data.length > 0 ? <Projects /> : <NotFound />}
    </div>
  )
}

export default DashboardPage