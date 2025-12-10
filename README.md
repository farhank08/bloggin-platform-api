# 📝 Blogging Platform API

A modular **Node.js + Express** backend for creating, retrieving, updating, deleting, and searching blog posts. Includes a lightweight client interface that interacts with the API and demonstrates clean backend architecture, routing, controllers, and database modeling.

---

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-REST_API-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=for-the-badge&logo=mongodb)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## 📚 Table of Contents

1. Quick Start  
2. Features  
3. Project Structure  
4. How It Works  
5. API Documentation  
6. Tech Stack  
7. Environment Variables  
8. License  

---

## 🚀 Quick Start

```
npm install
```

Create `.env`:

```
MONGODB_USER=your_user
MONGODB_PASS=your_pass
PORT=5000
```

Start server:

```
npm start
```

Client interface:  
http://localhost:5000/

API base URL:  
http://localhost:5000/api

---

## ✨ Features

- Create, edit, delete blog posts  
- View posts in a structured interface  
- MongoDB full‑text search  
- Sorted post feed by created date  
- Modular architecture (controllers, routers, models)  
- Error handling throughout the stack  
- Centralized DB client  

---

## 📂 Project Structure

```
Blogging Platform API/
├─ public/
│  ├─ scripts/
│  │  ├─ index.js
│  │  ├─ create.js
│  │  ├─ edit.js
│  │  ├─ post.js
│  │  └─ search.js
│  ├─ styles/
│  │  └─ globals.css
│  └─ views/
│     ├─ index.html
│     ├─ create.html
│     ├─ edit.html
│     ├─ post.html
│     └─ search.html
│
├─ src/
│  ├─ controllers/
│  │  └─ postController.js
│  ├─ models/
│  │  └─ postModel.js
│  ├─ routers/
│  │  ├─ apiRouter.js
│  │  └─ viewRouter.js
│  └─ services/
│     └─ dbClient.js
│
├─ server.js
└─ package.json
```

---

## 🔧 How It Works

### Request Flow
Client (views + JS) → View Router → HTML pages  
↓  
API Router → Controller → Model → MongoDB

### Data Model
Posts contain:  
- title  
- content  
- category  
- tags[]  

A `$text` index enables search across title, content, and category.

### UI Interaction
JavaScript in `/public/scripts` handles:  
- Creating posts  
- Listing posts  
- Updating posts  
- Searching posts  
- Viewing a single post  

---

# 📘 API Documentation

## Post Routes (Base: `/api/post`)

### CRUD Operations

| Method | Endpoint        | Description            | Body Params |
|--------|------------------|------------------------|-------------|
| GET    | `/post`         | Get all posts          | None        |
| POST   | `/post`         | Create new post        | title, content, category, tags |
| GET    | `/post/:id`     | Get post by ID         | None        |
| PATCH  | `/post/:id`     | Update post            | title?, content?, category?, tags? |
| DELETE | `/post/:id`     | Delete post            | None        |

---

## Search Route

| Method | Endpoint        | Description       | Query |
|--------|------------------|-------------------|--------|
| GET    | `/post/search`  | Full‑text search  | term   |

Example:  
`GET /api/post/search?term=node`

---

## 🧱 Tech Stack

| Layer     | Technology |
|-----------|------------|
| Backend   | Node.js + Express |
| Database  | MongoDB + Mongoose |
| Frontend  | HTML, CSS, JavaScript |
| Config    | dotenv |

---

## 🔐 Environment Variables

| Variable       | Description |
|----------------|-------------|
| MONGODB_USER   | MongoDB username |
| MONGODB_PASS   | MongoDB password |
| PORT           | Server port |

---

## 📜 License

MIT License — free for education and portfolio presentation.
