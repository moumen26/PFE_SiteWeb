const DossObs = require('../models/DossObsModel');
const CarnetSante = require('../models/CarnetSanteModel');
const Patient = require('../models/PatientModel');
const User = require('../models/UserModel');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


//NOUVEAU-NE

// Create a new Nouveau-ne
const CreateNewNouveaune = async (req, res) => {
    const {id} = req.params;
    try {
        const Date_daccouchement = req.body.Date_daccouchement;
        const Heure_daccouchement = req.body.Heure_daccouchement;
        const idAccoucheur = req.body.idAccoucheur;
        if (!idAccoucheur || !Date_daccouchement || !Heure_daccouchement) {
            return res.status(400).json({ error: 'You must provide all fields' });
        }
        //find patient by id 
        const Maman = await Patient.findById({_id: id});
        const newPatient = new Patient({
            idAccoucheur,
            idMaman: id,
            idDossObs : Maman.idDossObs,
        });
        newPatient.save().then(async (savedPatient) => {
            const patientID = savedPatient._id;

            // Save to user the patientID
            const user = await User.findOne({_id :idAccoucheur}).then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                user.PatientID.push(patientID);
                user.save();
            }).catch((error) => {
                console.error('Error creating patient:', error);
                res.status(500).json({ message: 'Failed to create patient' });
            });
        
            // Protocole daccouchement
            try{
                //check if id is valid
                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(400).json({err: 'DossierObstetrique Maman not found'});
                }
                //find id in db and update
                const DossierObstetrique = await DossObs.findOneAndUpdate({_id: Maman.idDossObs},
                    {Date_daccouchement,Heure_daccouchement, idNouveauNe: patientID}, {new: true}
                );
                //if not found return error
                if(!DossierObstetrique){
                    return res.status(404).json({err: 'DossierObstetrique Maman not found'});
                }
            }catch(err){
                res.status(400).json({err: err.message});
            }
            // Create new Carnet de santé
            const newCarnetSante = new CarnetSante({
                patientID,
                Date_daccouchement,
                Heure_daccouchement,
            });
            // Save to db Carnet de santé
            newCarnetSante.save().then(async (savedCarnetSante) => {
                // Get the CarnetSanteID
                const savedCarnetSanteId = savedCarnetSante._id;
                // Add to patient the CarnetSanteID
                const patient = await Patient.findOneAndUpdate({_id: patientID},
                    {idCarnetSante: savedCarnetSanteId}, {new: true}
                );
            }).catch((error) => {
                console.error('Error Carnet de santé:', error);
                res.status(500).json({ message: 'Error saving Carnet de santé' });
            });
            // Send patientID to patientDetails
            await res.status(201).json({id: patientID});
        }).catch((error) => {
            console.error('Error creating patient:', error);
            res.status(500).json({ message: 'Failed to create patient' });
        });
            
      } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Failed to create patient' });
      }
}

// update a DossObs Nouveau-ne by ID
const UpdateDossObsNouveaune = async (req, res) => {
    const {id} = req.params;
    const { Date_daccouchement,Heure_daccouchement, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
        ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'DossierObstetrique Nouveau-ne not found'});
        }
        //find id in db and update
        const DossierObstetrique = await DossObs.findOneAndUpdate({_id: id},
            {Date_daccouchement,Heure_daccouchement, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
                ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales}
        );
        //if not found return error
        if(!DossierObstetrique){
            return res.status(404).json({err: 'DossierObstetrique Nouveau-ne not found'});
        }
        //return user
        res.status(200).json(DossierObstetrique);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

// PATIENTS

//get all Patients
const GetAllPatient = async (req, res) => {
    const patients = await DossObs.find({}).sort({createdAt: -1});
    res.status(200).json(patients);
}

// get a specific Patient by ID
const GetPatient = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the patient by ID in the database
    await Patient.findById(id)
        .then((patient) => {
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json(patient);
        })
        .catch((error) => {
            console.error('Error retrieving patient:', error);
            return res.status(500).json({ message: 'Error retrieving patient' });
        });
}

// Create a new patient
const CreateNewPatient = async (req, res) => {
    try {
        const Date_Entree = req.body.Date_daccouchement;
        const idAccoucheur = req.body.idAccoucheur;
        if (!idAccoucheur) {
            return res.status(400).json({ error: 'You must provide all fields' });
        }
        const newPatient = new Patient({
            idAccoucheur,
        });
        newPatient.save().then(async (savedPatient) => {
            const patientID = savedPatient._id;

            // Save to user the patientID
            const user = await User.findOne({_id :idAccoucheur}).then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                user.PatientID.push(patientID);
                user.save();
            }).catch((error) => {
                console.error('Error creating patient:', error);
                res.status(500).json({ message: 'Failed to create patient' });
            });
            // Send patientID to patientDetails
            await res.status(201).json({id: patientID});
            
            // Create new Dossier Obstitrique
            const newDossObs = new DossObs({
                patientID,
                Date_Entree,
                AccoucheurID: idAccoucheur,
            });
            // Save to db Dossier Obstitrique
            newDossObs.save()
            .then(async (savedDossObs) => {
                // Get the DossObsID
                const savedDossObsId = savedDossObs._id;
                // Add to patient the DossObsID
                const patient = await Patient.findOneAndUpdate({_id: patientID},
                    {idDossObs: savedDossObsId}, {new: true}
                );
            }).catch((error) => {
                console.error('Error Dossier obstitrique:', error);
                res.status(500).json({ message: 'Error saving Dossier obstitrique' });
            }); 
            
        }).catch((error) => {
            console.error('Error creating patient:', error);
            res.status(500).json({ message: 'Failed to create patient' });
        });
            
      } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Failed to create patient' });
      }
}

//delete a specific patient
const DeletePatient = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'patient not found'});
    }
    //find id in db and delete
    const patient = await Patient.findByIdAndDelete({_id: id});
    //if not found return error
    if(!patient){
        return res.status(404).json({err: 'patient not found'});
    }
    //return user
    res.status(200).json(patient);
}

// DOSSIER OBSTITRIQUE

// Define a route for fetching a Dossier Obstitrique by ID
const GetDossObs = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the DossierObstetrique by ID in the database
    await DossObs.findById(id)
        .then((DossObs) => {
            if (!DossObs) {
                return res.status(404).json({ message: 'DossierObstetrique not found' });
            }
            res.status(200).json(DossObs);
        })
        .catch((error) => {
            console.error('Error retrieving DossierObstetrique:', error);
            res.status(500).json({ message: 'Error retrieving DossierObstetrique' });
        });
}
// Update a specific Dossier Obstitrique
const UpdateDossObs = async (req, res) => {
    const {id} = req.params;
    const { Date_daccouchement,Heure_daccouchement, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
        ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'DossierObstetrique not found'});
        }
        //find id in db and update
        const DossierObstetrique = await DossObs.findOneAndUpdate({_id: id},
            {Date_daccouchement,Heure_daccouchement, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
                ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales}
        );
        //if not found return error
        if(!DossierObstetrique){
            return res.status(404).json({err: 'DossierObstetrique not found'});
        }
        //return user
        res.status(200).json(DossierObstetrique);
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}
//delete a specific Dosssier Obstitrique
const DeleteDossObs = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'dossier Obstetrique not found'});
    }
    //find id in db and delete
    const dossierObstetrique = await DossObs.findByIdAndDelete({_id: id});
    //if not found return error
    if(!dossierObstetrique){
        return res.status(404).json({err: 'dossier Obstetrique not found'});
    }
    //return user
    res.status(200).json(dossierObstetrique);
}


// CARNET DE SANTE

// Define a route for fetching a Carnet de Sante by ID
const GetCarnetSante = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Specified id is not valid' });
    }
    // Find the patient by ID in the database
    await CarnetSante.findById(id)
        .then((CarnetSante) => {
            if (!CarnetSante) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.status(200).json(CarnetSante);
        })
        .catch((error) => {
            console.error('Error retrieving Carnet De Sante:', error);
            res.status(500).json({ message: 'Error retrieving Carnet De Sante' });
        });
}
// Update a specific Carnet de Sante
const UpdateCarnetSante = async (req, res) => {
    const {id} = req.params;
    const { Date_daccouchement,Heure_daccouchement,Sexe,une_min,cinq_min,Reanimation,
        Duree,Malformation,Transfert,MotifTransfert,ExamenCordon,EmissionUrine,EmissionMeconium,
        CatheterismeChoanes,RechercheAtresieLoesophage,OrganesGenitauxExternes,VitamineK1,Collyre} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'Carnet De Sante not found'});
        }
        //find id in db and update
        const CarnetDeSante = await CarnetSante.findOneAndUpdate({_id: id},
            {
                Date_daccouchement,
                Heure_daccouchement,
                Sexe,
                une_min,
                cinq_min,
                Reanimation,
                Duree,
                Malformation,
                Transfert,
                MotifTransfert,
                ExamenCordon,
                EmissionUrine,
                EmissionMeconium,
                CatheterismeChoanes,
                RechercheAtresieLoesophage,
                OrganesGenitauxExternes,
                VitamineK1,
                Collyre
            }
        );
        //if not found return error
        if(!CarnetDeSante){
            return res.status(404).json({err: 'Carnet De Sante not found'});
        }
        //return user
        res.status(200).json(CarnetDeSante);
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}
//delete a specific Carnet de Sante
const DeleteCarnetSante = async (req, res) => {
    const {id} = req.params;
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({err: 'Carnet de Sante not found'});
    }
    //find id in db and delete
    const CarnetDeSante = await CarnetSante.findByIdAndDelete({_id: id});
    //if not found return error
    if(!CarnetDeSante){
        return res.status(404).json({err: 'Carnet de Sante not found'});
    }
    //return user
    res.status(200).json(CarnetDeSante);
}

module.exports = {
    CreateNewNouveaune,
    UpdateDossObsNouveaune,
    CreateNewPatient,
    GetAllPatient,
    GetPatient,
    DeletePatient,
    GetDossObs,
    UpdateDossObs,
    DeleteDossObs,
    UpdateCarnetSante,
    GetCarnetSante,
    DeleteCarnetSante,
}