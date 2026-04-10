"use client"

import React, { useState } from 'react'

const ClientComponent = () => {
    console.log("Rendering ClientComponent");
    const [ counter, setCounter ] = useState(0)

  return (
    <fieldset>
        <legend>Client component</legend>
        <p>Counter {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </fieldset>
  )
}

export default ClientComponent
