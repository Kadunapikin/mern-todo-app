import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Create from './Create'
import "./Home.css"

const Home = () => {
const [todos, setTodos] = useState([]);
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
useEffect(() => {
  axios.get('http://localhost:3001/get').then(result => setTodos(result.data)).catch(err => console.log(err));
}, [])

  return (
    <div className='home'>
        <h2>Todo List</h2>
        <Create />
        {
            todos.length === 0 ? <div><h3>No Record of any todo task!</h3></div>:
            todos.map(todo => {
              return (
                <div className='task'>
                <div className='checkbox'>
                <Checkbox {...label} className='icon' />
                  <p>{todo.task}</p>
                </div>
                <div>
                  <span><DeleteIcon className='icon' /></span>
                </div>
              </div>
              )
            })
        }
    </div>
  )
}

export default Home