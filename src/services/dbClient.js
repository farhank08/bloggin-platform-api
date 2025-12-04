import mongoose from 'mongoose';

// Initialize MongoDB connection
export const initDb = async () => {
	// Load environment variables
	const uri = process.env.MONGODB_URI;

	// Connect to MongoDB cluster
	const client = await mongoose.connect(uri);

	// Log successful connection
	client.connection.on('connected', () => {
		console.log('MongoDB connected successfully');
	});

	// Throw failed connection error
	client.connection.on('error', (error) => {
		throw new Error(`Failed to connect to MongoDB: ${error}`);
	});
};
