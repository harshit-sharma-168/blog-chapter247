// components/BlogList.js

import React, { useEffect, useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // For navigation links
import { setBlog } from '../../store/blogSlice';
const blogss = [
    {
      id: 1,
      title: 'Getting Started with React',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum pretium dui...',
      author: 'John Doe',
      createdAt: '2023-07-15T10:30:00Z',
    },
    {
      id: 2,
      title: 'State Management in Redux',
      content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...',
      author: 'Jane Smith',
      createdAt: '2023-07-14T15:45:00Z',
    },
    {
      id: 3,
      title: 'CSS Tips and Tricks',
      content: 'Nullam vel lectus velit. Suspendisse faucibus tincidunt justo, vel rutrum leo fermentum sit amet...',
      author: 'Michael Johnson',
      createdAt: '2023-07-13T09:00:00Z',
    },
  ];
const BlogList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [blogList, setBlogList] = useState(blogss);
    const {blogs} = useSelector((state)=> state.blogs)

    console.log('blogs',blogs);

    useEffect(()=>{
        setBlogList(blogs)
    },[blogs])
    useEffect(()=>{
        dispatch(setBlog(blogList));
    },[blogList])

    const handleDelete = (id) =>{
        const filteredBlog = blogList?.filter(blog => blog.id !== id);
        console.log('filteredBlog', filteredBlog);
        if(filteredBlog){
            setBlogList(filteredBlog)
            dispatch(setBlog(filteredBlog))
        }
    }

    const handleRedirect = (path, id) => {
        navigate(`/${path}/${id}`)
    }
  return (
    <div>
      {blogList.length > 0 && blogList.map(blog => (
        <Card key={blog.id} className="mb-3">
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">By {blog.author}</Card.Subtitle>
            <Card.Text>{blog.content.slice(0, 150)}...</Card.Text>
            <Container className='d-flex'>
            <Button onClick={()=>{handleRedirect('blog_details', blog.id)}} className="btn btn-primary mr-2">View Details</Button>
            <Button onClick={()=>{handleRedirect('edit_blog', blog.id)}} className="btn btn-warning mr-2">Edit Blog</Button>
            <Button variant="danger" onClick={() => handleDelete(blog.id)}>Delete Blog</Button>
            </Container>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default BlogList;
