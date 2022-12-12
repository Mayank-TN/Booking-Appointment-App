const express = require('express');

const router = express.Router();
const userController = require('./controller');
const User = require('./user')

router.get('/get-users' , userController.getUsers)

router.get('/get-users/:id' , userController.getUserById)

router.post('/post-user', userController.postUser)

router.delete('/delete-user/:id' , userController.deleteUser)

router.patch('/edit-user/:id' , userController.editUser)


module.exports = router;