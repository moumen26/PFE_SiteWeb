const Vaccin = require('../models/VaccinModel');
const Patient = require('../models/PatientModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// get a specific Vaccin by ID
const GetVaccinById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the Vaccin by ID in the database
    await Vaccin.findById(id)
        .then((vaccin) => {
            if (!vaccin) {
                return res.status(404).json({ message: 'Vaccin not found' });
            }
            res.status(200).json(vaccin);
        })
        .catch((error) => {
            console.error('Error retrieving Vaccin:', error);
            res.status(500).json({ message: 'Error retrieving Vaccin' });
        });
}

//get all Vaccins
const GetAllVaccins = async (req, res) => {
    try {
        const vaccins = await Vaccin.find({}).sort({createdAt: -1});
        res.status(200).json(vaccins);
    }catch (error) {
        console.error('Error retrieving Vaccins:', error);
        res.status(500).json({ message: 'Error retrieving Vaccins' });
    }
}

// Create a new Vaccin
const CreateNewVaccin = async (req, res) => {
    try {
        const {id} = req.params;
        const {ID_Patient, ID_vaccinateur, Nom_vaccin, Date_vaccination, Age_vaccination, 
            Contre_vaccin, Technique_vaccinale, Numero_lot} = req.body;
        if (!ID_Patient || !ID_vaccinateur || !Nom_vaccin || !Date_vaccination || !Age_vaccination || 
            !Contre_vaccin || !Technique_vaccinale || !Numero_lot) {
            return res.status(400).json({ error: 'You must provide all fields' });
        }
        const vaccin = new Vaccin({
            ID_Patient : id, ID_vaccinateur, Nom_vaccin, Date_vaccination, Age_vaccination, 
            Contre_vaccin, Technique_vaccinale, Numero_lot
        });
        vaccin.save().then(async (savedVaccin) => {
            const vaccinID = savedVaccin._id;

            // Save to user the vaccinID
            const patient = await Patient.findOne({_id : id})
            .then((patient) => {
                if (!patient) {
                    return res.status(404).json({ message: 'patient not found' });
                }
                patient.idVaccin.push(vaccinID);
                patient.save();
            }).catch((error) => {
                console.error('Error creating patient:', error);
                res.status(500).json({ message: 'Failed to create patient' });
            });
            
            // Send vaccinID to server
            await res.status(201).json(savedVaccin);
        }).catch((error) => {
            console.error('Error creating vaccin:', error);
            res.status(500).json({ message: 'Failed to create vaccin' });
        });
            
      } catch (error) {
        console.error('Error creating Vaccin:', error);
        res.status(500).json({ error: 'Failed to create Vaccin' });
      }
}
//delete a specific Vaccin
const DeleteVaccin = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'Vaccin not found'});
    }
    //find id in db and delete
    const vaccin = await Vaccin.findByIdAndDelete({_id: id});
    //if not found return error
    if(!vaccin){
        return res.status(404).json({err: 'Vaccin not found'});
    }
    //return user
    res.status(200).json(vaccin);
}


// Update a specific Vaccin
const UpdateVaccin = async (req, res) => {
    const {id} = req.params;
    const { Nom_vaccin, Date_vaccination, Age_vaccination, 
        Contre_vaccin, Technique_vaccinale, Numero_lot} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'Vaccin not found'});
        }
        //find id in db and update
        const vaccin = await Vaccin.findOneAndUpdate({_id: id},
            {Nom_vaccin, Date_vaccination, Age_vaccination, 
                Contre_vaccin, Technique_vaccinale, Numero_lot}
        );
        //if not found return error
        if(!vaccine){
            return res.status(404).json({err: 'Vaccin not found'});
        }
        //return user
        res.status(200).json(vaccin);
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}

module.exports = {
    GetAllVaccins,
    GetVaccinById,
    CreateNewVaccin,
    DeleteVaccin,
    UpdateVaccin
}