import {useState,useEffect} from 'react'
import MainContainer from '../components/MainContainer'
import { useParams } from 'react-router-dom'
import {
    Container, Paper,Button, TextField, Stack, IconButton,Typography
} from '@mui/material'
import {toast} from 'react-toastify'

import { useBlog } from '../middleware/contextHooks' 

export default function BlogDetail(){
    const {id} = useParams();
    const {currentBlog, getBlogById, toasts, clearToasts} = useBlog();

    const [blog,setBlog] = useState(null);

    useEffect(() =>{
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
        
    }, [currentBlog, id, toasts, clearToasts, getBlogById])
    return(
        <MainContainer>
            <Container maxWidth='md' sx={{mt:3,mb:5}}>
                <Paper>
                    <Stack spacing={2}>
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
                            <Button variant='contained'>Save</Button> 
                            <Button variant='outlined'>Cancel</Button> 
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </MainContainer>
    )
}