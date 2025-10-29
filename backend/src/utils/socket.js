const socket = require('socket.io');
const crypto = require('crypto');
const Chat = require('../models/chat');

const getRoomSecretId = (userId, targetUserId) => {
  return crypto.createHash('sha256').update([userId, targetUserId].sort().join('_')).digest('hex');
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : ['https://techsquare.work.gd/', 'http://techsquare.work.gd/'],
      // origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : ['http://techsquare.work.gd/', 'https://techsquare.work.gd/']
    }
  });

  io.on('connection', (socket) => {
    socket.on('joinChat', ({ firstName, userId, targetUserId }) => {
      const roomId = getRoomSecretId(userId, targetUserId);
      socket.join(roomId);
    })

    socket.on('sendMessage', async ({ firstName, userId, targetUserId, text }) => {
      const roomId = getRoomSecretId(userId, targetUserId);

      //save to database before showing message to users
      try {
        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId]}
        });

        if(!chat) {
          chat = new Chat({
            participants: [userId, targetUserId],
            messages: []
          });
        }

        chat.messages.push({
          senderId: userId,
          text
        });
        await chat.save();

        io.to(roomId).emit('messageRecieved', { firstName, text });
        
      } catch (err) {
        console.log(err, 'error');
      }
    })

    socket.on('disconnect', () => {
      
    })
  })
}

module.exports = {
  initializeSocket
};
