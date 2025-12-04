import postModel from '../models/postModel.js';

// Create a new post using request body data
export const createPost = async (req, res) => {
	const data = req.body;
	if (!data) {
		// Client did not send required data
		console.error('Missing request body');
		res.status(400).json({
			success: false,
			message: 'Missing request body',
		});
	}

	try {
		// Insert post into database
		const newPost = await postModel.create(data);
		res.status(201).json({
			success: true,
			data: newPost,
		});
	} catch (error) {
		// Handle errors
		console.error(`Failed to create new post: ${error.message}`);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Retrieve all posts sorted by newest first
export const getPosts = async (req, res) => {
	try {
		const posts = await postModel.find().sort({ createdAt: -1 });
		res.status(200).json({
			success: true,
			data: posts,
		});
	} catch (error) {
		// Handle errors
		console.error(`Failed to fetch all posts: ${error.message}`);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Retrieve a single post by ID
export const getPostById = async (req, res) => {
	try {
		const post = await postModel.findById(req.params.id);
		if (!post) {
			// No matching document found
			console.error('Post not found');
			res.status(404).json({
				success: false,
				message: 'Post not found',
			});
		}

		res.status(200).json({
			success: true,
			data: post,
		});
	} catch (error) {
		// Handle errors
		console.error(`Failed to fetch post: ${error}`);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Update an existing post by ID
export const updatePost = async (req, res) => {
	const id = req.params.id;
	if (!id) {
		// Route parameter missing
		console.error('Missing id in url');
		res.status(400).json({
			success: false,
			message: 'Missing id in url',
		});
	}

	const data = req.body;
	if (!data) {
		// Client did not send required data
		console.error('Missing request body');
		res.status(400).json({
			success: false,
			message: 'Missing request body',
		});
	}

	try {
		const updatedPost = await postModel.findByIdAndUpdate(req.params.id, data, {
			new: true, // Return updated document
			runValidators: true, // Enforce schema validation
		});

		if (!updatedPost) {
			// No document to update
			console.error('Post To be updated not found');
			res.status(404).json({
				success: false,
				message: error.message,
			});
		}

		res.status(200).json({
			success: true,
			data: updatedPost,
		});
	} catch (error) {
		// Handle errors
		console.error(`Failed to update post: ${error}`);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Delete a post by ID
export const deletePost = async (req, res) => {
	const id = req.params.id;
	if (!id) {
		// Required parameter missing
		console.error('Missing id in url');
		res.status(400).json({
			success: false,
			message: 'Missing id in url',
		});
	}

	try {
		const deletedPost = await postModel.findByIdAndDelete(id);
		if (!deletedPost) {
			// No document found to delete
			console.error('To be deleted post not found');
			res.status(404).json({
				success: false,
				message: error.message,
			});
		}

		res.status(200).json({
			success: true,
			data: deletedPost,
		});
	} catch (error) {
		// Handle errors
		console.error(`Failed to delete post: ${error}`);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Search posts using text index with a provided term
export const filterPosts = async (req, res) => {
	const searchTerm = req.query.term;
	if (!searchTerm) {
		// No search string provided
		console.error('Missing search term in query');
		res.status(400).json({
			success: false,
			message: 'Missing search term in query',
		});
	}

	try {
		// MongoDB full-text search query
		const filteredPosts = await postModel.find({
			$text: { $search: searchTerm },
		});

		res.status(200).json({
			success: true,
			data: filteredPosts,
		});
	} catch (error) {
		// Handle errors
		console.error(`Failed to find post by search: ${error.message}`);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
