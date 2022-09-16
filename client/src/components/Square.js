import React, { useState, useEffect } from 'react'

export default function Square({ square, toggleSelected, checkSelected, incrementSelectedCount, selectedCount }) {

  const [ backgroundColor, setBackgroundColor ] = useState('yellow');

  useEffect(() => {
    if (square.selected) {
      setBackgroundColor('blue')} 
    else {
      setBackgroundColor('yellow')};
  }, [square.selected])

  function handleSelect() {
    if (backgroundColor === 'yellow') {
      // if not selected
      setBackgroundColor('blue');
      toggleSelected(square.i, square.j);
      checkSelected(square.i, square.j)
      incrementSelectedCount();
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
      onClick={() => handleSelect()}
      style={{backgroundColor:backgroundColor}}
    >{`i: ${square.i}, j: ${square.j}`}</div>
  )
}
