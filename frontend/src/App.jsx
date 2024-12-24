import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'

function App() {
  return (
    <div className='min-h-screen justify-center flex flex-col'>
      <NavBar/>
      <Home/>
    </div>
  )
}

export default App