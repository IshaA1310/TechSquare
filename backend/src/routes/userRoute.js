const express = require('express');
const userRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const ConnectionRequest = require('../models/connectionRequest');

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
  try {
    const user = req.user._id;
    const requests = ConnectionRequest.find({
      toUserId: user,
      status: 'interested'
    }).populate('fromUserId', ['firstName', 'lastName']);
    return res.status(201).send({message: 'Lists of requests', data: requests});
  } catch(err) {
    return res.status(500).send('Error from server!');
  }
});

module.exports = userRouter;