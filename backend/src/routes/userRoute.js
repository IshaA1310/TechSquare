const express = require('express');
const userRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const SPECIFIC_FIELDS = ['firstName', 'lastName', 'age', 'skills', 'photoUrl', 'about', 'gender'];
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
  try {
    const user = req.user._id;
    const requests = await ConnectionRequest.find({
      toUserId: user,
      status: 'Interested'
    }).populate('fromUserId', SPECIFIC_FIELDS);
    return res.status(201).send({message: 'Lists of requests', data: requests});
  } catch(err) {
    return res.status(500).send({message: err.message });
  }
});

userRouter.get('/user/connections', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const connections = await ConnectionRequest.find({ // isme particular user from field or to field m h
      $or: [
        { fromUserId: loggedInUser._id, status: 'Accepted' },
        { toUserId: loggedInUser._id , status: 'Accepted' }
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

userRouter.get('/feed', userAuth, async (req, res) => {

  try {
    const loggedInUser = req.user._id;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page-1)*limit;

    const connectionRequests = await ConnectionRequest.find({
      $or:[
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ]
    }).select('fromUserId toUserId');
    let hideUsers = new Set();
    connectionRequests.forEach((request) => {
      if(request.fromUserId) hideUsers.add(request.fromUserId.toString());
      if(request.toUserId) hideUsers.add(request.toUserId.toString());
    });
    const userList = await User.find({
      $and: [
        {_id: {$nin: Array.from(hideUsers)}},
        {_id: {$ne: loggedInUser._id}}
      ]
    }).select(SPECIFIC_FIELDS).skip(skip).limit(limit);
    return res.status(200).send({ message: 'user data fetch successfully!', data: userList });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = userRouter;
