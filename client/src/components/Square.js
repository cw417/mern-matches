import React, { useState, useEffect } from 'react'

export default function Square({ square, toggleSelected, checkSelected, incrementSelectedCount, selectedCount, updateSelected }) {

  const backgroundColor = square.selected ? 'blue' : 'yellow';

  function handleSelect() {
    if (backgroundColor === 'yellow') {
      // if not selected
      toggleSelected(square.i, square.j);
      checkSelected(square.i, square.j);
      incrementSelectedCount();
      updateSelected();
    }
    else {
      // if selected
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
