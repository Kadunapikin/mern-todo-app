const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: String,
    completed: { type: Boolean, default: false },
    mentions: [String],  // Stores '@' mentions.
    hashtags: [String]   // Stores '#' items.
});

const TodoModel = mongoose.model('todos', TodoSchema);

module.exports = TodoModel;
