/** @format */

'use client'

import { useState , useEffect} from 'react'
import { useRouter } from 'next/navigation'

const PropertySearchForm = ({
	initialLocation = '',
	initialType = "All"
}) => {
	const [location, setLocation] = useState('')
	const [propertyType, setPropertyType] = useState('All')

	const router = useRouter()
	useEffect(() => {
		setLocation(initialLocation ?? '')
		setPropertyType(initialType ?? 'All')
	}, [initialLocation, initialType])

	const handleSubmit = (e) => {
		e.preventDefault()

		
		const loc = location.trim()
		const isNoLocation = loc === ''
		const isNoType = propertyType === '' || propertyType === 'All'

		if (isNoLocation && isNoType) {
			router.push('/properties')
			return
		}

		const params = []
		if (!isNoLocation) params.push(`location=${encodeURIComponent(loc)}`)
		if (!isNoType)
			params.push(`propertyType=${encodeURIComponent(propertyType)}`)
		const query = params.length ? `?${params.join('&')}` : ''
		router.push(`/properties/search-results${query}`)
	}
	return (
		<form
			className='mt-3 mx-auto gap-4 max-w-2xl w-full flex flex-col md:flex-row items-center'
			onSubmit={handleSubmit}
		>
			<div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
				<label htmlFor='location' className='sr-only'>
					Location
				</label>
				<input
					type='text'
					id='location'
					placeholder='Enter Location (City, State, Zipcode, e.t.c)'
					className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				/>
			</div>
			<div className='w-full md:w-2/5 md:pr-2 mb-4 md:mb-0'>
				<label htmlFor='property-type' className='sr-only'>
					Property Type
				</label>
				<select
					id='property-type'
					className='w-full px-4 h-12 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
					value={propertyType}
					onChange={(e) => setPropertyType(e.target.value)}
				>
					<option value='All'>All Types</option>
					<option value='Apartment'>Apartment</option>
					<option value='House'>House</option>
					<option value='Condo'>Condo</option>
					<option value='Room'>Room</option>
					<option value='Studio'>Studio</option>
					<option value='Others'>Others</option>
				</select>
			</div>
			<button
				type='submit'
				className='md:ml-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white
                    hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
			>
				Search
			</button>
		</form>
	)
}

export default PropertySearchForm
