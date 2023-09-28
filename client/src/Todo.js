import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const [darkMode, setDarkMode] = useState(false);

const toggleDarkMode = () => {
  setDarkMode(!darkMode);
};

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    }
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const newTodo = { task, completed: false };
    const response = await axios.post('http://localhost:5000/todos', newTodo);
    setTodos([...todos, response.data]);
    setTask('');
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
    <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    <div>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  </div>


  );
}

export default Todo;