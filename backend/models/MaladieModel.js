const mongoose = require('mongoose');
const validator = require('validator');

const MaladieSchema = new mongoose.Schema({
    NomMaladie: {
        type: String,
        required: false,
    }
},{ timestamps: true });

const maladies = mongoose.model('maladies', MaladieSchema);

module.exports = maladies;