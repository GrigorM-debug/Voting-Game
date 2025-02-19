# Voting-Game

A simple full-stack web application built with **React**, **TypeScript**, and **Express.js**. Users can view, vote, edit, and delete jokes dynamically.

## Features

- 🃏 Display a random joke on the homepage
- 🔄 Load the next joke by clicking a button
- 😆 Vote for jokes using emoji reactions
- ✏️ Edit the currently displayed joke
- ❌ Delete the currently displayed joke

## 🛠 Tech Stack

### Frontend

- ⚛ **React**
- 📡 **React Query** (for data fetching and caching)
- 🟦 **TypeScript**
- ⚡ **Vite** (optional, for faster development)
- 🎨 **Tailwind CSS** (optional, for styling)
- 🔒 **dotenv** (for environment variables)

### Backend

- 🚀 **Express.js**
- 🟢 **Node.js**
- 🌱 **Mongoose** (for MongoDB)
- 🧪 **Mocha & Chai** (for testing)
- 🗄 **mongodb-memory-server** (for in-memory database testing)
- 🔒 **dotenv** (for environment variables)
- 🔄 **cors** (for handling CORS issues)

## 📡 API Endpoints

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | /api/joke     | Fetch radom joke  |
| POST   | /api/joke/:id | Vote for joke     |
| DELETE | /api/joke/:id | Delete Joke by Id |
| GET    | /api/joke/:id | Get Joke by Id    |
| PUT    | /api/joke/:id | Update joke by id |

## 📦 Install Dependencies

### Back-end

```sh
cd backend
npm install
```

### Front-end

```sh
cd frontend
npm install
```

## 🚀 Run the Application

### Start the Backend Server

```sh
cd backend
npm run start
```

### Start the Frontend

```sh
cd frontend
npm run dev
```
