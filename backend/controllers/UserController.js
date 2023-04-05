const User = require('../models/UserModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//jwt secret
const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET_KEY, {expiresIn: '7d'});
}
//login
const Login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        var Fname = user.Fname;
        var speciality = user.speciality;
        res.status(200).json({email,Fname,speciality,token});
    }catch(err){
        res.status(400).json({err: err.message});
    }
    res.redirect('/');
}   

//signup
const Signup = async (req, res) => {
    const { email, password, Lname, Fname, speciality, phone, validation} = req.body;
    try{
        const user = await User.signup(email, password, Lname, Fname, speciality, phone, validation);
        const token = createToken(user._id);
        res.status(200).json({email,token});
        
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

//get all users
const GetAllUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users);
}

//get a specific user
const GetUser = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'user not found'});
    }
    //find id in db
    const user = await User.findById(id);
    //if not found return error
    if(!user){
        return res.status(404).json({err: 'user not found'});
    }
    //return user
    res.status(200).json(user);
}

//create a new user
const CreateNewUser = async (req, res) => {
    //get data from request
    const { email, password, Lname, Fname, speciality, phone, validation} = req.body;
    //add to db
    try{
        const user = await User.create({email, password, Lname, Fname, speciality, phone, validation});
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

//delete a user
const DeleteUser = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'user not found'});
    }
    //find id in db and delete
    const user = await User.findByIdAndDelete({_id: id});
    //if not found return error
    if(!user){
        return res.status(404).json({err: 'user not found'});
    }
    //return user
    res.status(200).json(user);
}

//update a user
const UpdateUser = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'user not found'});
    }
    //find id in db and update
    const user = await User.findOneAndUpdate({_id: id},
        {...req.body}
    );
    //if not found return error
    if(!user){
        return res.status(404).json({err: 'user not found'});
    }
    //return user
    res.status(200).json(user);
}

module.exports = {
    Login,
    Signup,
    GetAllUsers,
    GetUser,
    CreateNewUser,
    DeleteUser,
    UpdateUser
}