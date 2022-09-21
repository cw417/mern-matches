import React, { useState, useEffect } from 'react';
import Square from './Square';
import Sidebar from './Sidebar';

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
  const RESET_SELECTED_DELAY = 500;

  const [ field, setField ] = useState(initialState(FIELDSIZE));
  const [ selected, setSelected ] = useState(null);
  const [ matches, setMatches ] = useState([]);
  const [ time, setTime ] = useState(0);
  const [ scores, setScores ] = useState([]);

  // local storage setup
  const LOCAL_STORAGE_KEY = 'matchApp.scores'

  // local storage setup
  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedScores) setScores(storedScores)
  }, []);

  // local storage setup
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scores))
  }, [scores]);

  // timer
  useEffect(() => { 
    const timer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(timer);
   }, []);

  // watch for win condition
  /* useEffect(() => {
    if (matches.length === (FIELDSIZE / 2)) { 
      const newScores = [...scores, time];
      setScores(newScores);
      window.location.reload();
    };
  }, [matches]); */

  function toggleSelected(i, j) {
    /**
     * Toggle the 'selected' property of the (i, j) Square.
     */
    // toggle the given square
    const currentSquare = field.find(square => square.i === i && square.j === j);
    const index = field.indexOf(currentSquare);
    const newSquare = {i: i, j: j, selected: !currentSquare.selected};
    const newField = [...field];
    newField.splice(index, 1, newSquare);
    
    setField(newField);
    if (selected) {
      // if already selected, check for match, set selected to null, reset all selected
      setTimeout(function() {
        checkForMatch(i, j);
        setSelected(null);
        unselectedAll();
      }, RESET_SELECTED_DELAY);
      return;
    };
    setSelected({ i: i, j: j });
  }

  function unselectedAll() {
    const newField = field.map(square => { return {i: square.i, j: square.j, selected: false} });
    setField(newField);
  }

  function checkForMatch(i, j) {
    // if match
    if (selected.i === i && selected.j !== j) {
      console.log(`match found: i: ${i}`);
      if (!matches.includes(i)) { 
        const newMatches = [...matches, i];
        setMatches(newMatches);
       }
    }
    console.log(`matches: ${matches}`)
    if (matches.length === (FIELDSIZE / 2) -1) { 
      const newScores = [...scores, time];
      setScores(newScores);
      window.location.reload();
    }
  }

  function playfield() {
    return (
      field.map((square, index) => {
        return (
        <div key={index}>
          <Square
          square={square}
          toggleSelected={toggleSelected}
          matches={matches}
          />
        </div>
        )
      })
    )
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='text-2xl'>Time: {time}</div>
      <div className='flex flex-row w-full'>
        <Sidebar scores={scores} />
        <div className='grid grid-cols-4 grid-rows-4 mt-4'>
          {playfield()}
        </div>
      </div>
    </div>
  )
}
