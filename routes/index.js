const express = require('express')// 引用 Express 
const router = express.Router()// 引用Express 路由器
const home = require('./modules/home')// 引入 home 模組程式碼
const todos = require('./modules/todos')
const users = require('./modules/users')
const {authenticator}=require('../middleware/auth')

router.use('/todos', authenticator, todos)
router.use('/users',users)
router.use('/', authenticator, home)

module.exports = router// 匯出路由器
