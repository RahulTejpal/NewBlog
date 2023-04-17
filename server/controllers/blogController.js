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
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const getBlogById = async (req,res) => {
    try{
        const blog = await Blog.findOne({_id: req.params.id, user: req.user.id});

        if(!blog) return res.status(404).json([{
            message: 'Blog Not Found',
            type: 'error'
        }])
        res.json(blog);
    } catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
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

        await newBlog.save();

        if(!newBlog) return res.status(400).json([{message: 'Blog not created', type: 'error'}]);

        res.json(newBlog);
    }
    catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const updateBlog = async (req,res) =>{
    try{
        const {title,content} = req.body;
        const blog = await Blog.findOneAndUpdate({_id: req.params.id, user: req.user.id}, {title,content},{new: true}); //node is gonna pull up the id from blog id from request parameters && its also gonna pull user the token
        res.json(blog);
    }
    catch(err){

        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const deleteBlog = async (req,res) =>{
    try{
        const blog = await Blog.findOneAndDelete({_id: req.params.id, user: req.user.id});
        res.json({
            blogId: req.params.id,
            toasts: [{message: 'Blog deleted', type: 'success'}]
        });
    }
    catch(error){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    deleteBlog,
    updateBlog,
    createBlog,
    getBlogs,
    getBlogById
}