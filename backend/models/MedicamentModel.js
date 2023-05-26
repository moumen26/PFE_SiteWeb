const mongoose = require('mongoose');
const validator = require('validator');

const MedicamentSchema = new mongoose.Schema({
    OrdonanceID: {
        type: mongoose.Schema.Types.ObjectId, ref: "ordonances"
    },
    Nom_medicament: {
        type: String,
        required: false,
    },
    Dose: {
        type: String,
        required: false,
    },
    Duree: {
        type: String,
        required: false,
    },
},{ timestamps: true });

const Medicament = mongoose.model('medicaments', MedicamentSchema);

module.exports = Medicament;