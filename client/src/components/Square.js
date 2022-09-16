import React, { useState } from 'react'

export default function Square({ square }) {

  const [ backgroundColor, setBackgroundColor ] = useState('yellow');

  function handleSelect() {
    if (backgroundColor === 'yellow') {
      // if not selected
      setBackgroundColor('blue');
    }
    else {
      // if selected
      setBackgroundColor('yellow');
    }
  }

  return (
    <div 
      className='m-4'
      onClick={handleSelect}
      style={{backgroundColor:backgroundColor}}
    >{`i: ${square.i}, j: ${square.j}`}</div>
  )
}
