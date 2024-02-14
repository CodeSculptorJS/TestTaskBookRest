const userController = require('../controllers/userController');

const router = require('express').Router();

router.post('/addUser', userController.addUser);

router.patch('/updateUser', userController.updateUser);

router.delete('/deleteUser', userController.deleteUser);

module.exports=router;