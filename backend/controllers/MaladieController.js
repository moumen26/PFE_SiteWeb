const mongoose = require('mongoose');
const Diagnostic = require('../models/DiagnosticModel');
const Maladie = require('../models/MaladieModel');
// Get All Medicament
const GetAllMaladies = async (req, res) => {
    await Maladie.find({}).then((maladies) => {
        if (!maladies) {
            return res.status(404).json({ message: "Maladies not found" });
        }
        res.status(200).json(maladies);
    }).catch((error) => {
        console.error("Error retrieving Maladies:", error);
        res.status(500).json({ message: "Error retrieving Maladies" });
    });
}
// Get Medicament
const GetMaladie = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the medicament by ID in the database
    await Diagnostic.findById({_id: id})
      .then((diagnostic) => {
        if (!diagnostic) {
          return res.status(404).json({ message: "diagnostic not found" });
        }
        res.status(200).json(diagnostic.Maladie);
      })
      .catch((error) => {
        console.error("Error retrieving Medicament:", error);
        res.status(500).json({ message: "Error retrieving Medicament" });
      });
}
// add new medicament
const AddNewMaladie = async (req, res) => {
  try {
    const { id } = req.params;
    const {NomMaladie} = req.body;
    //check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Specified id is not valid" });
    }
    await Diagnostic.findOneAndUpdate({_id: id},{Maladie: NomMaladie}).then(async (diagnostic)=>{
        if (!diagnostic) {
            return res.status(404).json({ message: 'Diagnostic not found' });
        }
        res.status(200).json({ message: 'Maladie added successfully'});
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
    GetAllMaladies,
    GetMaladie,
    AddNewMaladie,
}