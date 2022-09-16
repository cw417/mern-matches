import React, { useState, useRef } from 'react';
import Square from './Square';

function initialState(n) {
  /**
   * Return array of n boolean elements in random order where each element is paired with another.
   * @return {boolean[]}     Array of n boolean element pairs.
   */
  const returnArray = [];
  for (let i = 0; i < n/2; i++) {
    for (let j = 0; j < 2; j++) {
      const randNum = (Math.random() * n);
      returnArray.splice(randNum, 0, {i: i, j: j, selected: false});
    }
  }
  return returnArray;
}

export default function GameField() {
  
  const FIELDSIZE = 16;
  const [ field, setField ] = useState(initialState(FIELDSIZE))
  
  function toggleSelected(i, j) {
    /**
     * Toggle the 'selected' property of the {i, j} element.
     */
    const currentSquare = field.find(square => square.i === i && square.j === j);
    const index = field.indexOf(currentSquare);
    const newSquare = {i: i, j: j, selected: !currentSquare.selected};
    const newField = [...field];
    newField.splice(index, 1, newSquare);
    setField(newField);
  }
  
  function playfield() {
    return (
      field.map((square, index) => {
        return (
        <div key={index}>
          <Square
            square={square}
            toggleSelected={toggleSelected}
          />
        </div>
        )
      })
    )
  }

  return (
    <div className='flex flex-col items-center w-full mt-6'>
      <div className='grid grid-cols-4 grid-rows-4'>
        {playfield()}
      </div>
    </div>
  )
}
