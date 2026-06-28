const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./database/db');
const Todo = require('./modules/todo.model')
const logRequest = require('./middlewares/logger');
const validator = require('./middlewares/validator');
const { postValidator, patchValidator } = require('./middlewares/schema');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json()); // Parse JSON bodies
app.use(cors({
  origin: "*"
})); // CORS: lets frontend (React/HTML/etc.) talk to this backend
connectDB();
app.use(logRequest);


// GET All – Read
app.get('/todos', async (req, res, next) => {
  try {
    console.log(req.query)
    const todos = await Todo.find(req.query);
    res.status(200).json(todos); // Send array as JSON
  } catch (error) {
     next(error);
  }
 
});

// POST New – Create
app.post('/todos', validator(postValidator), async (req, res, next) => {
  try {
    const {task, completed} = req.body;
    const newTodo = new Todo({ task, completed }); // Auto-ID from MongoDb

    await newTodo.save();
    res.status(201).json(newTodo); // Echo back
  } catch (error) {
    next(error);
  }
});

app.get('/todos/completed', async(req, res, next) => {
  try {
    const completed = await Todo.find({completed: true});
    res.json(completed); // Custom Read!
  } catch (error) {
    next(error);
  }
});

// GET Active
app.get('/todos/active', async (req, res, next) => {
  try {
    const activeTodos = await Todo.find({completed: false});
    res.status(200).json(activeTodos);
  } catch (error) {
    next(error);
  }
});


// PATCH Update – Partial
app.patch('/todos/:id', validator(patchValidator), async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    
    if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
}
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

// DELETE Remove
app.delete('/todos/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (!todo){
      return res.status(404).json({ error: 'Not found' });
    }
    console.log(`${todo.task} task deleted successfully`)
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});


// GET One Todo
app.get('/todos/:id', async(req, res, next) => {
  try {
    
    const oneTodo = await Todo.findById(req.params.id) ;
  
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
