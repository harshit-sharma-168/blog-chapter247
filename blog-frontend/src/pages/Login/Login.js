import React, { useState } from 'react';
import * as classes from './Login.module.css'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useUserLoginMutation } from '../../store/apiSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userLogin] = useUserLoginMutation()
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const payload = {
        email,
        user_password: password
      }

      const {data: response, error} = await userLogin(payload);
      console.log('response', response);
      if(response && response.token){
        localStorage.setItem('token', JSON.stringify(response.token))
        const splitToken = response.token.split('.')[1];
        console.log('splitToken', splitToken);
        const user = jwtDecode(response.token)
        localStorage.setItem('user', user)
        navigate('/')
        setError('')
      }else{
        setError('Invalid email or password');

      }
      if(!!error) throw error;
    } catch (error) {
      throw error
    }

  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 border-box">
        <Col xs={12} md={6}>
          <h2 className="mb-4 heading">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className='login-button' variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
