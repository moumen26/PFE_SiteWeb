const DossObs = require('../models/DossObsModel');
const Patient = require('../models/PatientModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// post a new patient
const CreateNewPatient = async (req, res) => {
    try {
        const Date_daccouchement = req.body.Date_daccouchement;
        const Heure_daccouchement = req.body.Heure_daccouchement;
        const idAccoucheur = req.body.idAccoucheur;
        if (!Date_daccouchement || !Heure_daccouchement || !idAccoucheur) {
            return res.status(400).json({ error: 'You must provide all fields' });
        }
        const newPatient = new Patient({
            idAccoucheur,
        });
        newPatient.save().then(async (savedPatient) => {
            const patientID = savedPatient._id;
            const newDossObs = new DossObs({
                patientID,
                Date_daccouchement,
                Heure_daccouchement,
                AccoucheurID: idAccoucheur,
            });
            // Save the patient to the database
            newDossObs.save()
            .then(async (savedDossObs) => {
            // Access the saved patient's _id
            const savedDossObsId = savedDossObs._id;
            await res.status(201).json({id: patientID});
            const patient = await Patient.findOneAndUpdate({_id: patientID},
                {idDossObs: savedDossObsId}, {new: true}
            );
            })
            .catch((error) => {
            console.error('Error Dossier obstitrique:', error);
            res.status(500).json({ message: 'Error saving Dossier obstitrique' });
            });
        }).catch((error) => {
            console.error('Error creating patient:', error);
            res.status(500).json({ message: 'Failed to create patient' });
        });
            
      } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Failed to create patient' });
      }
}

// get a specific Patient by ID
const GetPatient = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the patient by ID in the database
    await Patient.findById(id)
        .then((patient) => {
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json(patient);
        })
        .catch((error) => {
            console.error('Error retrieving patient:', error);
            res.status(500).json({ message: 'Error retrieving patient' });
        });
}

// Define a route for fetching a Dossier Obstitrique by ID
const GetDossObs = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the patient by ID in the database
    await DossObs.findById(id)
        .then((DossObs) => {
            if (!DossObs) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json(DossObs);
        })
        .catch((error) => {
            console.error('Error retrieving patient:', error);
            res.status(500).json({ message: 'Error retrieving patient' });
        });
}

//get all Patients
const GetAllPatient = async (req, res) => {
    const patients = await DossObs.find({}).sort({createdAt: -1});
    res.status(200).json(patients);
}

//delete a user
const DeletePatient = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'user not found'});
    }
    //find id in db and delete
    const patient = await DossObs.findByIdAndDelete({_id: id});
    //if not found return error
    if(!patient){
        return res.status(404).json({err: 'user not found'});
    }
    //return user
    res.status(200).json(patient);
}

//update a user
const UpdateDossObs = async (req, res) => {
    const {id} = req.params;
    const { Date_daccouchement,Heure_daccouchement,Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
        ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'patient not found'});
        }
        //find id in db and update
        const patient = await DossObs.findOneAndUpdate({_id: id},
            {Date_daccouchement,Heure_daccouchement,Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
                ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales}
        );
        //if not found return error
        if(!patient){
            return res.status(404).json({err: 'patient not found'});
        }
        //return user
        res.status(200).json(patient);
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}

module.exports = {
    CreateNewPatient,
    GetAllPatient,
    GetPatient,
    GetDossObs,
    DeletePatient,
    UpdateDossObs
}