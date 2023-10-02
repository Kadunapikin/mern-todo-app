import React, { useState } from 'react'
import axios from 'axios';

const Create = ({ updateTodoList }) => {
    const [task, setTask] = useState('');

    const handleChange = (e) => {
        setTask((e.target.value))
    }

    const handleAdd = () => {
      if (!task.trim()) {
        alert('Please enter a new task to add!!!'); 
        return; 
      }
      axios.post('http://localhost:3001/add', { task: task })
        .then(result => {
          // Call the updateTodoList function passed from Home.js
          setTask('');
          updateTodoList(result.data);
           // Clear the input field
        })
        .catch(err => console.log(err));
    };

  return (
    <div className='create_form'>
        <input type='text' name='' id='' placeholder='Enter A Task' onChange={handleChange} />
        <button onClick={handleAdd} type='button'>Add Todo</button>
    </div>
  )
}

export default Create