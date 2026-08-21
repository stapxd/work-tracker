import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

interface LinkButtonProps {
  to: string;
  text: string;
  variant?: string;
}

export default function LinkButton({ to, text, variant = 'primary' } : LinkButtonProps) {
  return (
    <Link to={to}>
      <Button variant={variant}>{text}</Button>
    </Link>
  );
}