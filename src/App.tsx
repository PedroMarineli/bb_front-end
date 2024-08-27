import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicio />}/>
      </Routes>
    </Router>
  )
}

export default App
