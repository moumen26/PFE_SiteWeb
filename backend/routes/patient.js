const express = require('express');
const {
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
} = require('../controllers/PatientController');
const {
    GetAllVaccins,
    GetVaccinById,
    UpdateVaccin,
    DeleteVaccin,
    CreateNewVaccin,
} = require('../controllers/VaccinController');
const router = express.Router();



//get all patients
router.get('/', GetAllPatient);

//get a specific patient
router.get('/:id', GetPatient);

//post a new patient 
router.post('/',CreateNewPatient);

//delete a patient
router.delete('/:id', DeletePatient);

// DOSSIER OBSTITRIQUE

//get a specific dossier obstirique
router.get('/DossObs/:id', GetDossObs);

//update a dossier obstirique
router.patch('/DossObs/:id', UpdateDossObs);

//delete a dossier obstirique
router.delete('/DossObs/:id', DeleteDossObs);

// CARNET DE SANTE

//get a specific carnet de sante
router.get('/CarnetSante/:id', GetCarnetSante);

//update a carnet de sante
router.patch('/CarnetSante/:id', UpdateCarnetSante);

//delete a carnet de sante
router.delete('/CarnetSante/:id', DeleteCarnetSante);

// VACCIN

//get all vaccins
router.get('/Vaccin/all', GetAllVaccins);

//post a new vaccin
router.post('/AddVaccin/:id',CreateNewVaccin);

//get a specific vaccin
router.get('/Vaccin/:id', GetVaccinById);

//update a vaccin
router.patch('/Vaccin/:id', UpdateVaccin);

//delete a vaccin
router.delete('/Vaccin/:id', DeleteVaccin);

module.exports = router;