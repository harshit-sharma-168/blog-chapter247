const pool = require('../database/db.config');
const { ERROR_MESSAGES } = require('../config/contant.config');

const createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = await pool.query(
      `insert into blogs("title", "content") VALUES ($1, $2) RETURNING *`,
      [title, content],
    );

    return res.status(201).json({
      message: 'Blog is Created Successfully!!',
      blog: blog.rows[0],
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: err.detail,
    });
  }
};

const getAllBlogs = async (req, res) => {
  const archiveBlog = 0;
  try {
    const getAllBlogsDetails = await pool.query(
      `select * from blogs where archive = $1`,
      [archiveBlog],
    );
    if (getAllBlogsDetails.rowCount == 0) {
      return res.status(200).json({
        message: 'Blogs are not available!!',
        data: getAllBlogsDetails.rows,
      });
    }
    return res.status(200).json({
      message: 'ALL Blogs Fetched Successfully!!',
      data: getAllBlogsDetails.rows,
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: err.detail,
    });
  }
};

const getSpecificBlogs = async (req, res) => {
  const { blogid } = req.query;
  try {
    const getAllBlogsDetails = await pool.query(
      `select * from blogs where blogid = $1`,
      [blogid],
    );
    if (getAllBlogsDetails.rowCount === 0) {
      return res.status(404).json({
        message: 'No blog found with the given ID',
      });
    }
    return res.status(200).json({
      message: 'Blog details fetched successfully!!',
      data: getAllBlogsDetails.rows[0],
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateBlog = async (req, res) => {
  const { title, content, name } = req.body;
  const { blogid } = req.query;
  let updateFields = [];
  let updateValues = [];
  let queryIndex = 1;

  if (!title && !content) {
    return res.status(400).json({
      message:
        'At least one field (title or content) must be provided for update',
    });
  }

  if (title) {
    updateFields.push(`title = $${queryIndex++}`);
    updateValues.push(title);
  }

  if (content) {
    updateFields.push(`content = $${queryIndex++}`);
    updateValues.push(content);
  }
  updateFields.push(`lastEditedBy = $${queryIndex++}`);
  updateValues.push(name);

  updateFields.push(`isLocked = $${queryIndex++}`);
  updateValues.push(false);

  updateValues.push(blogid);

  try {
    const updateQuery = `
      UPDATE blogs 
      SET ${updateFields.join(', ')}
      WHERE blogid = $${queryIndex}`;

    const blog = await pool.query(updateQuery, updateValues);

    if (blog.rowCount == 1) {
      return res.status(201).json({
        message: 'Blog updated successfully',
      });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: err,
    });
  }
};

const lockUpdate = async (req, res) => {
  const lockedAt = Date.now();
  const { name, type } = req.body;
  const { blogid } = req.query;

  try {
    let blog;
    let isLocked;
    if (type == 'unlock') {
      isLocked = false;
      let blogDetails = await pool.query(
        `select * from blogs where blogid=$1`,
        [blogid],
      );
      if (blogDetails.rows[0].isLocked == true) {
        blog = await pool.query(
          `UPDATE blogs SET isLocked=$1 where blogid=$2`,
          [isLocked, blogid],
        );
      } else {
        return res.status(401).json({
          message: 'it is already unlock!!',
        });
      }
    } else {
      isLocked = true;
      blog = await pool.query(
        `UPDATE blogs SET lockedBy= $1, lockedAt=$2, isLocked=$3 where blogid=$4`,
        [name, lockedAt, isLocked, blogid],
      );
    }
    console.log("blog ::: ", blog);
    if (blog.rowCount == 1) {
      return res.status(201).json({
        message: 'Blog updated successfully',
      });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: err,
    });
  }
};

const archiveBlog = async (req, res) => {
  const archive = 1;
  const { blogid } = req.body;
  try {
    const blog = await pool.query(
      `UPDATE blogs
          SET archive = $1
          WHERE blogid=$2`,
      [archive, blogid],
    );
    if (blog.rowCount == 1) {
      return res.status(200).json({
        message: 'Archive Successfully!!',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: err.detail,
    });
  }
};

module.exports = {
  getAllBlogs,
  getSpecificBlogs,
  createBlog,
  updateBlog,
  archiveBlog,
  lockUpdate,
};
