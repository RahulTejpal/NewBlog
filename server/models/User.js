const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({ //defining the structure of a User document in the database, including its fields and their data types.


    firstName: { //Each field key(firstName) - value(type) pair
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},{
    timestamps: true, //adds createdAt and updatedAt fields to the User doc that are automatically updated whenever the doc is created or updated.
}
)

module.exports = mongoose.model('User',UserSchema); // UserSchema object is exported as a Mongoose model using the mongoose.model() method.
//This creates a new model that can be used to interact with User collection in the MongoDB database,and provides range of methods for creating, updating, querying, and deleting User documents.