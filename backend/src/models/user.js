const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName : {type : String, required: true},
  lastName: {type: String, default: ''},
  email: {type: String, required: true},
  age: {type: Number, default: 0},
  password: {type: String, required: true},
  photoUrl: {type: String, default: ''}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
