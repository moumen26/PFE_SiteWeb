const mongoose = require('mongoose');
const validator = require('validator');

const PatientSchema = new mongoose.Schema({
    idMaman: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    },
    idNouveauNe: [{
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    }],
    idDossObs: {
        type: mongoose.Schema.Types.ObjectId, ref: "dossierObstetrique"
    },
    idCarnetSante: {
        type: mongoose.Schema.Types.ObjectId, ref: "carnetSante"
    },
    idAccoucheur: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    idVaccin: [{
        type: mongoose.Schema.Types.ObjectId, ref: "vaccins"
    }],
    ConsultationID: [{
        type: mongoose.Schema.Types.ObjectId, ref: "consultations"
    }],
});


const patient = mongoose.model('patients', PatientSchema);

module.exports = patient;