import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Create from './Create'
import "./Home.css"

const Home = () => {
const [todos, setTodos] = useState([]);
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
                    <div className='task'>{todo.task}</div>
                )
            })
        }
    </div>
  )
}

export default Home