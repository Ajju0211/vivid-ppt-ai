
'use client'
import { getProjectById } from '@/actions/projects'
import { themes } from '@/lib/constants'
import { useSlideStore } from '@/store/useSlideStore'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { DndProvider } from 'react-dnd'

type Props = {}

const Page = (props: Props) => {
    const params = useParams()
    const { setTheme } = useTheme()
    const [ isLoading, setIsLoading ] = useState(true)
    const { setSlides, setProject, currentTheme, setCurrentTheme } = useSlideStore()

    useEffect( () => {
        ;(async() => {
            try {
                const res = await getProjectById(params.presentationId as string)
                if( res.status !== 200 || !res.data ){
                    toast.error('Error', {
                        description: 'Unable to fetch project'
                    })
                    redirect('/dashboard')
                }
                const findTheme = themes.find(
                    (theme) => theme.name === res.data.themeName
                )
                setCurrentTheme(findTheme || themes[0])
                setTheme(findTheme?.type === 'dark' ? 'dark' : 'light')
                setProject(res.data)
                setSlides(JSON.parse(JSON.stringify(res.data.slides)))
            } catch (err) {
                toast.error("Error", {
                    description: "An unexpected error occured"
                })
            }finally {
                setIsLoading(false)
            }
        })()
    },[])

    if(isLoading) {
        return  (
            <div className='flex items-center justify-center h-screen'>
                <Loader2 className='h-8 w-8 animate-spin text-primary' />
            </div>
        )
    }
    return (

        <DndProvider>
            
            
        </DndProvider>
    )
}

export default Page