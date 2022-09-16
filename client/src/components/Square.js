import React from 'react'

export default function Square({ square }) {
  return (
    <div className='m-4'>{`i: ${square.i}, j: ${square.j}`}</div>
  )
}
