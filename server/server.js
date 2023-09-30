const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Iceman427:Iceman4real@deviceapi.w5d8xd9.mongodb.net/test')

app.get('/get', (req, res) => {
  TodoModel.find().then(result => res.json(result)).catch(err => res.json(err));
})

app.post('/add', (req, res) => {
  const task = req.body.task;
  console.log(task);
  TodoModel.create({
    task: task
  }).then(result => res.json(result)).catch(err => res.json(err))
})

app.listen(3001, () => {
  console.log('Server is Listening on port 3001');
})












// const PORT = 3000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/todoApp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(cors());
// app.use(express.json());

// // Define a simple schema and model for our Todo
// const TodoSchema = new mongoose.Schema({
//   task: String,
//   completed: Boolean,
// });

// const Todo = mongoose.model('Todo', TodoSchema);

// // Routes
// app.get('/todos', async (req, res) => {
//   const todos = await Todo.find();
//   res.json(todos);
// });

// app.post('/todos', async (req, res) => {
//   const newTodo = new Todo(req.body);
//   await newTodo.save();
//   res.json(newTodo);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
