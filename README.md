# Blogging Platform API

A full‑stack blogging platform featuring an Express-based REST API, server‑rendered views, and a client-side interface for creating, updating, searching, and managing blog posts.

---

## 🚀 Features

- Full CRUD support for blog posts
- Search functionality using MongoDB text indexes
- REST API routes and view routes
- Organized MVC-style folder structure
- Server‑side rendering with static public pages
- MongoDB Atlas integration
- Clean, modular file separation (controllers, models, routers, services)

---

## 📂 Project Structure

```
Blogging Platform API/
├─ public/
│  ├─ scripts/       # Client-side JS for create, edit, search, view pages
│  ├─ styles/        # Global CSS
│  └─ views/         # HTML pages (index, post, create, edit, search)
├─ src/
│  ├─ controllers/   # Request handlers
│  ├─ models/        # Mongoose schemas
│  ├─ routers/       # API + View routers
│  └─ services/      # MongoDB connection logic
├─ server.js          # Main Express server entry point
└─ package.json
```

---

## ⚙️ Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Vanilla JavaScript**
- **HTML5 & CSS**

---

## 🔧 How to Install & Run

### 1. Install dependencies

```
npm install
```

### 2. Create a `.env` file

```
MONGODB_USER=your_user
MONGODB_PASS=your_pass
PORT=5000
```

### 3. Start the server

```
npm start
```

Your app will be running at:  
**http://localhost:5000**

---

## 📜 License

This project is provided for educational and portfolio purposes.
