const express = require('express')// 引用 Express 
const router = express.Router()// 引用Express 路由器
const home = require('./modules/home')// 引入 home 模組程式碼
const todos = require('./modules/todos')
const users = require('./modules/users')


router.use('/', home)// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/todos', todos)
router.use('/users',users)

module.exports = router// 匯出路由器
