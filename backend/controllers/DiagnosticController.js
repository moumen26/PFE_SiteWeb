const mongoose = require('mongoose');
const Consultation = require('../models/ConsultationModel');
const Diagnostic = require('../models/DiagnosticModel');

// Get Diagnostic
const GetDiagnostic = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        await Diagnostic.findOne({_id: id}).then((diagnostic) => {
            if (!diagnostic) {
                return res.status(404).json({ message: 'Diagnostic not found' });
            }
            res.status(200).json(diagnostic);

        }).catch((error) => {
            console.error('Error fetching diagnostic:', error);
            res.status(500).json({ message: 'Failed to fetch diagnostic' });
        });
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
                res
                  .status(201)
                  .json({
                    id: diagnostic._id,
                    message:
                      "Vous pouvez maintenant ajouter du contenu de diagnostic",
                  });
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
        const { Context, Maladie} = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        //find id in db and update
        await Diagnostic.findOneAndUpdate({_id: id},{Context,Maladie}).then(async (diagnostic) => {
            if (!diagnostic) {
                return res.status(404).json({ message: 'Diagnostic not found' });
            }
            await Consultation.findByIdAndUpdate({_id: diagnostic.ConsultationID},{Maladie: Maladie});
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
            res
              .status(200)
              .json({
                message: "Diagnostic de consultation supprimé avec succès",
              });
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