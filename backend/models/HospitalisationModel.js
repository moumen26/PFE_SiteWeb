const mongoose = require('mongoose');
const validator = require('validator');

const HospitalisationSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    },
    MedecinID: { 
        type: mongoose.Schema.Types.ObjectId, ref: "users" 
    },
    ConcultationID: [{
        type: mongoose.Schema.Types.ObjectId, ref: "consultations"
    }],
    MedecinNom: {
        type: String,
        required: false,
    },
    DateHospitalisation:{
        type: String,
        required: false,
    },
    HeureHospitalisation:{
        type: String,
        required: false,
    },
});

const Hospitalisation = mongoose.model('hospitalisation', HospitalisationSchema);

module.exports = Hospitalisation;