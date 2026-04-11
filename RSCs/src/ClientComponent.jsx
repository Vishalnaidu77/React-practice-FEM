"use client"

import React from 'react'

const ClientComponent = () => {
    console.log("Rendering ClientComponent");
    const [ counter, setCounter ] = React.useState(0)

  return (
    <fieldset>
        <legend>Client component</legend>
        <p>Counter {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </fieldset>
  )
}

export default ClientComponent
