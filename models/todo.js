const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,//資料型別是字串
    required: true//這是個必填欄位
  },
  isDone: {
    type: Boolean,
    default: false  // 預設完成狀態為 false
  },
  userId: {//加入關聯設定
    type: Schema.Types.ObjectId,//定義 userId 這個項目是一個 ObjectId，也就是它會連向另一個資料物件
    ref: 'User',//定義參考對象是 User model
    index: true,//以此為主要快速搜尋索引
    required: true
  }
})
module.exports = mongoose.model('ToDo', todoSchema)