const mongoose = require('mongoose');


const infoSchema = new mongoose.Schema({
  bestBlockHeight: {
    type: Number,
    strip: false
  },
  txCount: {
    type: String,
    strip: false
  }
});

module.exports = mongoose.model('Info', infoSchema);