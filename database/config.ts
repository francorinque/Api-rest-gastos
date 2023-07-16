import mongoose, { ConnectOptions } from 'mongoose'

export const connectDB = async (): Promise<void> => {
	try {
		const URI = process.env.MONGO_URI
		if (!URI) throw new Error('MONGO_URI not found')
		await mongoose.connect(
			URI as string,
			{ useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
		)
		console.log('MongoDB connected')
	} catch (error) {
		if (error) throw new Error('Connect mongo is failed')
	}
}
