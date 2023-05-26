const mongoose = require('mongoose');
const validator = require('validator');

const DiagnosticSchema = new mongoose.Schema({
    ConsultationID: {
        type: mongoose.Schema.Types.ObjectId, ref: "consultations" 
    },
    Context: {
        type: String,
        required: true,
    },
    Symptomes: {
        type: String,
        required: false,
    },
});

const Diagnostic = mongoose.model('diagnostics', DiagnosticSchema);

module.exports = Diagnostic;