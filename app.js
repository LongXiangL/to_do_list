const express = require('express')//載入express
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')// 引用 handlebars
const bodyParser = require('body-parser')// 引用 body-parser
const methodOverride = require('method-override')//載入method-override
const PORT = process.env.PORT || 3000



const routes = require('./routes')// 引用路由器
require('./config/mongoose')


const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))//樣板引擎
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))//每一筆請求先用body-parser進行前置處理
app.use(methodOverride('_method'))//設定每一筆請求都會透過methodOverride進行前置處理

app.use(session({
  secret: "ThisIsMySecret",
  resave: false,
  saveUninitialized: true
}))

usePassport(app)//呼叫Passport函式並傳入app，需放在路由之前處理

app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)// 將 request 導入路由器

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
}) 