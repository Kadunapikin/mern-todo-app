const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Iceman427:Iceman4real@deviceapi.w5d8xd9.mongodb.net/test');

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  console.log(task);
  TodoModel.create({
    task: task
  })
    .then(result => {
      // Return the newly created todo as part of the response
      res.json(result);
    })
    .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => { // Removed colon from ':id'
  const { id } = req.params;
  const { done } = req.body;
  TodoModel.findByIdAndUpdate(id, { done }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => { // Removed colon from ':id'
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log('Server is Listening on port 3001');
});
