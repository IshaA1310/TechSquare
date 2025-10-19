const express = require('express');
const requestRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const userAuth = require('../middleware/userAuth');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const sendEmail = require('../utils/sesEmail');

requestRouter.post('/connection/request/:status/:toUser', userAuth, async function(req, res) {
  try {
    const toUser = await User.findOne({ _id: req.params.toUser }); // reciever user exists or not ?
    if(!toUser) return res.status(401).send({ message: 'This user not register with us!'});
    const status = req.params.status;
    const allowedStatus = ['Ignored', 'Interested']; // two statues allowed only
    if(!allowedStatus.includes(status)) return res.status(401).send({ message: 'Invalid Status!'});
    const fromUserId = req.user._id;
    const toUserId = toUser._id;
    const existingUser = await ConnectionRequest.findOne({
      $or: [
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ]
    }); // connection already sent from a to b, b to a
    if(existingUser) return res.status(401).send({ message: 'Connection has already sent to this User!'});
    let connectionReq = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    }); // new instance
    connectionReq = await connectionReq.save(); // save into database
    const senmail = await sendEmail.run(
      "A new friend request from " + req.user.firstName,
      req.user.firstName + " is " + status + " in " + toUser.firstName
    );
    console.log(senmail, 'sen sen')
    return res.status(201).send({ message: `${status} Request has Sent Successfully!`});
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

requestRouter.post('/request/review/:status/:user', userAuth, async (req, res) => {
  try {
    const {status, user} = req.params;
    const allowedStatus = ['Accepted', 'Rejected'];
    if(!allowedStatus.includes(status)) return res.status(400).send({ message: 'Status Not Valid!' });
    const existUser = await User.findById(user);
    if(!existUser) return res.status(400).send({ message: 'User Not Found!' });
    const existRequest = await ConnectionRequest.findOne({
      fromUserId: existUser._id,
      toUserId: req.user._id,
      status: 'Interested'
    });
    if(!existRequest) return res.status(400).send({ message: 'Connection Request Not Found!' });
    existRequest.status = status;
    const data = await existRequest.save();
    return res.status(201).send({ message: 'Request has been '+ status +' Successfully!', data: data });
  } catch(err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = requestRouter;
