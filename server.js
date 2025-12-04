import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import { initDb } from './src/services/dbClient.js';
import apiRouter from './src/routers/apiRouter.js';
import viewRouter from './src/routers/viewRouter.js';

// Resolve the current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, 'public');

// Port for server
const port = process.env.PORT || 5000;

// Initialize database
try {
	await initDb();
	console.log('MongoDB connected successfully');
} catch (error) {
	// Exit process on failed connection
	console.error(error.message);
	process.exit(1);
}

// initialize express client
const app = express();

// Parse json responses
app.use(express.json());

// Serve static files
app.use(express.static(publicDir));

// Handle automatic browser favicon request
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Serve api routes
app.use('/api', apiRouter);

// Serve html pages
app.use('/', viewRouter);

// Unhandled routes
app.use((req, res) => {
	console.error(`Unhandled route: ${req.path}`);
	res.status(400).json({
		success: false,
		message: 'Route not found',
	});
});

// Initialize server on port
const server = app.listen(port, () => {
	console.log(`Express server running on port:${port}`);
});

// Shutting down server & database
process.on('SIGINT', async () => {
	console.log('Shutting down server...');
	try {
		await new Promise((resolve) => server.close(resolve));
		console.log('Express server closed successfully');
	} catch (error) {
		console.error(`Error closing server: ${error.message}`);
	}

	try {
		// Close mongoose client
		await mongoose.disconnect();
		console.log('MongoDB client closed successfully');
	} catch (error) {
		console.error(`Error disconnecting database: ${error.message}`);
	}

	// Exit process with success
	process.exit(0);
});
