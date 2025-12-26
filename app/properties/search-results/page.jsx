/** @format */

import connectDB from '@/database'
import Property from '@/models/propertyModel'
import { convertToSerializableObject } from '@/utils/convertToObject'
import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'
import PropertySearchForm from '@/components/PropertySearchForm'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

const SearchResultPage = async ({ searchParams }) => {
	await connectDB()
	const sp = await searchParams

	const rawLocation = Array.isArray(sp?.location)
		? sp.location.join(' ')
		: sp.location ?? ''
	const rawType = Array.isArray(sp?.propertyType)
		? sp.propertyType[0]
		: sp?.propertyType ?? 'All'

	const location = String(rawLocation).trim()
	const propertyType = String(rawType).trim() || 'All'

	// helper to escape user input for use in RegExp
	const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

	// if no filters provided, show form  "No search results"
	const hasFilters =
		Boolean(location) || (propertyType && propertyType !== 'All')
	if (!hasFilters) {
		return (
			<>
				<section className='bg-blue-700 py-4'>
					<div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
						<PropertySearchForm />
					</div>
				</section>
				<section className='px-4 py-6'>
					<div className='container-xl lg:container m-auto px-4 py-6'>
						<Link
							href='/properties'
							className='flex items-center text-blue-500 hover:underline mb-2'
						>
							<FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
						</Link>
						<h1 className='text-2xl mb-4'>Search Results</h1>
						<p>No search results</p>
					</div>
				</section>
			</>
		)
	}
	const query = {}
	if (location) {
		const escaped = escapeRegExp(location)
		query.$or = [
			{ name: { $regex: escaped, $options: 'i' } },
			{ description: { $regex: escaped, $options: 'i' } },
			{ 'location.street': { $regex: escaped, $options: 'i' } },
			{ 'location.city': { $regex: escaped, $options: 'i' } },
			{ 'location.state': { $regex: escaped, $options: 'i' } },
			{ 'location.zipCode': { $regex: escaped, $options: 'i' } },
		]
	}
	if (propertyType && propertyType !== 'All') {
		const escapedType = escapeRegExp(propertyType)
		query.type = { $regex: escapedType, $options: 'i' }
	}

	const propertiesQueryResults = await Property.find(query).lean()
	const properties = convertToSerializableObject(propertiesQueryResults)
	
	return (
		<>
			<section className='bg-blue-700 py-4'>
				<div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
					<PropertySearchForm />
				</div>
			</section>
			<section className='px-4 py-6'>
				<div className='container-xl lg:container m-auto px-4 py-6'>
					<Link
						href='/properties'
						className='flex items-center text-blue-500 hover:underline mb-2'
					>
						<FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
					</Link>
					<h1 className='text-2xl mb-4'>Search Results</h1>
					{properties.length === 0 ? (
						<p>No search results</p>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{properties.map((property) => (
								<PropertyCard key={property._id} property={property} />
							))}
						</div>
					)}
				</div>
			</section>
		</>
	)
}

export default SearchResultPage
