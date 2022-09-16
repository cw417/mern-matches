import React, { useState } from 'react'

export default function Square({ square, toggleSelected }) {

  const [ backgroundColor, setBackgroundColor ] = useState('yellow');

  function handleSelect() {
    if (backgroundColor === 'yellow') {
      // if not selected
      setBackgroundColor('blue');
      toggleSelected(square.i, square.j);
    }
    else {
      // if selected
      setBackgroundColor('yellow');
      toggleSelected(square.i, square.j);
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
