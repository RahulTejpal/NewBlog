const User = require('../models/User');
const bcrypt = require('bcryptjs'); //encrypts the password => password hashing
const jwt = require('jsonwebtoken');
const colors = require('colors');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
const registerUser = async (req,res) => { //asynchronous funcn handling logic for registering new user -> 2 parameters in funcn = request & response
    try{
        const {firstName,lastName, email, password} = req.body;//incoming req object is parsed to extract the user's registration details such as firstName, lastName, email, and password
        let toasts = []; //empty array initially declared to hold messages that can be displayed to the user as alerts/notification
        if(!firstName) toasts.push({message: 'First name is required', type: 'error'});
        if(!lastName) toasts.push({message: 'Last name is required', type: 'error'});

        if(!password) toasts.push({message: 'A valid password is required', type: 'error'});
        if(password && (password.length<8 || password.length>12)) toasts.push({message: 'Password must be at least 8-12 characters long',type:'error'});

        if(!email || !validatedEmail(email)) toasts.push({message: 'A valid email is required', type: 'error'});

        if(toasts.length>0) return res.status(400).json(toasts); //in case of error send 400 status code as response along with error msgs

        let newUser = await User.findOne({email}); //to check if user already exists |await keyword used to wait for MongoDB server to return result before moving on to next line of code. 

        if(newUser) return res.status(400).json([{message: 'User already exists',type: 'error'}]); 

        newUser = new User(req.body);

        //Hash password before saving into database
        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password,salt);

        await newUser.save();

        
        

        const payload = { //creates a payload object that will be used to create a JSON Web Token (JWT)
            user: { //payload contains 'user' property
                id: newUser._id //user contains 'id' property
            }
        }
        //This code is creating a JSON Web Token (JWT) using the jwt.sign method from the jsonwebtoken package. 
        //The JWT is created after a new user has been successfully registered, and will be sent back as a response to the client
        jwt.sign(payload, process.env.JWT_SECRET,{ //payload: This is the data object that will be encoded into the JWT. (here it contains user property)
            //process.env.JWT_SECRET: This is a secret key that is used to sign the JWT.
            //The JWT_SECRET environment variable is being used here to keep the secret key secure and not hard-coded in the code.
            expiresIn: 28800
        }, (err,token) =>{ //callback funcn executed after jwt creation.
            if(err) throw err; //if err during creation 
            res.json(token);// else jwt passed to 'token' parameter & sent back as response to client using 'res.json(token)'
        }
        )

        
    }
    catch(err){
        console.error(`Error: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

//@route POST api/users/login
//@desc Register a user
//@access Public
const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body;
        let toasts = [];
        if(!password) toasts.push({message: 'A valid password is required', type: 'error'});
        if(password && (password.length<8 || password.length>12)) toasts.push({message: 'Password must be at least 8-12 characters long',type:'error'});

        if(!email || !validatedEmail(email)) toasts.push({message: 'A valid email is required', type: 'error'});
        
        if(toasts.length>0) return res.status(400).json(toasts);

        let user = await User.findOne({email});

        if(!user) return res.status(400).json([{message: 'User does not exist',type:'error'}]);

        const isMatch = await bcrypt.compare(password, user.password); //matching the password

        if(!isMatch) return res.status(400).json([{message: 'Invalid credentials',type: 'error'}]); //if password doesn't match

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: 28800
        }, (err,token) =>{
            if(err) throw err;
            res.json(token);
        }
        )

        
    }
    catch(err){
        console.error(`Error: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

//@route GET api/users/profile
//@desc Get user profile
//@access Private
const getProfile = async (req,res) => { //getting the user profile through the token & user only have access to their own profile
    
    try{
        //retrieves user from db(excluding password,__v,createdAt,updatedAt)
        //User.findById(req.user.id) retrieves a user document from the database using the user ID stored in the req.user object
        //, which was added by the authMiddleware that was applied to the route.
        const user = await User.findById(req.user.id).select('-password').select('-__v').select('-createdAt').select('-updatedAt');

        if(!user) return res.status(404).json([{message: 'User does not exist', type: 'error'}]);
        res.json(user);
    }
    catch(err){
        console.error(`Error: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }

}

const updateUser = async (req,res) => {
    try{
        const userId = req.params.id;

        if(userId!== req.user.id){
            return res.status(401).json([{message: 'Unauthorized Action', type: 'error'}]);
        }

        let user = await User.findOneAndUpdate({_id: userId}, req.body, {new:true});

        if(!user) return res.status(404).json([{message: 'User does not exist', type: 'error'}]);

        res.json(user);

    }
    catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

function validatedEmail(email){
    const regex =/\S+@\S+\.\S+/;
    //validatedmail@mail.com returns true whereas validemail.mail.com returns false
    return regex.test(email);
}


module.exports = { //used in 'routes/users.js'
    registerUser,
    loginUser,
    getProfile,
    updateUser
} 