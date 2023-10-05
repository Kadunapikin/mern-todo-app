import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Home.css"

const Home = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ users: [], todos: [] });
  const [userInput, setUserInput] = useState('');
  const [aiTodos, setAiTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAdd = async () => {
    if (!task.trim()) {
      alert('Please enter a task!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/todos', { task });
      setTodos([...todos, response.data]);
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const register = async () => {
    try {
      await axios.post('http://localhost:3001/register', { username, password });
      setUsername('');
      setPassword('');
      alert('Registered successfully!');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  // TODO: Implement login logic

  const search = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  //Open AI logic
  const createTodoList = async () => {
    try {
      const response = await axios.post('http://localhost:3001/create-todo', { userInput });
      setAiTodos(response.data.todos);
    } catch (error) {
      console.error('Error creating to-do list:', error);
    }
  };

  return (
    <div className='home'>
      <h1>Todo App</h1>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Write a task, tag users with @, create items with #" 
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map(todo => (
          <li className='task' key={todo._id}>
            <Checkbox className='icon svg' />
            <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
            <DeleteIcon onClick={() => handleDelete(todo._id)} className='icon' />
          </li>
        ))}
      </ul>

      <h2>Register</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={register}>Register</button>

      <h2>Search</h2>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by username or #" />
      <button onClick={search}>Search</button>
      <h3>Users:</h3>
      <ul>
        {searchResults.users.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      <h3>Todos:</h3>
      <ul>
        {searchResults.todos.map(todo => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>

      <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Describe the to-do list you want..."></textarea>
      <button onClick={createTodoList}>Create To-Do List</button>
      <ul>
        {aiTodos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
