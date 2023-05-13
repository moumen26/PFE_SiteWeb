const mongoose = require('mongoose');
const validator = require('validator');

const DossierObstetriqueSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    },
    idNouveauNe: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    },
    AccoucheurID:{
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    Date_daccouchement:{
        type: String,
        required: false,
    },
    Heure_daccouchement:{
        type: String,
        required: false,
    },
    
    Poids: {
        type: String,
        required: false, 
    },
    Aspect: {
        type: String,
        required: false,
    },
    Anomalies: {
        type: String,
        required: false,
    },
    Placenta: {
        type: String,
        required: false,
    },
    Membranes: {
        type: String,
        required: false,
    },
    Cordon: {
        type: String,
        required: false,
    },
    Sexe : {
        type: String,
        required: false,
    },
    Taille: {
        type: String,
        required: false,
    },
    Pc: {
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
    Malformation: {
        type: String,
        required: false,
    },
    Remarque : {
        type: String,
        required: false,
    },
    Empreintes_digitales: {
        type: String,
        required: false,
    }
});

// Create a new DossierObstetrique
DossierObstetriqueSchema.statics.AddNewDossObs = async function(patientID, Date_daccouchement,Heure_daccouchement){
    // validation
    if(!Date_daccouchement ||!Heure_daccouchement){
        throw Error('All fields mast be filled');
    }
    if(!validator.isNumeric(Date_daccouchement) ||!validator.isNumeric(Heure_daccouchement)){
        throw Error('must be a number');
    }
    try{
        const data = {
            patientID: patientID,
            Date_daccouchement: Date_daccouchement,
            Heure_daccouchement: Heure_daccouchement,
        }
        const patient = await this.create([data]);

        return patient;
        
    }catch(err){
        console.log(err);
        throw Error(err.message);
    }
}

const patient_part1 = mongoose.model('dossierObstetrique', DossierObstetriqueSchema);

module.exports = patient_part1;