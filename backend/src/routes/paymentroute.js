const express = require('express');
const paymentRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const razorpayInstance = require('../utils/razorpay');
const Payment = require('../models/payment');
const User = require('../models/user');
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");
const payment = require('../models/payment');

paymentRouter.post('/create/payment', userAuth, async(req, res) => {
  try {
    const { type } = req.body;
    const { firstName, lastName, email } = req.user;
    const order = await razorpayInstance.orders.create({
      amount: type === 'Silver' ? 50000 : 70000,
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        firstName,
        lastName,
        email,
        membershipType: type
      },
    });
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      notes: order.notes,
      receipt: order.receipt
    })
    await payment.save();
    res.status(201).send({ data: payment, keyId: process.env.RAZORPAY_ACCESS_KEY })
  } catch(err) {
    console.log(err, ' error');
  }
});

paymentRouter.post('/payment/webhook', async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.WEBHOOK_SECRET
    );
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();
    const user = await User.findOne({ _id: payment.userId });
    user.membershipType = paymentDetails.notes.membershipType;
    if(paymentDetails.status === 'captured') {
      user.isPremium = true
    }
    if(paymentDetails.status === 'failed') {
      user.isPremium = false
    }
    await user.save();
    console.log(req.body.payload.payment.entity, ' isWebhookValid', isWebhookValid)
    res.status(200).send('Webhook verified successfully')
  } catch(err) {
    console.log(err, ' Error');
  }
});

paymentRouter.get('/premium/verify', userAuth, async (req, res) => {
  try{
    const user = req.user;
    if(user.isPremium === true) {
      return res.status(200).send({ isPremium: true });
    }
    return res.status(200).send({ isPremium: false });
  } catch(err) {
    console.log(err, ' error')
  }
});

module.exports = paymentRouter;
