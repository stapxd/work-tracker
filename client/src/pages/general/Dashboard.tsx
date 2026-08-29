import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { useAuth } from '../../other/AuthProvider';
import Form from 'react-bootstrap/Form';
import { api } from '../../api';
import Spinner from 'react-bootstrap/Spinner';
import CloseButton from 'react-bootstrap/CloseButton';

interface User {
  id: number;
  name: string;
}

interface Job {
    id: number;
    title: string;
    rate: number;
}

export default function Dashboard() {
    const [jobs, setJobs] = useState<Job[]>([]);

    const { user } = useAuth();

    const [showAddJobModal, setShowAddJobModal] = useState<boolean>(false);
    const handleShowAddJobModal = () => setShowAddJobModal(true);
    const handleCloseAddJobModal = () => setShowAddJobModal(false);

    const [newTitle, setTitle] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;

        const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await api.get('/jobs/get_all_by_me');

            const fetchedData = response?.data.jobs;

            if (Array.isArray(fetchedData)) {
                setJobs(fetchedData);
            } else {
                //console.error('API did not return an array:', response);
                setJobs([]);
            }
        } catch (err) {
            console.error(err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    fetchJobs();
  }, [user]);

  const addJob = async () => {
    try {
        setLoading(true);
        const response = await api.post('/jobs/create', {
            title: newTitle
        });

        const newJob = response?.data.job;

        setJobs([...jobs, newJob]);
        setShowAddJobModal(false);

    } catch (err) {
        console.error(err);
        setJobs([]);
    } finally {
        setLoading(false);
    }
  };

  const deleteJob = async (jobId: number) => {
    try {
        setLoading(true);
        const response = await api.delete('/jobs/delete', {
            data: { jobId }
        });

        if (response.status === 200) {
            setJobs(jobs.filter(job => job.id !== jobId));
        }
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

    return (
        <Container className="py-5 flex-grow-1 d-flex flex-column justify-content-center">

        <Modal show={showAddJobModal} onHide={handleCloseAddJobModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control type="text" placeholder="Title" value={newTitle}
                 onChange={(e) => setTitle(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addJob}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

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
                <Button variant="success" onClick={handleShowAddJobModal}>+ Add Job</Button>
                </div>

                {
                !isLoading ? (
                jobs.length === 0 ? (
                <ListGroup className="shadow-sm">
                    <ListGroup.Item className="text-center py-5 text-muted">
                    <p className="mb-2 fs-5">No jobs to track.</p>
                    <Button variant="outline-primary" size="sm">
                        Add your first job listing
                    </Button>
                    </ListGroup.Item>
                </ListGroup>
                ) : (
                <ListGroup className="shadow-sm">
                    {jobs.map((job) => (
                    <ListGroup.Item
                        key={job.id}
                        className="d-flex justify-content-between align-items-center p-3"
                    >
                        <div>
                            <Link to={`/jobs/${job.id}`} className="text-decoration-none mb-1 fw-bold">
                                {job.title}
                            </Link>
                            <p className="text-muted mb-0 small">
                                Company
                            </p>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                        <p className="text-muted mb-0 small">
                            rate:
                        </p>
                        <Badge>
                            {job.rate}
                        </Badge>
                        <CloseButton onClick={() => deleteJob(job.id)} />
                        </div>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                )) : (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
            </Col>
            </Row>
        )}
        </Container>
    );
}