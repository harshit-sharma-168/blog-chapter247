// components/HomePage.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BlogList from '../../components/BlogList/BlogList';
import { useDispatch } from 'react-redux';
import { setBlog } from '../../store/blogSlice';

const Home = () => {
    const dispatch = useDispatch()

    //   dispatch(setBlog(blogs))
  return (
    <div>
      <Container className="mt-4">
        <Row>
          <Col md={8}>
            <h2>Latest Blogs</h2>
            <hr />
            <BlogList />
          </Col>
          <Col md={4}>
            {/* Optional Sidebar or Additional Content */}
          </Col>
        </Row>
      </Container>
      {/* Optional Footer */}
    </div>
  );
};

export default Home;
