/** @format */

import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/database'
import User from '@/models/userModel'

export const authOptions = {
	//Configure one or more authentication providers

	providers: [
		GoogleProvider({
			clientId:process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		// ...add more providers here
	],

	callbacks: {
		async signIn({ profile }) {
			try {
				// Connect to DB
				await connectDB()

				//Check if user already exists
				const userExists = await User.findOne({ email: profile.email })
				//If not, create a new user
				if (!userExists) {
					// Truncate name to create username
					const username = profile.name.slice(0, 20).replace(/\s+/g, '')
					await User.create({
						email: profile.email,
						username,
						image: profile.picture,
					})
				}
				return true
			} catch (error) {
				console.log('Error in signIn callback:', error)
				return false
			}
		},
		async session({ session }) {
			//Get user from database
			const user = await User.findOne({ email: session.user.email })
			//Add the user id to the session object
			session.user.id = user._id.toString()
			return session
		},
	},
}
