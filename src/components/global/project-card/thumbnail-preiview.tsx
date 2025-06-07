import { Slide, Theme } from '@/lib/types'
import { Image } from 'lucide-react'

import React from 'react'

type Props = {
    slides: Slide
    theme: Theme
}

function ThumbnailPreview({ slides, theme }: Props) {
  return (
    <div className={cn(
        'w-full relative aspect-[16/10] rounded-lg overflow-hidden transition-all duration200 p-2'
    )}
    style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slidesBackgroundColor,
        backgroundImage: theme.gradientBackground,
    }}>
        {slides? (
            <div className='scale-[0.5] origin-top-left w-[200%] overflow-hidden'>
                This  is the slide
            </div>
        ):(
            <div className='w-full h-full bg-gray-400 flex justify-center items-center'>
                <Image className="w-6 h-6 text-gray-500" />
            </div>
        )}
    </div>
  )
}

export default ThumbnailPreview