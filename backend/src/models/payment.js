const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  paymentId: { type: String },
  orderId: { type: String, required: true },
  status: {type: String, required: true },
  amount: { type: Number, required: true},
  currency: { type: String, required: true },
  notes: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    membershipType: { type: String }
  },
  receipt: { type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('payment', paymentSchema);
