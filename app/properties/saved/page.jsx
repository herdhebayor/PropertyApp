/** @format */

import React from 'react'
import PropertyCard from '@/components/PropertyCard'
import connectDB from '@/database'
import User from '@/models/userModel'
import { getSessionUser } from '@/utils/getSessionUser'

const SavedPropertiesPage = async () => {
	await connectDB()
	const sessionUser = await getSessionUser()
	if (!sessionUser || !sessionUser.userId) {
		throw new Error('User not authenticated')
	}
	const { userId } = sessionUser

	const user = await User.findById(userId).populate('bookmarks')
	if (!user) {
		return <p>User not found</p>
	}
	const { bookmarks } = user
	return (
		<section className='px-4 py-6'>
			<h1 className='text-2xl mb-4'>Saved Properties</h1>
			{bookmarks.length === 0 ? (
				<p>No Saved Properties</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{bookmarks.map((property) => (
						<PropertyCard key={property._id} property={property} />
					))}
				</div>
			)}
		</section>
	)
}

export default SavedPropertiesPage
