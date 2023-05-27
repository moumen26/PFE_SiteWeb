const mongoose = require('mongoose');
const DossObs = require('../models/DossObsModel');
const CarnetSante = require('../models/CarnetSanteModel');
const Patient = require('../models/PatientModel');
const User = require('../models/UserModel');
const Consultation = require('../models/ConsultationModel');
const Medicament = require('../models/MedicamentModel');
const ExamenTest = require('../models/ExamenModel');
const Diagnostic = require('../models/DiagnosticModel');
const Ordonance = require('../models/OrdonanceModel');

// Get All Medicament
const GetAllMedicament = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Specified id is not valid" });
    }
    await Ordonance.findById({_id: id}).then(async (ordonance)=>{
        // Find the Vaccin by ID in the database
        await Medicament.find({OrdonanceID : ordonance._id})
        .then((medicament) => {
            if (!medicament) {
            return res.status(404).json({ message: "medicament not found" });
            }
            res.status(200).json(medicament);
        })
        .catch((error) => {
            console.error("Error retrieving medicament:", error);
            res.status(500).json({ message: "Error retrieving medicament" });
      });
      
    }).catch((error)=>{
        console.error("Error retrieving Ordonance :", error);
        res.status(500).json({ message: "Error retrieving Ordonance" });
    });
}
// Get Medicament
const GetMedicamentById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the medicament by ID in the database
    await Medicament.findById({_id: id})
      .then((medicament) => {
        if (!medicament) {
          return res.status(404).json({ message: "Medicament not found" });
        }
        res.status(200).json(medicament);
      })
      .catch((error) => {
        console.error("Error retrieving Medicament:", error);
        res.status(500).json({ message: "Error retrieving Medicament" });
      });
}
// Create Medicament
const CreateNewMedicament = async (req, res) => {
  try {
    const { id } = req.params;
    const {NomMedicament, DoseMedicament, DureeMedicament, QuantiteMedicament} = req.body;
    //check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Specified id is not valid" });
    }
    
    const newMedicament = new Medicament({
      OrdonanceID: id,
      NomMedicament: NomMedicament,
      DoseMedicament: DoseMedicament,
      DureeMedicament: DureeMedicament,
      QuantiteMedicament: QuantiteMedicament,
    });
    await newMedicament.save().then(async (medicament)=>{
      // add medicament to ordonance
      await Ordonance.findById({_id: id}).then(async (ordonance)=>{
        if (!ordonance) {
          return res.status(404).json({ message: 'ordonance not found' });
      }
      ordonance.Medicaments.push(medicament._id);
      ordonance.save();
      }).catch((error)=>{
        console.error("Error retrieving Ordonance :", error);
        res.status(500).json({ message: "Error retrieving Ordonance" });
      });
      res.status(200).json({ message: 'medicament created successfully'});
    }).catch((error)=>{
        console.error("Error creating new Medicament:", error);
        res.status(500).json({ message: "Error creating new Medicament" });
    });
  } catch (error) {
    console.error("Error creating new Medicament:", error);
    res.status(500).json({ message: "Error creating new Medicament" });
  }
}
// Delete Medicament
const DeleteMedicament = async (req, res) => {
  try {
    const { id } = req.params;
    // Delete Ordonance
    await Medicament.findByIdAndDelete({_id: id}).then((medicament) => {
        if (!medicament) {
            return res.status(404).json({ message: 'medicament not found' });
        }
        // Delete medicament from Ordonance
        Ordonance.updateMany({_id: medicament.OrdonanceID}, {
          $pull: {Medicaments: id}}).then((medicament) => {
              if (!medicament) {
                  return res.status(404).json({ message: 'medicament not found' });
              }
              console.log('medicament deleted from medicament');
          }).catch((error) => {
              console.error('Error updating medicament:', error);
              res.status(500).json({ message: 'Failed to update medicament' });
          });
        res.status(200).json({ message: 'medicamentID deleted successfully from Ordonance' });
        console.log('medicament deleted');
    }).catch((error) => {
        res.status(500).json({ message: 'Failed to delete medicament' });
    });
}catch(err){
    res.status(400).json({err: err.message});
}
}

module.exports = {
    GetAllMedicament,
    GetMedicamentById,
    CreateNewMedicament,
    DeleteMedicament
}