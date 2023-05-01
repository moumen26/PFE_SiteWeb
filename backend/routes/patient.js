const express = require('express');
//const requireAuth = require('../middleware/requireAuth');
const {
    CreateNewPatient,
    GetAllPatient,
    GetPatient,
    GetDossObs,
    DeletePatient,
    UpdateDossObs
} = require('../controllers/PatientController');

const router = express.Router();



//get all patients
router.get('/', GetAllPatient);

//post a patient 
router.post('/',CreateNewPatient);

//get a specific patient
router.get('/:id', GetPatient);

//get a specific patient
router.get('/DossObs/:id', GetDossObs);

//delete a patient
router.delete('/:id', DeletePatient);

//update a patient
router.patch('/DossObs/:id', UpdateDossObs);

module.exports = router;