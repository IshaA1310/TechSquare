const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async function(req, res, next) {
  try {

    const token = req.headers.authorization;
    if(!token) return res.status(401).send('Please Login!'); //unauthorized

    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return res.status(401).send('Please Login!'); // Unauthorized
    // }
    // const token = authHeader.split(' ')[1]; // ✅ Extract actual token
    const decoded_id = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded_id);
    if(!user) return res.status(401).send('Please Register Yourself!');

    req.user = user;
    next();
  } catch(err) {
    return res.status(500).send('Error from server!');
  }
}

module.exports = userAuth;
