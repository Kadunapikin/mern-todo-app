const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());

// Define a simple schema and model for our Todo
const TodoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
  });
  
  const Todo = mongoose.model('Todo', TodoSchema);