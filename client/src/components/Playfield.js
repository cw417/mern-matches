import React, { useState, useRef } from 'react';
import Square from './Square';

function initialState(n) {
  /**
   * Return array of n boolean elements where one is true and the rest false.
   * @return {boolean[]}     Array of n boolean elements with only one set to true.
   */
  const returnArray = [];
  for (let i = 0; i < n-1; i++) {
    returnArray.push({win: false});
  }
  const randNum = (Math.random() * n);
  returnArray.splice(randNum, 0, {win: true});
  return returnArray;
}

export default function GameField() {
  
  const FIELDSIZE = 16;
  const [ field, setField ] = useState(initialState(FIELDSIZE))
  
  
  function playfield() {
    return (
      field.map((item, index) => {
        <div key={index}>
          <Square />
        </div>
      })
    )
  }

  return (
    <div>
      <div className='grid-cols-4 grid-rows-4'>
        {playfield()}
      </div>
    </div>
  )
}
