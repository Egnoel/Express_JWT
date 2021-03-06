//get mongoose package
const mongoose = require('mongoose');

//creating a user schema of how we want our collection to be

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        min:4,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    date:{
        type:Date,
        default:Date.now
    }
});

//export the schema as a module 
module.exports = mongoose.model('User', userSchema);