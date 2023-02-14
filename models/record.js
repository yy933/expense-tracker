const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const recordSchema = new Schema({
  id:{
    type: Number,
    required: true,
  },
  name: {
    type: String, // 資料型別是字串
    required: true, // 這是個必填欄位
  },
  date: {
    type: Date,
    required: true, //設定預設值，也就是在資料生成時，自動帶入的屬性值
  },
  amount{
    type: Number,
    required: true,
  }
});
module.exports = mongoose.model("Record", recordSchema);
