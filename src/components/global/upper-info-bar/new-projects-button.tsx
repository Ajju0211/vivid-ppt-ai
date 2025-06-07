'use client'

import { Button } from '@/components/ui/button'
import { User } from '@/generated/prisma'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const NewProjectButton = ({ user }: {user: User}) => {
  const router = useRouter()
  return (
   <Button 
   className='rounded-lg   font-semibold'
   disabled={!user.subscription}
  //  onClick={() => }
  >
    <Plus />
    New Project</Button>
  )
}

export default NewProjectButton