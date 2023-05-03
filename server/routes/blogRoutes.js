const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware');

const{
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    getAllBlogs
    
} = require('../controllers/blogController')  //ROUTES ARE LINKED TO THEIR CORRESPONDING CONTROLLER FUNCTIONS

//only authenticated users can access the routes

router.get('/get-all-user-blogs',getAllBlogs);

router.get('/',[auth],getBlogs);    //Fetch all blogs belonging to the authenticated user.

router.post('/',[auth],createBlog); //Create a new blog for the authenticated user.

router.put('/:id',[auth],updateBlog);// Update existing blog that belongs to authenticated user.:id URL parameter specifies the ID of blog to update.

router.delete('/:id',[auth],deleteBlog);  //Delete an existing blog that belongs to the authenticated user. The :id URL parameter specifies the ID of the blog to delete

router.get('/:id',[auth],getBlogById); //Fetch a single blog that belongs to the authenticated user. The :id URL parameter specifies the ID of the blog to fetch. 


module.exports = router;