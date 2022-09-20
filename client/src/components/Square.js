import React, { useState, useEffect } from 'react'

export default function Square({ square, matches, toggleSelected }) {

  const backgroundColor = square.selected ? 'blue' : 'yellow';
  const textColor = square.selected ? 'white': 'yellow';
  const display = matches.includes(square.i) ? 'none' : 'block';
  
  function handleClick() {
    toggleSelected(square.i, square.j);
  }
  
  return (
    <div 
      className='square m-4'
      onClick={() => handleClick()}
      style={{display: display, color: textColor, backgroundColor:backgroundColor}}
    >{`${square.i}`}</div>
  )
}
