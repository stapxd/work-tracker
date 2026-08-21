import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkButton from '../../components/LinkButton.tsx';

import { Link } from 'react-router-dom';

import Stack from 'react-bootstrap/Stack';

export default function Header() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
            <Stack direction="horizontal" gap={3} className='w-100'>
                <Navbar.Brand as={Link} to="/">Tracker</Navbar.Brand>
                
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                </Nav>

                {/* if user exists - show profile btn */}
                <Link to="/login" className='ms-auto'>Sign in</Link>
                <LinkButton to="/register" text="Sign Up" />
            </Stack>
        </Container>
      </Navbar>
    </>
  );
}