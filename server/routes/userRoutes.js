const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware');

const{
    registerUser,
    loginUser,
    getProfile
} = require('../controllers/userController')

router.post('/register',registerUser); //used in url of thunderclient

router.post('/login',loginUser);  //used in url of thunderclient

router.get('/profile',[auth],getProfile);   //here we are privatizing the get profile using [auth] 

module.exports = router;