const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName : {type : String, required: true},
  lastName: {type: String, default: ''},
  email: {type: String, required: true},
  age: {type: Number, default: 0},
  password: {type: String, required: true},
  photoUrl: {type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&s'},
  about: {type: String, default: 'This is a default about'},
  skills: {type: [String], default: ['Javascript', 'HTML', 'CSS']}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
