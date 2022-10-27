import React from 'react'

export default function Square({ square, matches, toggleSelected }) {

  const selectedClass = square.selected ? 'selected' : 'unselected';
  const textOpacity = square.selected ? '1': '0';
  const display = matches.includes(square.i) ? '0' : '1';
  
  function handleClick() {
    toggleSelected(square.i, square.j);
  }
  
  return (
    <div 
      className={`shadow ${selectedClass}`}
      onClick={handleClick}
      style={{opacity: display}}
    ><span style={{opacity: textOpacity}}>{`${square.i}`}</span></div>
  )
}
