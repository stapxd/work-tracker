import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { useAuth } from '../../other/AuthProvider';

interface User {
  id: number;
  name: string;
}

interface Job {
    id: number;
  title: string;
}

export default function Home() {
    const [jobs, setJobs] = useState<Job[]>([]);

    const { user, refreshUser } = useAuth();

    useEffect(() => {
        if (user) {
            refreshUser();
        }
    }, []);

    return (
        <Container className="py-5 flex-grow-1 d-flex flex-column justify-content-center">
        {!user ? (
            <Row className="justify-content-center text-center">
            <Col md={8} lg={6}>
                <div className="py-4">
                <Badge bg="primary-subtle" className="text-primary fs-6 px-3 py-2 rounded-pill mb-3">
                    Work Tracker
                </Badge>

                <h1 className="display-5 fw-bold mb-3">Track Your Jobs</h1>

                <p className="text-muted fs-5 mb-4">
                    Here will be your created Job list when you create your account.
                </p>

                <div className="d-flex gap-3 justify-content-center">
                    <Link to="/register">
                    <Button variant="primary" size="lg">
                        Create Account
                    </Button>
                    </Link>
                    <Link to="/login">
                    <Button variant="outline-secondary" size="lg">
                        Log In
                    </Button>
                    </Link>
                </div>
                </div>
            </Col>
            </Row>
        ) : (
            <Row className="justify-content-center">
            <Col md={10} lg={8}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="h3 mb-1">Your Job list</h2>
                    <p className="text-muted mb-0">Welcome back, {user.username}!</p>
                </div>
                <Button variant="success">+ Add Job</Button>
                </div>

                {jobs.length === 0 ? (
                /* Empty List Placeholder */
                <ListGroup className="shadow-sm">
                    <ListGroup.Item className="text-center py-5 text-muted">
                    <p className="mb-2 fs-5">No jobs to track.</p>
                    <Button variant="outline-primary" size="sm">
                        Add your first job listing
                    </Button>
                    </ListGroup.Item>
                </ListGroup>
                ) : (
                /* FUTURE EXPANSION: Vertical Job List */
                <ListGroup className="shadow-sm">
                    {jobs.map((job) => (
                    <ListGroup.Item
                        key={job.id}
                        className="d-flex justify-content-between align-items-center p-3"
                    >
                        <div>
                        <h5 className="mb-1 fw-bold">{job.title}</h5>
                        <p className="text-muted mb-0 small">
                            Company • LA
                        </p>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                        <Badge>
                            Status
                        </Badge>
                        <small className="text-muted">24.02.22</small>
                        </div>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                )}
            </Col>
            </Row>
        )}
        </Container>
    );
}