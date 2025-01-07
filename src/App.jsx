import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Elements/Navbar';
import Footer from './Components/Footer';


const App = () => {
  return (

    <div>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
      </Router>
    </div>

  )
}

export default App
