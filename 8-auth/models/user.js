const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/authtestapp"); //connects your app to a local MongoDB database.

const userSchema = mongoose.Schema({  //You define a Schema
    username:String,
    email:String,
    password:String,
    age:Number
});

module.exports = mongoose.model("user",userSchema); // user nam ka model banaya userSchema k based phir export ker diya. yaha pe rmodule isliye use kiya he kyuki her file ko js module manta he
