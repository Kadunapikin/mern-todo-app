const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
    tags: [String], // for tagging users
    hashtags: [String], // for hashtags
  });
  
const TodoModel = mongoose.model('todos', TodoSchema);

module.exports = TodoModel