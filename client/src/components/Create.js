import React, { useState, useRef } from 'react';
import axios from 'axios';

const Create = ({ updateTodoList }) => {
  const [task, setTask] = useState('');
  const inputRef = useRef(null);


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
      // Clear the input field using the ref
      inputRef.current.value = '';
      setTask(''); // Clear the state as well
      updateTodoList(result.data);
    })
      .catch(err => console.log(err));
  };
    
  return (
    <div className='create_form'>
      <input
        type='text'
        name=''
        id=''
        placeholder='Enter A Task'
        onChange={handleChange}
        ref={inputRef} // Attach the ref to the input element
      />
      <button onClick={handleAdd} type='button'>Add Todo</button>
    </div>
  )
}

export default Create