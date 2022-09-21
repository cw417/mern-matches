import React from 'react'

export default function Sidebar({ scores }) {

  function scoreList() {
    return (
      scores.sort().map((score, index) => {
        return (
          <div key={index}>{score}</div>
        )
      }
    ))
  }

  return (
    <div className='w-1/4 lg:w-[15%] lg:ml-12 text-center'>
      <span className='text-xl'>Scores</span>
      <div>{scoreList()}</div>
    </div>
  )
}
