const express = require('express');
//const requireAuth = require('../middleware/requireAuth');
const {
    CreateNewPatient_part1,
    CreateNewPatient,
    GetAllPatient,
    GetPatient,
    DeletePatient,
    UpdatePatient
} = require('../controllers/PatientController');

const router = express.Router();



//get all patients
router.get('/', GetAllPatient);

//get a specific patient
router.get('/:id', GetPatient);

//post a patient part 1
router.post('/',CreateNewPatient_part1);

//delete a patient
router.delete('/:id', DeletePatient);

//update a patient
router.patch('/:id', UpdatePatient);

module.exports = router;