/** @format */

import React from 'react'
import PropertyCard from './PropertyCard'
//import properties from '@/property.json'
import Link from 'next/link'
import connectDB from '@/database'
import Property from '@/models/propertyModel'

const HomeProperties = async () => {
	// sorting because we only want three https://86dbb5bj-3000.uks1.devtunnels.ms/
	await connectDB()
	const propertiesDoc = await Property.find({}).lean()
	const properties = JSON.parse(JSON.stringify(propertiesDoc))

	const shuffledProperty = properties.sort(() => Math.random() - 0.5)
	const recentProperties = shuffledProperty.slice(0, 3)
	return (
		<>
			<section className='px-4 py-6'>
				<div className='container-xl lg:container m-auto'>
					<h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
						Recent Properties
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'></div>
				</div>
			</section>

			<section className='px-4 py-6'>
				<div className='container-xl lg:container m-auto px-4 py-6'>
					{recentProperties.length === 0 ? (
						<p>No properties found</p>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{recentProperties.map((property) => (
								<PropertyCard key={property._id} property={property} />
							))}
						</div>
					)}
				</div>
			</section>

			{/* Button to view all properties */}
			<section className='m-auto max-w-lg my-10 px-6'>
				<Link
					href='/properties'
					className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
				>
					View All Properties
				</Link>
			</section>
		</>
	)
}

export default HomeProperties
