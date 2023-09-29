import React, { useState } from 'react'

const Create = () => {
    const [task, setTask] = useState('');
    const handleChange = (e) => {
        setTask((e.target.value))
    }
  return (
    <div className='create_form'>
        <input type='text' name='' id='' placeholder='Enter A Task' onChange={handleChange} />
        <button type='button'>Add Todo</button>
    </div>
  )
}

export default Create