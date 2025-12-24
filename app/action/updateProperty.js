/** @format */

'use server'
import connectDB from '@/database'
import Property from '@/models/propertyModel'
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function updateProperty(formData, propertyId) {
	await connectDB()

	const sessionUser = await getSessionUser()
	if (!sessionUser) {
		throw new Error('User id is required')
	}

	const { userId } = sessionUser

	const existingProperty = await Property.findById(propertyId)
	if (!existingProperty) {
		throw new Error('Property not found')
	}

	//verify ownership
	if (existingProperty.owner.toString() !== userId) {
		throw new Error('You are not authorized to update this property')
	}

	const propertyData = {
		owner: userId,
		type: formData.get('type'),
		name: formData.get('name'),
		description: formData.get('description'),
		location: {
			street: formData.get('location.street'),
			city: formData.get('location.city'),
			state: formData.get('location.state'),
			zip: formData.get('location.zip'),
		},
		beds: formData.get('beds'),
		baths: formData.get('baths'),
		square_feet: formData.get('square_feet'),
		amenities: formData.getAll('amenities'),
		rates: {
			nightly: formData.get('rates.nightly'),
			weekly: formData.get('rates.weekly'),
			monthly: formData.get('rates.monthly'),
		},
		seller_info: {
			name: formData.get('seller_info.name'),
			email: formData.get('seller_info.email'),
			contact: formData.get('seller_info.phone'),
		},
	}

    const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        propertyData,
        { new: true }
    )
    revalidatePath('/', 'layout')
    redirect(`/properties/${updatedProperty._id}`)
}


export default updateProperty