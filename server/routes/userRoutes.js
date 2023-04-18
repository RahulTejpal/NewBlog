//defines routes for handling user related funcnalities like registering user,loggin in user,& getting user's profile info

const express = require('express') //later used defining routes and handling middleware
const router = express.Router()
const auth = require('../middleware/authMiddleware'); //handle authentication middleware

const{ //importing funcns from userController
    registerUser,
    loginUser,
    getProfile
} = require('../controllers/userController')

//used to define a route for registering a user with the /register URL path. 
router.post('/register',registerUser); //used in url of thunderclient

router.post('/login',loginUser);  //used in url of thunderclient

router.get('/profile',[auth],getProfile);   //here we are privatizing the get profile using [auth] and only for authenticated users

module.exports = router;