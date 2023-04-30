const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userSchema = new mongoose.Schema({
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
    validation: {
        type: Boolean,
    }
},{timestamps: true});

// static method to signup user
userSchema.statics.signup = async function(email, password, Lname, Fname, speciality, phone, validation){
    
    // validation
    if(!email || !password || !Lname || !Fname || !speciality || !phone){
        throw Error('All fields mast be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough');
    }

    // check if email already in use
    const exist = await this.findOne({email});
    
    if(exist){
        throw Error('Email already in use');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create user
    const user = await this.create({email, password: hash, Lname, Fname, speciality, phone, validation});
    
    return user;
}

// static method to login user
userSchema.statics.login = async function(email, password){

    // validation
    if(!email || !password){
        throw Error('All fields mast be filled');
    }

    // check if email already in use
    const user = await this.findOne({email});
    
    if(!user){
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}
const user = mongoose.model('users', userSchema);

module.exports = user;