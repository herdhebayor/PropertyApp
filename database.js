/** @format */

import mongoose from 'mongoose'
let connected = false

const connectDB = async () => {
	mongoose.set('strictQuery', true)

	//if database is already connected
	if (connected) {
		console.log('Already connected to database')
		return
	}

	//connecting to database
	try {
		await mongoose.connect(process.env.MONGO_URI)
		connected = true
		console.log('Connected to database')
	} catch (error) {
		console.log('Error connecting to database', error)
	}
}

export default connectDB
