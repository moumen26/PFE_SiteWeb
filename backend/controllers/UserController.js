const User = require('../models/UserModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
//jwt secret
const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET_KEY, {expiresIn: '7d'});
}
//login
const Login = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res
                .status(400)
                .json({ message: "Tout les champs doivent etre remplis" });

        }
        await User.findOne({email: email}).then(async (userexist) => {
            if(!userexist){
                return res.status(400).json({ message: "Email non trouvé" });
            }
            if(userexist.validation == false){
                return res.status(400).json({message: "Vous n'êtes pas encore validé"});
            }
            const user = await User.login(email, password);
            const token = createToken(user._id);
            var Fname = user.Fname;
            var speciality = user.speciality;
            var id = user._id;
            var progress = user.progress;
            var Hopital = user.Hopital;
            res.status(200).json({id, Fname, speciality, progress, Hopital, token});
        }).catch((err) => {
            return res.status(400).json({message: err.message});
        });
        
    }catch(err){
        res.status(400).json({message: err.message});
    }
}   

//signup
const Signup = async (req, res) => {
    const { email, password, Lname, Fname, speciality, phone, Hopital} = req.body;
    try{
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // validation
        if(!email || !password || !Lname || !Fname || !speciality || !phone || !Hopital ){
            return res
              .status(400)
              .json({ message: "Tous les champs doivent être remplis" });
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "L'email n'est pas valide"});
        }
        if(!validator.isStrongPassword(password)){
            return res
              .status(400)
              .json({ message: "Mot de passe pas assez fort" });
        }
        await User.findOne({email: email}).then((userexist) => {
            if(userexist){
                return res.status(400).json({ message: "Email déjà utilisé" });
            }
        });
        const newUser = new User({
            email: email,
            password: hash,
            Lname: Lname,
            Fname: Fname,
            speciality: speciality,
            phone: phone,
            Hopital: Hopital,
            validation: false
        });
        await newUser.save().then((user) => {
            const token = createToken(user._id);
            var userFname = user.Fname;
            var userspeciality = user.speciality;
            var id = user._id;
            var Hopital = user.Hopital;
            res.status(200).json({
              id,
              Fname: userFname,
              speciality: userspeciality,
              Hopital: Hopital,
              token,
              message:
                "Succès de l'inscription attendez votre validation",
            });
        }).catch((err) => {
            return res.status(400).json({message: err.message});
        });
    }catch(err){
        res.status(400).json({message: err.message});
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
        return res.status(400).json({ message: "L'identifiant spécifié n'est pas valide" });
    }
    // Find the user by ID in the database
    await User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
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
        return res.status(400).json({err: 'Utilisateur non trouvé'});
    }
    //find id in db and delete
    const user = await User.findByIdAndDelete({_id: id});
    //if not found return error
    if(!user){
        return res.status(404).json({err: 'Utilisateur non trouvé'});
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
            return res.status(400).json({err: 'Utilisateur non trouvé'});
        }
        //find id in db and update
        const user = await User.findOneAndUpdate({_id: id},
            {DateDeNaissance, sexe, LieuDeNaissance, AddressActuel, Biographie, progress}
        );
        //if not found return error
        if(!user){
            return res.status(404).json({err: 'Utilisateur non trouvé'});
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
            return res.status(400).json({err: 'Utilisateur non trouvé'});
        }
        User.updateMany({_id: id}, {
            $push: {ProfileIMG : ProfileIMG}}).then((image) => {
                if (!image) {
                    return res.status(404).json({ message: 'Utilisateur non trouvé' });
                }
                res
                  .status(200)
                  .json({ message: "Image téléchargée avec succès" });
            }).catch((error) => {
                return res
                  .status(500)
                  .json({ message: "Échec de la mise à jour du patient" });
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