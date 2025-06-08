import { getRecentProject } from '@/actions/projects'
import { onAuthenticateuser } from '@/actions/user'
import { AppSidebar } from '@/components/global/app-sidebar'
import UpperInfoBar from '@/components/global/upper-info-bar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Sidebar } from 'lucide-react'

import { redirect } from 'next/navigation'
import React from 'react'

type Props = { children: React.ReactNode}

const  Layout = async (props : Props) => {
    const recentProject = await getRecentProject();
    const checkUser = await onAuthenticateuser()

    if(!checkUser.user){
        redirect('/sign-in')
    }
  return (
  <SidebarProvider>
    <AppSidebar user={checkUser.user} recentProjects={recentProject.data || []} />
    <SidebarInset>
      <UpperInfoBar user={checkUser.user} />
      <div className='p-6'>{props.children}</div>
    </SidebarInset>
  </SidebarProvider>
  )
}

export default Layout