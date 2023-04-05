require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersroutes = require('./routes/users');
const User = require('./models/UserModel');
//express app
const app = express();
 
//midleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/user', usersroutes); 

//connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connect to database and listening on port ', process.env.PORT);
        });
    }).catch((err) => {
        console.log('error connecting to db', err);
});

