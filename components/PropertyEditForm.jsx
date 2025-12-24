/** @format */

import React from 'react'
import updateProperty from '@/app/action/updateProperty'

function PropertyEditForm({ property }) {
const updatePropertyById = updateProperty.bind(null,property._id)

	return (
		<form action={updatePropertyById}>
			<h2 className='text-3xl text-center font-semibold mb-6'>
				Add New Property
			</h2>
			<div className='mb-4'>
				<label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
					Property Type
					
				</label>
				<select
					id='type'
					className='w-full px-4 py-3 h-12 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
					defaultValue={property.type}
				>
					<option value='Apartment'>Apartment</option>
					<option value='House'>House</option>
					<option value='Condo'>Condo</option>
					<option value='Room'>Room</option>
					<option value='Studio'>Studio</option>
					<option value='Others'>Others</option>
				</select>
			</div>
			<div className='mb-4'>
				<label htmlFor='' className='block text-gray-700 mb-2 font-bold'>
					Listing Name
				</label>
				<input
					type='text'
					id='name'
					placeholder='eg, Beautiful Apartment in Miami'
					className='border rounded w-full py-2 px-3 mb-2'
					defaultValue={property.name}
					required
				/>
			</div>
			<div className='mb-4'>
				<label htmlFor='description'>Description</label>
				<textarea
					id='description'
					className='border rounded w-full py-2 px-3'
					rows={4}
					placeholder='Add an optional description about the property'
					required
				></textarea>
			</div>
			<div className='mb-4 bg-blue-50 p-4'>
				<label htmlFor='' className='block text-gray-700 font-bold mb-2'>
					Location
				</label>
				<input
					type='text'
					id='street'
					name='location.street'
					className='rounded border w-ful py-2 px-3 mb-2'
					placeholder='Street'
				/>
				<input
					type='text'
					id='city'
					name='location.city'
					className='rounded border w-ful py-2 px-3 mb-2'
					placeholder='City'
				/>
				<input
					type='text'
					id='state'
					name='location.state'
					className='rounded border w-ful py-2 px-3 mb-2'
					placeholder='State'
				/>
				<input
					type='text'
					id='zipcode'
					name='location.zipcode'
					className='rounded border w-ful py-2 px-3 mb-2'
					placeholder='Zipcode'
				/>
			</div>
			<div className='w-full sm-w-1/3 px-2'>
				<label htmlFor='bath' className='block text-gray-700 font-bold mb-2'>
					Baths
				</label>
				<input
					type='number'
					id='bath'
					className='border rounded w-full py-2 px-3'
					required
				/>
			</div>
			<div className='w-full sm-w-1/3 px-2'>
				<label
					htmlFor='square_feet'
					className='block text-gray-700 font-bold mb-2'
				>
					Square Feet
				</label>
				<input
					type='number'
					id='square_feet'
					className='border rounded w-full py-2 px-3'
					required
				/>
			</div>
			<div className='w-full sm-w-1/3 px-2'>
				<label htmlFor='' className='block text-gray-700 font-bold mb-2'>
					Amenities
				</label>
				<div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
					<div>
						<input
							type='checkbox'
							id='amenity_wifi'
							name='amenities'
							value='WiFi'
							className='mr-2'
							defaultChecked={property.amenities.includes('WiFi')}
						/>
						<label htmlFor='amenity_wifi'>WiFi</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_washer_dryer'
							name='amenities'
							value='Washer & Dryer'
							className='mr-2'
							defaultChecked={property.amenities.includes('Washer & Dryer')}
						/>
						<label htmlFor='amenity_washer_dryer'>Washer & Dryer</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_kitchen'
							name='amenities'
							value='Full Kitchen'
							defaultChecked={property.amenities.includes('Full Kitchen')}
							className='mr-2'
						/>
						<label htmlFor='amenity_kitchen'>Full Kitchen</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_free_parking'
							name='amenities'
							value='Free Parking'
							defaultChecked={property.amenities.includes('Free Parking')}
							className='mr-2'
						/>
						<label htmlFor='amenity_free_parking'>Free Parking</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_pool'
							name='amenities'
							value='Swimming Pool'
							defaultChecked={property.amenities.includes('Swimming Pool')}
							className='mr-2'
						/>
						<label htmlFor='amenity_pool'>Swimming Pool</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_hot_tub'
							name='amenities'
							value='Hot Tub'
							defaultChecked={property.amenities.includes('Hot Tub')}
							className='mr-2'
						/>
						<label htmlFor='amenity_hot_tub'>Hot Tub</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_24_7_security'
							name='amenities'
							value='24/7 Security'
							defaultChecked={property.amenities.includes('24/7 Security')}
							className='mr-2'
						/>
						<label htmlFor='amenity_24_7_security'>24/7 Security</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_wheelchair_accessible'
							name='amenities'
							value='wheelchair Accessible'
							defaultChecked={property.amenities.includes(
								'wheelchair Accessible'
							)}
							className='mr-2'
						/>
						<label htmlFor='amenity_wheelchair_accessible'>
							Wheelchair Accessible
						</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_elevator_access'
							name='amenities'
							value='Elevator Access'
							defaultChecked={property.amenities.includes('Elevator Access')}
							className='mr-2'
						/>
						<label htmlFor='amenity_elevator_access'>Elevator Access</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_dishwasher'
							name='amenities'
							value='Dishwasher'
							defaultChecked={property.amenities.includes('Dishwasher')}
							className='mr-2'
						/>
						<label htmlFor='amenity_dishwasher'>Dishwasher</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_gym_fitness_center'
							name='amenities'
							value='Gym/Fitness Center'
							defaultChecked={property.amenities.includes('Gym/Fitness Center')}
							className='mr-2'
						/>
						<label htmlFor='amenity_gym_fitness_center'>
							Gym/Fitness Center
						</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_air_conditioning'
							name='amenities'
							value='Air Conditioning'
							defaultChecked={property.amenities.includes('Air Conditioning')}
							className='mr-2'
						/>
						<label htmlFor='amenity_air_conditioning'>Air Conditioning</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_balcony_patio'
							name='amenities'
							value='Balcony/Patio'
							defaultChecked={property.amenities.includes('Balcony/Patio')}
							className='mr-2'
						/>
						<label htmlFor='amenity_balcony_patio'>Balcony/Patio</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_smart_tv'
							name='amenities'
							value='Smart TV'
							defaultChecked={property.amenities.includes('Smart TV')}
							className='mr-2'
						/>
						<label htmlFor='amenity_smart_tv'>Smart TV</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='amenity_coffee_maker'
							name='amenities'
							value='Coffee Maker'
							defaultChecked={property.amenities.includes('Coffee Maker')}
							className='mr-2'
						/>
						<label htmlFor='amenity_coffee_maker'>Coffee Maker</label>
					</div>
				</div>
			</div>
			<div className='mb-4 bg-blue-50 p-4'>
				<label className='block text-gray-700 font-bold mb-2'>
					Rates (Leave blank if not applicable)
				</label>
				<div className='flex flx-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
					<div className='flex items-center'>
						<label htmlFor='weekly_rate' className='mr-2'>
							Weekly
						</label>
						<input
							type='number'
							id='weekly_rate'
							name='rates.weekly'
							defaultValue={property.rates.weekly}
							className='border rounded w-full py-2 px-3'
						/>
					</div>
					<div className='flex items-center'>
						<label htmlFor='monthly_rate' className='mr-2'>
							Monthly
						</label>
						<input
							type='number'
							id='monthly_rate'
							name='rates.monthly'
							defaultValue={property.rates.monthly}
							className='border rounded w-full py-2 px-3'
						/>
					</div>
					<div className='flex items-center'>
						<label htmlFor='nightly_rate' className='mr-2'>
							Nightly
						</label>
						<input
							type='number'
							id='nightly_rate'
							name='rates.nightly'
							defaultValue={property.rates.nightly}
							className='border rounded w-full py-2 px-3'
						/>
					</div>
				</div>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='seller_name'
					className='block text-gray-700 font-bold mb-2'
				>
					Seller Name
				</label>
				<input
					type='text'
					id='seller_name'
					name='seller_info.name'
					className='border rounded w-full py-2 px-3'
					defaultValue={property.seller_info.name}
					placeholder='Name'
					required
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='seller_email'
					className='block text-gray-700 font-bold mb-2'
				>
					Seller Email
				</label>
				<input
					type='email'
					id='seller_email'
					name='seller_info.email'
					className='border rounded w-full py-2 px-3'
					defaultValue={property.seller_info.email}
					placeholder='Email address'
					required
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='seller_phone'
					className='block text-gray-700 font-bold mb-2'
				>
					Seller Phone
				</label>
				<input
					type='tel'
					id='seller_phone'
					name='seller_info.phone'
					className='border rounded w-full py-2 px-3'
					placeholder='+234 800 123 4567'
					defaultValue={property.seller_info.phone}
					required
				/>
			</div>
			<div>
				<button
					className='bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-ful focus:outline-none focus:shadow-outline'
					type='submit'
				>
					Update Property
				</button>
			</div>
		</form>
	)
}

export default PropertyEditForm
