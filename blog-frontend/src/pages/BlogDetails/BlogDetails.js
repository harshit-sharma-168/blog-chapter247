// components/BlogDetail.js

import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // For accessing route parameters

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from URL params
  console.log(id);
  const {blogs} = useSelector((state)=> state.blogs);
  console.log(blogs);
  // Find the blog post with the matching ID
  const blog = blogs?.find(blog => blog.id === parseInt(id));

  if (!blog) {
    return <p>Blog not found</p>; // Handle case where blog ID does not exist
  }

  return (
    <div>
      <Container className="mt-4">
        <Card>
          <Card.Body className='h-500 mt-4'>
            <Card.Title>Title : {blog.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">By {blog.author}</Card.Subtitle>
            <Card.Text>Content: {blog.content}</Card.Text>
            <Button variant="primary" href="/">Back to Blogs</Button>
          </Card.Body>
        </Card>
      </Container>
      {/* Optional Footer */}
    </div>
  );
};

export default BlogDetail;
