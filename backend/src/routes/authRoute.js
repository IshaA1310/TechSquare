const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validateNewData, validateLoginData } = require('../utils/auth')

authRouter.post('/signup', async (req, res) => {
  try {
    console.log(req.body, 'req.body')
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
    console.log(err, 'errrr')
    res.status(500).json({ message: 'Error from server', data: err});
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    if(validateLoginData(req.body)) {
      const {email, password} = req.body;

      const user = await User.findOne({ email: email });
      if (!user) return res.status(401).send('Your credentials are Invalid!');

      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if(!isCorrectPassword) return res.status(401).send('Your Credentials are Invalid!');

      const token = jwt.sign({_id:user._id}, 'ADFHJKLIUYTREW98UKMNBV', {expiresIn: '1d'});

      console.log(token, 'tokenn')
      return res.status(201).cookie(token).send('Login successfully!');

    } else {
      return res.status(401).send('Error found in Request!');
    }
  } catch (err) {
    res.status(200).send({
      message: 'Error from server!', 
      data: {
        name: 'Isha',
        photoUrl: 'https://static.vecteezy.com/system/resources/previews/044/419/658/non_2x/yellow-smiling-ball-wearing-a-straw-hat-in-a-sunny-field-of-flowers-showing-happiness-and-joy-in-nature-photo.jpeg'
      }
    });
  }
});

authRouter.patch('/logout', (req, res) => {

})

module.exports = authRouter;