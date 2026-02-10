import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './app/routes/home'
import Competition from './app/routes/competition'

function App() {
  return (
    <Router basename="/esspo">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competition" element={<Competition />} />
      </Routes>
    </Router>
  )
}

export default App
