import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Lobby from './screens/lobby';
import Room from './room/Room';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Lobby/>}></Route>
        <Route path='/room/:number' element={<Room/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
