import React, { useState } from 'react'
import axios from 'axios';

const Create = () => {
    const [task, setTask] = useState('');

    const handleChange = (e) => {
        setTask((e.target.value))
    }

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => {
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  return (
    <div className='create_form'>
        <input type='text' name='' id='' placeholder='Enter A Task' onChange={handleChange} />
        <button onClick={handleAdd} type='button'>Add Todo</button>
    </div>
  )
}

export default Create