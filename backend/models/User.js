const mongoose= require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports=mongoose.model("User",UserSchema);


// now when we create the object,the User constructor act as paramiterized constructor and take the req.body as paramters now this constructor has fixed structor defined by the schema of the mongoose and it can take input in that formate only when it is created const user can use the methods of the class User like save()..
// ChatGPT
// Yes, you've got the right idea! Here's a more detailed breakdown of how it works:

// Creating an Object (Instance) with a Parameterized Constructor
// Schema as a Blueprint:

// The schema defines the structure of the data. It specifies what fields the model (class) will have and what types those fields should be.
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     mail: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });
// Model as a Class:

// The model is created using the schema and acts like a class. In Mongoose, mongoose.model("User", UserSchema) defines this model.
// module.exports = mongoose.model("User", UserSchema);
// Parameterized Constructor:

// When you create a new instance of the model using new User(req.body), it works like a parameterized constructor in OOP. The req.body is passed as an argument to this constructor.
// Mongoose uses the schema to validate and structure the incoming data.
// const user = new User(req.body);
// Methods of the Class (Model)
// Once the object (instance) is created, it can use the methods defined by the model (class).
// In Mongoose, these methods include .save(), which saves the instance to the database.
