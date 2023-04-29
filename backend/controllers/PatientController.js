const Patient = require('../models/PatientModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


//post a patient part 1
const CreateNewPatient_part1 = async (req, res) => {
    const { Date_daccouchement,Heure_daccouchement,Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
        ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales} = req.body;
    try{
        const patient = await Patient.AddPart_1(Date_daccouchement,Heure_daccouchement,Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
            ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales);
        
        res.status(200).json(patient);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

//post a null patient
const CreateNewPatient = async (req, res) => {
    try {
        const Date_daccouchement = req.body.Date_daccouchement;
        const Heure_daccouchement = req.body.Heure_daccouchement;
    
        const newPatient = new Patient({
            Date_daccouchement,
            Heure_daccouchement,
        });
    
        // Save the patient to the database
        newPatient.save()
            .then((savedPatient) => {
            // Access the saved patient's _id
            const savedPatientId = savedPatient._id;
            console.log('Patient created with ID:', savedPatientId);
            res.status(201).json({ id: savedPatientId });
            })
            .catch((error) => {
            console.error('Error saving patient:', error);
            res.status(500).json({ message: 'Error saving patient' });
            });
            
      } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Failed to create patient' });
      }
}

// Define a route for fetching a patient by ID
const GetPatient = async (req, res) => {
    const { id } = req.params;
    // Find the patient by ID in the database
    Patient.findById(id)
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
//get all Patients
const GetAllPatient = async (req, res) => {
    const patients = await Patient.find({}).sort({createdAt: -1});
    res.status(200).json(patients);
}

//get a specific Patient
/*const GetPatient = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'Patient not found'});
    }
    //find id in db
    const patient = await Patient.findById(id);
    //if not found return error
    if(!patient){
        return res.status(404).json({err: 'Patient not found'});
    }
    //return user
    res.status(200).json(patient);
}*/

//delete a user
const DeletePatient = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'user not found'});
    }
    //find id in db and delete
    const patient = await Patient.findByIdAndDelete({_id: id});
    //if not found return error
    if(!patient){
        return res.status(404).json({err: 'user not found'});
    }
    //return user
    res.status(200).json(patient);
}

//update a user
const UpdatePatient = async (req, res) => {
    const {id} = req.params;
    const { Date_daccouchement,Heure_daccouchement,Accoucheur, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
        ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'patient not found'});
        }
        //find id in db and update
        const patient = await Patient.findOneAndUpdate({_id: id},
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
    CreateNewPatient_part1,
    CreateNewPatient,
    GetAllPatient,
    GetPatient,
    DeletePatient,
    UpdatePatient
}