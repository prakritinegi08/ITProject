const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const collection = require("./config");
const Booking = require("./bookings");

const app = express();

//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//use EJS as the view engine
app.set('view engine', 'ejs');

//static file
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("css"));


app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get('/booking', (req, res) => {
     res.render("booking");
 });

app.get('/', (req, res) => {
    res.render("login");
});
// app.get('/home', (req, res) => {
//     res.render('home', { section: 'about' }); // Renders the home.ejs file
//   });
app.get('/destinations', (req, res) => {
    res.render("destinations");
});
app.get('/gallary', (req, res) => {
    res.render("gallary");
});
app.get('/spiti', (req, res) => {
    res.render("spiti");
});
app.get('/neil', (req, res) => {
    res.render("neil");
});
app.get('/lachen', (req, res) => {
    res.render("lachen");
});
app.get('/pangong', (req, res) => {
    res.render("pangong");
});
app.get('/sonmarg', (req, res) => {
    res.render("sonmarg");
});
app.get('/contact', (req, res) => {
    res.render("contact");
});


app.post("/signup", async(req, res) => {
    const data = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    }
    

    //check if the user already exisit in the database
    const existingUser = await collection.findOne({email: data.email});
    if(existingUser){
        res.send("User already exists. please choose a different email.");
    }
    else{
        //hash the password bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);

        data.password = hashedPassword; //replace the hash password with original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.redirect("/");
    }

    
});

//login user
app.post("/login", async(req, res) => {
    try{
        const check = await collection.findOne({email: req.body.email});
        if(!check){
            // res.send("User name cannot found");
            return res.send("<script>alert('User not found');</script>");

        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            
             res.render("home");
            

            
        }
        else{
            // req.send("Wrong Password");
            return res.send("<script>alert('Wrong Password');</script>");
        }
    }
    catch{
        res.send("Wrong Details");
    }

});

app.post("/booking", async (req, res) => {
    try {
        const data = {
            tourname: req.body.tourname,
            tourdate: req.body.tourdate,
            duration: req.body.duration,
            people: req.body.people,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            totalprice: req.body.totalprice
        };
        
        // Save the booking data to the database
        const bookingData = await Booking.create(data);

        // Redirect the user to a success page or send a success message
        // res.redirect('back'); // Redirect to a success page
        const script = "<script>alert('Booking submitted successfully');</script>";

        // Redirect the user to a success page or send a success message
        res.send(script);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred. Please try again later.");
    }
});



const port = 5000;
app.listen(port, () =>{
    console.log(`server running on Port: ${port}`);
})