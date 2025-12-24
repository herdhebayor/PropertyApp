/** @format */

'use server'
import connectDB from '@/database'
import Message from '@/models/messageModel'
import { getSessionUser } from '@/utils/getSessionUser'

async function addMessage(previousState, formData) {
	await connectDB()

	const sessionUser = await getSessionUser()
	if (!sessionUser || !sessionUser.userId) {
		throw new Error('User id is required')
	}

	const { userId } = sessionUser
	
	const recipient = formData.get('recipient')

	if(userId === recipient) {
		throw new Error('You cannot send a message to yourself')
	}

	const newMessage = new Message({
		sender: userId,
		recipient,
		property: formData.get('property'),
		name: formData.get('name'),
		email: formData.get('email'),
		phone: formData.get('phone'),
		body: formData.get('body'),
	})

	await newMessage.save()
	return { submitted: true }
}

export default addMessage
