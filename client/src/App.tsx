import React from 'react'

type Props = {}

const App = ({ ...props }: Props) => {
  return (
    <div className="bg-black" {...props}>
      App
    </div>
  )
}

export default App
