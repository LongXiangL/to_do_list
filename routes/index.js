// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')// 引入 home 模組程式碼
const todos = require('./modules/todos')

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)
router.use('/todos', todos)
// 匯出路由器
module.exports = router