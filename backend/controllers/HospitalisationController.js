const mongoose = require('mongoose');
const Patient = require('../models/PatientModel');
const User = require('../models/UserModel');
const Consultation = require('../models/ConsultationModel');
const Diagnostic = require('../models/DiagnosticModel');
const Ordonance = require('../models/OrdonanceModel');
const Hospitalisation = require('../models/HospitalisationModel');

// Define a route for fetching all Hospitalisation
const GetHospitalisations = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        const hospitalisation = await Hospitalisation.find({patientID: id});
        if (!hospitalisation) {
            return res.status(404).json({ message: 'Hospitalisation not found' });
        }
        res.status(200).json(hospitalisation);
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}
// Define a route for fetching a Hospitalisation by ID
const GetHospitalisationById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the hospitalisation by ID in the database
    await Hospitalisation.findById(id)
        .then((hospitalisation) => {
            if (!hospitalisation) {
                return res.status(404).json({ message: 'Hospitalisation not found' });
            }
            res.status(200).json(hospitalisation);
        })
        .catch((error) => {
            console.error('Error retrieving Hospitalisation :', error);
            res.status(500).json({ message: 'Error retrieving Hospitalisation' });
        });
}
// Add a new Hospitalisation
const CreateNewHospitalisation = async (req, res) => {
    try {
        const Date = req.body.Date_Hospitalisation;
        const Heure = req.body.Heure_Hospitalisation;
        const {id} = req.params;
        const idMedecin = req.body.idMedecin;
        const medecin = await User.findOne({_id :idMedecin});
        const newHospitalisation = new Hospitalisation({
            patientID: id,
            MedecinID: idMedecin,
            MedecinNom: medecin.Fname,
            DateHospitalisation: Date,
            HeureHospitalisation: Heure,
        });
        newHospitalisation.save().then(async (savedHospitalisation) => {
            const HospitalisationID = savedHospitalisation._id;

            // Save to patient the HospitalisationID
            const patient = await Patient.findOne({_id :id}).then((patient) => {
                if (!patient) {
                    return res.status(404).json({ message: 'patient not found' });
                }
                patient.HospitalisationID.push(HospitalisationID);
                patient.save();
            }).catch((error) => {
                console.error('Error creating patient:', error);
                res.status(500).json({ message: 'Failed to create patient' });
            });
            
            // Send HospitalisationID to conculatationPage
            res.status(201).json({id: HospitalisationID});
        }).catch((error) => {
            console.error('Error creating Hospitalisation:', error);
            res.status(500).json({ message: 'Failed to create Hospitalisation' });
        });
            
      } catch (error) {
        console.error('Error creating Hospitalisation:', error);
        res.status(500).json({ error: 'Failed to create Hospitalisation' });
      }
}
// Delete a specific Hospitalisation
const DeleteHospitalisation = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'Consultation not found'});
    }
    const HospitalisationData = await Hospitalisation.findById({_id: id})
    .then(async (hospitalisation) => {
        if (!hospitalisation) {
            return res.status(404).json({ message: 'hospitalisation not found' });
        }
        // Get patientID, DiagnosticID, OrdonanceID, ExamenID
        const patientID = hospitalisation.patientID;
        
        // Delete hospitalisation from patient
        Patient.updateMany({_id:patientID}, {
            $pull: {hospitalisationID: id}}).then((patient) => {
                if (!patient) {
                    return res.status(404).json({ message: 'patient not found' });
                }
                console.log('hospitalisation deleted from patient');
            }).catch((error) => {
                return res.status(500).json({ message: 'Failed to update patient' });
            });
        // Delete all Concultations of this hospitalisation
        Consultation.deleteMany({HospitalisationID: id}).then((Consultation) => {
            if (!Consultation){
                return res.status(404).json({ message: 'Consultations not found' });
            }
            console.log('Consultations deleted from hospitalisation');
        }).catch((error) => {
            return res.status(500).json({ message: 'Failed to delete Consultation' });
        });
        // Delete Hospitalisation
        await Hospitalisation.findByIdAndRemove({ _id: id}).then((hospitalisation) => {
            if (!hospitalisation) {
                return res.status(404).json({ message: 'hospitalisation not found' });
            }
            res.status(200).json({ message: 'hospitalisation deleted seccessfelly' });
        }).catch((error) =>{
            return res.status(500).json({ message: 'Failed to delete Hospitalisation' });
        });
    });
}
// Add concultation to this Hospitalisation
const UpdateHospitalisation = async (req, res) => {
    try {
        const {id} = req.params;
        const Date = req.body.Date_Concultation;
        const Heure = req.body.Heure_Concultation;
        const idMedecin = req.body.idMedecin;
        if (!idMedecin) {
            return res.status(400).json({ error: 'You must provide all fields' });
        }
        const medecin = await User.findOne({_id :idMedecin});
        const hospitalisation = await Hospitalisation.findOne({_id :id});
        const newConsultation = new Consultation({
            HospitalisationID: id,
            MedecinID: idMedecin,
            MedecinNom: medecin.Fname,
            DateConcultation: Date,
            HeureConsultation: Heure,
        });
        newConsultation.save().then(async (savedConsultation) => {
            const ConsultationID = savedConsultation._id;

            // Save to Hospitalisation the ConsultationID
            await Hospitalisation.findOne({_id :id}).then((hospitalisation) => {
                if (!hospitalisation) {
                    return res.status(404).json({ message: 'Hospitalisation not found' });
                }
                hospitalisation.ConcultationID.push(ConsultationID);
                hospitalisation.save();
                // Send ConsultationID to conculatationPage
                res.status(201).json({id: ConsultationID});
            }).catch((error) => {
                console.error('Error creating Hospitalisation:', error);
                res.status(500).json({ message: 'Failed to create Hospitalisation' });
            });
            
            
        }).catch((error) => {
            console.error('Error creating Consultation:', error);
            res.status(500).json({ message: 'Failed to create Consultation' });
        });
    }catch(error){
        res.status(400).json({err: error.message});
    }
}
// Define a route for fetching a Consultation by HospitalisationID
const GetConsultationByHospitalisationID = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the Concultation by ID in the database
    await Consultation.find({HospitalisationID: id})
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
module.exports = {
    GetHospitalisations,
    GetHospitalisationById,
    CreateNewHospitalisation,
    UpdateHospitalisation,
    DeleteHospitalisation,
    GetConsultationByHospitalisationID
}