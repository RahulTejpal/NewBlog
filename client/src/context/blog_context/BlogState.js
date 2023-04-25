import { createContext, useReducer } from "react";
import axios from "axios";
import blogReducer from "./blogReducer";
import * as ActionTypes from '../ContextActions';

export const BlogContext = createContext();

export default function BlogState(props){
    const initialState = {
        blogs: null,
        currentBlog: null,
        toasts: null,
        blogCreated: false
    }

    const [state,dispatch] = useReducer(blogReducer,initialState);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
        }
    }

    const getBlogs = async () => { //get all blogs
        try{
            const res = await axios.get('http://localhost:5000/api/blogs',config);
            dispatch({
                type: ActionTypes.GET_BLOGS_SUCCESS,
                payload: res.data
            })
        }
        catch(err){
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })

        }
    }

    const getBlogById = async (blogId) => { //get a particular blog
        try{
            const res = await axios.get(`http://localhost:5000/api/blogs/${blogId}`,config);
            dispatch({
                type: ActionTypes.GET_BLOG_BY_ID,
                payload: res.data
            })
        } catch(err){
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createBlog = async (blogData) => {
        try{
            const res = await axios.post('http://localhost:5000/api/blogs',blogData,config);
            dispatch({
                type: ActionTypes.NEW_BLOG_SUCCESS,
                payload: res.data
            })
        }
        catch(err){
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }

    const updateBlog = async (blogData) => {
        try{
            const res = await axios.put(`http://localhost:5000/api/blogs/${blogData._id}`,blogData,config);//gonna get blog id from blogData, config we have token used to authenticate
            dispatch({
                type: ActionTypes.UPDATE_BLOG,
                payload: res.data
            })
        }
        catch(err){
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deleteBlog = async (blogId) => {
        try{
            const res = await axios.delete(`http://localhost:5000/api/blogs/${blogId}`,config);
            dispatch({
                type: ActionTypes.BLOG_DELETE,
                payload: res.data
            })
        }
        catch(err){
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOG_FAIL,
                payload: err.response.data,
            })
        }
    }

    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const clearBlogs = async () => {
        dispatch({
            type: ActionTypes.CLEAR_BLOGS
        })
    }

    const clearCurrentBlog = () =>{
        dispatch({type: ActionTypes.CLEAR_CURRENT_BLOG})
    }

    return(
        <BlogContext.Provider value={{
            blogs: state.blogs,
            currentBlog: state.currentBlog,
            toasts: state.toasts,
            blogCreated: state.blogCreated,

            clearCurrentBlog,
            getBlogs,
            getBlogById,
            createBlog,
            updateBlog,
            deleteBlog,
            clearErrors,
            clearBlogs, //run this one whenever we'll logout
        }}>
            {props.children}
        </BlogContext.Provider>
    )
}