"use server"

import { client } from "@/lib/prisma"
import { onAuthenticateuser } from "./user"
import { error } from "console"
import { data } from "@/lib/constants"
import { OutlinedCard } from "@/lib/types"

export const getAllProjects = async () => {
    try {
        const checkUser = await onAuthenticateuser()
        if (checkUser.status != 200 || !checkUser.user) {
            return { status: 403, error: "User not Authenticated" }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: 'desc'
            },
        })

        if (projects.length == 0) {
            return { sttaus: 404, error: "No project Found" }
        }


        return { status: 200, data: projects }
    } catch (err) {
        console.log('🔴 ERROR', err)
        return { status: 500, error: "Internal server error" }

    }
}

export const getRecentProject = async () => {
    try {
        const checkUser = await onAuthenticateuser()
        if (checkUser.status == 200 || !checkUser.user) {
            return { status: 403, error: "User not authenticated" }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: 5,
        })

        if (projects.length === 0) {
            return {
                status: 404,
                error: "No recent projects available",
            }
        }

        return {
            status: 200,
            data: projects
        }

    } catch (err) {
        console.log("🔴 ERROR", err)
        return {
            status: 500,
            error: "Internal sever error"
        }

    }
}

export const recoverProject = async (projectId : string) => {
    try {
        const checkUser = await onAuthenticateuser()
        if (checkUser.status == 200 || !checkUser.user) {
            return { status: 403, error: "User not authenticated" }
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: false,
            },
        })

        if(!updatedProject) {
            return { status: 500, error: "Failed to recover project"}
        }

        return { status: 200, data: updatedProject }

    } catch (err) {
        console.log("🔴Error", err)
        return { status: 500, "Error": err}


    }
}

export const deleteProject = async (projectId : string) => {

    try {
        const checkUser = await onAuthenticateuser()
        if ( checkUser.status !== 200 || !checkUser.user ){
            return { status: 400, error: "User not authenticated"}
        }
        
        const updatedProject = await client.project.update({
            where:{
                id: projectId,
            },
            data: {
                isDeleted: true,
            },
        })

        if(!updatedProject){
            return { status: 500, error: "Failed to delete project"}
        }

        return { status: 200, data: updatedProject }
    } catch (err) {
        console.log("🔴 ERROR ", err)
        return { status: 500, error: "Internal server error"}
    }

}

export const createProject = async (
    title: string,
    outlines: OutlinedCard[]
) => {
    try {
        if( !title || !outlines || outlines.length === 0 ) {
            return { status: 400, error: 'Title and outlines are required' }
        }
        const allOutlines = outlines.map((outlines) => outlines.title)
        const checkUser = await onAuthenticateuser()
        if (checkUser.status ! == 200 || !checkUser.user) {
            return { status: 403, error: "User not authenticated"}
        }

        const project = await client.project.create({
            data: {
                title,
                outlines: allOutlines,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: checkUser.user.id
            }, 
        })

        if(!project) {
            return { status: 500 , error: 'Failed to create project'}
        }

        return {status: 200, data: project}
    } catch (err) {
        
    }


}

export const getProjectById = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateuser()
        if (checkUser.status !== 200 || !checkUser.user){
            return { status: 403, error: ' User not authenticated'}
        }
        
        const project = await client.project.findFirst({
            where: {id: projectId},
        })

        if(!project) {
            return { status: 404, error: 'Project not found'}
        }
        return { status: 200, data: project}
    } catch (err) {
        console.error('🔴 ERROR', err)
        return { status: 500, error: 'Internal sever error'}
    }
}