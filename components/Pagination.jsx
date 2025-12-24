/** @format */
'use client'

import { useRouter } from 'next/navigation'

const Pagination = ({ page, pageSize, totalItems }) => {
	const router = useRouter()
	const totalPages = Math.ceil(totalItems / pageSize)

	if (totalPages <= 1) return null

	const handlePrevious = () => {
		router.push(`/properties?page=${page - 1}&pageSize=${pageSize}`)
	}

	const handleNext = () => {
		router.push(`/properties?page=${page + 1}&pageSize=${pageSize}`)
	}

	return (
		<section className='container mx-auto flex justify-center items-center my-8'>
			{page > 1 ? (
				<button
					onClick={handlePrevious}
					className='mr-2 px-2 py-2 border border-gray-300 rounded hover:bg-gray-100'
				>
					Previous
				</button>
			) : null}
			<span className='mx-2'>
				Page {page} of {totalPages}
			</span>
			{page < totalPages ? (
				<button
					onClick={handleNext}
					className='ml-2 py-1 px-2 border border-gray-300 rounded hover:bg-gray-100'
				>
					Next
				</button>
			) : null}
		</section>
	)
}

export default Pagination
