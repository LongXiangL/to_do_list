//引用Express與Express路由器
const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')  //引用Todo model


router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const name = req.body.name//從req.body拿出表單裡的name資料
  return Todo.create({ name })//存入資料庫
    .then(() => res.redirect('/'))//新增完成後導回首頁
    .catch(error => console.log(error))
})
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render(`detail`, { todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  // const name = req.body.name
  // const isDone = req.body.isDone
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      // if (isDone === 'on') {
      //   todo.isDone = true
      // } else {
      //   toolbar.isDone = false
      // }
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router  //匯出路由模組