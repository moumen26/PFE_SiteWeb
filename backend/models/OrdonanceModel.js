const mongoose = require('mongoose');
const validator = require('validator');

const OrdonanceSchema = new mongoose.Schema({
    ConsultationID: {
        type: mongoose.Schema.Types.ObjectId, ref: "consultations" 
    },
    Medicaments: [{
        OrdonanceID: {
            type: mongoose.Schema.Types.ObjectId, ref: "ordonances"
        },
        NomMedicament: {
            type: String,
            required: false,
        },
        DoseMedicament: {
            type: String,
            required: false,
        },
        DureeMedicament: {
            type: String,
            required: false,
        },
        QuantiteMedicament: {
            type: String,
            required: false,
        },
    }],
});

const Ordonance = mongoose.model('ordonances', OrdonanceSchema);

module.exports = Ordonance;