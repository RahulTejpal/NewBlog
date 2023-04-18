const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    },
    
},{
    timestamps: true,
}
)

module.exports = mongoose.model('Blog',BlogSchema);//mongoose model name=Blog created by compiling BlogSchema using mongoose.module()
//model is an interface to the database , allows us to query data in collection
//Once the model is created, we can use it to perform CRUD (Create, Read, Update, Delete) operations on the blogs collection in the MongoDB database.