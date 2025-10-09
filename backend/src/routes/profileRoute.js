const express = require('express');
const profileRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const User = require('../models/user');
const SPECIFIC_FIELDS = ['firstName', 'lastName', 'age', 'skills', 'photoUrl', 'about', 'email', 'gender'];

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const userData = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      age: req.user.age,
      photoUrl: req.user.photoUrl,
      about: req.user.about,
      skills: req.user.skills,
      gender: req.user.gender
    }
    return res.status(200).send({ message: 'User found successfully', data: userData });
  } catch(error) {
    return res.status(500).send({ message: 'Error from server', data: null });
  }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
  try {

    const user = await User.findOne({ _id: req.user._id });

    user.firstName = req.body.firstName? req.body.firstName: user.firstName;
    user.lastName = req.body.lastName? req.body.lastName: user.lastName;
    user.age = req.body.age? req.body.age: user.age;
    user.gender = req.body.gender? req.body.gender: user.gender;
    user.photoUrl = req.body.photoUrl? req.body.photoUrl: user.photoUrl;
    user.about = req.body.about? req.body.about: user.about;
    await user.save();

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      gender: user.gender,
      photoUrl: user.photoUrl,
      about: user.about,
      skills: user.skills
    };

    return res.status(200).send({ message: 'User found successfully', data: userData });
  } catch(error) {
    return res.status(500).send({ message: error.message, data: null });
  }
});

profileRouter.get('/usersList', userAuth, async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page-1) * limit;
    const users = await User.find({}).select(SPECIFIC_FIELDS).skip(skip).limit(limit).exec();
    return res.status(200).send({ message: 'Users found successfully', data: users });
  } catch(error) {
    return res.status(500).send({ message: 'Error from server', data: null });
  }
});

module.exports = profileRouter;
