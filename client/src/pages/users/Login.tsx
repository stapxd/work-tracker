import { useState, type SubmitEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../../api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log('Logging in user:', { username, password });

      await api.post('/auth/login', {
        username: username,
        password: password
      });

      navigate('/');
    } catch (err) {
      setError('Invalid username or password.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 flex-grow-1 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <div className="p-4 shadow-sm rounded border bg-white">
            <h2 className="text-center fw-bold mb-4">Log In</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </Form>

            <div className="text-center text-muted small">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary text-decoration-none fw-semibold">
                Register
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}