const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async function(req, res, next) {
  try {

    const token = req.headers.authorization;
    if(!token) return res.status(401).send('Please Login!'); //unauthorized

    const decoded_id = jwt.verify(token, 'ADFHJKLIUYTREW98UKMNBV');

    const user = await User.findById(decoded_id);
    if(!user) return res.status(401).send('Please Register Yourself!');

    req.user = user;
    next();
  } catch(err) {
    return res.status(500).send('Error from server!');
  }
}

module.exports = userAuth;
