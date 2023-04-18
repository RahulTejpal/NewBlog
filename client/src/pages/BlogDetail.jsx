import {useState,useEffect} from 'react'
import MainContainer from '../components/MainContainer'
import { useParams,useNavigate } from 'react-router-dom'
import {
    Container, Paper,Button, TextField, Stack, IconButton,Typography
} from '@mui/material'
import {toast} from 'react-toastify'

// ---------------------------Icons----------------------
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
//------------------ end region--------------------------

import { useBlog } from '../middleware/contextHooks' 

export default function BlogDetail(){
    const {id} = useParams();
    const navigate = useNavigate();
    const {blogs, currentBlog, getBlogById, 
        toasts, clearToasts, deleteBlog, updateBlog,
        getBlogs
    } = useBlog();

    const [edit,setEdit] = useState(false); //for creating a disabled state
    const [temp, setTemp] = useState(null); //temporary blog ==> holds the unedited version 
                                            //so that while editing if we hit cancel button then we can go back to our original unedited version

    const [blog,setBlog] = useState(null);

    useEffect(() =>{
        if(!blogs){
            getBlogs();
        }
        if(!currentBlog || currentBlog?._id!==id){
            getBlogById(id);
        }

        if(currentBlog?._id === id){
            setBlog(currentBlog);
        }
        

        // if(toasts){
        //     toasts.forEach(ele => {
        //         toast(ele.message, {type: ele.type})
        //     })
        // }
        
    }, [currentBlog, id, toasts, clearToasts, getBlogById, blogs, getBlogs])

    const handleDelete = () => {
        deleteBlog(blog._id);
        navigate('/blogs');
        
    }

    const handleEdit = () => {
        setEdit(true);
        setTemp(blog); //creating temp copy of our blog, so whatever state our blog is right now we're going to create a temp copy of it
    }

    const handleCancel = () => {
        setEdit(false);
        setBlog(temp); //resetting blog to temp
    }

    const handleUpdate = () =>{
        updateBlog(blog);
        setEdit(false);
        setTemp(null);
    }


    const displayDisabled = () => {
        return(
            <Stack spacing={2}>
                <Stack spacing={2} direction='row'>
                    <Typography variant='h5' sx={{flexGrow: 1}}>{blog?.title}</Typography>
                    <IconButton onClick={handleEdit}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteForeverIcon/>
                    </IconButton>
                </Stack>
                <Typography variant='p'>{blog?.content}</Typography>
            </Stack>
        )
    }

    return(
        <MainContainer>
            <Container maxWidth='md' sx={{mt:3,mb:5}}>
                <Paper sx={{backgroundColor: !edit? 'silver' : ''}}>
                    {   !edit 
                            ? displayDisabled() //if we're not clicking on edit button we're going to display disable ELSE we'll display the following thing (means we'll then be able to edit after clicking the edit button)
                            : <Stack spacing={2}>  
                                <TextField 
                                    label='Title' name='title'
                                    value={blog?.title} //if blog is not null the value is title
                                    onChange={(e) => setBlog({...blog, title: e.target.value})}
                                />
                                <TextField 
                                    label='Content' name='content'
                                    value={blog?.content}
                                    onChange={(e) => setBlog({...blog, content: e.target.value})}
                                    multiline minRows={5} maxRows={20}
                                />
                                <Stack spacing={2} direction='row'>
                                    <Button variant='contained' onClick={handleUpdate}>Update</Button> 
                                    <Button variant='outlined' onClick={handleCancel}>Cancel</Button> 
                                </Stack>
                            </Stack>
                    }
                </Paper>
            </Container>
        </MainContainer>
    )
}