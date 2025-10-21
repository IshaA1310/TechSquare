const express = require('express');
const paymentRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const razorpayInstance = require('../utils/razorpay');

paymentRouter.post('/create/payment', userAuth, async(req, res) => {
  
})

module.exports = paymentRouter;