import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Sidebar from './components/sidebar/sidebar'
import Main from './components/main/main'

function App() {

  return (
    <>
      <Sidebar></Sidebar>
      <Main></Main>
    </>
  )
}

export default App
