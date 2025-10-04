const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async function(req, res, next) {
  try {

    const token = req.headers.authorization;
    if(!token) return res.status(401).send('Please Login!'); //unauthorized

    console.log(token, 'kya mila tujhe ?')
    const decoded_id = jwt.verify(token, 'ADFHJKLIUYTREW98UKMNBV');
    console.log(decoded_id, 'decoded_id');

    const user = await User.findById(decoded_id);
    if(!user) return res.status(401).send('Please Register Yourself!');

    req.user = user;
    console.log(req.user, 'req.use')
    next();
  } catch(err) {
    console.log(err)
    return res.status(500).send('Error from server!');
  }
}

module.exports = userAuth;