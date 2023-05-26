const mongoose = require('mongoose');
const validator = require('validator');

const MedicamentSchema = new mongoose.Schema({
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
},{ timestamps: true });

const Medicament = mongoose.model('medicaments', MedicamentSchema);

module.exports = Medicament;