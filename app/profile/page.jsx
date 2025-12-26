/** @format */

import React from 'react'
import Image from 'next/image'
import connectDB from '@/database'
import Property from '@/models/propertyModel'
import { getSessionUser } from '@/utils/getSessionUser'
import { FaUserCircle } from 'react-icons/fa'
import ProfileProperties from '@/components/profileProperties'
import { convertToSerializableObject } from '@/utils/convertToObject'

const ProfilePage = async () => {
	await connectDB()

	const sessionUser = await getSessionUser()
	const { userId } = sessionUser

	

	if (!userId) {
		throw new Error('User ID is required')
	}

	
	// const propertiesDoc = await Property.find({owner:userId}).lean()
	// const properties = propertiesDoc.map(convertToSerializableObject)
	// if(!Property){
	// 	return(
	// 		<h1 className= 'text-center text-2xl font-bold mt-10'>
	// 			Property Not Found
	// 		</h1>
	// 	)
	// }
	let propertiesDoc = []
	try {
		propertiesDoc = await Property.find({ owner: userId }).lean()
	} catch (err) {
		console.error('Error fetching properties:', err)
		propertiesDoc = []
	}

	// if (!Array.isArray(propertiesDoc)) {
	// 	console.error('propertiesDoc is not an array:', propertiesDoc)
	// 	propertiesDoc = []
	// }

	const properties = propertiesDoc.map(convertToSerializableObject)

	// if (!properties || properties.length === 0) {
	// 	return (
	// 		<h1 className='text-center text-2xl font-bold mt-10'>
	// 			Property Not Found
	// 		</h1>
	// 	)
	// }
	return (
		<>
			<div className='md:w-2/4 mx-10 mt-10 border'>
				<div className='md:1/4 mx-20 mt-10'>
					<div className='mb-4'>
						<Image
							className='h-32 w-32 md:h-48 md:w-58 rounded-full mx-auto md:mx-0'
							src={sessionUser.user.image}
							alt='User'
							width={200}
							height={200}
						/>
					</div>
				</div>
				<h2 className='text-2xl mb-4'>
					<span className='font-bold block'>Name:</span> {sessionUser.user.name}
				</h2>
				<h2 className='text-2xl'>
					<span className='font-bold block'>Email:</span>{' '}
					{sessionUser.user.email}
				</h2>
			</div>
			<div className='md:w-3/4 md:pl-4'>
				<h2 className='text-xl font-semibold mb-4'>Your Listing</h2>
				{!properties || properties.length === 0 ? (
					<h1 className='text-center text-2xl font-bold mt-10'>
						No property Listing from this user
					</h1>
				) : (
					<ProfileProperties properties={properties} />
				)}
			</div>
		</>
	)
}

export default ProfilePage
