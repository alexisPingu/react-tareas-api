import { useState } from 'react'
import Login from './components/Login'
import { Tareas } from './components/Tareas'

import { HashRouter as Router, Route ,Routes } from 'react-router-dom'




function App() {

  return (
    <>
      <div >
        <Router>
          <Routes>
            <Route exact path="/" element={<Login></Login>}/>
            <Route path="/tareas" element={<Tareas></Tareas>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
