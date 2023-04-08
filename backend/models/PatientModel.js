const mongoose = require('mongoose');
const validator = require('validator');

const PatientSchemaPart1 = new mongoose.Schema({
    Protocole_daccouchement:{
        Accoucheur:{
            type: String,
            required: true,
        },
        Examen_des_annexes:{
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
            }
        },
        Examen_du_nouveaune: {
            Sexe : {
                type: String,
                required: false,
            },
            Poids: {
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
            Score_apgar: {
                une_min: {
                    type: Boolean,
                    required: false,
                },
                cinq_min: {
                    type: Boolean,
                    required: false,
                }
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
        }
    },
});

// static method to add new patient
PatientSchemaPart1.statics.AddPart_1 = async function(Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
    ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales){
    
    // validation
    if(!Accoucheur || !Poids || !Aspect || !Anomalies || !Placenta || !Membranes || !Cordon
        || !Sexe || !Taille || !Pc || !Malformation || !Remarque || !Empreintes_digitales){
        throw Error('All fields mast be filled');
    }
    if(!validator.isNumeric(Poids) || !validator.isNumeric(Taille) || !validator.isNumeric(Pc)){
        throw Error('must be a number');
    }

    // check if patient already exist   
    const exist = await this.findOne({
        "Protocole_daccouchement.Examen_du_nouveaune": {
                Empreintes_digitales: Empreintes_digitales,
            }
        
    });
    if(exist){
        throw Error('patient already exist');
    }


    // create patient
    try{
        const data = {
            Protocole_daccouchement:{
                Accoucheur: Accoucheur,
                Examen_des_annexes:{
                    Poids: Poids,
                    Aspect: Aspect,
                    Anomalies: Anomalies,
                    Placenta: Placenta,
                    Membranes: Membranes,
                    Cordon: Cordon,
                },
                Examen_du_nouveaune: {
                    Sexe : Sexe,
                    Poids: Poids,
                    Taille: Taille,
                    Pc: Pc,
                    Score_apgar: {
                        une_min: une_min,
                        cinq_min: cinq_min,
                    },
                    Malformation: Malformation,
                    Remarque : Remarque,
                    Empreintes_digitales: Empreintes_digitales,
                }
            },
        }
        const patient = await this.create([data]);

        return patient;
    }catch(err){
        throw Error("error while creating patient");
    }
}

const patient_part1 = mongoose.model('patient', PatientSchemaPart1);

module.exports = patient_part1;