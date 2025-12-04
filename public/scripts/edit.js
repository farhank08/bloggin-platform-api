// Extract id from url
const pathname = window.location.pathname;
const parts = pathname.split('/'); // ["", "edit", "123"]
const id = parts[2];

const form = document.getElementById('form');
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
		// Send PATCH request to API
		const response = await axios.patch(`/api/post/${id}`, payload);
		const result = response.data;

		// Alert user to unsuccessful response
		if (!result.success) {
			console.error(`Failed to update post\n${message}`);
			alert('Failed to update post');
		}

		// Alert user to success
		alert('Successfully updated post!');

		// Reroute to post view
		window.location.href = `/post/${id}`;
	} catch (error) {
		// Handle errors
		console.error(`Failed to upload post\n${error}`);
		alert('Failed to upload post');
	}
});

// Handle navigation buttons
const addNavHandlers = async () => {
	const deleteButton = document.getElementById('button-delete');
	deleteButton.addEventListener('click', async () => {
		// Ask for confirmation
		const confirmed = confirm('Are you sure you want to delete this post?');
		if (!confirmed) return;

		try {
			// Send DELETE request to API
			const response = await axios.delete(`/api/post/${id}`);
			const result = response.data;

			// Alert user to unsuccessful response
			if (!result.success) {
				console.error(`Delete post request failed\n${result.message}`);
				alert(`Delete post request failed`);
				return;
			}

			// Alert user to success
			alert('Successfully deleted post!');

			// Reroute to home view
			window.location.href = '/';
		} catch (error) {
			// Handle error
			console.error(error);
			alert(`Failed to delete post\n${error.message}`);
		}
	});
};

const loadPost = async () => {
	try {
		const response = await axios.get(`/api/post/${id}`);
		const result = response.data;

		if (!result.success) {
			console.error('Find post request failed');
			return;
		}

		const { data } = result;
		const { title, category, content, tags } = data;

		const titleInput = document.getElementById('form-title');
		titleInput.value = title;

		const categoryInput = document.getElementById('form-category');
		categoryInput.value = category;

		const tagsInput = document.getElementById('form-tags');
		tagsInput.value = tags.join(', ');

		const contentInput = document.getElementById('form-content');
		contentInput.value = content;
	} catch (error) {
		console.error(`Unable to retrieve data\n${error.message}`);
	}
};

loadPost();
addNavHandlers();
