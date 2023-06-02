const mongoose = require('mongoose');
const validator = require('validator');

const VaccinationSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    age_recommande: {
        type: String,
        required: true,
    },
},{ timestamps: true });

const Vaccination = mongoose.model('vaccination', VaccinationSchema);

module.exports = Vaccination;