import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <Container className="py-5 flex-grow-1 d-flex flex-column justify-content-center">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="text-center mb-5">
            <Badge bg="primary-subtle" className="text-primary fs-6 px-3 py-2 rounded-pill mb-3">
              About Work Tracker
            </Badge>
            <h1 className="display-5 fw-bold mb-3">Track Your Work & Maximise Income</h1>
            <p className="text-muted fs-5">
              A streamlined platform designed to calculate your actual earnings based on the exact hours you work and your custom hourly rates.
            </p>
          </div>

          <Row className="g-4 mb-5">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center p-3">
                <Card.Body>
                  <Card.Title className="fw-bold">Track Your Time</Card.Title>
                  <Card.Text className="text-muted small">
                    Easily log hours spent on various tasks, shifts, or distinct freelance projects.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center p-3">
                <Card.Body>
                  <Card.Title className="fw-bold">Set Custom Rates</Card.Title>
                  <Card.Text className="text-muted small">
                    Assign specific hourly rates to different jobs, clients, or special overtime shifts.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center p-3">
                <Card.Body>
                  <Card.Title className="fw-bold">Get Income Stats</Card.Title>
                  <Card.Text className="text-muted small">
                    Generate automated statistics and breakdowns of your gross income based on your data entry.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="bg-light border-0 p-4 text-center">
            <Card.Body>
              <h3 className="h4 fw-bold mb-2">Ready to manage your job earnings?</h3>
              <p className="text-muted mb-4">
                Create an account or sign in to start tracking your time, rates, and detailed stats.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/register">
                  <Button variant="primary">Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline-secondary">Log In</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}