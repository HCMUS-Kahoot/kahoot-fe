import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './router'

function App() {
  const user = null

  return (
    <BrowserRouter>
      <Routes user={user} />
    </BrowserRouter>
  )
}
export default App
