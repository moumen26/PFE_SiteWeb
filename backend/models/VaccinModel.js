const mongoose = require('mongoose');
const validator = require('validator');

const VaccinationSchema = new mongoose.Schema({
    ID_Patient: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    },
    ID_vaccinateur: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    Nom_vaccin: {
        type: String,
        required: false,
    },
    Date_vaccination: {
        type: String,
        required: false,
    },
    Age_vaccination: {
        type: String,
        required: false,
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
});

const Vaccination = mongoose.model('vaccin', VaccinationSchema);

module.exports = Vaccination;