/** @format */

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalProvider } from '@/context/GlobalContext'
import "photoswipe/dist/photoswipe.css";

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata = {
	title: 'PropertyApp|Find your dream property',
	description: 'Find your dream rental property',
	keywords: 'rental, find property, rent an apartment',
}

export default function RootLayout({ children }) {
	return (
		<AuthProvider>
			<GlobalProvider>
				<html lang='en'>
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased`}
					>
						<Navbar />
						<main>{children}</main>
						<Footer />
						<ToastContainer
							position='top-left'
							autoClose={3000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
					</body>
				</html>
			</GlobalProvider>
		</AuthProvider>
	)
}
