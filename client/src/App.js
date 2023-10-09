import React from 'react';
import './App.css';
import DarkModeToggle from './components/DarkModeToggle';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <DarkModeToggle />
      <div className='container'>
        <Home />
      </div>
    </div>
  );
}

export default App;
