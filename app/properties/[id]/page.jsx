/** @format */

import Link from 'next/link'
import connectDB from '@/database'
import Property from '@/models/propertyModel'
import PropertyHeaderImage from '@/components/PropertyHeaderImage'
import { FaArrowLeft } from 'react-icons/fa'
import PropertyDetails from '@/components/PropertyDetails'
import PropertyImage from '@/components/PropertyImage'
import BookmarkButton from '@/components/BookmarkButton'
import ShareButton from '@/components/ShareButton'
import PropertyContactForm from '@/components/PropertyContactForm'

const propertyPage = async ({ params }) => {
	const { id } = await params

	await connectDB()
	const propertyDoc = await Property.findById(id).lean()
	const property = JSON.parse(JSON.stringify(propertyDoc))

	return (
		<>
			<PropertyHeaderImage image={property.images[0]} />
			<section>
				<div className='container m-auto py-6 px-6'>
					<Link
						href='/properties'
						className='text-blue-500 hover:text-blue-600 flex items-center'
					>
						<FaArrowLeft className='mr-2' /> Back to Properties
					</Link>
				</div>
			</section>
			<section className='bg-blue-50'>
				<div className='container m-auto py-10 px-6'>
					<div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
						{/* //Property Details Left Side */}
						<PropertyDetails property={property} />
					</div>
				</div>
			</section>
			<PropertyImage images={property.images} />
			<aside className='space-y-4'>
				<BookmarkButton property={property} />
				<ShareButton property={property} />
				<PropertyContactForm property={property} />
			</aside>
		</>
	)
}

export default propertyPage
