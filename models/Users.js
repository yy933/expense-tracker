const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Users', userSchema);
