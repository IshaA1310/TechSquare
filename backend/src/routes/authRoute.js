const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validateNewData, validateLoginData } = require('../utils/auth')

authRouter.post('/signup', async (req, res) => {
  try {
    if(validateNewData(req.body)) {
      const { firstName, lastName, email, age, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      let newUser = new User({
        firstName,
        lastName,
        email,
        age,
        password: hashPassword
      });
      await newUser.save();

      const token = await jwt.sign({ _id: newUser._id }, 'ADFHJKLIUYTREW98UKMNBV', { expiresIn: '1d' });
      const data = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        photoUrl: newUser.photoUrl,
        age: newUser.age,
        gender: newUser.gender
      };
      res.status(200).send({message: 'User created Successfully!', token: token, data: data });
    } else {
      return res.status(401).send({ message: 'Error found in Request!' });
    }
  } catch(err) {
    res.status(500).json({ message: err.message});
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    if(validateLoginData(req.body)) {
      const {email, password} = req.body;

      const user = await User.findOne({ email: email });
      if (!user) return res.status(401).send({ message: 'Your credentials are Invalid!' });

      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if(!isCorrectPassword) return res.status(401).send({ message: 'Your Credentials are Invalid!' });

      const token = jwt.sign({ _id: user._id }, 'ADFHJKLIUYTREW98UKMNBV', { expiresIn: '1d' });

      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photoUrl: user.photoUrl,
        age: user.age,
        gender: user.gender
      };

      return res.status(201).send({ message: 'Login successfully!', token: token, data: data });
    } else {
      return res.status(401).send({ message: 'Error found in Request!' });
    }
  } catch (err) {
    res.status(200).send({ message: err.message });
  }
});

authRouter.patch('/logout', (req, res) => {
  try {
    res.cookie(req.headers.authorization, null, {
      expires: new Date(Date.now())
    });
    res.send({ message: 'Logout successfull!' });
  } catch(err) {
    return res.status(500).send({ message: err.message });
  }
})

module.exports = authRouter;
