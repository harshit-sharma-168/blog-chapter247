// components/EditBlog.js

import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // For accessing route parameters and navigate
import { setBlog } from '../../store/blogSlice';


const EditBlog = () => {
  const { id } = useParams(); // Get the blog ID from URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {blogs} = useSelector((state)=> state.blogs)
  // State to manage form fields
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    // Fetch initial blog data based on ID
    const blog = blogs.find(blog => blog.id === parseInt(id));
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
      });
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your update logic here
    console.log('Updated Blog:', formData);
    const filterdedList = blogs.map((blog) =>{
        if(blog.id == id){
            return{ ...blog, content: formData.content, title: formData.title}
        }else{
            return blog
        }
    })
    dispatch(setBlog(filterdedList))
    navigate('/');
  };

  return (
    <div>
      <Container className="mt-4">
        <h2>Edit Blog</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button className='login-button' variant="primary" type="submit">
            Update Blog
          </Button>
        </Form>
      </Container>
      {/* Optional Footer */}
    </div>
  );
};

export default EditBlog;
