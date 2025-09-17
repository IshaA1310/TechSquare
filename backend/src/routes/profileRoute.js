const express = require('express');
const profileRouter = express.Router();
const userAuth = require('./');

profileRouter.get('/profile/view', userAuth, async (req, res) => {

});