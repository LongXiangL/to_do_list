const express = require('express')//載入express
const mongoose = require('mongoose')//載入mongoose
const exphbs = require('express-handlebars')// 引用 handlebars
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override')//載入method-override
const app = express()
const Todo = require('./models/todo')//載入Todo
const routes = require('./routes')// 引用路由器






// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//取得資料庫連線狀態
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected')
})

//樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))//設定每一筆請求都會透過methodOverride進行前置處理
// 將 request 導入路由器
app.use(routes)








app.listen(3000, () => {
  console.log('App is running on http://localhost:3000/.')
}) 