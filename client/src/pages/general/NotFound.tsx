import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LinkButton from '../../components/LinkButton';


export default function NotFound() {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="text-center border-0 p-4">
            <Card.Body>
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="h4 mb-3">Page Not Found</h2>
              <Card.Text className="text-muted mb-4">
                Oops! The page you are looking for doesn't exist or has been moved.
              </Card.Text>
              <LinkButton to="/" text="Back to Home"/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}