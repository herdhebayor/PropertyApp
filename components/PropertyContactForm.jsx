/** @format */
'use client'

import React, { useEffect } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import addMessage from '@/app/action/addMessage'
import { useActionState } from 'react'


const PropertyContactForm = ({ property }) => {
	const [state, formAction] = useActionState(addMessage, {})
	const { data: session } = useSession()

	

	useEffect(() => {
		if (state.error) {
			toast.error(state.error)
		}
		if (state.submitted) {
			toast.success('Message sent successfully')
		}
	}, [state])

	// Handle success message case
	if (state.submitted) {
		return <p className='text-green-500 mb-4'>Your message has been sent</p>
	}

	// Handle case where user is not logged in
	if (!session) {
		return null
	}
	const recipient = property.owner

	return (
		<div className='bg-white p-6 rounded-lg shadow-md'>
			<h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
			<form action={formAction}>
				<input
					type='hidden'
					id='property'
					name='property'
					defaultValue={property._id}
				/>

				<input
					type='hidden'
					id='recipient'
					name='recipient'
					defaultValue={recipient}
				/>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='name'
					>
						Name:
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='name'
						name='name'
						type='text'
						placeholder='Enter your name'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='email'
					>
						Email:
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='email'
						type='email'
						name='email'
						placeholder='Enter your email'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='phone'
					>
						Phone:
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='phone'
						type='number'
						name='phone'
						placeholder='Enter your phone number'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='body'
					>
						Message:
					</label>
					<textarea
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='body'
						placeholder='Enter your message'
						name='body'
						required
					></textarea>
				</div>
				<div>
					<button
						className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
						type='submit'
					>
						<FaPaperPlane className='mr-2' /> Send Message
					</button>
				</div>
			</form>
		</div>
	)
}

export default PropertyContactForm

//Message validation failed: recipient: Cast to ObjectId failed for value "Cozy Downtown Loft" (type string) at path "recipient" because of "BSONError"
