const express = require('express')
const { employeeRegister, getAllEmployees, getProfile, deleteEmployee, editUser } = require('../controllers/logic')
const upload = require('../multerconfiguration/storageConfiguration')


//create an object for router class in express
const router=new express.Router()

//route for register new employee
router.post('/employees/register', upload.single('user_profile'), employeeRegister)


// get all employees
router.get('/employees/getEmployees', getAllEmployees)


// to get profile
router.get('/employees/getProfile/:id', getProfile)

// to get profile
router.delete('/employees/deleteEmployee/:id', deleteEmployee)

//route for edit employee
router.post('/employees/editProfile/:id', upload.single('user_profile'), editUser )


module.exports=router



