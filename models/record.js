const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  // id:{
  //   type: Number,
  //   required: true,
  // },
  category: {
    type: String,
    required: true
  },
  // userID:{
  //   type: Number,
  //   required: true,
  // },
  itemName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Record', recordSchema)
