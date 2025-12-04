const container = document.getElementById('container');
const cardContainer = document.getElementById('card-container');
const form = document.getElementById('form');

// Extract form data and send post request
form.addEventListener('submit', async (event) => {
	event.preventDefault();

	// Extract form data
	const formData = new FormData(form);
	const payload = {
		title: formData.get('title'),
		category: formData.get('category'),
		tags: formData
			.get('tags')
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag !== ''),
		content: formData.get('content'),
	};

	try {
		// Send POST request to API
		const response = await axios.post('/api/post', payload);
		const result = response.data;

		// Alert user to unsuccessful response
		if (!result.success) {
			console.error(`Failed to create post\n${message}`);
			alert('Failed to create post');
		}

		// Alert user to success
		alert('Successfully created new post!');

		// Reroute to home view
		window.location.href = '/';
	} catch (error) {
		// Handle error
		console.error(`Failed to upload post\n${error}`);
		alert('Failed to upload post');
	}
});
