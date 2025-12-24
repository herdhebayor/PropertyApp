/** @format */
'use client'

import { FaBookmark } from 'react-icons/fa'
import { toast } from 'react-toastify'
import bookmarkProperty from '@/app/action/bookmarkProperty'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import checkBookmarkStatus from '@/app/action/checkBookmarkStatus'

const BookmarkButton = ({ property }) => {
	const { data: session } = useSession()
	const userId = session?.user?.id

	const [isBookmarked, setIsBookmarked] = useState(false)
	const [loading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!userId) {
			setIsLoading(false)
			return
		}
		const fetchStatus = async () => {
			try {
				const res = await checkBookmarkStatus(property._id) 
				if (res.error) toast.error(res.error)
				else setIsBookmarked(res.isBookmarked)
			} catch (error) {
				toast.error('Failed to check bookmark status')
			} finally {
				setIsLoading(false)
			}
		}
		fetchStatus()
	}, [property._id, userId]) 

	const handleClick = async () => {
		if (!userId) {
			toast.error('You need to be signed in to bookmark a listing')
			return
		}

		try {
			const res = await bookmarkProperty(property._id) 
			if (res.error) toast.error(res.error)
			else {
				setIsBookmarked(res.isBookmarked)
				toast.success(res.message)
			}
		} catch (error) {
			toast.error('Failed to bookmark property')
		}
	}

	if (loading) {
		return <p className='text-center'>Loading...</p>
	}

	return isBookmarked ? (
		<button
			onClick={handleClick}
			className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
		>
			<FaBookmark className='mr-2' /> Remove Bookmark
		</button>
	) : (
		<button
			onClick={handleClick}
			className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
		>
			<FaBookmark className='mr-2' /> Bookmark Property
		</button>
	)
}

export default BookmarkButton
