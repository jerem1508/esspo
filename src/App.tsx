import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './app/routes/home'
import Competition from './app/routes/competition'

// En développement local, pas de basename. En production (GitHub Pages), utiliser /esspo
const basename = import.meta.env.DEV ? '/' : '/esspo'

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competition" element={<Competition />} />
      </Routes>
    </Router>
  );
}

export default App
