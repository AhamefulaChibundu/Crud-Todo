const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const logRequest = require('./middlewares/logger');
const validateTodo = require('./middlewares/validator');
const patchValidator = require('./middlewares/patchValidator');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json()); // Parse JSON bodies
app.use(cors()); // CORS: lets frontend (React/HTML/etc.) talk to this backend
app.use(logRequest);

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
  { id: 1, task: 'Learn Node.js', completed: true },
];

// GET All – Read
app.get('/todos', (req, res, next) => {
 try {
   res.status(200).json(todos); // Send array as JSON
 } catch (error) {
   next(error);
 }
});

// POST New – Create
app.post('/todos', validateTodo, (req, res, next) => {
  try {
    const {task} = req.body;
    if (!task) {
      return res.status(400).json({message: "task is required"})
    }
    const newTodo = { id: todos.length + 1, task, completed :false }; // Auto-ID
    todos.push(newTodo);
    res.status(201).json(newTodo); // Echo back
  } catch (error) {
    next(error);
  }
});

// PATCH Update – Partial
app.patch('/todos/:id', patchValidator, (req, res, next) => {
  try {
    const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    Object.assign(todo, req.body); // Merge: e.g., {completed: true}
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

// DELETE Remove
app.delete('/todos/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
    if (todos.length === initialLength)
      return res.status(404).json({ error: 'Not found' });
    res.status(204).send(); // Silent success
  } catch (error) {
    next(error);
  }
});

app.get('/todos/completed', (req, res, next) => {
  try {
    const completed = todos.filter((t) => t.completed);
    res.json(completed); // Custom Read!
  } catch (error) {
    next(error);
  }
});

// GET Active
app.get('/todos/active', (req, res, next) => {
  try {
    const activeTodos = todos.filter((t) => !t.completed);
    res.status(200).json(activeTodos);
  } catch (error) {
    next(error);
  }
});

// GET One Todo
app.get('/todos/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new Error('invalid ID'); 
    }
    const oneTodo = todos.find((t) => t.id === id);
  
    if (!oneTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
  
    res.status(200).json(oneTodo);
  } catch (error) {
    next(error);
  }
});


app.use(errorHandler); 

const PORT = process.env.PORT ||3002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
