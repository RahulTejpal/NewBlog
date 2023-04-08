const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colors = require('colors');

//@route POST api/users/register
// @desc Register a user
//@access public
const registerUser = async (req,res) => {
    res.send('Register a user');
}

//@route POST api/users/login
//@desc Register a user
//@access Public
const loginUser = async (req,res) => {
    res.send('Login a user');
}

//@route GET api/users/profile
//@desc Get user profile
//@access Private
const getProfile = async (req,res) => {
    res.send('Get user profile');
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
} 