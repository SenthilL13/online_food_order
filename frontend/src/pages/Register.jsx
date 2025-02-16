import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleRegister(e) {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const user = { name, email, password }; // Store password too
  localStorage.setItem('user', JSON.stringify(user));
  alert('Registration successful! Please log in.');
  navigate('/login');
}



  return (
    <Container className="mt-5">
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
      <p className="mt-3">
        Already have an account? <Button variant="link" onClick={() => navigate('/login')}>Login</Button>
      </p>
    </Container>
  );
}

export default Register;
