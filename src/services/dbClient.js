import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASS;

// Assign database
const database = 'Blogging-Platform';

// Initialize MongoDB connection
export const initDb = async () => {
	// Build connection URI
	const uri = `mongodb+srv://${user}:${pass}@portfolio.h1dszr0.mongodb.net/${database}?appName=Portfolio`;

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
