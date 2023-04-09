const Blog = require('../models/Blog');
const colors = require('colors');


// @desc Get all blogs by user id
// @route '/api/blogs
// @access Private
const getBlogs = async (req,res) => {
    try{
        const blogs = await Blog.find({user: req.user.id});
        res.json(blogs);
    }
    catch(err){
        console.error('ERROR: ${err.message}'.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const createBlog = async (req,res) => {
    try{
        const{title,content} = req.body;
        const newBlog = new Blog({
            title,
            content,
            user: req.user.id //this will be fetched with the help of the token that we sent in the header of the thunder client
        });
        const blog = await newBlog.save();
        res.json(blog);
    }
    catch(err){
        console.error('ERROR: ${err.message}'.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const updateBlog = async (req,res) =>{
    try{
        const {title,content} = req.body;
        const blog = await Blog.findOneAndUpdate({_id: req.params.id, user: req.user.id}, {title,content},{new: true});
        res.json(blog);
    }
    catch(err){

        console.error('ERROR: ${err.message}'.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const deleteBlog = async (req,res) =>{
    try{
        res.send('deleting blog')
    }
    catch(error){

    }
}

module.exports = {
    deleteBlog,
    updateBlog,
    createBlog,
    getBlogs
}