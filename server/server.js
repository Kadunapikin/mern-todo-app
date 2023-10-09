const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const TodoModel = require('./models/Todo');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.error('Failed to connect to MongoDB with error:', err.message);
  console.error(err);
});

// Todo Routes
app.get('/todos', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/todos', async (req, res) => {
    try {
        const { task } = req.body;
        const mentions = task.match(/@\w+/g) || [];
        
        // Verify mentioned users exist
        for(let mention of mentions) {
            let username = mention.replace('@', '');
            let userExists = await User.findOne({ username });
            if(!userExists) {
                return res.status(400).json({ message: `User ${mention} does not exist.` });
            }
        }

        const hashtags = task.match(/#\w+/g) || [];
        const todo = new TodoModel({ task, mentions, hashtags });
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const removedTodo = await TodoModel.findByIdAndDelete(req.params.id);
        res.json(removedTodo);
    } catch (err) {
        res.status(500).json(err);
    }
});

// User Schema & Model
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

// User Routes
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username.trim() || !password.trim()) {
            return res.status(400).json({ message: 'Both username and password are required.' });
        }
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already taken.' });
        }
        const user = new User({ username, password });
        await user.save();
        res.json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

//search end point
app.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query.trim()) {
            return res.status(400).json({ message: 'Empty search query provided.' });
        }
        // Initialize empty results
        let users = [];
        let todos = [];

        // If the query starts with @, search for users
        if (query.startsWith('#')) {
            todos = await TodoModel.find({ hashtags: query.slice(1) });
        }
        else if (query.startsWith('@')) {
            users = await User.find({ username: new RegExp(query.slice(1), 'i') }); // Removing @ and then searching
        } 
        // Return an error if the query doesn't start with @ or #
        else {
            return res.status(400).json({ message: 'Search queries should start with @ for users or # for todos.' });
        }
        res.json({ users, todos });
    } catch (err) {
        console.error('Error during search:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/create-todo', async (req, res) => {
  const { userInput } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are a helpful assistant that creates to-do lists."},
        {role: "user", content: userInput}
      ],
      temperature: 0.7,
      max_tokens: 100,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const aiMessage = response.data.choices[0].message.content.trim();
    const todos = aiMessage.split('\n').filter(item => item); // Split by line and filter out empty strings
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ error: 'Error creating to-do list' });
  }
});

app.listen(3001, () => {
    console.log('Server is Listening on port 3001');
});
