import './App.css'
import HNavbar from './Components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './Navigation/Navigation'

function App () {
  return (
    <Router>
      <HNavbar/>
      <Navigation />
    </Router>

  )}

export default App
