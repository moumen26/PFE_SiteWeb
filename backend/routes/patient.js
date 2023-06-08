const express = require('express');
const {
    CreateNewNouveaune,
    UpdateDossObsNouveaune,
    GetAllNouveaune,
    GetAllNouveauneById,
    GetNouveauneByListOfID,
    CreateNewPatient,
    GetAllPatient,
    GetPatient,
    DeletePatient,
    UpdatePatient,
    GetDossObs,
    UpdateDossObs,
    DeleteDossObs,
    UpdateNouveaune,
    CreateNewNouveauneToMaman,
} = require('../controllers/PatientController');
const {
    GetAllVaccins,
    GetAllVaccin,
    GetVaccinById,
    UpdateVaccin,
    DeleteVaccin,
    CreateNewVaccin,
    GetVaccinByName,
} = require('../controllers/VaccinController');
const {
    GetConsultation,
    CreateNewConsultation,
    GetConsultationById,
    UpdateConsultation,
    DeleteConsultation,
} = require('../controllers/ConsultationController');
const {GetHospitalisations,
    GetHospitalisationById,
    CreateNewHospitalisation,
    UpdateHospitalisation,
    GetConsultationByHospitalisationID,
    DeleteHospitalisation} = require('../controllers/HospitalisationController');
const {
    GetOrdonance,
    CreateNewOrdonance,
    DeleteOrdonance,
} = require('../controllers/OrdonanceController');
const {
    GetDiagnostic,
    CreateNewDiagnostic,
    UpdateDiagnostic,
    DeleteDiagnostic,
} = require('../controllers/DiagnosticController');
const {} = require('../controllers/ExamenTestController');
const {
    GetAllMedicament,
    GetMedicamentById,
    CreateNewMedicament,
    DeleteMedicament,
    GetAllMedicaments,
    AddNewMedicament
} = require('../controllers/MedicamentController');
const {
    GetAllMaladies,
    GetMaladie,
    AddNewMaladie,
} = require('../controllers/MaladieController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

// requireAuth middleware is used to check if the user is logged in
router.use(requireAuth);

//get all patients
router.get('/', GetAllPatient);

//get all nouveau ne
router.get('/Nouveau-ne/', GetAllNouveaune);

//update nouveau ne
router.patch('/Nouveau-ne/:id', UpdateNouveaune);

//get all nouveau ne by idmaman
router.get('/Nouveau-ne/:id', GetAllNouveauneById);

//get all nouveau ne by list of id
router.post('/Nouveau-ne/list/all', GetNouveauneByListOfID);

//get a specific patient
router.get('/:id', GetPatient);

//post a new patient 
router.post('/',CreateNewPatient);

//post a new nouveau ne to maman
router.post('/Nouveau-ne/maman/:id',CreateNewNouveauneToMaman);

//post a new nouveau ne 
router.post('/Nouveau-ne/:id',CreateNewNouveaune);

//delete a patient
router.delete('/:id', DeletePatient);

//update a patient
router.patch('/:id', UpdatePatient);

// DOSSIER OBSTITRIQUE

//get a specific dossier obstirique
router.get('/DossObs/:id', GetDossObs);

//update a dossier obstirique
router.patch('/DossObs/:id', UpdateDossObs);

//update a dossier obstirique nouveau ne
router.patch('/DossObs/Nouveau-ne/:id', UpdateDossObs);

//delete a dossier obstirique
router.delete('/DossObs/:id', DeleteDossObs);

// VACCIN

// get all vaccins
router.get("/Vaccin/all", GetAllVaccin);
//get all vaccins
router.get("/Vaccin/all/:id", GetAllVaccins);
//get vaccin by name 
router.get("/Vaccin/:nom", GetVaccinByName);
//post a new vaccin
router.post('/AddVaccin/:id',CreateNewVaccin);

//get a specific vaccin
router.get('/Vaccin/:id', GetVaccinById);

//update a vaccin
router.patch('/Vaccin/:id', UpdateVaccin);

//delete a vaccin
router.delete('/Vaccin/:id', DeleteVaccin);

// CONSULTATION

//get all consultations
router.get("/Consultation/all/:id", GetConsultation);

//post a new consultation
router.post('/AddConsultation/:id',CreateNewConsultation);

//get a specific consultation
router.get('/Consultation/:id', GetConsultationById);

//update a consultation
router.patch('/Consultation/:id', UpdateConsultation);

//delete a consultation
router.delete('/Consultation/:id', DeleteConsultation);

// DIAGNOSTIC

//get diagnostics
router.get("/Diagnostic/:id", GetDiagnostic);

//post a new diagnostic
router.post('/AddDiagnostic/:id',CreateNewDiagnostic);

//delete a diagnostic
router.delete('/Diagnostic/:id', DeleteDiagnostic);

//update a diagnostic
router.patch('/Diagnostic/:id', UpdateDiagnostic);

// ORDONANCE

//get ordonances
router.get("/Ordonance/:id", GetOrdonance);

//post a new ordonance
router.post('/AddOrdonance/:id',CreateNewOrdonance);

//delete a ordonance
router.delete('/Ordonance/:id', DeleteOrdonance);

// MEDECAMENTS

//get all medecaments
router.get("/Medicament/all/:id", GetAllMedicament);

//get all
router.get("/Medicaments/all/", GetAllMedicaments);

//post a new medecament
//router.post('/AddMedicament/:id',CreateNewMedicament);

// add a new medecament
router.post('/AddMedicament/:id',AddNewMedicament);

//get a specific medecament
router.get('/Medicament/:id', GetMedicamentById);

//delete a medecament
router.delete('/Medicament/:id', DeleteMedicament);

// MALADIE

// get all maladie data base
router.get('/Maladie/all', GetAllMaladies);
// get maladie
router.get('/Maladie/:id', GetMaladie);
// add a maladie
router.post('/AddMaladie/:id',AddNewMaladie);

// Hospitalisation

//get all Hospitalisations
router.get("/Hospitalisation/all/:id", GetHospitalisations);

//post a new Hospitalisation
router.post('/AddHospitalisation/:id',CreateNewHospitalisation);

//get a specific Hospitalisation
router.get('/Hospitalisation/:id', GetHospitalisationById);

//update a Hospitalisation
router.post('/Hospitalisation/:id', UpdateHospitalisation);

//delete a Hospitalisation
router.delete('/Hospitalisation/:id', DeleteHospitalisation);

//get Consultation by HospitalisationID
router.get('/ConsultationByHospitalisationID/:id', GetConsultationByHospitalisationID);

module.exports = router;