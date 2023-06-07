const mongoose = require('mongoose');
const validator = require('validator');

const VaccinSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    Contre_vaccin: {
        type: String,
        required: false,
    },
    Technique_vaccinale: {
        type: String,
        required: false,
    },
    Numero_lot: {
        type: String,
        required: false,
    },
    age_recommande: {
        type: String,
        required: true,
    },
},{ timestamps: true });

const Vaccin = mongoose.model('vaccins', VaccinSchema);

module.exports = Vaccin;