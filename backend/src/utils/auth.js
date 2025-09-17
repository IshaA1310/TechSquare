const User = require('../models/user');

const validateNewData = function (data) {
  console.log('utils, auth ?', data)
  const allowedKeys = ['firstName', 'lastName', 'password', 'email', 'age'];
  const datakeys = Object.keys(data);

  const isAllowedkeys = Object.keys(allowedKeys).includes(datakeys);
  return isAllowedkeys;
}
const validateLoginData = function (data) {
  const allowedKeys = ['email', 'password'];
  const dataKeys = Object.keys(data);

  const isAllowedkeys = Object.keys(allowedKeys).includes(dataKeys);
  return isAllowedkeys;
}

module.exports = {
  validateNewData,
  validateLoginData
};