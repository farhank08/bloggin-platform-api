# Blogging Platform API

A Node.js **blogging platform API** with server‑rendered views that allows users to create, edit, search, and view blog posts. The application uses **Express**, **MongoDB (Mongoose)**, and serves both **JSON API endpoints** and **HTML pages** for interacting with blog content.

## Prerequisites

- Node.js **v25** or higher
- npm
- MongoDB (local instance or managed service such as MongoDB Atlas)

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd blogging-platform-api
```

2. **Install dependencies**

```bash
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the project root and configure the following variable:

```env
MONGODB_URI=your_mongodb_connection_string
```

- `MONGODB_URI` – MongoDB connection string used by Mongoose

## Running the Application

### Start the server

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

## Application Structure

```text
Blogging Platform API/
├── server.js
├── package.json
├── public/
│   ├── scripts/
│   ├── styles/
│   └── views/
└── src/
    ├── controllers/
    │   └── postController.js
    ├── models/
    │   └── postModel.js
    ├── routers/
    │   ├── apiRouter.js
    │   └── viewRouter.js
    └── services/
        └── dbClient.js
```

## API Endpoints

All API routes are prefixed and handled via the API router.

### Posts

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/posts` | Get all blog posts |
| GET | `/api/posts/:id` | Get a single post by ID |
| POST | `/api/posts` | Create a new post |
| PUT | `/api/posts/:id` | Update an existing post |
| DELETE | `/api/posts/:id` | Delete a post |
| GET | `/api/posts/search?q=` | Search posts by title or content |

## Views

The application serves HTML views for interacting with blog posts directly in the browser:

- Home / posts list
- View single post
- Create post
- Edit post
- Search posts

These views are located under `public/views` and are rendered via the view router.

## Data Model

### Post

Each blog post includes:

- `title`
- `content`
- `createdAt`
- `updatedAt`

The schema is defined using **Mongoose** in `postModel.js`.

## Notes

- MongoDB connection is initialized during server startup
- API logic and view rendering are cleanly separated via routers
- The project follows a simple **MVC‑style structure**

## License

This project is licensed under the ISC License.

