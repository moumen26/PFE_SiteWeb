const mongoose = require('mongoose');
const validator = require('validator');

const PatientSchema = new mongoose.Schema({
    idDossObs: {
        type: mongoose.Schema.Types.ObjectId, ref: "dossierObstetrique"
    },
    idCarnetSante: {
        type: mongoose.Schema.Types.ObjectId, ref: "carnetSante"
    },
    idAccoucheur: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
});


const patient = mongoose.model('patients', PatientSchema);

module.exports = patient;