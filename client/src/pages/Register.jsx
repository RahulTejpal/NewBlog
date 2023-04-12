import { useState } from 'react' 
import {
    Grid, TextField, Button, Typography,
    CssBaseline, Container, Box, Avatar,
    InputAdornment
} from '@mui/material'

import {useNavigate, Link} from 'react-router-dom'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


export default function Register(){
    const navigate = useNavigate()
    const [user,setUser] = useState({
        firstName: 'Peter', lastName: 'Pan',email: 'peterpan@mail.com',password: 'Password123',confirmPassword: 'Password123',
    })

    const [showPassword,setShowPassword] = useState({
        password: false, confirmPassword: false
    })
    const handleRegister = () =>{
        alert(JSON.stringify(user,null,4))
    }
    return(
       <Container maxWidth="xs">
        <CssBaseline/>

        <Box
            sx={{
                marginTop: 8,display: 'flex',
                flexDirection: 'column', alignItems: 'center'
            }}
        >
            <Avatar sx={{m:1, backgroundColor: 'secondary.main'}}>
            <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
            Register
        </Typography>
        <Grid container spacing={2}  sx={{mt: 3}}> 
            <Grid  item xs={12} sm={6}>
                <TextField 
                    label="First Name"
                    value={user.firstName} name='firstaName'
                    onChange={(e) => setUser({...user, firstName: e.target.value})}
                />
            </Grid>

            <Grid  item xs={12} sm={6}>
                <TextField 
                    placeholder='Enter your last name' name='lastName'
                    label="Last Name" value={user.lastName} 
                    onChange={(e) => setUser({...user, lastName: e.target.value})}
                />
            </Grid>
            <Grid  item xs={12}>
                <TextField 
                    placeholder='Enter Your Email' name='email'
                    label="Email" value={user.email} 
                    onChange={(e) => setUser({...user, email: e.target.value})}
                />
            </Grid>
            <Grid  item xs={12}>
                <TextField 
                    placeholder='Enter Password' name='password'
                    label="password" value={user.password} 
                    type={showPassword.password ? 'text': 'password'}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    InputProps={{
                        endAdornment: <InputAdornment position="end" onClick={()=> setShowPassword({...showPassword,password: !showPassword.password})}>
                            {!showPassword.password ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                        </InputAdornment>,
                      }}
                />
            </Grid>
            <Grid  item xs={12} >
                <TextField 
                    placeholder='Confirm Password' name='confirmPassword'
                    label="confirmPassword" value={user.confirmPassword} 
                    type={showPassword.confirmPassword ? 'text': 'password'}
                    onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                    InputProps={{
                        endAdornment: <InputAdornment position="end" onClick={()=> setShowPassword({...showPassword,confirmPassword: !showPassword.confirmPassword})}>
                            {!showPassword.confirmPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                        </InputAdornment>,
                    }}
                />
            </Grid>
            
               
           
        </Grid>
        <Button 
        onClick={handleRegister}
        fullWidth sx={{
            mt: 3, mb: 2
        }}>
            Register
            </Button>

        <Grid container justifyContent="flex-end">
            <Grid item>
                <Link to="/login">
                    Already have an account? Sign in
                </Link>
            </Grid>
            </Grid>    
        </Box>
        
       </Container>
    )
}