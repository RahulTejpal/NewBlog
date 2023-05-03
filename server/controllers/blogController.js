const Blog = require('../models/Blog');
const colors = require('colors');
const logger = require("../utils/logger");



// @desc Get all blogs by user id
// @route '/api/blogs
// @access Private
const getBlogs = async (req,res) => { //used to retrieve all blogs from database of current authenticated user
    logger.log({
        level: "info",
        message: "getBlogs called",
    });
    try{
        const blogs = await Blog.find({user: req.user.id}); //Blog.find() helps us to retrieve the blogs of currently authenticated user
        res.json(blogs);//funcn returnning json response containing blogs retrieved from db
        logger.log({
            level: "info",
            message: "blogs succesfully fetched",
        });
    }
    catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
        logger.log({
            level: "info",
            message: "Error fetching blogs",
        });
    }
}

const getAllBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find({});
        // console.log(blogs[1].title)
        res.json(blogs);
    }catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const getBlogById = async (req,res) => { //tries to find single blog 
    logger.log({
        level: "info",
        message: "getBlogById called",
    });
    try{
        //searches blog with specified '_id' thats extracted from the request parameters && 
        //user property matches the id value of the currently authenticated user (which is stored in req.user.id).
        //both blog id and user id used in parameters so that blogs to a particular authenticated user only is fetched
        const blog = await Blog.findOne({_id: req.params.id, user: req.user.id});//finding single blog using by blog id and authentiacted user id

        if(!blog) return res.status(404).json([{
            message: 'Blog Not Found',
            type: 'error'
        }])
        res.json(blog);
        logger.log({
            level: "info",
            message: "Blog successfully fetched",
        });
    } catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
        logger.log({
            level: "info",
            message: "Couldn't fetch blog",
        });
    }
}

const createBlog = async (req,res) => {
    logger.log({
        level: "info",
        message: "createBlog called",
    });
    try{
        const{title,content} = req.body; // extracts title and content fields from req body
        const newBlog = new Blog({ //creating new instance of Blog model 
            title,
            content,
            user: req.user.id //this will be fetched with the help of the token that we sent in the header of the thunder client 
            //sets the user field to req.user.id.
            //The req.user.id is added to the Blog model to associate the newly created blog post with the user who is currently logged in. 
            //req.user is defined in MIDDLEWARE to tell that the user is authorized
        });

        await newBlog.save();

        if(!newBlog) return res.status(400).json([{message: 'Blog not created', type: 'error'}]);

        res.json(newBlog);

        logger.log({
            level: "info",
            message: "Blog successfully created",
        });
    }
    catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');

        logger.log({
            level: "info",
            message: "Couldn't create new blog",
        });
    }
}

const updateBlog = async (req,res) =>{
    logger.log({
        level: "info",
        message: "updateBlog called",
    });
    try{
        const {title,content} = req.body;
        //_id is taken from request parameters while 'user' is taken from JWT token
        //findOneAndUpdate has new values of title and content & new:true=> return updated blog post
        const blog = await Blog.findOneAndUpdate({_id: req.params.id, user: req.user.id}, {title,content},{new: true}); //node is gonna pull up the id from blog id from request parameters && its also gonna pull user the token
        res.json(blog);

        logger.log({
            level: "info",
            message: "Blog Updated",
        });
    }
    catch(err){

        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');

        logger.log({
            level: "info",
            message: "Couldn't create blog",
        });
    }
}

const deleteBlog = async (req,res) =>{
    logger.log({
        level: "info",
        message: "deleteBlog called",
    });
    try{
        const blog = await Blog.findOneAndDelete({_id: req.params.id, user: req.user.id});
        res.json({ //successful deletion => response = send blog id and blog deleted msg
            blogId: req.params.id,
            toasts: [{message: 'Blog deleted', type: 'success'}]
        });

        logger.log({
            level: "info",
            message: "Blog Deleted",
        });
    }
    catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');

        logger.log({
            level: "info",
            message: "Couldn't delete blog",
        });
    }
}

module.exports = {
    deleteBlog,
    updateBlog,
    createBlog,
    getBlogs,
    getBlogById,
    getAllBlogs
}