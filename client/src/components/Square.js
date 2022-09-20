import React, { useState, useEffect } from 'react'

export default function Square({ square, matches, toggleSelected }) {

  const backgroundColor = square.selected ? 'blue' : 'yellow';
  const display = matches.includes(square.i) ? 'none' : 'block';
  
  function handleClick() {
    toggleSelected(square.i, square.j);
  }
  
  return (
    <div 
      className='m-4'
      onClick={() => handleClick()}
      style={{backgroundColor:backgroundColor, display: display}}
    >{`i: ${square.i}, j: ${square.j}`}</div>
  )
}
