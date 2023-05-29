const mongoose = require('mongoose');
const validator = require('validator');

const PatientSchema = new mongoose.Schema({
    idMaman: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients",
        required: false,
    },
    idNouveauNe: [{
        type: mongoose.Schema.Types.ObjectId, ref: "patients",
        required: false,
    }],
    idDossObs: {
        type: mongoose.Schema.Types.ObjectId, ref: "dossierObstetrique",
        required: false,
    },
    idCarnetSante: {
        type: mongoose.Schema.Types.ObjectId, ref: "carnetSante",
        required: false,
    },
    idAccoucheur: {
        type: mongoose.Schema.Types.ObjectId, ref: "users",
        required: false,
    },
    idVaccin: [{
        type: mongoose.Schema.Types.ObjectId, ref: "vaccins",
        required: false,
    }],
    ConsultationID: [{
        type: mongoose.Schema.Types.ObjectId, ref: "consultations",
        required: false,
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
    Hopital: {
        type: String,
        required: false,
    },
});


const patient = mongoose.model('patients', PatientSchema);

module.exports = patient;