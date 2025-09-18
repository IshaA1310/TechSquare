const express = require('express');
const requestRouter = express.Router();

const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const userAuth = require('../middleware/userAuth');

requestRouter.post('/connection/request/:status/:toUser', userAuth, async function(req, res) {
  try {
    const toUser = await User.findOne({ _id: req.params.toUser }); // reciever user exists or not ?
    if(!toUser) return res.status(401).send('This user not register with us!');
    const status = req.params.status;
    const allowedStatus = ['ignored', 'interested']; // two statues allowed only
    if(!allowedStatus.includes(status)) return res.status(401).send('Invalid Status!');
    const fromUserId = req.user._id;
    const toUserId = toUser._id;
    const existingUser = await ConnectionRequest.findOne({
      $or: [
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ]
    }); // connection already sent from a to b, b to a
    if(existingUser) return res.status(401).send('Connection has already sent to this User!');
    let connectionReq = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    }); // new instance
    connectionReq = await connectionReq.save(); // save into database
    return res.status(201).send('Connection Request has Sent Successfully!');
  } catch (err) {
    return res.status(500).send('Error from Server!');
  }
});

requestRouter.post('/request/review/:status/:user', userAuth, async (req, res) => {
  try {
    const {status, user} = req.params;
    const allowedStatus = ['accepted', 'rejected'];
    if(allowedStatus.includes(status)) return res.status(400).send('status is not valid!');
    const existUser = await User.findOne({ fromUserId: user });
    if(!existUser) return res.status(400).send('User not found!');
    const existRequest = await ConnectionRequest.findOne({
      fromUserId: existUser._id,
      toUserId: req.user._id,
      status: 'interested'
    });
    if(!existRequest) return res.status(400).send('Connection Request not found!');
    existRequest.status = status;
    const data = await existRequest.save();
    return res.status(201).send({ message: 'Request has been '+ status +' successfully!', data: data });
  } catch(err) {
    return res.status(500).send('Error from server!');
  }
});

module.exports = requestRouter;