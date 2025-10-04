const express = require('express');
const profileRouter = express.Router();
const userAuth = require('../middleware/userAuth');

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    console.log('HOLA BACK')
    const userData = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      age: req.user.age,
      photoUrl: req.user.photoUrl
    }
    console.log(userData, 'UD')
    return res.status(200).send({ message: 'User found successfully', data: userData });
  } catch(error) {
    return res.status(500).send({ message: 'Error from server', data: null });
  }
});

module.exports = profileRouter;