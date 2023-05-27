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

// Get Ordonance
const GetOrdonance = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        const ordonance = await Ordonance.find({_id: id});
        if (!ordonance) {
            return res.status(404).json({ message: 'Ordonance not found' });
        }
        res.status(200).json(ordonance);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}
// Create Ordonance
const CreateNewOrdonance = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        await Consultation.findById({_id: id}).then(async (consultation) => {
            if (!consultation) {
                return res.status(404).json({ message: 'Consultation not found' });
            }
            // Checking if consultation already has an ordonance
            if (consultation.OrdonanceID) {
                return res.status(400).json({ message: 'Consultation already has an ordonance' });
            }
            // Creating new ordonance
            const newOrdonance = new Ordonance({
                ConsultationID: id,
                MedecinID: consultation.MedecinID,
            });
            await newOrdonance.save().then(async (ordonance) => {
                if (!ordonance) {
                    return res.status(404).json({ message: 'Ordonance not found' });
                }
                
                // Adding ordonance to consultation
                await Consultation.findByIdAndUpdate({_id: id},{OrdonanceID: ordonance._id}).then((consultation) => {
                    if (!consultation) {
                        return res.status(404).json({ message: 'Consultation not found' });
                    }
                    console.log('Ordonance added to consultation');
                }).catch((error) => {
                    console.error('Error updating patient:', error);
                    res.status(500).json({ message: 'Failed to update patient' });
                });
    
                // return ordonance
                res.status(201).json({ message: 'You can now Add Ordonance content'});
            }).catch((error) => {
                console.error('Error creating Ordonance:', error);
                res.status(500).json({ error: 'Failed to create Ordonance' });
            });
        }).catch((error) => {
            console.error('Error finding consultation:', error);
            res.status(500).json({ message: 'Failed to finding consultation' });
        });
        
    }catch(err){
        res.status(400).json({err: err.message});
    }
}
// Delete Ordonance
const DeleteOrdonance = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete Ordonance
        await Ordonance.findByIdAndDelete({_id: id}).then((ordonance) => {
            if (!ordonance) {
                return res.status(404).json({ message: 'Ordonance not found' });
            }
            // Delete Ordonance from consultation
            const consultationresponce = Consultation.updateMany({_id: ordonance.ConsultationID}, {
                $unset: {OrdonanceID: ordonance}}).then((ordonance) => {
                    if (!ordonance) {
                        return res.status(404).json({ message: 'ordonance not found' });
                    }
                    console.log('ordonance deleted from consultation');
                }).catch((error) => {
                    console.error('Error deleting ordonance from consultation:', error);
                    res.status(500).json({ message: 'Failed to delete ordonance from consultation' });
                });
            // Delete Medicament from ordonance
            for (let i = 0; i < ordonance.Medicaments.length; i++) {
                medicamentresponce = Medicament.findOneAndDelete({OrdonanceID: ordonance._id}).then((medicament) => {
                    if (!medicament) {
                        return res.status(404).json({ message: 'Medicament not found' });
                    }
                    console.log('Medicament deleted from ordonance');
                }).catch((error) => {
                    console.error('Error deleting medicament from ordonance:', error);
                    res.status(500).json({ message: 'Failed to delete medicament from ordonance' });
                });
            }
            //return success message
            if (consultationresponce) {
                res.status(200).json({ message: 'Ordonance deleted successfully' });
            }
            
        }).catch((error) => {
            res.status(500).json({ message: 'Failed to delete Ordonance' });
        });
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

module.exports = {
    GetOrdonance,
    CreateNewOrdonance,
    DeleteOrdonance
}