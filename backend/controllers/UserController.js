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
        await User.findOne({email: email}).then(async (userexist) => {
            if(!userexist){
                return res.status(400).json({message: 'email not found'});
            }
            if(userexist.validation == false){
                return res.status(400).json({message: 'you are not validated yet'});
            }
            const user = await User.login(email, password);
            const token = createToken(user._id);
            var Fname = user.Fname;
            var speciality = user.speciality;
            var id = user._id;
            var progress = user.progress;
            res.status(200).json({id, Fname, speciality, progress, token});
        }).catch((err) => {
            console.log(err)
        });
        
    }catch(err){
        res.status(400).json({err: err.message});
    }
}   

//signup
const Signup = async (req, res) => {
    const { email, password, Lname, Fname, speciality, phone} = req.body;
    try{
        const user = await User.signup(email, password, Lname, Fname, speciality, phone);
        const token = createToken(user._id);
        var userFname = user.Fname;
        var userspeciality = user.speciality;
        var id = user._id;
        res.status(200).json({id, Fname :userFname, speciality: userspeciality, token});
        
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the user by ID in the database
    await User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
            res.status(200).json(user);
        })
        .catch((error) => {
            console.error('Error retrieving user:', error);
            res.status(500).json({ message: 'Error retrieving user' });
        });
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
    const {DateDeNaissance,LieuDeNaissance, sexe, AddressActuel, Biographie, progress} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'user not found'});
        }
        //find id in db and update
        const user = await User.findOneAndUpdate({_id: id},
            {DateDeNaissance, sexe, LieuDeNaissance, AddressActuel, Biographie, progress}
        );
        //if not found return error
        if(!user){
            return res.status(404).json({err: 'user not found'});
        }
        //return user
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

// upload image to db
const uploadImage = async (req, res) => {
    const {id} = req.params;
    const {ProfileIMG} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'user not found'});
        }
        User.updateMany({_id: id}, {
            $push: {ProfileIMG : ProfileIMG}}).then((image) => {
                if (!image) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ message: 'Image uploaded successfully' });
            }).catch((error) => {
                return res.status(500).json({ message: 'Failed to update patient' });
            });
    }catch(err){
        res.status(400).json({err: err.message});
    }
}
module.exports = {
    Login,
    Signup,
    GetAllUsers,
    GetUser,
    CreateNewUser,
    DeleteUser,
    UpdateUser,
    uploadImage
}