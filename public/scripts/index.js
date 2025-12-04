// Helper function to slice content for preview
const previewContent = (content) => {
	if (!content) return '';

	return content.length > 280 ? content.slice(0, 280).trim() + '...' : content;
};

// Handle navigation buttons
const addNavHandlers = () => {
	const createButton = document.getElementById('button-create');
	const searchButton = document.getElementById('button-search');

	// Route to create view
	createButton.addEventListener('click', () => {
		window.location.href = '/create';
	});

	// Route to search view
	searchButton.addEventListener('click', () => {
		window.location.href = '/search';
	});
};

// Fetch and display posts in a list
const loadPosts = async () => {
	try {
		// Fetch data
		const response = await axios.get('/api/post');
		const result = response.data;

		// Handle database error
		if (!result.success) {
			console.error(`Find all posts request failed\n${result.message}`);
			return;
		}

		// Container element
		const cardContainer = document.getElementById('card-container');

		// Extract payload
		const { data } = result;

		for (const post of data) {
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

			/* Card */
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
	} catch (error) {
		// Handle error
		console.error(`Unable to retrieve data\n${error.message}`);
	}
};

// Initialize
loadPosts();
addNavHandlers();
