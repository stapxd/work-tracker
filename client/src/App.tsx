import { Navigate, Routes, Route } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';

// Partials
import Header from './pages/partials/Header.tsx';

// General
import Dashboard from './pages/general/Dashboard.tsx';
import About from './pages/general/About.tsx';
import NotFound from './pages/general/NotFound.tsx';

// Users
import Register from './pages/users/Register.tsx';
import Login from './pages/users/Login.tsx';

// Jobs
import Job from './pages/jobs/Job.tsx';

function App() {

  return (
    <>
        <Header/>

        <Container>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />

            {/* Jobs */}
            <Route path="/jobs/:id" element={<Job />} />
            
            {/* Users */}
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
