/** @format */
'use client'
//Problems of photoswipe with nextjs server components{error: TypeError:(0,react.createContext)).is not a function}
//this is error is because react-photoswipe-gallery uses react context api which is not supported in nextjs server components, and because
//nextjs components are server component by default. to solve this issue, either you wrap your component
//with the "use client" at the top, or you dynamically import Gallery and items with SSR diasble by importimg like this
//import dynamic from"next/dynamic
//const Gallery = dynamic(()=> import('react-photoswipe-gallery).then(mod=> mod.Gallery),{ssr:false})
//const Item = dynamic(()=> import('react-photoswipe-gallery).then(mod=> mod.Item),{ssr:false}) or use downgrade your react

import dynamic from 'next/dynamic'

import React from 'react'
//import { Gallery,Item } from 'react-photoswipe-gallery'
import Image from 'next/image'

const Gallery = dynamic(
	() => import('react-photoswipe-gallery').then((mod) => mod.Gallery),
	{ ssr: false }
)
const Item = dynamic(
	() => import('react-photoswipe-gallery').then((mod) => mod.Item),
	{ ssr: false }
)

function PropertyImage({ images }) {
	const getImageSrc = (image) => {
		// If image is a full URL (starts with http or https), use it directly
		if (image.startsWith('http://') || image.startsWith('https://')) {
			return image
		}
		// Otherwise, assume it's a local filename and prepend the path
		return `/images/properties/${image}`
	}

	return (
		<Gallery>
			<section className='bg-blue-50 p-4'>
				{images.length === 1 ? (
					<Item
						original={images[0]}
						thumbnail={images[0]}
						width={1000}
						height={600}
					>
						{({ ref, open }) => (
							<Image
								ref={ref}
								onClick={open}
								src={getImageSrc(images[0])}
								alt='Property Image'
								className='mx-auto rounded-xl h-[400px] object-cover cursor-pointer'
								width={1800}
								height={400}
								priority='true'
							/>
						)}
					</Item>
				) : (
					<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
						{images.map((image, index) => (
							<div
								key={index}
								className={`${
									images.length === 3 && index === 2
										? 'col-span-2'
										: 'col-span-1'
								}`}
							>
								<Item
									original={image}
									thumbnail={image}
									width={1000}
									height={600}
								>
									{({ ref, open }) => (
										<Image
											ref={ref}
											onClick={open}
											src={getImageSrc(image)}
											alt={`Property Image ${index + 1}`}
											className='w-full h-48  object-cover rounded-xl cursor-pointer'
											width={1800}
											height={400}
											priority={true}
										/>
									)}
								</Item>
							</div>
						))}
					</div>
				)}
			</section>
		</Gallery>
	)
}

export default PropertyImage
