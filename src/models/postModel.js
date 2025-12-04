import mongoose from 'mongoose';

// Define the structure and validation rules
const postSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		content: { type: String, required: true, trim: true, maxlength: 10000 },
		category: { type: String, required: true, trim: true, maxLength: 15 },
		tags: [{ type: String, required: true, trim: true, maxLength: 15 }],
	},
	{
		timestamps: true,
	}
);

// Enable full-text search indexing on selected fields
postSchema.index({
	title: 'text',
	content: 'text',
	category: 'text',
	tags: 'text',
});

// Export model
export default mongoose.model('Post', postSchema);
