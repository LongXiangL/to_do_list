//引用Express與Express路由器
const express = require('express')
const router = express.Router()
//引用Todo model
const Todo = require('../../models/todo')
//定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id // 變數設定
  Todo.find({ userId })  // 加入查詢條件{userId:req.user._id}
  //拿到全部的資料＝首頁
    .lean()
    .sort({ _id: 'asc' })//desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

//匯出路由模組
module.exports = router