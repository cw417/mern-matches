import React, { useState, useEffect } from 'react';
import Square from './Square';
import Sidebar from './Sidebar';

function initialState(num) {
  /**
   * Return array of n boolean elements in random order where each element is paired with another.
   * Each pair has the same i value, and a j of either 0 or 1.
   * A pair is made when two squares have the same i value but different j values.
   * @return {boolean[]}     Array of n boolean element pairs.
   */
  const returnArray = [];
  for (let i = 0; i < num/2; i++) {
    for (let j = 0; j < 2; j++) {
      const randNum = (Math.random() * num);
      returnArray.splice(randNum, 0, {i: i, j: j, selected: false});
    }
  }
  return returnArray;
}

const LOCAL_STORAGE_KEY = 'matchApp.scores'

function initialScores() {
    /**
     * Get previous scores from local storage.
     */
    const storedScores = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return (storedScores) ? storedScores : [];
}

const FIELDSIZE = 16;
const RESET_SELECTED_DELAY = 500;

export default function GameField() {
  
  const [ fieldArray, setFieldArray ] = useState(initialState(FIELDSIZE));
  const [ selected, setSelected ] = useState(null);
  const [ matches, setMatches ] = useState([]);
  const [ time, setTime ] = useState(0);
  const [ scores, setScores ] = useState(initialScores());


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

  function toggleSelected(i, j) {
    /**
     * Toggle the 'selected' property of the (i, j) Square.
     */
    // toggle the given square
    const currentSquare = fieldArray.find(square => square.i === i && square.j === j);
    const index = fieldArray.indexOf(currentSquare);
    const newSquare = {i: i, j: j, selected: !currentSquare.selected};
    const newField = [...fieldArray];
    newField.splice(index, 1, newSquare);
    
    setFieldArray(newField);
    if (selected) {
      // if already selected, check for match, set selected to null, reset all selected
      setTimeout(function() {
        checkForMatch(i, j);
        setSelected(null);
        unselectAll();
      }, RESET_SELECTED_DELAY);
      return;
    };
    setSelected({ i: i, j: j });
  }

  function unselectAll() {
    /**
     * Change 'selected' property to false for all squares in field array.
     */
    const newField = fieldArray.map(square => { return {i: square.i, j: square.j, selected: false} });
    setFieldArray(newField);
  }

  function checkForMatch(i, j) {
    /**
     * Checks for match against the 'selected' state.
     * Runs end game condition if matches is 1 less than the (FIELDSIZE / 2) - 1.
     * The -1 is there because the rendered state will be 1 behind in the matches array
     * until the component re-renders.
     */
    // if match
    if (selected.i === i && selected.j !== j) {
      console.log(`match found: i: ${i}`);
      if (!matches.includes(i)) { 
        setMatches(prevMatches => [...prevMatches, i]);
       }
    }
  }

  useEffect(() => {
    if (matches.length === (FIELDSIZE / 2)) { 
      setScores(prevScores => [...prevScores, time]);
    setMatches([]);
    setFieldArray(initialState(FIELDSIZE));
    setTime(0);
    }
  }, [matches, time])

  function renderPlayfield() {
    /**
     * Generates the playfield from the field array.
     */
    return (
      fieldArray.map((square, index) => {
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
      <div className='flex flex-row w-full'>
        <div className='w-[12.5%] mt-12'>
          <Sidebar scores={scores} />
        </div>
        <div className='flex flex-col text-center w-[87.5%]'>
          <div className='text-4xl'>React Matches</div>
          <div className='text-xl'>Try to find the pairs!</div>
          <div className='text-2xl my-8'>Time: {time}</div>
        <div className='grid grid-cols-4 grid-rows-4 gap-[2rem] m-auto'>
            {renderPlayfield()}
          </div>
        </div>
      </div>
    </div>
  )
}
