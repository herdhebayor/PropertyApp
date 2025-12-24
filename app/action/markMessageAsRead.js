"use server";

import connectDB from "@/database";
import Message from "@/models/messageModel";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId){
    await connectDB()

    const sessionUser = getSessionUser()
    if(!sessionUser || !sessionUser.userId){
        throw new Error("User Id is required")
    }

    const {userId} = sessionUser
    const message = await Message.findById(messageId)

    if(!message){
        throw new Error("Message not found")
    }

    //Verify Ownership
    if(message.recipient.toString() !== userId){
        throw new Error("Unauthorized")
    }

    message.read = !message.read
    revalidatePath("message", "page");

    await message.save()

    return message.read;
}


export default markMessageAsRead