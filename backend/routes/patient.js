const express = require('express');
//const requireAuth = require('../middleware/requireAuth');
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

const router = express.Router();



//get all patients
router.get('/', GetAllPatient);

//get a specific patient
router.get('/:id', GetPatient);

//post a patient 
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

module.exports = router;