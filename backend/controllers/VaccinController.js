const Vaccin = require('../models/VaccinModel');
const Patient = require('../models/PatientModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Vaccination = require('../models/VaccinationModel');
// Get All Vaccin
const GetAllVaccin = async (req, res) => {
    await Vaccin.find({}).then((vaccin) => {
        if (!vaccin) {
            return res.status(404).json({ message: "Vaccin not found" });
        }
        res.status(200).json(vaccin);
    }).catch((error) => {
        console.error("Error retrieving Vaccin:", error);
        res.status(500).json({ message: "Error retrieving Vaccin" });
    });
}
// get a specific Vaccin by ID
const GetVaccinById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the Vaccin by ID in the database
    await Vaccination.findById({_id: id})
      .then((vaccin) => {
        if (!vaccin) {
          return res.status(404).json({ message: "Vaccin not found" });
        }
        res.status(200).json(vaccin);
      })
      .catch((error) => {
        console.error("Error retrieving Vaccin:", error);
        res.status(500).json({ message: "Error retrieving Vaccin" });
      });
}
// get a specific Vaccin by name
const GetVaccinByName = async (req, res) => {
    const { nom } = req.params;
    if (!nom) {
        return res.status(400).json({ message: 'You must provide a name' });
    }
    // Find the Vaccin by nom in the database
    await Vaccin.findOne({nom: nom})
      .then((vaccin) => {
        if (!vaccin) {
          return res.status(404).json({ message: "Vaccin not found" });
        }
        res.status(200).json(vaccin);
      })
      .catch((error) => {
        console.error("Error retrieving Vaccin:", error);
        res.status(500).json({ message: "Error retrieving Vaccin" });
      });
}
//get all Vaccins
const GetAllVaccins = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Specified id is not valid" });
    }
    await Patient.findById({_id: id}).then(async (patient)=>{
        // Find the Vaccin by ID in the database
        await Vaccination.find({ID_Patient : patient._id})
        .then((vaccin) => {
            if (!vaccin) {
            return res.status(404).json({ message: "Vaccin not found" });
            }
            res.status(200).json(vaccin);
        })
        .catch((error) => {
            console.error("Error retrieving Vaccin:", error);
            res.status(500).json({ message: "Error retrieving Vaccin" });
      });
      
    }).catch((error)=>{
        console.error("Error retrieving Patient :", error);
        res.status(500).json({ message: "Error retrieving Patient" });
    });
   
}
// Create a new Vaccin
const CreateNewVaccin = async (req, res) => {
    try {
        const {id} = req.params;
        const {ID_vaccinateur, Nom_vaccin, Date_vaccination} = req.body;
        // Validate request
        if (!id ||!ID_vaccinateur ||!Nom_vaccin ||!Date_vaccination) {
          return res.status(400).json({ message: "You must provide all fields" });
        }
        const vaccin = new Vaccination({
            ID_Patient : id, ID_vaccinateur, Nom_vaccin, Date_vaccination
        });
        vaccin.save().then(async (savedVaccin) => {
            const vaccinID = savedVaccin._id;

            // Save to patient the vaccinID
            await Patient.findOne({_id : id})
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
            await res.status(200).json(savedVaccin);
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
    const vaccin = await Vaccination.findByIdAndDelete({_id: id}).then(async (vaccin) => {
        if (!vaccin) {
            return res.status(404).json({ message: "Vaccin not found" });
        }
        // Delete vaccin from patient
        Patient.updateMany({_id: vaccin.ID_Patient}, {
            $pull: {idVaccin: id}}).then((patient) => {
                if (!vaccin) {
                    return res.status(404).json({ message: 'patient not found' });
                }
                //return user
                res.status(200).json(vaccin);
                console.log('vaccin deleted from patient');
            }).catch((error) => {
                return res.status(500).json({ message: 'Failed to update patient' });
            });
    }).catch((error) => {
        console.error('Error deleting vaccin:', error);
    });
}
// Update a specific Vaccin
const UpdateVaccin = async (req, res) => {
    const {id} = req.params;
    const { Nom_vaccin, Date_vaccination} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'Vaccin not found'});
        }
        //find id in db and update
        await Vaccination.findByIdAndUpdate({_id: id},
            {Nom_vaccin, Date_vaccination}
            ).then(async (vaccin) => {
                if(!vaccin){
                    return res.status(404).json({err: 'Vaccin not found'});
                }
                //return vaccin
                res.status(200).json(vaccin);
            }).catch((error) => {
                console.error('Error updating vaccin:', error);
            });
    }catch(err){
        res.status(400).json({err: err.message});
        console.error("Error updating vaccin ", err);
    }
    
}

module.exports = {
    GetAllVaccin,
    GetAllVaccins,
    GetVaccinById,
    CreateNewVaccin,
    DeleteVaccin,
    UpdateVaccin,
    GetVaccinByName
}