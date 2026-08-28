import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import LinkButton from '../../components/LinkButton.tsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../../other/AuthProvider';
import { api } from '../../api/index.ts';
import Spinner from 'react-bootstrap/Spinner';

interface User {
  id: number;
  name: string;
}

import Stack from 'react-bootstrap/Stack';

export default function Header() {

  const { user, refreshUser, setUser } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (user) {
          refreshUser();
      }
  }, []);

  const logout = async () => {
      setError(null);

      setLoading(true);

      try {
        await api.post('/auth/logout');
        setUser(null);
      } catch (err) {
        setError('Failed to logout. Please try again.');
      } finally {
        setLoading(false);
      }
  }

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
            <Stack direction="horizontal" gap={3} className='w-100'>
                <Navbar.Brand as={Link} to="/">Tracker</Navbar.Brand>
                
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                </Nav>

                { 
                !loading ? 
                  !user? (
                    <>
                      <Link to="/login" className='ms-auto'>Sign in</Link>
                      <LinkButton to="/register" text="Sign Up" />
                    </>
                  ) : (
                    <Button onClick={logout} className='ms-auto btn-danger'>Log out</Button>
                  ) : (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) }
            </Stack>
        </Container>
      </Navbar>
    </>
  );
}