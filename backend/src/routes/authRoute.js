const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validateNewData, validateLoginData } = require('../utils/auth')

authRouter.post('/signup', async (req, res) => {
  try {
    if(validateNewData(req.body)) {
      const { firtsName, lastName, email, age, password } = req.body;
      const hashPassword = bcrypt.hash(password, 10) ;
      let newUser = new User({
        firtsName,
        lastName,
        email,
        age,
        password: hashPassword
      });
      await newUser.save();
      res.status(200).send('User created Successfully!');
    } else {
      return res.status(401).send('Error found in Request!');
    }
  } catch(err) {
    res.status(500).send('Error from server!');
  }
});

authRouter.post('/login', (req, res) => {
  try {
    if(validateLoginData(req.body)) {

    } else {
      return res.status(401).send('Error found in Request!');
    }
  } catch (err) {
    res.status(500).send('Error from server!');
  }
});

authRouter.patch('/logout', (req, res) => {

})