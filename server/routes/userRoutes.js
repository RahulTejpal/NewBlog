const express = require('express')
const router = express.Router()

const{
    registerUser,
    loginUser,
    getProfile
} = require('../controllers/userController')

router.post('/register',registerUser); //used in url of thunderclient

router.post('/login',loginUser);  //used in url of thunderclient

router.get('/profile',getProfile);   //used in url of thunderclient

module.exports = router;