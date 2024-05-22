const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/StarQuest");

// check database connected or not
connect.then(() => {
     console.log("Database connected Successfully");
 })
 .catch(() => {
     console.log("Database cannot be connected");
 });



const BookingSchema = new mongoose.Schema({
    tourname: {
        type: String,
        required: true
    },
    tourdate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    }
});


//collection part

const Booking = new mongoose.model("bookingModels", BookingSchema);


module.exports = Booking;


