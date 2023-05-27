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
    Nom: {
        type: String,
        required: false,
    },
    Prenom: {
        type: String,
        required: false,
    },
    DateNaissance: {
        type: String,
        required: false,
    },
    Sexe: {
        type: String,
        required: false,
    },
    Adresse: {
        type: String,
        required: false,
    },
    Telephone: {
        type: String,
        required: false,
    },
    Email: {
        type: String,
        required: false,
    },
    SituationFamiliale: {
        type: String,
        required: false,
    },
    NbrEnfant: {
        type: String,
        required: false,
    },
    NbrGrossesse: {
        type: String,
        required: false,
    },
    NbrEnfantVivant: {
        type: String,
        required: false,
    },
    NbrEnfantMort: {
        type: String,
        required: false,
    },
    maturity: {
        type: String,
        required: false,
    },
});


const patient = mongoose.model('patients', PatientSchema);

module.exports = patient;