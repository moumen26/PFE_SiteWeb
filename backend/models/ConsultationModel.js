const mongoose = require('mongoose');
const validator = require('validator');

const ConsultationSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    },
    MedecinID: { 
        type: mongoose.Schema.Types.ObjectId, ref: "users" 
    },
    DiagnosticID: {
        required: false,
        type: mongoose.Schema.Types.ObjectId, ref: "diagnostics"
    },
    OrdonanceID: {
        required: false,
        type: mongoose.Schema.Types.ObjectId, ref: "ordonances"
    },
    ExamenID: {
        required: false,
        type: mongoose.Schema.Types.ObjectId, ref: "examens"
    },
    HospitalisationID: {
        required: false,
        type: mongoose.Schema.Types.ObjectId, ref: "hospitalisations"
    },
    MedecinNom: {
        type: String,
        required: false,
    },
    DateConcultation:{
        type: String,
        required: false,
    },
    HeureConsultation:{
        type: String,
        required: false,
    },
    Maladie: {
        type: String,
        required: false,
    },
});

const Consultation = mongoose.model('consultations', ConsultationSchema);

module.exports = Consultation;