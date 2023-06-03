const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    progress: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    Lname: {
        type: String,
        required: true,
    },
    Fname: {
        type: String,
        required: true,
    },
    sexe: {
        type: String,
        required: false,
    },
    speciality: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    Hopital : {
        type: String,
        required: false,
    },
    DateDeNaissance: {
        type: String,
        required: false,
    },
    LieuDeNaissance: {
        type: String,
        required: false,
    },
    AddressActuel: {
        type: String,
        required: false,
    },
    Biographie: {
        type: String,
        required: false,
    },
    PatientID: [{
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    }],
    validation: {
        type: Boolean,
    },
    ProfileIMG: [{
        type: String,
    }],
},{timestamps: true});

// static method to signup user
userSchema.statics.signup = async function(email, password, Lname, Fname, speciality, phone, Hopital){
    
    // validation
    if(!email || !password || !Lname || !Fname || !speciality || !phone ){
        throw Error("Tous les champs doivent être remplis");
    }
    if(!validator.isEmail(email)){
        throw Error("L'email n'est pas valide");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Mot de passe pas assez fort");
    }

    // check if email already in use
    const exist = await this.findOne({email});
    
    if(exist){
        throw Error("Email déjà utilisé");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // set validation to false
    const validation = false;
    
    // create user
    const user = await this.create({email, password: hash, Lname, Fname, speciality, phone, validation, Hopital});
    
    return user;
}

// static method to login user
userSchema.statics.login = async function(email, password){

    // validation
    if(!email || !password){
        throw Error("Tous les champs doivent être remplis");
    }

    // check if email already in use
    const user = await this.findOne({email});
    
    if(!user){
        throw Error("Adresse Email incorrecte");
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error("Mot de passe incorrect");
    }

    return user;
}
const user = mongoose.model('users', userSchema);

module.exports = user;