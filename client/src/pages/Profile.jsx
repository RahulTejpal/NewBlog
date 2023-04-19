import {useState, useEffect} from 'react'
import{
    Container, Stack, TextField, Box, Button
} from '@mui/material'

import { useAuth } from '../middleware/contextHooks'

//------------------region-----componenets-----------
import MainContainer from '../components/MainContainer'
//---------------------end region--------------------

export default function Profile(){
    const [profile,setProfile] = useState({})//variable to hold our user

    return(
        
        <MainContainer>
            <Container maxWidth="md" sx={{my: 3}}>
                <Stack spacing={2}>
                    <Box sx={{display: 'flex', justifyContent:'flex-end'}}>
                        <Button>Edit</Button>
                    </Box>

                    <TextField 
                        label="First Name" name='firstName'
                        value={profile.firstName}
                        onChange={(e)=> setProfile({...profile, firstName: e.target.value})}
                    />

                    <TextField 
                        label="Last Name" name='lastName'
                        value={profile.lastName}
                        onChange={(e)=> setProfile({...profile, lastName: e.target.value})}
                    />

                    <TextField 
                        label="Location" name='location'
                        value={profile.location}
                        onChange={(e)=> setProfile({...profile, location: e.target.value})}
                    />

                    <Stack spacing={2} direction='row'>
                        <Button>Update</Button>
                        <Button>Cancel</Button>
                    </Stack>

                </Stack>
            </Container>
        </MainContainer>
    )
}