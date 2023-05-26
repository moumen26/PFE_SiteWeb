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

// Define a route for fetching all Consultations
const GetConsultation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        const consultations = await Consultation.find({patientID: id});
        if (!consultations) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        res.status(200).json(consultations);
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}
// Define a route for fetching a Consultation by ID
const GetConsultationById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the Concultation by ID in the database
    await Consultation.findById(id)
        .then((Consultation) => {
            if (!Consultation) {
                return res.status(404).json({ message: 'Consultation not found' });
            }
            res.status(200).json(Consultation);
        })
        .catch((error) => {
            console.error('Error retrieving Consultation :', error);
            res.status(500).json({ message: 'Error retrieving Consultation' });
        });
}
// Add a new Consultation
const CreateNewConsultation = async (req, res) => {
    try {
        const Date = req.body.Date_Concultation;
        const Heure = req.body.Heure_Concultation;
        const {id} = req.params;
        const idMedecin = req.body.idMedecin;
        if (!idMedecin) {
            return res.status(400).json({ error: 'You must provide all fields' });
        }
        const newConsultation = new Consultation({
            patientID: id,
            MedecinID: idMedecin,
            DateConcultation: Date,
            HeureConsultation: Heure,
        });
        newConsultation.save().then(async (savedConsultation) => {
            const ConsultationID = savedConsultation._id;

            // Save to patient the ConsultationID
            const patient = await Patient.findOne({_id :id}).then((patient) => {
                if (!patient) {
                    return res.status(404).json({ message: 'patient not found' });
                }
                patient.ConsultationID.push(ConsultationID);
                patient.save();
            }).catch((error) => {
                console.error('Error creating patient:', error);
                res.status(500).json({ message: 'Failed to create patient' });
            });
            
            // Send ConsultationID to conculatationPage
            res.status(201).json({id: ConsultationID});
        }).catch((error) => {
            console.error('Error creating Consultation:', error);
            res.status(500).json({ message: 'Failed to create Consultation' });
        });
            
      } catch (error) {
        console.error('Error creating Consultation:', error);
        res.status(500).json({ error: 'Failed to create Consultation' });
      }
}
// Update a specific Consultation
const UpdateConsultation = async (req, res) => {
    const {id} = req.params;
    const { DiagnosticID, OrdonanceID, ExamenID} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'Concultation not found'});
        }
        //find id in db and update
        const concultation = await Consultation.findOneAndUpdate({_id: id},{
            DiagnosticID, OrdonanceID, ExamenID
        });
        //if not found return error
        if(!concultation){
            return res.status(404).json({err: 'Concultation not found'});
        }
        //return concultation
        res.status(200).json(concultation);
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}
// Delete a specific Consultation
const DeleteConsultation = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'Consultation not found'});
    }
    const consultationData = await Consultation.findById({_id: id})
    .then(async (consultation) => {
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }
        // Get patientID, DiagnosticID, OrdonanceID, ExamenID
        const patientID = consultation.patientID;
        const DiagnosticID = consultation.DiagnosticID;
        const OrdonanceID = consultation.OrdonanceID;
        const ExamenID = consultation.ExamenID;
        
        // Delete Consultation from patient
        Patient.updateMany({_id:patientID}, {
            $pull: {ConsultationID: id}}).then((patient) => {
                if (!patient) {
                    return res.status(404).json({ message: 'patient not found' });
                }
                console.log('Consultation deleted from patient');
            }).catch((error) => {
                console.error('Error updating patient:', error);
                res.status(500).json({ message: 'Failed to update patient' });
            });
        // Delete Diagnostic from db
        Diagnostic.findByIdAndDelete({_id: DiagnosticID}).then((diagnostic) => {
            if (!diagnostic) {
                return res.status(404).json({ message: 'Diagnostic not found' });
            }
            console.log('Diagnostic deleted');
        }).catch((error) => {
            res.status(500).json({ message: 'Failed to delete Diagnostic' });
        });
        // Delete Ordonance from db
        Ordonance.findByIdAndDelete({_id: OrdonanceID}).then((ordonance) => {
            if (!ordonance) {
                return res.status(404).json({ message: 'Ordonance not found' });
            }
            console.log('Ordonance deleted');
        }).catch((error) => {
            res.status(500).json({ message: 'Failed to delete Ordonance' });
        });
        // Delete Examen from db
        /*ExamenTest.findByIdAndDelete({_id: ExamenID}).then((examen) => {
            if (!examen) {
                return res.status(404).json({ message: 'Examen not found' });
            }
            console.log('Examen deleted');  
        }).catch((error) => {
            res.status(500).json({ message: 'Failed to delete Examen' });
        });*/
        // Delete Consultation from db
        Consultation.findByIdAndDelete({_id: id}).then((consultation) => {
            if (!consultation) {
                return res.status(404).json({ message: 'Consultation not found' });
            }
            console.log('Consultation deleted');
        }).catch((error) => {
            res.status(500).json({ message: 'Failed to delete Consultation' });
        });
        res.status(200).json({ message: 'Consultation successfully deleted' });
    });
}

module.exports = {
    GetConsultation,
    GetConsultationById,
    CreateNewConsultation,
    UpdateConsultation,
    DeleteConsultation
}