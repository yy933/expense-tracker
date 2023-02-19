const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  itemName: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    min: [1, '至少1元'],
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    index: true,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Record', recordSchema)
