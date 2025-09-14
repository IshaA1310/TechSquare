const User = require('../models/user');

const validateNewData = async function (data) {
  const allowedKeys = ['firstName', 'lastName', 'password', 'email', 'age'];
  const datakeys = Object.keys(data);

  const isAllowedkeys = Object.keys(allowedKeys).includes(datakeys);
  return isAllowedkeys;
}
const validateLoginData = async function (data) {
  
}

exports.module = {
  validateNewData,
  validateLoginData
}