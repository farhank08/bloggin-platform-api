// Helper function to slice content for preview
const previewContent = (content) => {
	if (!content) return '';

	return content.length > 280 ? content.slice(0, 280).trim() + '...' : content;
};

const form = document.getElementById('form-search');

// Handle form submit event
form.addEventListener('submit', async (event) => {
	event.preventDefault();

	// Extract data from form
	const formData = new FormData(form);
	const searchTerm = formData.get('term');

	try {
		// Send GET search request to API with query
		const response = await axios.get('/api/post/search', {
			params: { term: searchTerm },
		});
		const result = response.data;
		if (!result.success) {
			console.error('Unsuccessful response to search on server');
			return;
		}
		const posts = result.data;

		// Display posts
		loadPosts(posts);
	} catch (error) {
		console.error('Failed request to search on server');
	}
});

const loadPosts = (posts) => {
	// Container element
	const cardContainer = document.getElementById('card-container');

	// Reset card list innerHTML elements
	cardContainer.innerHTML = '';

	for (const post of posts) {
		// Display posts as cards
		const id = post._id;
		const { title, createdAt, category, content, tags } = post;

		/* Card list item */
		const card = document.createElement('li');
		card.classList.add('card');
		// Route to post on card click
		card.addEventListener('click', (event) => {
			window.location.href = `/post/${id}`;
		});

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
		cardContent.innerText = previewContent(content);

		// Append elements
		card.appendChild(cardTitle);
		card.appendChild(cardMeta);
		card.appendChild(cardCategory);
		card.appendChild(cardTags);
		card.appendChild(cardContent);
		cardContainer.appendChild(card);
	}
};
