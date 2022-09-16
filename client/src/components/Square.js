import React from 'react'

export default function Square({ square }) {
  return (
    <div>{square.win? "T" : "F"}</div>
  )
}
