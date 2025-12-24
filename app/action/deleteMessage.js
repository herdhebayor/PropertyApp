"use server"

import connectDB from "@/database"
import Message from "@/models/messageModel"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function deleteMessage(messageId){
    await connectDB()
    const sessionUser = await getSessionUser()
    if(!sessionUser || !sessionUser.userId){
        throw new Error("User Id is required")
    }

    const {userId }= sessionUser
    const message = await Message.findById(messageId)

    if(!message){
        throw new Error("Message not found")
    }
//Verify Ownership
if(message.recipient !== userId){
    throw new Error("Unauthorized")
}

await message.deleteOne()
revalidatePath("/","layout")

}

export default deleteMessage