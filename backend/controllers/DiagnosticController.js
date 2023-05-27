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

// Get Diagnostic
const GetDiagnostic = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        const diagnostic = await Diagnostic.find({_id: id});
        if (!diagnostic) {
            return res.status(404).json({ message: 'Diagnostic not found' });
        }
        res.status(200).json(diagnostic);
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}
// Create Diagnostic
const CreateNewDiagnostic = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
    
        await Consultation.findById({_id: id}).then(async (consultation) => {
            if (!consultation) {
                return res.status(404).json({ message: 'Consultation not found' });
            }
            // Checking if consultation already has an diagnostic
            if (consultation.DiagnosticID) {
                return res.status(400).json({ message: 'Consultation already has an Diagnostic' });
            }
            // Creating new diagnostic
            const newDiagnostic = new Diagnostic({
                ConsultationID: id,
            });
            await newDiagnostic.save().then(async (diagnostic) => {
                if (!diagnostic) {
                    return res.status(404).json({ message: 'Diagnostic not found' });
                }
                // Adding diagnostic to consultation
                await Consultation.findByIdAndUpdate({_id: id},{DiagnosticID: diagnostic._id}).then((consultation) => {
                    if (!consultation) {
                        return res.status(404).json({ message: 'Consultation not found' });
                    }
                    console.log('Diagnostic added to consultation');
                }).catch((error) => {
                    console.error('Error updating patient:', error);
                    res.status(500).json({ message: 'Failed to update patient' });
                });
    
                // Adding diagnostic
                res.status(201).json({id: diagnostic._id, message: 'You can now Add Diagnostic content'});
            }).catch((error) => {
                console.error('Error creating Diagnostic:', error);
                res.status(500).json({ error: 'Failed to create Diagnostic' });
            });
        }).catch((error) => {
            console.error('Error finding consultation:', error);
            res.status(500).json({ message: 'Failed to find consultation' });
        });
        
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}
// Update Diagnostic
const UpdateDiagnostic = async (req, res) => {
    try {
        const { id } = req.params;
        const { Context, Symptomes} = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        //find id in db and update
        await Diagnostic.findOneAndUpdate({_id: id},{Context,Symptomes}).then((diagnostic) => {
            if (!diagnostic) {
                return res.status(404).json({ message: 'Diagnostic not found' });
            }
            res.status(200).json({ message: 'Diagnostic Added successfully' });
        }).catch((error) => {
            console.error('Error finding diagnostic:', error);
            res.status(500).json({ message: 'Failed to find diagnostic' });
        });
    }catch(err){

    }
}
// Delete Diagnostic
const DeleteDiagnostic = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete Diagnostic
        await Diagnostic.findByIdAndDelete({_id: id}).then((diagnostic) => {
            if (!diagnostic) {
                return res.status(404).json({ message: 'Diagnostic not found' });
            }
            // Delete Diagnostic from consultation
            Consultation.updateMany({_id: diagnostic.ConsultationID}, {
                $unset: {DiagnosticID: diagnostic}}).then((diagnostic) => {
                    if (!diagnostic) {
                        return res.status(404).json({ message: 'Diagnostic not found' });
                    }
                    console.log('Diagnostic deleted from consultation');
                }).catch((error) => {
                    console.error('Error deleting Diagnostic from consultation:', error);
                    res.status(500).json({ message: 'Failed to delete Diagnostic from consultation' });
                });
            res.status(200).json({ message: 'Diagnostic deleted successfully from consultation' });
        }).catch((error) => {
            res.status(500).json({ message: 'Failed to delete Diagnostic' });
        });
    }catch(err){
        res.status(400).json({err: err.message});
    }
}
module.exports = {
    GetDiagnostic,
    CreateNewDiagnostic,
    UpdateDiagnostic,
    DeleteDiagnostic
}