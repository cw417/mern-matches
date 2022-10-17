import React from 'react'

export default function Sidebar({ sortedScores }) {

  function scoreList() {
    return (
      sortedScores.map((score, index) => {
        return (
          <div key={index} className='my-1'>{score}</div>
        )
      }
    ))
  }

  return (
    <div className='text-center'>
      <div className='text-3xl mb-6'>Scores</div>
      <div className='text-xl'>{scoreList()}</div>
    </div>
  )
}
