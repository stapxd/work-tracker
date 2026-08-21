
import { Routes, Route } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';

// Partials
import Header from './pages/partials/Header.tsx';

// General
import Home from './pages/general/Home.tsx';
import About from './pages/general/About.tsx';
import NotFound from './pages/general/NotFound.tsx';

// Users
import Register from './pages/users/Register.tsx';
import Login from './pages/users/Login.tsx';

function App() {

  return (
    <>
        <Header/>

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
    </>
  )
}

export default App
