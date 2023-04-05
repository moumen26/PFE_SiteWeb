const express = require('express');
const {
    Login,
    Signup,
    GetAllUsers,
    GetUser, 
    CreateNewUser,
    DeleteUser,
    UpdateUser
} = require('../controllers/UserController');
const router = express.Router();

//login
router.post('/login', Login);

//signup
router.post('/signup', Signup);

//get all users
router.get('/', GetAllUsers);

//get a specific user
router.get('/:id', GetUser);

//post a user
router.post('/',CreateNewUser);

//delete a user
router.delete('/:id', DeleteUser);

//update a user
router.patch('/:id', UpdateUser);

module.exports = router;