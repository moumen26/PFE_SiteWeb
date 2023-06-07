const mongoose = require('mongoose');
const validator = require('validator');

const VaccinationSchema = new mongoose.Schema({
    ID_Patient: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    },
    ID_vaccinateur: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    Date_vaccination: {
        type: String,
        required: false,
    },
    Nom_vaccin: {
        type: String,
        required: false,
    },
},{ timestamps: true });

const Vaccination = mongoose.model('vaccinations', VaccinationSchema);

module.exports = Vaccination;