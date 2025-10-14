const mongoose = require('mongoose');

const connectdb = async ()=> {
  await mongoose.connect('mongodb+srv://maltiaggarwal306_db_user:o6JqfGjiQ6XOPGyA@techsquare.wlh32ge.mongodb.net/');
  // await mongoose.connect('mongodb://127.0.0.1:27017/techsquare');
}

module.exports = {
  connectdb
}