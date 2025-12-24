/** @format */

import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'
// import properties from '@/property.json'
import connectDB from '@/database'
import Property from '@/models/propertyModel'
import Pagination from '@/components/Pagination'

const PropertiesPage = async ({ searchParams }) => {
	await connectDB()

	// Await searchParams to unwrap the Promise
	const { page = 1, pageSize = 2 } = await searchParams

	const skip = (page - 1) * pageSize
	const total = await Property.countDocuments({})

	const showPagination = total > pageSize

	//fetching properties from database
	const properties = await Property.find({}).skip(skip).limit(pageSize).lean()
	const serializableProperties = properties.map((prop) =>
		JSON.parse(JSON.stringify(prop))
	)

	return (
		<div>
			{/* {Search} */}
			<section className='bg-blue-700 py-4'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
					{/* form container */}
					<form className='mt-3 mx-auto max-2xl w-full flex flex-col md:flex-row items-center'>
						<div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
							<label htmlFor='location' className='sr-only'>
								Location
							</label>
							<input
								type='text'
								id='location'
								placeholder='Enter Location(City,State,Zip)'
								className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
							/>
						</div>
						<div className='w-full md:w-2/5 md:pl-2'>
							<label htmlFor='property-type' className='sr-only'>
								Property Type
							</label>
							<select
								id='property-type'
								className='w-full px-4 py-6 h-12 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring
                            focus:ring-blue-500'
							>
								<option value='All'>All</option>
								<option value='studio'>Studio</option>
								<option value='Condo'>Condo</option>
								<option value='House'>House</option>
								<option value='Cabin or cottage'>Cabin or Cottage</option>
								<option value='Loft'>Loft</option>
								<option value='Room'>Room</option>
								<option value='Other'>Other</option>
							</select>
						</div>
						<button
							type='submit'
							className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg text-white hover:bg-blue-600 focus:ring
                        focus:ring-blue-500, focus:outline-none bg-blue-500'
						>
							Search
						</button>
					</form>
				</div>
			</section>

			{/* All Listing */}
			<section className='px-4 py-6'>
				<div className='container-xl lg:container m-auto px-4 py-6'>
					{properties.length === 0 ? (
						<p>No Properties found</p>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{serializableProperties.map((property) => (
								<PropertyCard key={property._id} property={property} />
							))}
						</div>
					)}

					{showPagination && (
						<Pagination
							page={parseInt(page)}
							pageSize={parseInt(pageSize)}
							totalItems={total}
						/>
					)}
				</div>
			</section>

			{/* Pagination */}
			{/* <section className='container. mx-auto flex justify-center items-center my-8'>
				<button className='mr-2 px-2 py-1 border border-gray-300 rounded'>
					Previous
				</button>
				<span className='mx-2'>Page 1 of 10</span>
				<button className='ml-2 px-2 py-1 border border-gray-300 rounded'>
					Next
				</button>
			</section> */}
		</div>
	)
}

export default PropertiesPage
