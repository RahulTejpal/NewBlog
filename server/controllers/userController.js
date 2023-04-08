const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colors = require('colors');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
const registerUser = async (req,res) => {
    try{
        const {firstName,lastName, email, password} = req.body;
        let toasts = [];
        if(!firstName) toasts.push({message: 'First name is required', type: 'error'});
        if(!lastName) toasts.push({message: 'Last name is required', type: 'error'});

        if(!password) toasts.push({message: 'A valid password is required', type: 'error'});
        if(password && (password.length<8 || password.length>12)) toasts.push({message: 'Password must be at least 8-12 characters long',type:'erroe'});

        if(!email || !validatedEmail(email)) toasts.push({message: 'A valid email is required', type: 'error'});

        if(toasts.length>0) return res.status(400).json(toasts);

        
        res.json(req.body)
    }
    catch(err){
        console.error('Error: ${err.message}'.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

//@route POST api/users/login
//@desc Register a user
//@access Public
const loginUser = async (req,res) => {
    try{
        res.send('Login a user');
    }
    catch(err){
        console.error('Error: ${err.message}'.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

//@route GET api/users/profile
//@desc Get user profile
//@access Private
const getProfile = async (req,res) => {
    
    try{
        res.send('Get user profile');
    }
    catch(err){
        console.error('Error: ${err.message}'.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }

}

function validatedEmail(email){
    const regex =/\S+@\S+\.\S+/;
    //validatedmail@mail.com returns true whereas validemail.mail.com returns false
    return regex.test(email);
}


module.exports = {
    registerUser,
    loginUser,
    getProfile
} 