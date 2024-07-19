const express = require('express');
const router = express.Router();
const blogController = require('../controller/blog.controller');

router.get('/getAllBlogs', blogController.getAllBlogs);
router.get('/getSpecificBlogs', blogController.getSpecificBlogs);
router.post('/createablog', blogController.createBlog);
router.patch('/updateablog', blogController.updateBlog);
router.patch('/archiveablog', blogController.archiveBlog);
router.patch('/updateLockedBlog', blogController.lockUpdate);

module.exports = router;
