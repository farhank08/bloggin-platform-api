import { Router } from 'express';
import * as PostController from '../controllers/postController.js';

// Initialize Express router instance
const router = Router();

// Fetch all posts
router.get('/post', PostController.getPosts);

// Create a new post
router.post('/post', PostController.createPost);

// Full-text search posts
router.get('/post/search', PostController.filterPosts);

// Fetch a single post by its ID
router.get('/post/:id', PostController.getPostById);

// Update an existing post by ID
router.patch('/post/:id', PostController.updatePost);

// Delete a post by ID
router.delete('/post/:id', PostController.deletePost);

// Export router
export default router;
