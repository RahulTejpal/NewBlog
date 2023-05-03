import { useState, useEffect } from 'react';
import { Grid, Typography, Container, CssBaseline, Box, Avatar, Paper, AppBar,Toolbar,Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { toast, toasts } from 'react-toastify';
import axios from 'axios';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/blogs/get-all-user-blogs')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getDate = (createdAt) => {
    const date = new Date(createdAt).toISOString().split("T")[0];
    return date;
  }

  return (


    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Blog
        </Typography>
        <Button component={Link} to="/login" style={{color: "white", backgroundColor:"black"}}>Login</Button>
      </Toolbar>
    </AppBar>

    <Container maxWidth="md">
      <CssBaseline />
      <Box mt={5} display="flex" justifyContent="center">
        <Avatar alt="Blog Posts" src="./blogimagetools.jpg" sx={{ width: 250, height: 250 }} />
      </Box>
      <Box mt={5}>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Blog Posts
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h5" component="h2">
                  {blog.title}
                </Typography>
                <Box mt={2}>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {blog.content}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {getDate(blog.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>

    </>
    
  );
}