import React,{useState,useEffect} from 'react'

import {
    Grid, Paper,Typography, Button, Container, Stack, Tooltip,Box, List,ListItem, ListItemText
} from '@mui/material'

import Masonry from '@mui/lab/Masonry'

import { useNavigate, Link } from 'react-router-dom'

import { useBlog } from '../middleware/contextHooks'
import MainContainer from '../components/MainContainer'
import { toast } from 'react-toastify';

import BlogCard from '../components/BlogCard'

export default function BlogList(){
    const {getBlogs,toasts,clearErrors,blogs,clearCurrentBlog} = useBlog();
    const navigate = useNavigate();
    const [myBlogs,setMyBlogs] = useState([]);

    useEffect(()=> {
        if(!blogs){
            getBlogs()
        }else{
            setMyBlogs(blogs)
        }

        // if(toasts){
        //     toasts.forEach(ele => {
        //         toast(ele.message, {type: ele.type})
        //     });
        //     clearErrors();
        // }
    },[toasts, clearErrors,blogs, getBlogs])

    const onCreateNewBlog = () => {
        clearCurrentBlog();
        navigate('/newBlog')
    }

    return(
        <MainContainer>
           <Container maxWidth="lg" sx={{py: 1,my:1}}>
                <Grid container spacing={2}>
                    <Grid item xs = {false} md={3}>
                        
                            

                            <List sx={{ borderRadius: 5, mt: 3}}>
                                {myBlogs?.map(blog=> (
                                    <Link 
                                    style={{textDecoration: 'none'}}
                                    to={`/blogs/${blog._id}`} key={blog._id}>
                                        <ListItem>
                                            <Tooltip title={blog.title} placement='right'>
                                                <ListItemText primary={blog.title} />
                                            </Tooltip>
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        
                    </Grid>

                    <Grid item xs={12} md={9}>
                   
                                <Box sx={{flexGrow: 1}} >
                                <Button fullWidth={false} onClick={onCreateNewBlog} sx={{ mb: 3}}>Create Blog</Button>
                                </Box>
                            
                            <Masonry columns={2}>
                                    {myBlogs?.map(blog=> (
                                        <BlogCard blog={blog} key={blog._id} />
                                    ))}
                            </Masonry>
                    </Grid>
                </Grid>
           </Container>
        </MainContainer>
    )
}