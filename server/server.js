const express=require('express');
const colors=require('colors');
const mongoose=require('mongoose');
const PORT=process.env.PORT || 5000;
const dotenv=require('dotenv').config();

const app=express();

app.use(express.json({extended:false}));

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
const URL=`mongodb+srv://${username}:${password}@blogapp.hlgonf7.mongodb.net/?retryWrites=true&w=majority`;

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(URL,{useNewUrlParser:true});
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    }catch(error){
        console.log(`ERROR: ${error.message}`.bgRed.underline.bold);
        process.exit(1);
    }
}

connectDB();



app.listen(PORT,()=>console.info(`Server in running on port ${PORT}`.bgGreen.underline.bold));