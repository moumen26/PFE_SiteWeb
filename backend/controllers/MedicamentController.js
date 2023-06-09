const mongoose = require('mongoose');
const Medicament = require('../models/MedicamentModel');
const Ordonance = require('../models/OrdonanceModel');

// Get All Medicament
const GetAllMedicament = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Specified id is not valid" });
    }
    await Ordonance.findById({_id: id}).then(async (ordonance)=>{
        // Find the Vaccin by ID in the database
        if (!ordonance || !ordonance.Medicaments){
            return res.status(404).json({ message: "Ordonance not found" });
        }
        res.status(200).json(ordonance.Medicaments);
      
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
      res.status(200).json({ message: "Médicament créé avec succès" });
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
    const {data} = req.headers;
    Ordonance.updateMany({_id: id}, {
      $pull: {Medicaments: { _id: data }}}).then((medicament) => {
          if (!medicament || medicament.modifiedCount == 0) {
              return res.status(404).json({ message: 'medicament not found' });
          }
          res.status(200).json({ message: "Médicament supprimé avec succès" });
          console.log('medicament deleted');
      }).catch((error) => {
          console.error('Error updating medicament:', error);
          res.status(500).json({ message: 'Failed to update medicament' });
      });
  }catch(err){
      res.status(400).json({err: err.message});
  }
}
// get all medicament 
const GetAllMedicaments = async (req, res) => {
    await Medicament.find({}).then((medicaments) => {
        if (!medicaments) {
            return res.status(404).json({ message: "medicaments not found" });
        }
        res.status(200).json(medicaments);
    }).catch((error) => {
        console.error("Error retrieving medicaments:", error);
        res.status(500).json({ message: "Error retrieving medicaments" });
    });
}
// add new medicament
const AddNewMedicament = async (req, res) => {
  try {
    const { id } = req.params;
    const {NomMedicament, DoseMedicament, DureeMedicament, QuantiteMedicament} = req.body;
    //check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Specified id is not valid" });
    }
    const newMedicament = {
      
    }
    await Ordonance.findById({_id: id}).then(async (ordonance)=>{
      if (!ordonance) {
        return res.status(404).json({ message: 'ordonance not found' });
      }
      ordonance.Medicaments.push({
        OrdonanceID: id,
        NomMedicament: NomMedicament,
        DoseMedicament: DoseMedicament,
        DureeMedicament: DureeMedicament,
        QuantiteMedicament: QuantiteMedicament,
      });
      ordonance.save();
      res.status(200).json({ message: "Médicament ajouté avec succès" });
    }).catch((error)=>{
        console.error("Error creating new Medicament:", error);
        res.status(500).json({ message: "Error creating new Medicament" });
    });
  } catch (error) {
    console.error("Error creating new Medicament:", error);
    res.status(500).json({ message: "Error creating new Medicament" });
  }
}
module.exports = {
    GetAllMedicaments,
    GetAllMedicament,
    GetMedicamentById,
    CreateNewMedicament,
    DeleteMedicament,
    AddNewMedicament
}