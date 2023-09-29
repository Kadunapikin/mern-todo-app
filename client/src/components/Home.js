import React, { useState } from 'react'
import Create from './Create'

const Home = () => {
const [todos, setTodos] = useState([]);

  return (
    <div>
        <h2>Todo List</h2>
        <Create />
        {
            todos.length === 0 ? <div><h3>No Record of any todo task!</h3></div>:
            todos.map(todo => {
                return (
                    <div>{todo}</div>
                )
            })
        }
    </div>
  )
}

export default Home