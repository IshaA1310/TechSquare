const Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
  // key_id: process.env.RAZORPAY_ACCESS_KEY,
  // key_secret: process.env.RAZORPAY_SECRET_KEY,
});

module.exports = instance;
