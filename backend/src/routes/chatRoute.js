const express = require('express');
const chatRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const Chat = require('../models/chat');
const User = require('../models/user');

chatRouter.get('/chat/:targetUserId', userAuth, async(req, res) => {
  try {
    console.log(req.params, ' req.params')
    const { targetUserId } = req.params;
    const userId = req.user._id;
    console.log(userId, ' req.userId')

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] }
    }).populate({
      path: 'messages.senderId',
      select: 'firstName lastName'
    });
    if(!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: []
      })
      await chat.save();
    }
    return res.send({ data: chat })
  } catch(err) {
    console.log(err, ' error');
  }
});

module.exports = chatRouter;
