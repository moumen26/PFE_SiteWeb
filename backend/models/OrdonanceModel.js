const mongoose = require('mongoose');
const validator = require('validator');

const OrdonanceSchema = new mongoose.Schema({
    ConsultationID: {
        type: mongoose.Schema.Types.ObjectId, ref: "consultations" 
    },
    Medicaments: [{
        type: mongoose.Schema.Types.ObjectId, ref: "medicaments" 
    }],
});

const Ordonance = mongoose.model('ordonances', OrdonanceSchema);

module.exports = Ordonance;