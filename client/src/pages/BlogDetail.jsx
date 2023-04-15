import {useState,useEffect} from 'react'
import MainContainer from '../components/MainContainer'
import { useParams } from 'react-router-dom'
import {
    Container, Paper,Button, TextField, Stack, IconButton,Typography
} from '@mui/material'

export default function BlogDetail(){
    const {id} = useParams();

    const [blog,setBlog] = useState(null);
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