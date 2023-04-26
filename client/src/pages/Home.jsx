import {useState, useEffect} from 'react'
import {
    Grid, TextField, Button, Typography,
    CssBaseline, Paper, Box, Avatar,
    InputAdornment
} from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import Copyright
 from '../components/Copyright'
// #region --------------( ICONS )--------------
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// #endregion

import {useAuth} from '../middleware/contextHooks'

export default function Home() {
    const {loginUser, clearErrors, toasts, isAuthenticated} = useAuth();
    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '', password: '',
    })

    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {

        async function getRandomImage() {
            try {
              const response = await axios.get('https://api.unsplash.com/search/photos?page=1&query=blog&client_id=K8FtRr04AKsjkBpydAJwz2tJr_vmao0TxuKU65WxYGc')
              setImageUrl(response.data.results[Math.floor(Math.random()*9)+1].urls.regular);
            } catch (error) {
              console.log(error);
            }
          }
      
          
      
          getRandomImage();

        if(isAuthenticated) navigate('/blogs')

        // if(toasts){
        //     toasts.forEach(ele => {
        //         toast(ele.message, {
        //             type: ele.type
        //         })
        //     });
        //     clearErrors();
        // }
    }, [toasts, isAuthenticated, clearErrors, navigate])

    const handleRegister = () => {
        const { email, password } = user
        if(!email || !password ) {
            toast('Please fill all the fields', {type: 'error'})
            return
        }
        loginUser(user)
    }
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            
            <Grid
                item xs={false}
                sm={4} md={7}
                sx={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        mt: 8, display: 'flex', mx: 4,
                        flexDirection: 'column', alignItems: 'center'
                    }}
                >
                    <Avatar sx={{m: 1, backgroundColor: 'secondary.main'}}>
                        <LockOutlinedIcon  />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    <Grid container spacing={2} sx={{mt: 3}}>
    
                        <Grid item xs={12}>
                            <TextField
                                placeholder='Enter Your Email' name='email' 
                                label='Email' value={user.email} 
                                onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                placeholder='Enter Password' name='password' 
                                label='Password' value={user.password} 
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                                        {!showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </InputAdornment>,
                                }}
                            />
                        </Grid>                      
                    </Grid>
                    <Button 
                        onClick={handleRegister}
                        fullWidth sx={{
                            mt: 3, mb: 2
                        }}
                    >
                        Login
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/register">
                                Don't have an account? Register
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Copyright sx={{mt: 4}} />
            </Grid>
        </Grid>
    );
}