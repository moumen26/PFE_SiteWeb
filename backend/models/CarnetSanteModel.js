const mongoose = require('mongoose');
const validator = require('validator');

const CarnetSanteSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    },
    Date_daccouchement:{
        type: String,
        required: false,
    },
    Heure_daccouchement:{
        type: String,
        required: false,
    },
    Sexe : {
        type: String,
        required: false,
    },
    une_min: {
        type: Boolean,
        required: false,
    },
    cinq_min: {
        type: Boolean,
        required: false,
    },
    Reanimation: {
        type: String,
        required: false, 
    },
    Duree: {
        type: String,
        required: false,
    },
    Malformation: {
        type: String,
        required: false,
    },
    Transfert: {
        type: String,
        required: false,
    },
    MotifTransfert: {
        type: String,
        required: false,
    },
    ExamenCordon: {
        type: String,
        required: false,
    },
    EmissionUrine: {
        type: String,
        required: false,
    },
    EmissionMeconium: {
        type: String,
        required: false,
    },
    CatheterismeChoanes: {
        type: String,
        required: false,
    },
    RechercheAtresieLoesophage : {
        type: String,
        required: false,
    },
    OrganesGenitauxExternes: {
        type: String,
        required: false,
    },
    VitamineK1:{
        type: String,
        required: false,
    },
    Collyre:{
        type: String,
        required: false,
    },
});

// Create a new CarnetSante
CarnetSanteSchema.statics.AddNewCarnetSante = async function(patientID, Date_daccouchement,Heure_daccouchement){
    // validation
    if(!Date_daccouchement || !Heure_daccouchement || !patientID){
        throw Error('there is field missing');
    }
    try{
        const data = {
            patientID: patientID,
            Date_daccouchement: Date_daccouchement,
            Heure_daccouchement: Heure_daccouchement,
        }
        const CarnetSante = await this.create([data]);

        return CarnetSante;
        
    }catch(err){
        console.log(err);
        throw Error(err.message);
    }
}

const CarnetSante = mongoose.model('CarnetDeSante', CarnetSanteSchema);

module.exports = CarnetSante;