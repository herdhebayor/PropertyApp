/** @format */

'use server'

import connectDB from '@/database'
import User from '@/models/userModel'
import { getSessionUser } from '@/utils/getSessionUser'

async function checkBookmarkStatus(propertyId) {
	await connectDB()

	const sessionUser = await getSessionUser()
	if (!sessionUser || !sessionUser.userId) {
		throw new Error('User id is required')
	}

	const { userId } = sessionUser
	const user = await User.findById(userId)

	if (!user) {
		throw new Error('User not found')
	}

	
	let isBookmarked = user.bookmarks.some(
		(bookmark) => bookmark.toString() === propertyId
	)
	return {
		isBookmarked,
	}
}

export default checkBookmarkStatus
