import connectDB from "@/database";
import Message from "@/models/messageModel";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/MessageCard";

const MessagePage = async ()=>{
    connectDB()

    const sessionUser = getSessionUser()
    const {userId} = sessionUser

    const readMessages = await Message.find({recipient:userId, read:true})
    .sort({createdAt: -1})
    .populate("sender", "username")
    .populate("property", "name")
    .lean()

    const unreadMessages = await Message.find({
			recipient: userId,
			read: false,
		})
			.sort({ createdAt: -1 })
			.populate('sender', 'username')
			.populate('property', 'name')
			.lean()

            //create an array that contains both read ana unread messages and run 
            //convertToSerializableObject on them

            const messages = [...unreadMessages,...readMessages].map((messageDoc)=>{
                const message = convertToSerializableObject(messageDoc)
                message.sender = convertToSerializableObject(messageDoc.sender)
                message.property = convertToSerializableObject(message.property)
                return message
            })

            return(
                <section className="bg-blue-50">
                    <div className="container m-auto py-24 max-w-6xl">
                        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                            <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
                            <div className="space-y-4">
                                {
                                    messages.length === 0 ? (
                                        <p>You do not have any message</p>
                                    ):(
                                        messages.map((msg)=>{
                                            <MessageCard key={msg._id} message={msg}/>
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </section>
            )


}

export default MessagePage