const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  toUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, 
    enum: {
      values: [ 'ignored', 'interested', 'accepted', 'rejected' ],
      message: `{VALUE} incorrect status value`
    }, 
    required: true 
  }}, 
  { timestamps: true }
);

// Index //middleware
connectionRequestSchema.pre('save', async function(next) {
  const connectionRequest = this; // always use this
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) { //Is sender & reciever both are same ?
    return res.status(400).send('Request cannot sent to yourself!');
  }
  next();
}); // check before save into db

const ConnectionRequest = new mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;