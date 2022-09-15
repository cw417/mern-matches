import React from 'react';
import Topbar from './components/Topbar';
import Playfield from './components/Playfield';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <div className='flex flex-col items-center'>
      <div>
        <Topbar />
      </div>
      <div className='flex flex-row'>
        <div>
          <Sidebar />
        </div>
        <div>
          <Playfield />
        </div>
      </div>
    </div>
  );
}

export default App;
