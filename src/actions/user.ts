import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticateuser = async () => {
    try {
        const user = await currentUser()
        if (!user) {
            return { status: 403 }
        }

        const userExist = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            include: {
                PurchaseProjects: {
                    select: {
                        id: true,
                    }
                }
            }
        })

        if (userExist) {
            return {
                status: 200,
                user: userExist
            }
        }
        const newUser = await client.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName + " " + user.lastName,
                profileImage: user.imageUrl
            },
        })

        if (newUser) {
            return { status: 201, user: newUser }
        }

        return { status: 400 }
    } catch (err) {
        console.log("🔴 ERROR", err)
        return { status: 500 }

    }
}