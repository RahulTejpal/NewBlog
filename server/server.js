const express=require('express');
const colors=require('colors');
const mongoose=require('mongoose'); //helps in connecting to mongodb database
const PORT=process.env.PORT || 5000; //server port =5000
const dotenv=require('dotenv').config();

const app=express();

app.use(express.json({extended:false})); //ADD NOTES =>Middlewares

const username=process.env.DB_USERNAME;//environment variable from .env file
const password=process.env.DB_PASSWORD;//environment variable from .env file
const URL=`mongodb+srv://${username}:${password}@blogapp.hlgonf7.mongodb.net/?retryWrites=true&w=majority`; // using environment variables to hide sensitive info like dab credentials(hardcoding them can pose security issues if code is ever shared or exposed)

const connectDB=async()=>{ //connection to db
    try{
        const conn=await mongoose.connect(URL,{useNewUrlParser:true}); //func called with constructed URL and some connection options
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold); //sucessful connection => o/p = hostname of connected MongoDB instance
    }catch(error){
        console.log(`ERROR: ${error.message}`.bgRed.underline.bold);
        process.exit(1);
    }
}

connectDB();

app.use ('/api/users', require('./routes/userRoutes')); //when we call /api/users our server is going to recieve it, it's going to look into our routes folder, it's going to pull up userRoutes and userRoutes will act like a traffic cop as it will forward it to wherever it needs to go
app.use('/api/blogs',require('./routes/blogRoutes'));

app.listen(PORT,()=>console.info(`Server in running on port ${PORT}`.bgGreen.underline.bold));