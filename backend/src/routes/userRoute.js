const express = require('express');
const userRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const ConnectionRequest = require('../models/connectionRequest');

const SPECIFIC_FIELDS = ['firstName', 'lastName'];
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
  try {
    const user = req.user._id;
    const requests = ConnectionRequest.find({
      toUserId: user,
      status: 'interested'
    }).populate('fromUserId', SPECIFIC_FIELDS);
    return res.status(201).send({message: 'Lists of requests', data: requests});
  } catch(err) {
    return res.status(500).send('Error from server!');
  }
});

userRouter.get('/user/connections', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const connections = await ConnectionRequest.find({ // isme particular user from field or to field m h
      $or: [
        { fromUserId: loggedInUser._id, status: 'accepted' },
        { toUserId: loggedInUser._id , status: 'accepted' }
      ]
    }).populate('fromUserId', SPECIFIC_FIELDS).populate('toUserId', SPECIFIC_FIELDS);

    const details = connections.map((connection) => {
      if(connection.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    })

    return res.status(201).send({ message: 'connections fetched successfully', data: details });
  } catch(err) {
    return res.status(500).send('Error from server!');
  }
});
module.exports = userRouter;