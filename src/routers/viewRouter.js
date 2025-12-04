import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsDir = path.join(__dirname, '../../public/views');

// Initialize Express router instance
const router = Router();

// Serve index.html
router.get('/', (req, res, next) => {
	res.sendFile(path.join(viewsDir, 'index.html'), (error) => {
		if (error) return next();
	});
});

// Serve post.html
router.get('/post/:id', (req, res, next) => {
	res.sendFile(path.join(viewsDir, 'post.html'), (error) => {
		if (error) return next();
	});
});

// Serve edit.html
router.get('/edit/:id', (req, res, next) => {
	res.sendFile(path.join(viewsDir, 'edit.html'), (error) => {
		if (error) return next();
	});
});

// Serve all other html
router.use((req, res, next) => {
	if (req.method !== 'GET' || req.path.startsWith('/api') || path.extname(req.path)) return next();

	res.sendFile(path.join(viewsDir, `${req.path}.html`), (error) => {
		if (error) return next();
	});
});

// Export router
export default router;
