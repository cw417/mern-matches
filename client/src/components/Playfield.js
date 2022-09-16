import React, { useState, useEffect } from 'react';
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
      returnArray.splice(randNum, 0, {i: i, j: j, selected: false, matched: false});
    }
  }
  return returnArray;
}

export default function GameField() {
  
  const FIELDSIZE = 16;
  const [ field, setField ] = useState(initialState(FIELDSIZE));
  const [ selectedCount, setSelectedCount ] = useState(0);
  const [ matches, setMatches ] = useState([]);

/*   useEffect(() => {
    // watch for selected count to hit 2
    // reset selected for each square once 2 are selected
    if (selectedCount === 2) {
      const newField = field.map(square => { return {i: square.i, j: square.j, selected: false, matched: square.matched}});
      // DONT DO THIS
      setField(newField);
      setSelectedCount(0);
    }
  }, [selectedCount, field, matches]); */
  
  function toggleSelected(i, j) {
    /**
     * Toggle the 'selected' property of the (i, j) Square.
     */
    const currentSquare = field.find(square => square.i === i && square.j === j);
    const index = field.indexOf(currentSquare);
    const newSquare = {i: i, j: j, selected: !currentSquare.selected, matched: currentSquare.matched};
    const newField = [...field];
    newField.splice(index, 1, newSquare);
    setField(newField);
  }

  function toggleMatched(i, j) {
    /**
     * Toggle the 'matched' property of the (i, j) Square.
     */
    const newSquare = {i: i, j: j, selected: false, matched: true};
    const newMatches = [...matches, newSquare]
    setMatches(newMatches);
    const index = field.findIndex(square => square.i === i && square.j === j);
    const newField = [...field];
    newField.splice(index, 1, newSquare);
    setField(newField); //this line is not working properly
      // newField is correct, but field is not being updated
      // when the useEffect runs, field has not been set with matched updated
  }

  function incrementSelectedCount() {
    /**
     * Increments selectedCount by 1.
     */
    const newSelectedCount = selectedCount + 1;
    setSelectedCount(newSelectedCount);
  }

  function checkSelected(i, j) {
    /**
     * Check if the other square from the pair is selected. 
     * Increment matches count if pair is found.
     * @return {boolean}    True if the other pair is selected.
     */
    console.log(`checking: ${i}, ${j}`)
    field.forEach(square => {
      if (square.i === i && square.j !== j && square.selected) {
        console.log(`Found match: ${square.i}, ${square.j}`)
        toggleMatched(i, j);
        toggleMatched(i, j===0 ? 1 : 0);
        toggleSelected(i, j===0 ? 1 : 0);
        return true;
      }
    })
    return false;
  }
  
  function playfield() {
    return (
      field.map((square, index) => {
        return (
        <div key={index}>
          <Square
            square={square}
            toggleSelected={toggleSelected}
            checkSelected={checkSelected}
            incrementSelectedCount={incrementSelectedCount}
            selectedCount={selectedCount}
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
