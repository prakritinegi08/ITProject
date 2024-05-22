const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/StarQuest");

//check database connected or not
connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});

const LoginSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});


//collection part
const collection = new mongoose.model("users", LoginSchema);

 module.exports = collection;
