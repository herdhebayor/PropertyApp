/** @format */

import React from 'react'
import Property from '@/models/propertyModel'

const propertyHeaderImage = ({ image }) => {
	const getImageSrc = () => {
		// If image is a full URL (starts with http or https), use it directly
		if (image.startsWith('http://') || image.startsWith('https://')) {
			return image
		}
		// Otherwise, assume it's a local filename and prepend the path
		return `/images/properties/${image}`
	}
	return (
		<img
			src={getImageSrc()}
			alt=''
			className='object-cover h-[400px] w-full'
			width={0}
			height={0}
			sizes='100vw'
		/>
	)
}

export default propertyHeaderImage
