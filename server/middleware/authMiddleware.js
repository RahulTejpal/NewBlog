const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //check for the token 
    const token = req.header('x-auth-token');

    //check if not token =>token not found
    if(!token) return res.status(401).json([{message: 'No token, authorization denied', type: 'error'}]);

    //verify token => token found
    try{
        //If the token is valid, the decoded payload (which includes the user property) is stored in the decoded variable.
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifies the validity of the JWT token by decoding it with the secret key stored in the JWT_SECRET environment variable.
        req.user = decoded.user; //The req.user property is set to the decoded.user value, which can then be used in subsequent middleware functions or routes to identify the authenticated user.
        next(); // pass the control to next middleware function in request processing pipeline
    }
    catch(err){
        res.status(401).json([{message: 'Token is not valid', type: 'error'}]);
    }
}