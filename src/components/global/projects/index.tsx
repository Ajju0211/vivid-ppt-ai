import { Project } from '@/generated/prisma'
import { containerVariats } from '@/lib/constants'
import { motion }  from 'framer-motion'
import React from 'react'

type Props = {
    projects: Project[]
}

const Projects = ({projects}: Props) => {
  return (
    <motion.div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
    initial='hidden'
    variants={containerVariats}
    animate="visible">
        {projects.map((project, id) => (
            <ProjectCard key={id} 
            projectId = {project?.id}
            title = {project?.title}
            createdAt = {project?.createdAt.toString()}
            isDeleted = {project?.isDeleted}
            slideData = {project?.slides}
            src = {
                project.thumbnail || 
                'https://wallpaperheart.com/wp-content/uploads/2018/04/free-abstract-and-textures-powerpoint-cool-background-images-for-powerpoint-presentation.jpg'
            }
            />
        ))}

    </motion.div>
  )
}

export default Projects