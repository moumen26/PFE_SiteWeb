const DossObs = require('../models/DossObsModel');
const CarnetSante = require('../models/CarnetSanteModel');
const Patient = require('../models/PatientModel');
const User = require('../models/UserModel');
const Consultation = require('../models/ConsultationModel');
const Ordonance = require('../models/OrdonanceModel');
const ExamenTest = require('../models/ExamenModel');
const Diagnostic = require('../models/DiagnosticModel');
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
            
            // Save to maman the patientID
            const maman = await Patient.findOne({_id :id}).then((maman) => {
                if (!maman) {
                    return res.status(404).json({ message: 'User not found' });
                }
                maman.idNouveauNe.push(patientID);
                maman.save();
            }).catch((error) => {
                console.error('Error creating patient:', error);
                res.status(500).json({ message: 'Failed to create patient' });
            });
            
            // Protocole daccouchement
            try{
                //check if id is valid
                if(!mongoose.Types.ObjectId.isValid(Maman.idDossObs)){
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
// update a Patient by ID
const UpdatePatient = async (req, res) => {
    const {id} = req.params;
    const { idNouveauNe } = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'patient not found'});
        }
        //find id in db and update
        const patient = await Patient.findOneAndUpdate({_id: id},
            {idNouveauNe}
        );
        //if not found return error
        if(!patient){
            return res.status(404).json({err: 'patient not found'});
        }
        //return user
        res.status(200).json(patient);
    }catch(err){
        res.status(400).json({err: err.message});
    }
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
        ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales,
        MamanNom,MamanEpouse,DateNaissance,AdresseActuelle,Profession,Salle,NumLit,DateEntrer,
        DateSortie,Admise,SageFemme,DiagnosticSortie,ResumerObservation,MotifHospitalisation,
        DRR,TermeCalc,Menarchie,CarcterCycle,AgeMariage,Contraception,GroupSanguin,FNS,
        Glycemle,UreeSanguine,Albuminurie,BW,Serodiagnostic,Toxoplasmose,Rubeole,MamanPoids,
        MamanTaille,MamanPoule,TA,HU,ConstractionUterines,Presentation,BCF,Uterus,Speculum,
        ToucherVaginal} = req.body;
    try{
        //check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({err: 'DossierObstetrique not found'});
        }
        //find id in db and update
        const DossierObstetrique = await DossObs.findOneAndUpdate({_id: id},
            {Date_daccouchement,Heure_daccouchement, Poids, Aspect, Anomalies, Placenta, Membranes, Cordon
            ,Sexe, Taille, Pc, une_min, cinq_min, Malformation, Remarque, Empreintes_digitales
            ,MamanNom,MamanEpouse,DateNaissance,AdresseActuelle,Profession,Salle,NumLit,DateEntrer,
            DateSortie,Admise,SageFemme,DiagnosticSortie,ResumerObservation,MotifHospitalisation,
            DRR,TermeCalc,Menarchie,CarcterCycle,AgeMariage,Contraception,GroupSanguin,FNS,
            Glycemle,UreeSanguine,Albuminurie,BW,Serodiagnostic,Toxoplasmose,Rubeole,MamanPoids,
            MamanTaille,MamanPoule,TA,HU,ConstractionUterines,Presentation,BCF,Uterus,Speculum,
            ToucherVaginal}
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

// CONSULTATION

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

// DIAGNOTIC

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
        const { Context, Symptomes} = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        const newDiagnostic = new Diagnostic({
            ConsultationId: id,
            Context, 
            Symptomes
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
            res.status(201).json(diagnostic);
        }).catch((error) => {
            console.error('Error creating Diagnostic:', error);
            res.status(500).json({ error: 'Failed to create Diagnostic' });
        });
    }catch(err){
        res.status(400).json({err: err.message});
    }
    
}

// ORDONANCE

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
                res.status(201).json(ordonance);
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
            Consultation.updateMany({_id: ordonance.ConsultationID}, {
                $unset: {OrdonanceID: ordonance}}).then((ordonance) => {
                    if (!ordonance) {
                        return res.status(404).json({ message: 'ordonance not found' });
                    }
                    console.log('ordonance deleted from consultation');
                }).catch((error) => {
                    console.error('Error deleting ordonance from consultation:', error);
                    res.status(500).json({ message: 'Failed to delete ordonance from consultation' });
                });
            res.status(200).json({ message: 'ordonanceID deleted successfully from consultation' });
            //return ordonance
            console.log('Ordonance deleted');
        }).catch((error) => {
            res.status(500).json({ message: 'Failed to delete Ordonance' });
        });
    }catch(err){
        res.status(400).json({err: err.message});
    }
}
module.exports = {
    CreateNewNouveaune,
    UpdateDossObsNouveaune,
    CreateNewPatient,
    GetAllPatient,
    GetPatient,
    DeletePatient,
    UpdatePatient,
    GetDossObs,
    UpdateDossObs,
    DeleteDossObs,
    UpdateCarnetSante,
    GetCarnetSante,
    DeleteCarnetSante,
    GetConsultation,
    GetConsultationById,
    CreateNewConsultation,
    UpdateConsultation,
    DeleteConsultation,
    GetDiagnostic,
    CreateNewDiagnostic,
    GetOrdonance,
    CreateNewOrdonance,
    DeleteOrdonance
}