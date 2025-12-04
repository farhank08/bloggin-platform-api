// Extract id from url
const pathname = window.location.pathname;
const parts = pathname.split('/'); // ["", "post", "123"]
const id = parts[2];

// Handle navigation buttons
const addNavHandlers = async () => {
	const editButton = document.getElementById('button-edit');
	const deleteButton = document.getElementById('button-delete');

	editButton.addEventListener('click', () => {
		// Route to edit view
		window.location.href = `/edit/${id}`;
	});

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

// Fetch and display post by id
const loadPost = async () => {
	try {
		// Send GET request to API
		const response = await axios.get(`/api/post/${id}`);
		const result = response.data;

		if (!result.success) {
			console.error(`Find post request failed\n${result.message}`);
			return;
		}

		const { data } = result;
		const { title, createdAt, category, content, tags } = data;

		/* Card list */
		const cardContainer = document.getElementById('card-container');

		/* Card */
		const card = document.createElement('div');
		card.classList.add('card', 'disable-hover');

		/* Card title */
		const cardTitle = document.createElement('p');
		cardTitle.classList.add('card-title');
		cardTitle.innerText = title;

		/* Card meta (Last Modified Date) */
		const cardMeta = document.createElement('p');
		cardMeta.classList.add('card-meta');
		cardMeta.innerText = new Date(createdAt).toLocaleString();

		/* Card category */
		const cardCategory = document.createElement('p');
		cardCategory.classList.add('card-category');
		cardCategory.innerText = `Category: ${category}`;

		/* Card Tags */
		const cardTags = document.createElement('div');
		cardTags.classList.add('card-tag-container');
		for (const tag of tags) {
			const tagBadge = document.createElement('p');
			tagBadge.classList.add('card-tag');
			tagBadge.innerText = tag.toUpperCase();

			cardTags.appendChild(tagBadge);
		}

		/* Card content */
		const cardContent = document.createElement('p');
		cardContent.classList.add('card-content');
		cardContent.innerText = content;

		// Append elements
		card.appendChild(cardTitle);
		card.appendChild(cardMeta);
		card.appendChild(cardCategory);
		card.appendChild(cardTags);
		card.appendChild(cardContent);
		cardContainer.appendChild(card);
	} catch (error) {
		// Handle errors
		console.error(`Unable to retrieve data\n${error.message}`);
	}
};

// Initialize
addNavHandlers();
loadPost();
