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
        type: mongoose.Schema.Types.ObjectId, ref: "diagnostics"
    },
    OrdonanceID: {
        type: mongoose.Schema.Types.ObjectId, ref: "ordonances"
    },
    ExamenID: {
        type: mongoose.Schema.Types.ObjectId, ref: "examens"
    },
    DateConcultation:{
        type: String,
        required: false,
    },
    HeureConsultation:{
        type: String,
        required: false,
    },
});

const Consultation = mongoose.model('consultations', ConsultationSchema);

module.exports = Consultation;