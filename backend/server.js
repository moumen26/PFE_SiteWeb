require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersroutes = require('./routes/users');
const patientsroute = require('./routes/patient');
const body = require('body-parser');
//express app
const app = express();
 
//midleware
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use(body.json({limit: '50mb'}));
app.use(body.urlencoded({limit: '50mb', extended: true}));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/user', usersroutes); 
app.use('/patients', patientsroute); 

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

