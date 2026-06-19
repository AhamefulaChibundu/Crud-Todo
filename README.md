# Todo MANAGEMENT API

A RESTful Todo API built with Node.js and Express.js to demonstrate backend development concepts such as CRUD operations, middleware architecture, request validation, error handling, and API deployment.

This project is actively maintained and will continue to evolve as new backend concepts and best practices are implemented.

## Live Demo

**Render URL:** https://todo-api-chibundu.onrender.com/todos/

This API is deployed and accessible online via Render.

## Features

* Create, read, update, and delete todos
* Retrieve active and completed todos
* Request logging middleware
* Input validation with Joi
* Centralized error handling
* CORS configuration
* Environment variable support

## Tech Stack

* Node.js
* Express.js
* Joi
* CORS
* Dotenv

## Project Structure

```text
project/
│
├── middlewares/
│   ├── logger.js
│   ├── validator.js
│   ├── patchValidator.js
│   └── errorHandler.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

## API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | /todos           | Get all todos       |
| GET    | /todos/:id       | Get a single todo   |
| GET    | /todos/completed | Get completed todos |
| GET    | /todos/active    | Get active todos    |
| POST   | /todos           | Create a todo       |
| PATCH  | /todos/:id       | Update a todo       |
| DELETE | /todos/:id       | Delete a todo       |

## Installation

1. Clone the repository

```bash
git clone https://github.com/AhamefulaChibundu/Crud-Todo
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

```env
PORT=3002
```

4. Start the application

```bash
npm start
```
OR to use nodemon
```bash
npm run dev
```

## Future Enhancements

This project will continue to be updated with additional backend concepts and improvements as development progresses.


