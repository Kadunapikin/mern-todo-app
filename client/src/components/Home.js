import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Create from './Create'
import "./Home.css"


const Home = () => {
const [todos, setTodos] = useState([]);
useEffect(() => {
  axios.get('http://localhost:3001/get').then(result => setTodos(result.data)).catch(err => console.log(err));
}, [])

const handleEdit = (id) => {
  const updatedTodos = todos.map(todo => {
    if (todo._id === id) {
      // Toggle the 'done' property of the clicked todo
      return { ...todo, done: !todo.done };
    }
    return todo;
  });

  // Update the state with the modified todos
  setTodos(updatedTodos);

  // Send a request to update the todo in the server
  axios.put(`http://localhost:3001/update/${id}`)
    .then(result => console.log(result))
    .catch(err => console.log(err));
}


const handleDelete = (id) => {
  axios
    .delete(`http://localhost:3001/delete/${id}`)
    .then(() => {
      // Update the state by removing the deleted task
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    })
    .catch((err) => console.log(err));
};

const updateTodoList = (newTodo) => {
  setTodos([...todos, newTodo]);
};

return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create updateTodoList={updateTodoList} />
      {todos.length === 0 ? <div><h3>No Record of any todo task!</h3></div> :
        todos.map(todo => (
          <div className='task' key={todo._id}>
            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
              <Checkbox checked={todo.done} className='icon' />
              <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span><DeleteIcon className='icon' onClick={() => handleDelete(todo._id)} /></span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Home