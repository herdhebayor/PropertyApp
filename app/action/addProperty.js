'use server'

/** @format */
import cloudinary from '@/config/cloudinaryConfig'



//the 'use server' is used to identifier i component of server action.
//Server action are functions that allows us to run server side functions in our Nextjs app

import connectDB from '@/database'
import Property from '@/models/propertyModel'
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function addProperty(formData) {
	await connectDB()

	const sessionUser = await getSessionUser()

	if (!sessionUser || sessionUser.id) {
		throw new Error('User Id is required')
	}
	const { userId } = sessionUser
	//to get form details formData.get(form name i.e 'name')
	//to get grouped data formData.getAll(form group name) in our case formData.getAll('amenities)

	//Access all values from amenities and images
	const amenities = formData.getAll('amenities')
	const images = formData.getAll('images').filter((image) => image.size > 0) 

	const propertyData = {
		owner: userId,
		type: formData.get('type'),
		name: formData.get('name'),
		description: formData.get('description'),
		location: {
			street: formData.get('location.street'),
			city: formData.get('location.city'),
			state: formData.get('location.state'),
			zipcode: formData.get('location.zipcode'),
		},
		beds: formData.get('beds'),
		baths: formData.get('baths'),
		square_feet: formData.get('square_feet'),
		amenities,
		rates: {
			nightly: formData.get('rates.nightly'),
			weekly: formData.get('rates.weekly'),
			monthly: formData.get('rates.monthly'),
		},
		seller_info: {
			name: formData.get('seller_info.name'),
			email: formData.get('seller_info.email'),
			phone: formData.get('seller_info.phone'),
		},
		images,
	}
	const imgUrls = []
	for (const imageFile of images) {
		const imgBuffer = await imageFile.arrayBuffer()
		const imageArray = Array.from(new Uint8Array(imgBuffer))
		const imagedata = Buffer.from(imageArray)

        //converting image to base64 format
		const imageBase64 = imagedata.toString('base64')

        //Make request to cloudinary to upload image
		const result = await cloudinary.uploader.upload(
			`data:${imageFile.type};base64,${imageBase64}`,
			{
				folder: 'propertyApp2025',
			}
		)
		imgUrls.push(result.secure_url)
	}
	console.log(propertyData)
    propertyData.images = imgUrls
	const newProperty = new Property(propertyData)
	await newProperty.save()

	revalidatePath('/', 'layout') //when the data in the sever change , it is necessary to revalidate. revalidating will
	// will tell Nextjs that the cached is outdated so it will do a refetching so as to get the updated data from database

	redirect(`/properties/${newProperty._id}`)
}

export default addProperty
